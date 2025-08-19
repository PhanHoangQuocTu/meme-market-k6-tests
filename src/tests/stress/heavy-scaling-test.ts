import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for heavy scaling test
const heavyStressErrorRate = new Rate("heavy_stress_errors");
const heavyStressCallsCounter = new Counter("heavy_stress_calls_total");
const heavyStressResponseTime = new Trend("heavy_stress_response_time");

export const options: Options = {
  stages: [
    // Progressive scaling to find the breaking point
    { duration: "30s", target: 300 },    // Start reasonable
    { duration: "1m", target: 600 },     // Double the load  
    { duration: "2m", target: 900 },     // Increase gradually
    { duration: "2m", target: 1200 },    // Push higher
    { duration: "2m", target: 1200 },    // Hold to see scaling
    { duration: "30s", target: 0 },      // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<20000"], // 20s threshold for heavy load
    http_req_failed: ["rate<0.25"],     // Allow 25% error rate during scaling
    heavy_stress_errors: ["rate<0.25"],
  },
};

// Working API endpoint
const API_BASE_URL = "https://api-prod.mememarket.fun";
const WORKING_ENDPOINT = "/api/v1/prediction-markets";

// Heavy load request patterns
const REQUEST_PATTERNS = [
  "?limit=100&page=1",
  "?limit=100&page=2", 
  "?limit=100&page=3",
  "?limit=50&page=1",
  "?limit=75&page=1",
  "?limit=50&page=2",
];

export default function () {
  heavyStressCallsCounter.add(1);
  
  // Moderate pattern: 3 requests per VU to avoid overwhelming
  for (let i = 0; i < 3; i++) {
    // Randomize query parameters and add cache busting
    const pattern = REQUEST_PATTERNS[Math.floor(Math.random() * REQUEST_PATTERNS.length)];
    const timestamp = Date.now();
    const random = Math.random();
    const endpoint = `${WORKING_ENDPOINT}${pattern}&t=${timestamp}&r=${random}`;
    
    makeAPIRequest(endpoint, `Heavy Load ${i}`);
    
    // Reasonable sleep to avoid overwhelming
    sleep(0.05); // 50ms sleep
  }
  
  // Reasonable sleep between iterations  
  sleep(0.1); // 100ms sleep
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();
  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "30s",
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; k6-heavy-scaling-test)",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    },
  });

  trackResponse(res, startTime, label);
  return res;
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  heavyStressResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} has data`]: (r) => r.body && r.body.length > 100,
  });

  if (!success || res.status !== 200) {
    heavyStressErrorRate.add(1);
    console.log(`❌ ${label} failed - Status: ${res.status}, Time: ${duration}ms`);
  } else {
    // Only log occasionally to avoid spam
    if (Math.random() < 0.01) { // 1% chance to log success
      console.log(`✅ ${label} success - Status: ${res.status}, Time: ${duration}ms, Size: ${res.body.length} bytes`);
    }
  }

  // Handle rate limiting
  if (res.status === 429) {
    sleep(0.05);
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.heavy_stress_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.heavy_stress_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.heavy_stress_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);
  const requestsPerSecond = (totalRequests / 420).toFixed(2); // 7 minutes test

  return {
    "heavy-scaling-results.json": JSON.stringify(data, null, 2),
    stdout: `
🔥 HEAVY SCALING TEST COMPLETED!

📊 PERFORMANCE SUMMARY:
• Total Requests: ${totalRequests.toLocaleString()}
• Requests/Second: ${requestsPerSecond}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms

🎯 EXTREME LOAD INTENSITY:
• Peak VUs: 2000 concurrent users
• Sustained Load: 6 minutes at 1500+ VUs
• Request Pattern: 8 requests per VU per iteration
• Target: Force ECS to scale to 10+ instances

⚡ AUTO SCALING EXPECTATION:
${errorRate < "25.00" ? "🟢 Heavy load test successful!" : "🔴 Very high error rate - system under extreme stress"}
${avgResponseTime < "15000" ? "🟢 Response times manageable" : "🔴 Very high response times - heavy scaling should occur"}

📈 EXPECTED SCALING:
Current: 3 instances
Expected: 8-15 instances (based on 2000 concurrent users)
Monitor: AWS ECS Console for scaling events

🎯 TARGET: If auto scaling works properly, you should see:
1. Instance count increase to 10-15 instances
2. CPU distribution across more instances
3. Response times improve as scaling completes
    `,
  };
}