import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for health check validation test
const healthCheckValidationErrorRate = new Rate(
  "health_check_validation_errors"
);
const healthCheckValidationCallsCounter = new Counter(
  "health_check_validation_calls_total"
);
const healthCheckValidationResponseTime = new Trend(
  "health_check_validation_response_time"
);

export const options: Options = {
  stages: [
    // Controlled escalation to test health check resilience
    { duration: "30s", target: 200 }, // Start moderate
    { duration: "2m", target: 400 }, // Increase gradually to trigger scaling
    { duration: "2m", target: 600 }, // Push to moderate high load
    { duration: "1m", target: 600 }, // Hold to ensure instances stay healthy
    { duration: "30s", target: 0 }, // Gentle ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<25000"], // 25s threshold - should be under health check timeout (30s)
    http_req_failed: ["rate<0.10"], // Allow 10% error rate during scaling
    health_check_validation_errors: ["rate<0.10"],
  },
};

// Working API endpoint
const API_BASE_URL = "https://api-prod.mememarket.fun";
const WORKING_ENDPOINT = "/api/v1/prediction-markets";

// Moderate request patterns to avoid overwhelming
const REQUEST_PATTERNS = [
  "?limit=50&page=1",
  "?limit=50&page=2",
  "?limit=25&page=1",
  "?limit=30&page=1",
];

export default function () {
  healthCheckValidationCallsCounter.add(1);

  // Moderate pattern: 2 requests per VU to test health check resilience
  for (let i = 0; i < 2; i++) {
    // Randomize query parameters and add cache busting
    const pattern =
      REQUEST_PATTERNS[Math.floor(Math.random() * REQUEST_PATTERNS.length)];
    const timestamp = Date.now();
    const random = Math.random();
    const endpoint = `${WORKING_ENDPOINT}${pattern}&t=${timestamp}&r=${random}`;

    makeAPIRequest(endpoint, `Health Check Test ${i}`);

    // Moderate sleep to avoid overwhelming during health check validation
    sleep(0.1); // 100ms sleep
  }

  // Moderate sleep between iterations
  sleep(0.2); // 200ms sleep
}

function makeAPIRequest(endpoint: string, label: string) {
  const startTime = Date.now();
  const res = http.get(`${API_BASE_URL}${endpoint}`, {
    timeout: "35s", // Timeout above health check timeout (30s) to allow for processing
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; k6-health-check-validation)",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
  });

  trackResponse(res, startTime, label);
  return res;
}

function trackResponse(res: any, startTime: number, label: string) {
  const duration = Date.now() - startTime;
  healthCheckValidationResponseTime.add(duration);

  const success = check(res, {
    [`${label} status OK`]: (r) => r.status === 200,
    [`${label} not timeout`]: (r) => r.status !== 0,
    [`${label} has data`]: (r) => r.body && r.body.length > 100,
    [`${label} response under health check timeout`]: (r) => duration < 30000, // Must be under 30s (health check timeout)
  });

  if (!success || res.status !== 200) {
    healthCheckValidationErrorRate.add(1);
    console.log(
      `❌ ${label} failed - Status: ${res.status}, Time: ${duration}ms`
    );
  } else {
    // Log occasionally to monitor progress
    if (Math.random() < 0.02) {
      // 2% chance to log success
      console.log(
        `✅ ${label} success - Status: ${res.status}, Time: ${duration}ms, Size: ${res.body.length} bytes`
      );
    }
  }

  // Handle rate limiting with longer sleep
  if (res.status === 429) {
    sleep(0.1);
  }
}

export function handleSummary(data: any) {
  const totalRequests =
    data.metrics.health_check_validation_calls_total?.values?.count || 0;
  const errorRate = (
    data.metrics.health_check_validation_errors?.values?.rate * 100 || 0
  ).toFixed(2);
  const avgResponseTime = (
    data.metrics.health_check_validation_response_time?.values?.avg || 0
  ).toFixed(2);
  const p95ResponseTime = (
    data.metrics.http_req_duration?.values?.["p(95)"] || 0
  ).toFixed(2);
  const requestsPerSecond = (totalRequests / 330).toFixed(2); // 5.5 minutes test

  return {
    "health-check-validation-results.json": JSON.stringify(data, null, 2),
    stdout: `
🔧 HEALTH CHECK VALIDATION TEST COMPLETED!

📊 PERFORMANCE SUMMARY:
• Total Requests: ${totalRequests.toLocaleString()}
• Requests/Second: ${requestsPerSecond}
• Error Rate: ${errorRate}%
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile Response Time: ${p95ResponseTime}ms

🎯 HEALTH CHECK VALIDATION:
• Test Focus: Moderate load to trigger scaling without overwhelming health checks
• Health Check Timeout: 30 seconds (configured)
• Health Check Interval: 45 seconds (configured)
• Unhealthy Threshold: 8 failures = 6 minutes before termination

✅ EXPECTED RESULTS:
${
  errorRate < "10.00"
    ? "🟢 Health check validation successful!"
    : "🔴 High error rate - health checks may be failing"
}
${
  avgResponseTime < "15000"
    ? "🟢 Response times healthy"
    : "🔴 High response times - check health check configuration"
}
${
  p95ResponseTime < "25000"
    ? "🟢 95% of responses under health check timeout"
    : "🔴 Some responses exceed health check timeout"
}

📈 SCALING VALIDATION:
Current instances should scale up gradually during the test without any instances being terminated due to health check failures.

🎯 SUCCESS CRITERIA:
1. ✅ Instances scale up when load increases
2. ✅ No instances terminated due to health check failures
3. ✅ All instances remain healthy throughout scaling events
4. ✅ Response times stay within health check timeout (30s)

Monitor AWS ECS Console and CloudWatch metrics during this test to verify scaling behavior.
    `,
  };
}
