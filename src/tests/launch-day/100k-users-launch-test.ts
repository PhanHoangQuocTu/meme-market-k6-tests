import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for 100K user launch simulation
const launchErrorRate = new Rate("launch_day_errors");
const launchCallsCounter = new Counter("launch_day_calls_total");
const launchResponseTime = new Trend("launch_day_response_time");
const loginAttempts = new Counter("launch_day_login_attempts");
const marketQueries = new Counter("launch_day_market_queries");
const tradeAttempts = new Counter("launch_day_trade_attempts");

export const options: Options = {
  stages: [
    // REALISTIC 100K user launch day pattern
    { duration: "30s", target: 500 }, // Initial launch spike - early adopters
    { duration: "2m", target: 2000 }, // Social media buzz kicks in
    { duration: "5m", target: 8000 }, // Viral growth phase
    { duration: "10m", target: 15000 }, // Peak launch traffic
    { duration: "10m", target: 25000 }, // Maximum concurrent users (20K concurrent = ~100K daily)
    { duration: "15m", target: 15000 }, // Slight reduction as some users complete onboarding
    { duration: "10m", target: 12000 }, // Sustained high activity
    { duration: "15m", target: 8000 }, // Evening wind down
    { duration: "10m", target: 3000 }, // Late users checking out the platform
    { duration: "5m", target: 0 }, // Gradual ramp down
  ],
  thresholds: {
    // Launch day requirements - more lenient thresholds for extreme load
    http_req_duration: ["p(95)<35000"], // 35s threshold (within health check timeout)
    http_req_failed: ["rate<0.15"], // Allow 15% error rate during peak launch
    launch_day_errors: ["rate<0.15"], // Same 15% error tolerance
    http_reqs: ["rate>100"], // Ensure we're generating substantial load
  },
};

// Production API endpoints
const API_BASE_URL = "https://api-prod.mememarket.fun";

// Launch day user behavior patterns
const USER_BEHAVIORS = [
  // New user onboarding flow (40% of traffic)
  {
    weight: 0.4,
    name: "new_user_onboarding",
    endpoints: [
      "/api/v1/prediction-markets?limit=20&page=1",
      "/api/v1/prediction-markets?limit=20&page=2",
      "/api/v1/prediction-markets",
    ],
    requestsPerSession: 3,
    thinkTime: 0.5, // 500ms between requests
  },
  // Active trader behavior (30% of traffic)
  {
    weight: 0.3,
    name: "active_trader",
    endpoints: [
      "/api/v1/prediction-markets",
      "/api/v1/prediction-markets?limit=30&page=1",
      "/api/v1/prediction-markets?limit=25&page=2",
      "/api/v1/prediction-markets",
    ],
    requestsPerSession: 5,
    thinkTime: 0.2, // 200ms - faster trading behavior
  },
  // Casual browser behavior (20% of traffic)
  {
    weight: 0.2,
    name: "casual_browser",
    endpoints: [
      "/api/v1/prediction-markets?limit=15&page=1",
      "/api/v1/prediction-markets",
    ],
    requestsPerSession: 2,
    thinkTime: 1.0, // 1s - slower browsing
  },
  // Mobile app user behavior (10% of traffic)
  {
    weight: 0.1,
    name: "mobile_user",
    endpoints: [
      "/api/v1/prediction-markets?limit=10&page=1",
      "/api/v1/prediction-markets",
    ],
    requestsPerSession: 2,
    thinkTime: 0.8, // 800ms - mobile latency
  },
];

export default function () {
  launchCallsCounter.add(1);

  // Select user behavior based on weight distribution
  const behavior = selectBehavior();

  // Simulate realistic user session
  for (let i = 0; i < behavior.requestsPerSession; i++) {
    const endpoint =
      behavior.endpoints[Math.floor(Math.random() * behavior.endpoints.length)];

    // Add cache busting and realistic query variations
    const timestamp = Date.now();
    const random = Math.random();
    const finalEndpoint = `${endpoint}&t=${timestamp}&r=${random}&behavior=${behavior.name}`;

    makeAPIRequest(finalEndpoint, `${behavior.name}_request_${i + 1}`);

    // Realistic think time between requests
    sleep(behavior.thinkTime);
  }

  // Track different user actions for metrics
  switch (behavior.name) {
    case "new_user_onboarding":
      loginAttempts.add(1);
      marketQueries.add(3);
      break;
    case "active_trader":
      tradeAttempts.add(1);
      marketQueries.add(5);
      break;
    case "casual_browser":
      marketQueries.add(2);
      break;
    case "mobile_user":
      marketQueries.add(2);
      break;
  }

  // Random session break (simulate real user behavior)
  sleep(Math.random() * 2); // 0-2s random break
}

function selectBehavior() {
  const random = Math.random();
  let cumulativeWeight = 0;

  for (const behavior of USER_BEHAVIORS) {
    cumulativeWeight += behavior.weight;
    if (random <= cumulativeWeight) {
      return behavior;
    }
  }

  return USER_BEHAVIORS[0]; // fallback
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();

  // Realistic headers for different user types
  const headers = {
    Accept: "application/json",
    "User-Agent": getRandomUserAgent(),
    Connection: "keep-alive",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
  };

  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "40s", // Generous timeout for launch day load
    headers,
  });

  trackResponse(res, startTime, label);
  return res;
}

function getRandomUserAgent() {
  const userAgents = [
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Android 14; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0",
    "Mozilla/5.0 (compatible; k6-launch-day-test/1.0; +https://mememarket.fun)",
  ];

  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  launchResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} has data`]: (r) => r.body && r.body.length > 50,
    [`${label} response under timeout`]: (r) => duration < 35000, // Must be under 35s
    [`${label} not rate limited`]: (r) => r.status !== 429,
  });

  if (!success || res.status !== 200) {
    launchErrorRate.add(1);

    // Log important failures during launch simulation
    if (res.status >= 500 || res.status === 0) {
      console.log(
        `🚨 CRITICAL ${label} - Status: ${
          res.status
        }, Time: ${duration}ms, Body: ${res.body?.substring(0, 100)}`
      );
    } else if (res.status === 429) {
      console.log(`⚠️ RATE LIMITED ${label} - Time: ${duration}ms`);
    }
  } else {
    // Log success occasionally to monitor progress
    if (Math.random() < 0.001) {
      // 0.1% chance to log success (less noise)
      console.log(
        `✅ ${label} success - Status: ${res.status}, Time: ${duration}ms, Size: ${res.body.length} bytes`
      );
    }
  }

  // Handle rate limiting with exponential backoff
  if (res.status === 429) {
    const backoff = Math.min(0.1 + Math.random() * 0.2, 0.5); // 100-300ms backoff, max 500ms
    sleep(backoff);
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.launch_day_calls_total?.values?.count || 0;
  const errorRate = (
    data.metrics.launch_day_errors?.values?.rate * 100 || 0
  ).toFixed(2);
  const avgResponseTime = (
    data.metrics.launch_day_response_time?.values?.avg || 0
  ).toFixed(2);
  const p95ResponseTime = (
    data.metrics.http_req_duration?.values?.["p(95)"] || 0
  ).toFixed(2);
  const p99ResponseTime = (
    data.metrics.http_req_duration?.values?.["p(99)"] || 0
  ).toFixed(2);
  const requestsPerSecond = (totalRequests / 7200).toFixed(2); // 2 hour test
  const maxVUs = Math.max(
    ...(data.metrics.vus?.values ? Object.values(data.metrics.vus.values) : [0])
  );

  const loginAttemptCount =
    data.metrics.launch_day_login_attempts?.values?.count || 0;
  const marketQueryCount =
    data.metrics.launch_day_market_queries?.values?.count || 0;
  const tradeAttemptCount =
    data.metrics.launch_day_trade_attempts?.values?.count || 0;

  return {
    "100k-launch-day-results.json": JSON.stringify(data, null, 2),
    stdout: `
🚀 100K USER LAUNCH DAY SIMULATION COMPLETED!

📊 LAUNCH DAY PERFORMANCE SUMMARY:
• Total Requests: ${totalRequests.toLocaleString()}
• Peak Concurrent Users: ${maxVUs.toLocaleString()} VUs
• Requests/Second: ${requestsPerSecond}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms
• 99th Percentile Response Time: ${p99ResponseTime}ms

👥 USER BEHAVIOR SIMULATION:
• Login Attempts: ${loginAttemptCount.toLocaleString()}
• Market Queries: ${marketQueryCount.toLocaleString()}
• Trade Attempts: ${tradeAttemptCount.toLocaleString()}

🎯 LAUNCH DAY VALIDATION:
${
  errorRate < "15.00"
    ? "🟢 Error rate acceptable for launch day"
    : "🔴 High error rate - may need infrastructure scaling"
}
${
  avgResponseTime < "20000"
    ? "🟢 Average response times healthy"
    : "🔴 High average response times"
}
${
  p95ResponseTime < "35000"
    ? "🟢 95% of responses under health check timeout"
    : "🔴 Some responses exceed health check timeout"
}
${
  p99ResponseTime < "45000"
    ? "🟢 99% of responses reasonable"
    : "🔴 Tail latency concerning"
}

💰 INFRASTRUCTURE SCALING ASSESSMENT:
Current configuration should handle:
• Peak Load: 20,000 concurrent users
• Daily Active Users: ~100,000 users
• API Scaling: 2-100 instances (auto-scaling at 50% CPU)
• Frontend Scaling: 2-75 instances (auto-scaling at 50% CPU)

🚨 LAUNCH DAY READINESS:
${
  errorRate < "10.00" && p95ResponseTime < "30000"
    ? "🟢 READY FOR LAUNCH - Infrastructure can handle 100K user launch day"
    : "🔴 NEEDS OPTIMIZATION - Consider increasing max_capacity or optimizing health checks"
}

📈 SCALING BEHAVIOR VALIDATION:
Monitor AWS ECS Console during this test to ensure:
1. ✅ API instances scale from 3 → 100 under peak load
2. ✅ Frontend instances scale from 3 → 75 under peak load  
3. ✅ No instances terminated due to health check failures
4. ✅ Auto-scaling responds within 30-60 seconds
5. ✅ Scale-down occurs properly after load reduces

🎯 SUCCESS CRITERIA FOR 100K LAUNCH:
1. ${errorRate < "15.00" ? "✅" : "❌"} Error rate < 15% during peak traffic
2. ${p95ResponseTime < "35000" ? "✅" : "❌"} 95% responses under 35 seconds
3. ${totalRequests > "500000" ? "✅" : "❌"} Handle 500K+ requests total
4. ${requestsPerSecond > "70" ? "✅" : "❌"} Sustain 70+ requests/second average

Monitor CloudWatch metrics and ECS auto-scaling behavior during this test to validate launch day readiness.
    `,
  };
}
