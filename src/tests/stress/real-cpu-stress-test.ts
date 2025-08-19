import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for CPU stress test
const cpuStressErrorRate = new Rate("cpu_stress_errors");
const cpuStressCallsCounter = new Counter("cpu_stress_calls_total");
const cpuStressResponseTime = new Trend("cpu_stress_response_time");

export const options: Options = {
  stages: [
    // Aggressive ramp-up to push CPU above 60%
    { duration: "15s", target: 200 },   // Quick ramp to 200 VUs
    { duration: "30s", target: 500 },   // Push to 500 VUs
    { duration: "4m", target: 800 },    // Sustain 800 VUs for 4 minutes
    { duration: "30s", target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<15000"], // 15s threshold for high load
    http_req_failed: ["rate<0.20"],     // Allow 20% error rate during heavy load
    cpu_stress_errors: ["rate<0.20"],
  },
};

// Working API endpoint that processes real data
const API_BASE_URL = "https://api-prod.mememarket.fun";
const WORKING_ENDPOINT = "/api/v1/prediction-markets";

// CPU-intensive request patterns
const REQUEST_PATTERNS = [
  "?limit=50&page=1",
  "?limit=100&page=1", 
  "?limit=50&page=2",
  "?limit=75&page=1",
  "?limit=100&page=2",
];

export default function () {
  cpuStressCallsCounter.add(1);
  
  // Aggressive pattern: Multiple rapid requests per VU
  for (let i = 0; i < 5; i++) {
    // Randomize query parameters to prevent caching
    const pattern = REQUEST_PATTERNS[Math.floor(Math.random() * REQUEST_PATTERNS.length)];
    const timestamp = Date.now();
    const endpoint = `${WORKING_ENDPOINT}${pattern}&t=${timestamp}`;
    
    makeAPIRequest(endpoint, `CPU Load ${i}`);
    
    // Very minimal sleep to maintain pressure
    sleep(0.02); // 20ms sleep
  }
  
  // Short sleep between iterations to maintain constant CPU pressure
  sleep(0.05); // 50ms sleep
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();
  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "30s",
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; k6-cpu-stress-test)",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache",
    },
  });

  trackResponse(res, startTime, label);
  return res;
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  cpuStressResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} has data`]: (r) => r.body && r.body.length > 100,
  });

  if (!success || res.status !== 200) {
    cpuStressErrorRate.add(1);
    console.log(`❌ ${label} failed - Status: ${res.status}, Time: ${duration}ms`);
  } else {
    console.log(`✅ ${label} success - Status: ${res.status}, Time: ${duration}ms, Size: ${res.body.length} bytes`);
  }

  // Handle rate limiting gracefully
  if (res.status === 429) {
    sleep(0.1);
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.cpu_stress_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.cpu_stress_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.cpu_stress_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);
  const requestsPerSecond = (totalRequests / 270).toFixed(2); // 4.5 minutes test

  return {
    "cpu-stress-results.json": JSON.stringify(data, null, 2),
    stdout: `
🔥 CPU STRESS TEST COMPLETED!

📊 PERFORMANCE SUMMARY:
• Total Requests: ${totalRequests.toLocaleString()}
• Requests/Second: ${requestsPerSecond}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms

🎯 LOAD INTENSITY:
• Peak VUs: 800 concurrent users
• Sustained Load: 4 minutes at 800 VUs
• Request Pattern: 5 requests per VU per iteration
• Target: Push ECS CPU above 60% for auto scaling

⚡ AUTO SCALING STATUS:
${errorRate < "20.00" ? "🟢 Load test successful!" : "🔴 High error rate - API under stress"}
${avgResponseTime < "10000" ? "🟢 Response times acceptable" : "🟡 High response times - scaling may be occurring"}

📈 NEXT: Check AWS Console for:
1. ECS Service desired count increase (2 → 3 → 4+)
2. CloudWatch CPU metrics above 60%
3. Auto scaling activities in Application Auto Scaling
    `,
  };
}