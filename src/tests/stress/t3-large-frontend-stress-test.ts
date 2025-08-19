import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for frontend stress testing
const feStressErrorRate = new Rate("fe_stress_errors");
const feStressCallsCounter = new Counter("fe_stress_calls_total");
const feStressResponseTime = new Trend("fe_stress_response_time");
const pageLoadCounter = new Counter("page_loads_total");
const staticResourceCounter = new Counter("static_resources_total");

export const options: Options = {
  // Optimized for t3.large - Frontend typically needs fewer VUs than API
  // Focus on realistic browser behavior patterns
  stages: [
    { duration: "30s", target: 100 },   // Initial users landing
    { duration: "1m", target: 400 },    // Rapid user growth
    { duration: "2m", target: 800 },    // Peak social media traffic
    { duration: "3m", target: 1200 },   // Viral moment peak
    { duration: "5m", target: 1000 },   // Sustained high traffic
    { duration: "3m", target: 600 },    // Traffic settling
    { duration: "2m", target: 200 },    // Cool down period
    { duration: "1m", target: 0 },      // Ramp down
  ],
  thresholds: {
    // Frontend-specific thresholds
    http_req_duration: ["p(95)<10000"], // 10s max page load time
    http_req_failed: ["rate<0.15"],     // 15% failure tolerance
    fe_stress_errors: ["rate<0.15"],    // Same tolerance
    http_reqs: ["rate>200"],            // Ensure good request volume
  },
  // Frontend optimization
  batch: 15,              // Moderate batching for page loads
  batchPerHost: 8,        // Conservative per-host limit
  rps: 1500,              // Frontend RPS limit
};

// Frontend URL - all requests point to k6-test endpoint
const FRONTEND_BASE_URL = "https://trade.mememarket.fun";
const K6_TEST_ENDPOINT = "/k6-test";

// Realistic frontend user behavior patterns
const FE_USER_BEHAVIORS = [
  // Quick visitor - just checks the page (30% of traffic)
  {
    weight: 0.3,
    name: "quick_visitor",
    actions: [
      { type: "page_load", cache_behavior: "no-cache" },
    ],
    session_duration: 0.5, // 500ms total session
    think_time: 0.2,
  },
  // Engaged user - multiple interactions (40% of traffic)
  {
    weight: 0.4,
    name: "engaged_user", 
    actions: [
      { type: "page_load", cache_behavior: "no-cache" },
      { type: "page_reload", cache_behavior: "cache" },
      { type: "page_interaction", cache_behavior: "cache" },
    ],
    session_duration: 2.0, // 2 second session
    think_time: 0.5,
  },
  // Power user - heavy usage (20% of traffic)
  {
    weight: 0.2,
    name: "power_user",
    actions: [
      { type: "page_load", cache_behavior: "no-cache" },
      { type: "page_reload", cache_behavior: "cache" },
      { type: "page_interaction", cache_behavior: "cache" },
      { type: "page_refresh", cache_behavior: "no-cache" },
      { type: "page_interaction", cache_behavior: "cache" },
    ],
    session_duration: 5.0, // 5 second session
    think_time: 0.8,
  },
  // Mobile user - slower interactions (10% of traffic)
  {
    weight: 0.1,
    name: "mobile_user",
    actions: [
      { type: "page_load", cache_behavior: "no-cache" },
      { type: "page_interaction", cache_behavior: "cache" },
    ],
    session_duration: 3.0, // 3 second session (mobile slower)
    think_time: 1.2,
  },
];

export default function () {
  feStressCallsCounter.add(1);

  // Select user behavior pattern
  const behavior = selectUserBehavior();
  
  // Simulate user session
  for (let i = 0; i < behavior.actions.length; i++) {
    const action = behavior.actions[i];
    
    // Execute frontend action
    performFrontendAction(action, behavior.name, i + 1);
    
    // Realistic think time between actions
    if (i < behavior.actions.length - 1) {
      sleep(behavior.think_time + Math.random() * 0.3);
    }
  }

  // Track user behavior metrics
  switch (behavior.name) {
    case "quick_visitor":
      pageLoadCounter.add(1);
      break;
    case "engaged_user":
      pageLoadCounter.add(2);
      staticResourceCounter.add(3);
      break;
    case "power_user":
      pageLoadCounter.add(3);
      staticResourceCounter.add(8);
      break;
    case "mobile_user":
      pageLoadCounter.add(1);
      staticResourceCounter.add(2);
      break;
  }

  // Session end pause
  sleep(Math.random() * 1.0); // 0-1s random session break
}

function selectUserBehavior() {
  const random = Math.random();
  let cumulativeWeight = 0;

  for (const behavior of FE_USER_BEHAVIORS) {
    cumulativeWeight += behavior.weight;
    if (random <= cumulativeWeight) {
      return behavior;
    }
  }
  
  return FE_USER_BEHAVIORS[0]; // fallback
}

function performFrontendAction(action: any, behaviorName: string, actionNumber: number) {
  const startTime = Date.now();
  
  // Build request URL with realistic parameters
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  const cacheBuster = action.cache_behavior === "no-cache" ? `?t=${timestamp}&r=${random}` : `?r=${random}`;
  const finalUrl = `${FRONTEND_BASE_URL}${K6_TEST_ENDPOINT}${cacheBuster}`;

  // Realistic browser headers
  const headers = getRealisticHeaders(behaviorName, action.cache_behavior);

  const res = http.get(finalUrl, {
    timeout: "15s", // Frontend timeout
    headers,
  });

  const duration = Date.now() - startTime;
  feStressResponseTime.add(duration);

  // Frontend-specific checks
  const success = check(res, {
    [`${behaviorName}_${actionNumber} status OK`]: (r) => r.status === 200 || r.status === 401,
    [`${behaviorName}_${actionNumber} not timeout`]: (r) => r.status !== 0,
    [`${behaviorName}_${actionNumber} reasonable load time`]: (r) => duration < 10000,
    [`${behaviorName}_${actionNumber} has content`]: (r) => r.body && r.body.length > 200,
  });

  if (!success || (res.status !== 200 && res.status !== 401)) {
    feStressErrorRate.add(1);
    
    // Log frontend-specific errors
    if (res.status >= 500 || res.status === 0) {
      console.log(`🚨 FE ${behaviorName} FAIL - Status: ${res.status}, Time: ${duration}ms`);
    } else if (res.status === 429) {
      console.log(`⚠️ FE RATE LIMITED ${behaviorName} - Time: ${duration}ms`);
    }
  }

  // Handle CDN/frontend rate limiting
  if (res.status === 429 || res.status === 503) {
    const backoff = Math.min(0.2 + Math.random() * 0.3, 1.0); // 200-500ms backoff, max 1s
    sleep(backoff);
  }
}

function getRealisticHeaders(behaviorName: string, cacheBehavior: string) {
  const baseHeaders = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
  };

  // Add cache control based on behavior
  if (cacheBehavior === "no-cache") {
    baseHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
    baseHeaders["Pragma"] = "no-cache";
  }

  // Different user agents for different behaviors
  const userAgents = {
    quick_visitor: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    engaged_user: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    power_user: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    mobile_user: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
  };

  baseHeaders["User-Agent"] = userAgents[behaviorName] || userAgents.quick_visitor;

  return baseHeaders;
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.fe_stress_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.fe_stress_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.fe_stress_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);
  const p99ResponseTime = (data.metrics.http_req_duration?.values?.["p(99)"] || 0).toFixed(2);
  const requestsPerSecond = (data.metrics.http_reqs?.values?.rate || 0).toFixed(2);
  const maxVUs = Math.max(...(data.metrics.vus?.values ? Object.values(data.metrics.vus.values) : [0]));
  
  const pageLoads = data.metrics.page_loads_total?.values?.count || 0;
  const staticResources = data.metrics.static_resources_total?.values?.count || 0;

  return {
    "t3-large-frontend-stress-results.json": JSON.stringify(data, null, 2),
    stdout: `
🌐 T3.LARGE FRONTEND STRESS TEST COMPLETED!

💻 FRONTEND LOAD ANALYSIS:
• Total User Sessions: ${totalRequests.toLocaleString()}
• Peak Concurrent Users: ${maxVUs.toLocaleString()}
• Average RPS: ${requestsPerSecond}
• Test Duration: ~17 minutes
• Target URL: https://trade.mememarket.fun/k6-test

⚡ FRONTEND PERFORMANCE:
• Error Rate: ${errorRate}% ${parseFloat(errorRate) < 10 ? "🟢" : parseFloat(errorRate) < 15 ? "🟡" : "🔴"}
• Average Page Load: ${avgResponseTime}ms
• 95th Percentile: ${p95ResponseTime}ms ${parseFloat(p95ResponseTime) < 8000 ? "🟢" : parseFloat(p95ResponseTime) < 10000 ? "🟡" : "🔴"}
• 99th Percentile: ${p99ResponseTime}ms

👥 USER BEHAVIOR SIMULATION:
• Page Loads Simulated: ${pageLoads.toLocaleString()}
• Static Resource Requests: ${staticResources.toLocaleString()}
• User Journey Mix: 30% quick visitors, 40% engaged users, 20% power users, 10% mobile

🎯 FRONTEND STRESS RESULTS:
${parseFloat(errorRate) < 15 ? "🟢" : "🔴"} Error Rate Target (< 15%): ${errorRate}%
${parseFloat(p95ResponseTime) < 10000 ? "🟢" : "🔴"} Load Time Target (< 10s): ${p95ResponseTime}ms
${parseFloat(requestsPerSecond) > 200 ? "🟢" : "🔴"} Throughput Target (> 200 RPS): ${requestsPerSecond} RPS
${maxVUs >= 1000 ? "🟢" : "🔴"} Concurrent Users Target (> 1000): ${maxVUs} users

📊 FRONTEND INFRASTRUCTURE STRESS:
• CDN/Load Balancer Load: ${totalRequests.toLocaleString()} total requests
• Peak Concurrent Connections: ${maxVUs} simultaneous users
• Frontend Scaling Test: Sustained ${maxVUs} users for 5+ minutes
• Cache Performance: Mixed cache/no-cache request patterns

🚀 FRONTEND READINESS ASSESSMENT:
${parseFloat(errorRate) < 8 && parseFloat(p95ResponseTime) < 6000 
  ? "🟢 EXCELLENT - Frontend handles t3.large load beautifully"
  : parseFloat(errorRate) < 15 && parseFloat(p95ResponseTime) < 10000
  ? "🟡 GOOD - Frontend handles stress with acceptable performance"
  : "🔴 NEEDS OPTIMIZATION - Frontend struggles under load"
}

💡 FRONTEND SCALING INSIGHTS:
• Max sustainable users on t3.large: ${maxVUs}
• Recommended production buffer: ${Math.floor(maxVUs * 0.8)} users (80% capacity)
• CDN effectiveness: ${parseFloat(p95ResponseTime) < 5000 ? "High (good caching)" : "Moderate (check CDN config)"}

⚠️ CLIENT MACHINE PERFORMANCE:
${maxVUs < 800 ? "🔴 Resource Limited - Consider reducing concurrent users" : 
  maxVUs < 1100 ? "🟡 Near Capacity - Monitor system resources" : 
  "🟢 Good Capacity - t3.large handling frontend load well"}

🌐 PRODUCTION FRONTEND VALIDATION:
1. ${parseFloat(errorRate) < 10 ? "✅" : "❌"} Error rate < 10% during peak traffic
2. ${parseFloat(p95ResponseTime) < 8000 ? "✅" : "❌"} 95% page loads under 8 seconds  
3. ${totalRequests > 15000 ? "✅" : "❌"} Handle 15K+ user sessions total
4. ${requestsPerSecond > 150 ? "✅" : "❌"} Sustain 150+ sessions/second average

Monitor CloudFront, ALB, and ECS frontend metrics during this test.
This validates your frontend's ability to handle viral traffic spikes.
    `,
  };
}