import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for medium load testing
const mediumLoadErrorRate = new Rate("medium_load_errors");
const mediumLoadCallsCounter = new Counter("medium_load_calls_total");
const mediumLoadResponseTime = new Trend("medium_load_response_time");

export const options: Options = {
  stages: [
    { duration: "1m", target: 50 },   // Ramp to 50 VUs
    { duration: "2m", target: 100 },  // Ramp to 100 VUs - should trigger scaling
    { duration: "2m", target: 150 },  // Ramp to 150 VUs - should trigger more scaling
    { duration: "1m", target: 150 },  // Hold at 150 VUs
    { duration: "1m", target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<30000"], // 30s threshold
    http_req_failed: ["rate<0.15"], // Allow 15% error rate during scaling
    medium_load_errors: ["rate<0.15"],
  },
};

const API_BASE_URL = "https://api-prod.mememarket.fun";
const WORKING_ENDPOINT = "/api/v1/prediction-markets";

export default function () {
  mediumLoadCallsCounter.add(1);

  // Make request with timing
  const endpoint = `${WORKING_ENDPOINT}?limit=20&page=1&t=${Date.now()}&r=${Math.random()}`;
  
  makeAPIRequest(endpoint, "Medium Load Test");
  
  // Variable sleep for more realistic load
  sleep(Math.random() * 0.5 + 0.2); // 0.2-0.7 seconds
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();
  
  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "35s", // Match ALB timeout
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; k6-medium-load-test)",
      Connection: "keep-alive",
    },
  });

  trackResponse(res, startTime, label);
  return res;
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  mediumLoadResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} response under 30s`]: (r) => duration < 30000,
  });

  if (!success || res.status !== 200) {
    mediumLoadErrorRate.add(1);
    
    // Log failures for analysis
    if (duration >= 9500 && duration <= 10500) {
      console.log(`🔍 ~10s timeout detected: ${duration}ms, Status: ${res.status}`);
    }
    
    if (res.status === 504) {
      console.log(`🔴 504 Gateway Timeout: ${duration}ms`);
    }
    
    if (res.status === 0) {
      console.log(`❌ Request timeout: ${duration}ms`);
    }
  } else {
    // Log successful responses occasionally
    if (Math.random() < 0.01) { // 1% chance
      console.log(`✅ Success: ${duration}ms`);
    }
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.medium_load_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.medium_load_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.medium_load_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);
  const maxResponseTime = (data.metrics.http_req_duration?.values?.max || 0).toFixed(2);

  return {
    "medium-load-auto-scaling-results.json": JSON.stringify(data, null, 2),
    stdout: `
🧪 MEDIUM LOAD AUTO-SCALING TEST COMPLETED!

📊 PERFORMANCE SUMMARY:
• Total Requests: ${totalRequests.toLocaleString()}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms
• Max Response Time: ${maxResponseTime}ms

🎯 AUTO-SCALING ANALYSIS:
• Target Load: 50 → 100 → 150 VUs
• Expected Behavior: Auto-scaling should trigger at 40% CPU
• Expected Instances: Should scale from 2 → 4-6 instances

${errorRate > "10.00" ? "🔴 High error rate - check auto-scaling response" : "🟢 Acceptable error rate during scaling"}
${p95ResponseTime > "25000" ? "🔴 High response times - possible resource exhaustion" : "🟢 Response times within acceptable range"}

🔍 KEY FINDINGS:
Check AWS ECS Console to verify if auto-scaling triggered properly.
Monitor for 10-second timeout patterns indicating resource exhaustion.
    `,
  };
}