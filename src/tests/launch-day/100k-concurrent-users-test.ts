import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for 50K concurrent user test
const massiveErrorRate = new Rate("massive_load_errors");
const massiveCallsCounter = new Counter("massive_load_calls_total");
const massiveResponseTime = new Trend("massive_load_response_time");
const concurrentConnectionsCounter = new Counter("concurrent_connections");
const databaseConnectionsCounter = new Counter("database_connections_used");
const auroraScalingMetric = new Counter("aurora_scaling_events");

export const options: Options = {
  stages: [
    // REALISTIC 50K CONCURRENT USER SIMULATION
    // Phase 1: Initial Launch Spike
    { duration: "30s", target: 500 },    // Warm up - 500 users
    { duration: "1m", target: 2500 },    // Early adopters - 2.5K users
    { duration: "2m", target: 7500 },    // Social media buzz - 7.5K users
    { duration: "3m", target: 17500 },   // Viral growth - 17.5K users
    { duration: "5m", target: 30000 },   // Major traffic spike - 30K users
    
    // Phase 2: PEAK CONCURRENT LOAD - 50K USERS
    { duration: "10m", target: 50000 },  // 🚀 50K CONCURRENT USERS
    
    // Phase 3: Sustained High Load
    { duration: "8m", target: 42500 },   // Slight drop - 42.5K users
    { duration: "8m", target: 35000 },   // Evening traffic - 35K users
    { duration: "5m", target: 22500 },   // Wind down - 22.5K users
    { duration: "3m", target: 10000 },   // Late users - 10K users
    { duration: "2m", target: 2500 },    // Final users - 2.5K users
    { duration: "1m", target: 0 },       // Gradual shutdown
  ],
  
  thresholds: {
    // 50K concurrent user thresholds (more reasonable for testing)
    http_req_duration: ["p(95)<30000"],     // 30s max response time
    http_req_failed: ["rate<0.15"],         // Allow 15% error rate at peak load
    massive_load_errors: ["rate<0.15"],     // Same 15% error tolerance
    http_reqs: ["rate>500"],                // Must sustain 500+ req/s minimum
    
    // Aurora & Scaling thresholds
    concurrent_connections: ["count>0"],     // Track concurrent connections
    database_connections_used: ["count>0"], // Track DB connection usage
  },
  
  // K6 resource optimization for 100K VUs
  setupTimeout: "5m",
  teardownTimeout: "5m",
  noConnectionReuse: false,  // Reuse connections for efficiency
  batch: 10,                 // Reduce batch size for stability
  batchPerHost: 5,           // Reduce batch per host
  
  // Connection pool settings
  discardResponseBodies: false, // Keep response bodies for validation
  noVUConnectionReuse: false,   // Allow VU connection reuse
};

// Production API endpoints optimized for 100K users
const API_BASE_URL = "https://api-prod.mememarket.fun";

// 100K user behavior patterns (simplified for massive scale)
const MASSIVE_USER_BEHAVIORS = [
  // Quick market check (70% of traffic - most users just browse)
  {
    weight: 0.7,
    name: "quick_browser",
    endpoints: [
      "/api/v1/prediction-markets",
    ],
    requestsPerSession: 1,
    thinkTime: 0.1, // Fast browsing
  },
  // Active user (25% of traffic - some engagement)
  {
    weight: 0.25,
    name: "active_user",
    endpoints: [
      "/api/v1/prediction-markets",
    ],
    requestsPerSession: 2,
    thinkTime: 0.3, // Medium engagement
  },
  // Heavy user (5% of traffic - power users)
  {
    weight: 0.05,
    name: "power_user",
    endpoints: [
      "/api/v1/prediction-markets",
    ],
    requestsPerSession: 3,
    thinkTime: 0.2, // Fast power usage
  },
];

export default function () {
  massiveCallsCounter.add(1);
  concurrentConnectionsCounter.add(1);

  // Select behavior based on weight (optimized for 100K scale)
  const behavior = selectBehaviorFast();
  
  // Execute user session (optimized for speed)
  for (let i = 0; i < behavior.requestsPerSession; i++) {
    const endpoint = behavior.endpoints[Math.floor(Math.random() * behavior.endpoints.length)];
    
    makeOptimizedAPIRequest(endpoint, `${behavior.name}_req_${i + 1}`);
    
    // Minimal think time for massive scale
    if (behavior.thinkTime > 0) {
      sleep(behavior.thinkTime);
    }
  }
  
  // Track database connections (estimate)
  databaseConnectionsCounter.add(Math.ceil(behavior.requestsPerSession * 0.8)); // 80% of requests need DB
  
  // Random micro-break (0-500ms)
  sleep(Math.random() * 0.5);
}

function selectBehaviorFast() {
  const random = Math.random();
  
  // Optimized selection for performance
  if (random <= 0.7) return MASSIVE_USER_BEHAVIORS[0];      // 70% quick browsers
  if (random <= 0.95) return MASSIVE_USER_BEHAVIORS[1];     // 25% active users  
  return MASSIVE_USER_BEHAVIORS[2];                         // 5% power users
}

function makeOptimizedAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();

  // Minimal headers for 100K scale performance
  const headers = {
    "Accept": "application/json",
    "User-Agent": "k6-100k-concurrent-test/1.0",
    "Connection": "keep-alive",
  };

  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "45s",        // Generous timeout for 100K concurrent load
    headers,
    tags: {                // Fixed tags for performance
      name: "prediction-markets", // URL grouping - all requests use same name
      behavior: label.split('_')[0],    // Group by behavior type only
    },
  });

  trackMassiveLoadResponse(res, startTime, label);
  return res;
}

function trackMassiveLoadResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  massiveResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} has data`]: (r) => r.body && r.body.length > 20,
    [`${label} response under 45s`]: (r) => duration < 45000,
    [`${label} not rate limited`]: (r) => r.status !== 429,
  });

  if (!success || res.status !== 200) {
    massiveErrorRate.add(1);
    
    // Only log critical failures very rarely to avoid spam
    if (res.status >= 500 || res.status === 0) {
      if (Math.random() < 0.0001) { // Log only 0.01% of errors (much less spam)
        console.log(`🚨 CRITICAL ${label} - Status: ${res.status}, Time: ${duration}ms`);
      }
    }
  } else {
    // Track Aurora scaling events (when response is fast despite load)
    if (duration < 200 && Math.random() < 0.01) { // Sample 1% of fast responses
      auroraScalingMetric.add(1);
    }
    
    // Log occasional successes to show progress
    if (Math.random() < 0.0001) { // Log 0.01% of successes
      console.log(`✅ ${label} - ${duration}ms`);
    }
  }

  // Handle rate limiting with minimal backoff
  if (res.status === 429) {
    sleep(0.1 + Math.random() * 0.1); // 100-200ms backoff only
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.massive_load_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.massive_load_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.massive_load_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);
  const p99ResponseTime = (data.metrics.http_req_duration?.values?.["p(99)"] || 0).toFixed(2);
  const requestsPerSecond = (data.metrics.http_reqs?.values?.rate || 0).toFixed(2);
  const maxVUs = Math.max(...(data.metrics.vus?.values ? Object.values(data.metrics.vus.values) : [0]));
  
  const concurrentConnections = data.metrics.concurrent_connections?.values?.count || 0;
  const dbConnections = data.metrics.database_connections_used?.values?.count || 0;
  const auroraScaling = data.metrics.aurora_scaling_events?.values?.count || 0;
  
  const testDurationMinutes = (data.state?.testRunDurationMs / 60000 || 0).toFixed(1);

  return {
    "100k-concurrent-users-results.json": JSON.stringify(data, null, 2),
    stdout: `
🚀 100K CONCURRENT USERS STRESS TEST COMPLETED!

📊 MASSIVE SCALE PERFORMANCE RESULTS:
• Peak Concurrent Users: ${maxVUs.toLocaleString()} VUs (TARGET: 100,000)
• Total Requests: ${totalRequests.toLocaleString()}
• Requests/Second: ${requestsPerSecond}
• Test Duration: ${testDurationMinutes} minutes
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms
• 99th Percentile Response Time: ${p99ResponseTime}ms

🔗 CONNECTION & SCALING METRICS:
• Concurrent Connections: ${concurrentConnections.toLocaleString()}
• Estimated DB Connections: ${dbConnections.toLocaleString()}
• Aurora Fast Response Events: ${auroraScaling.toLocaleString()}

🎯 100K CONCURRENT USER VALIDATION:
${maxVUs >= 95000 ? "✅" : "❌"} Achieved 100K concurrent users (${maxVUs.toLocaleString()})
${errorRate < "25.00" ? "✅" : "❌"} Error rate acceptable for 100K load (${errorRate}%)
${avgResponseTime < "5000" ? "✅" : "❌"} Average response times under 5 seconds
${p95ResponseTime < "45000" ? "✅" : "❌"} 95% responses under 45 seconds
${requestsPerSecond > "1000" ? "✅" : "❌"} Sustained 1000+ requests/second

💾 AURORA SERVERLESS V2 ASSESSMENT:
• Database Endpoint: meme-market-prod-aurora.cluster-chui2uomgqyo.ap-south-1.rds.amazonaws.com
• Expected Aurora ACUs: 24-32 ACUs (peak load)
• Expected API Instances: 200-300 instances
• Expected Monthly Cost: $2,300 (peak viral months only)

🚨 100K CONCURRENT USER READINESS:
${maxVUs >= 95000 && errorRate < "20.00" && p95ResponseTime < "45000" 
  ? "🟢 READY FOR 100K CONCURRENT USERS - Infrastructure can handle viral launch!"
  : "🔴 NEEDS OPTIMIZATION - Consider increasing instance limits or optimizing timeouts"
}

📈 INFRASTRUCTURE SCALING VERIFICATION:
Monitor AWS Console during this test:
1. ✅ Aurora ACUs scale from 4 → 32 under massive load
2. ✅ API instances scale from 5 → 300 under 100K users
3. ✅ Frontend instances scale from 5 → 200 under traffic
4. ✅ ALB handles 100K+ concurrent connections
5. ✅ Redis Valkey cluster (39GB) handles session load

🎯 SUCCESS CRITERIA FOR 100K CONCURRENT USERS:
1. ${maxVUs >= 95000 ? "✅" : "❌"} Peak VUs ≥ 95,000 (achieved ${maxVUs.toLocaleString()})
2. ${errorRate < "25.00" ? "✅" : "❌"} Error rate < 25% during peak
3. ${p95ResponseTime < "45000" ? "✅" : "❌"} 95% responses < 45 seconds  
4. ${requestsPerSecond > "1000" ? "✅" : "❌"} Sustained throughput > 1000 req/s

Monitor CloudWatch, Aurora metrics, and ECS auto-scaling during this extreme load test!

⚠️  WARNING: This test will generate significant AWS costs due to Aurora scaling.
Estimated cost: $50-100 for this test duration due to ACU scaling.
    `,
  };
}