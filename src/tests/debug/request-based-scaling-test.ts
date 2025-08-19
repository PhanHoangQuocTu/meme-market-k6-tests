import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for request-based scaling test
const requestScalingErrorRate = new Rate("request_scaling_errors");
const requestScalingCallsCounter = new Counter("request_scaling_calls_total");
const requestScalingResponseTime = new Trend("request_scaling_response_time");

export const options: Options = {
  stages: [
    { duration: "1m", target: 50 },    // 50 VUs should generate ~50 requests/target (won't trigger)
    { duration: "1m", target: 100 },   // 100 VUs should generate ~100 requests/target (trigger scaling)
    { duration: "2m", target: 200 },   // 200 VUs should generate ~200 requests/target (more scaling)
    { duration: "1m", target: 200 },   // Hold to verify scaling stability
    { duration: "1m", target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<25000"], // 25s threshold - should be much better now
    http_req_failed: ["rate<0.10"], // Allow 10% error rate during scaling
    request_scaling_errors: ["rate<0.10"],
  },
};

const API_BASE_URL = "https://api-prod.mememarket.fun";
const WORKING_ENDPOINT = "/api/v1/prediction-markets";

export default function () {
  requestScalingCallsCounter.add(1);

  // Make request to trigger request-based scaling
  const endpoint = `${WORKING_ENDPOINT}?limit=20&page=1&t=${Date.now()}&r=${Math.random()}`;
  
  makeAPIRequest(endpoint, "Request Scaling Test");
  
  // Consistent sleep for predictable request rate
  sleep(0.5); // 0.5 second sleep = ~2 requests per VU per minute
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();
  
  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "35s", // Match ALB timeout
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; k6-request-scaling-test)",
      Connection: "keep-alive",
    },
  });

  trackResponse(res, startTime, label);
  return res;
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  requestScalingResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} response under 25s`]: (r) => duration < 25000,
  });

  if (!success || res.status !== 200) {
    requestScalingErrorRate.add(1);
    
    // Log specific failure patterns
    if (duration >= 9500 && duration <= 10500) {
      console.log(`🔍 ~10s timeout detected: ${duration}ms, Status: ${res.status} (should NOT happen with request scaling)`);
    }
    
    if (res.status === 504) {
      console.log(`🔴 504 Gateway Timeout: ${duration}ms (SHOULD BE FIXED)`);
    }
    
    if (res.status === 0) {
      console.log(`❌ Request timeout: ${duration}ms`);
    }
  } else {
    // Log successful responses occasionally
    if (Math.random() < 0.02) { // 2% chance
      console.log(`✅ Success: ${duration}ms`);
    }
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.request_scaling_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.request_scaling_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.request_scaling_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);
  const maxResponseTime = (data.metrics.http_req_duration?.values?.max || 0).toFixed(2);

  return {
    "request-based-scaling-results.json": JSON.stringify(data, null, 2),
    stdout: `
🎯 REQUEST-BASED AUTO-SCALING TEST COMPLETED!

📊 PERFORMANCE SUMMARY:
• Total Requests: ${totalRequests.toLocaleString()}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms
• Max Response Time: ${maxResponseTime}ms

🚀 REQUEST-BASED SCALING ANALYSIS:
• Test Pattern: 50 → 100 → 200 VUs (gradual load increase)
• Scaling Trigger: 100 requests per target instance
• Expected Behavior: Auto-scaling at ~100 VUs (2 instances → 4+ instances)

${errorRate < "5.00" ? "🟢 Low error rate - request scaling working well!" : "🔴 High error rate - check scaling response"}
${p95ResponseTime < "15000" ? "🟢 Response times healthy" : "🔴 High response times - scaling may need tuning"}
${maxResponseTime < "30000" ? "🟢 No timeout issues detected" : "🔴 Timeout issues persist - investigate further"}

🎯 SUCCESS CRITERIA:
✅ Auto-scaling triggers when request load exceeds 100 per target
✅ No 10-second timeouts (I/O bound issue resolved)
✅ 504 Gateway Timeouts eliminated
✅ Response times remain under 25s during scaling

📈 NEXT STEPS:
Check AWS ECS Console to verify instances scaled from 2 → 4+ during peak load.
Monitor CloudWatch for request-based scaling events in auto-scaling activities.
    `,
  };
}