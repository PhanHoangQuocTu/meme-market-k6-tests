import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for aggressive scaling test
const aggressiveScalingErrorRate = new Rate("aggressive_scaling_errors");
const aggressiveScalingCallsCounter = new Counter("aggressive_scaling_calls_total");
const aggressiveScalingResponseTime = new Trend("aggressive_scaling_response_time");

export const options: Options = {
  stages: [
    // AGGRESSIVE LOAD to trigger request-based scaling
    { duration: "30s", target: 50 },   // Warm up
    { duration: "1m", target: 150 },   // 150 VUs = ~300 requests/min = 150 requests/target (2 instances)
    { duration: "2m", target: 300 },   // 300 VUs = ~600 requests/min = 300 requests/target → FORCE SCALING
    { duration: "2m", target: 400 },   // 400 VUs = ~800 requests/min = Maintain heavy load
    { duration: "1m", target: 400 },   // Hold peak to verify scaling stability
    { duration: "1m", target: 0 },     // Gentle ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<30000"], // 30s threshold - allow for scaling time
    http_req_failed: ["rate<0.15"], // Allow 15% error rate during heavy scaling
    aggressive_scaling_errors: ["rate<0.15"],
  },
};

const API_BASE_URL = "https://api-prod.mememarket.fun";
const WORKING_ENDPOINT = "/api/v1/prediction-markets";

export default function () {
  aggressiveScalingCallsCounter.add(1);

  // High-frequency requests to maximize RequestCountPerTarget
  const endpoint = `${WORKING_ENDPOINT}?limit=10&page=1&t=${Date.now()}&r=${Math.random()}`;
  
  makeAPIRequest(endpoint, "Aggressive Scaling Test");
  
  // Short sleep for maximum request rate
  sleep(0.2); // 0.2 seconds = 5 requests per VU per minute = VERY AGGRESSIVE
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();
  
  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "35s", // Match ALB timeout
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; k6-aggressive-scaling-test)",
      Connection: "keep-alive",
    },
  });

  trackResponse(res, startTime, label);
  return res;
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  aggressiveScalingResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} response under 30s`]: (r) => duration < 30000,
  });

  if (!success || res.status !== 200) {
    aggressiveScalingErrorRate.add(1);
    
    // Log critical failure patterns
    if (duration >= 9500 && duration <= 10500) {
      console.log(`🚨 CRITICAL: 10s timeout detected: ${duration}ms, Status: ${res.status} - DB CONNECTION ISSUE`);
    }
    
    if (res.status === 504) {
      console.log(`🔴 504 Gateway Timeout: ${duration}ms - SCALING NOT FAST ENOUGH`);
    }
    
    if (res.status === 0) {
      console.log(`❌ Request timeout: ${duration}ms - SYSTEM OVERLOAD`);
    }
  } else {
    // Log successful responses occasionally
    if (Math.random() < 0.005) { // 0.5% chance - reduce spam during high load
      console.log(`✅ Success: ${duration}ms`);
    }
  }
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.aggressive_scaling_calls_total?.values?.count || 0;
  const errorRate = (data.metrics.aggressive_scaling_errors?.values?.rate * 100 || 0).toFixed(2);
  const avgResponseTime = (data.metrics.aggressive_scaling_response_time?.values?.avg || 0).toFixed(2);
  const p95ResponseTime = (data.metrics.http_req_duration?.values?.["p(95)"] || 0).toFixed(2);
  const maxResponseTime = (data.metrics.http_req_duration?.values?.max || 0).toFixed(2);
  const requestsPerSecond = (totalRequests / 420).toFixed(2); // 7 minutes test

  return {
    "aggressive-request-scaling-results.json": JSON.stringify(data, null, 2),
    stdout: `
🚀 AGGRESSIVE REQUEST-BASED SCALING TEST COMPLETED!

📊 PERFORMANCE SUMMARY:
• Total Requests: ${totalRequests.toLocaleString()}
• Requests/Second: ${requestsPerSecond}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms
• Max Response Time: ${maxResponseTime}ms

🎯 SCALING TRIGGER ANALYSIS:
• Peak Load: 400 VUs × 5 req/min = 2,000 requests/minute
• Expected RequestCountPerTarget: 1,000 per target (2 instances)
• Scaling Threshold: 100 requests/target
• Expected Result: 1,000 >> 100 → IMMEDIATE SCALING TO ~20 INSTANCES

📈 SCALING SUCCESS CRITERIA:
${errorRate < "10.00" ? "🟢 Low error rate - auto-scaling handled load well" : "🔴 High error rate - scaling may need adjustment"}
${p95ResponseTime < "20000" ? "🟢 Response times healthy during scaling" : "🔴 High response times - check scaling speed"}
${maxResponseTime < "35000" ? "🟢 No ALB timeout issues" : "🔴 ALB timeout issues detected"}

🔍 EXPECTED BEHAVIOR:
• Auto-scaling should trigger within 1-2 minutes of load spike
• Instance count should increase from 2 → 10+ instances
• RequestCountPerTarget should stabilize around 100
• No 10-second timeouts or 504 errors should occur

⚠️  MONITOR AWS ECS CONSOLE DURING TEST:
Watch the service scale in real-time as RequestCountPerTarget exceeds threshold!
    `,
  };
}