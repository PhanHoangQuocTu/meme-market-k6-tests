import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for timeout debugging
const timeoutDebugErrorRate = new Rate("timeout_debug_errors");
const timeoutDebugCallsCounter = new Counter("timeout_debug_calls_total");
const timeoutDebugResponseTime = new Trend("timeout_debug_response_time");

export const options: Options = {
  stages: [
    { duration: "30s", target: 10 }, // Very light load - just 10 VUs
    { duration: "1m", target: 10 },  // Hold steady
    { duration: "30s", target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<35000"], // Should be under ALB timeout (35s)
    http_req_failed: ["rate<0.05"], // Very low error rate expected
    timeout_debug_errors: ["rate<0.05"],
  },
};

const API_BASE_URL = "https://api-prod.mememarket.fun";
const WORKING_ENDPOINT = "/api/v1/prediction-markets";

export default function () {
  timeoutDebugCallsCounter.add(1);

  // Make a single request with detailed timing
  const endpoint = `${WORKING_ENDPOINT}?limit=10&page=1&t=${Date.now()}`;
  
  makeAPIRequest(endpoint, "Timeout Debug Test");
  
  // Short sleep between requests
  sleep(1); // 1 second sleep for debugging
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();
  
  console.log(`🚀 Starting request at ${new Date().toISOString()}: ${endpoint}`);
  
  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "40s", // Set timeout above ALB timeout to see what happens
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; k6-timeout-debug)",
      Connection: "keep-alive",
    },
  });

  trackResponse(res, startTime, label);
  return res;
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  timeoutDebugResponseTime.add(duration);

  // Log detailed response information
  console.log(`📊 Response received at ${new Date().toISOString()}:`);
  console.log(`   Status: ${res.status}`);
  console.log(`   Duration: ${duration}ms`);
  console.log(`   Body length: ${res.body ? res.body.length : 0} bytes`);
  
  if (res.status === 0) {
    console.log(`❌ TIMEOUT DETECTED at ${duration}ms - Status 0 indicates timeout`);
  }

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} response under 35s`]: (r) => duration < 35000,
    [`${label} response under 25s`]: (r) => duration < 25000,
    [`${label} response under 10s`]: (r) => duration < 10000,
  });

  if (!success || res.status !== 200) {
    timeoutDebugErrorRate.add(1);
    
    if (duration >= 9000 && duration <= 11000) {
      console.log(`🔍 SUSPICIOUS: Request took ~10 seconds (${duration}ms) - likely hitting a 10s timeout`);
    }
    
    if (res.status === 504) {
      console.log(`🔴 504 Gateway Timeout detected at ${duration}ms`);
    }
  } else {
    console.log(`✅ ${label} success - ${duration}ms`);
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.timeout_debug_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.timeout_debug_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.timeout_debug_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);

  return {
    "timeout-debug-results.json": JSON.stringify(data, null, 2),
    stdout: `
🔍 TIMEOUT DEBUG TEST COMPLETED!

📊 RESULTS SUMMARY:
• Total Requests: ${totalRequests}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms

🎯 TIMEOUT ANALYSIS:
• ALB Timeout: 35 seconds (configured)
• Application HTTP Timeout: 25 seconds (configured)
• K6 Request Timeout: 40 seconds (test setting)

🔍 KEY FINDINGS:
${errorRate > "5.00" ? "🔴 High error rate detected - investigate timeout layers" : "🟢 Low error rate - timeouts may be isolated to high load"}

Check the detailed logs above for specific timeout patterns.
If 504 Gateway Timeouts occur at ~10 seconds, this indicates a timeout layer between ALB and application.
    `,
  };
}