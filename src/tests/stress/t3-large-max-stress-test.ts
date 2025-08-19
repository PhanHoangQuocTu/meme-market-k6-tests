import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";
import { Rate, Counter, Trend } from "k6/metrics";

// Custom metrics for t3.large stress test
const stressErrorRate = new Rate("stress_errors");
const stressCallsCounter = new Counter("stress_calls_total");
const stressResponseTime = new Trend("stress_response_time");

export const options: Options = {
  // Optimized for t3.large (2 vCPUs, 8GB RAM)
  // Max ~1,500 VUs to avoid OOM, focus on request volume
  stages: [
    { duration: "1m", target: 200 }, // Gradual warmup
    { duration: "2m", target: 800 }, // Ramp to moderate load
    { duration: "3m", target: 1200 }, // Peak sustainable load
    { duration: "5m", target: 1500 }, // Max VUs for t3.large
    { duration: "3m", target: 1200 }, // Sustain high load
    { duration: "2m", target: 400 }, // Cool down
    { duration: "1m", target: 0 }, // Ramp down
  ],
  thresholds: {
    // Aggressive thresholds for stress testing
    http_req_duration: ["p(95)<15000"], // 15s max response time
    http_req_failed: ["rate<0.20"], // Allow 20% failure during stress
    stress_errors: ["rate<0.20"], // Same tolerance
    http_reqs: ["rate>300"], // Ensure high request volume
  },
  // Optimize for maximum throughput
  batch: 20, // Batch requests for efficiency
  batchPerHost: 10, // Limit per host to prevent connection exhaustion
  rps: 2000, // Cap at 2000 RPS to prevent overload
};

// Production API endpoints with different load characteristics
const API_BASE_URL = "https://api-prod.mememarket.fun";

// High-frequency endpoints for stress testing
const STRESS_ENDPOINTS = [
  // Fast endpoints (should handle high load)
  {
    url: "/api/v1/prediction-markets?limit=10&page=1",
    weight: 0.4,
    name: "markets_light",
    expected_ms: 2000,
  },
  {
    url: "/api/v1/prediction-markets?limit=20&page=1",
    weight: 0.25,
    name: "markets_medium",
    expected_ms: 3000,
  },
  // More expensive endpoints (fewer requests)
  {
    url: "/api/v1/prediction-markets?limit=50&page=1",
    weight: 0.15,
    name: "markets_heavy",
    expected_ms: 5000,
  },
  {
    url: "/api/v1/prediction-activities?limit=20&page=1",
    weight: 0.1,
    name: "activities",
    expected_ms: 4000,
  },
  {
    url: "/api/v1/prediction-bets?limit=20&page=1",
    weight: 0.1,
    name: "bets",
    expected_ms: 4000,
  },
];

export default function () {
  stressCallsCounter.add(1);

  // Select endpoint based on weight (favor lighter endpoints)
  const endpoint = selectEndpoint();

  // Add cache busting and randomization
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const finalUrl = `${API_BASE_URL}${endpoint.url}&t=${timestamp}&r=${random}`;

  const startTime = Date.now();

  // Optimized headers for maximum throughput
  const headers = {
    Accept: "application/json",
    Connection: "keep-alive",
    "User-Agent": "k6-stress-test/1.0",
    // Remove unnecessary headers to reduce overhead
  };

  const res = http.get(finalUrl, {
    timeout: "20s", // Shorter timeout for stress testing
    headers,
  });

  const duration = Date.now() - startTime;
  stressResponseTime.add(duration);

  // Minimal validation for performance
  const success = check(res, {
    [`${endpoint.name} status OK`]: (r) => r.status === 200,
    [`${endpoint.name} not timeout`]: (r) => r.status !== 0,
    [`${endpoint.name} under expected time`]: (r) =>
      duration < endpoint.expected_ms,
  });

  if (!success || res.status !== 200) {
    stressErrorRate.add(1);

    // Log critical errors only
    if (res.status >= 500 || res.status === 0) {
      console.log(
        `🚨 ${endpoint.name} FAIL - Status: ${res.status}, Time: ${duration}ms`
      );
    }
  }

  // Minimal sleep to maximize request rate
  // Vary sleep based on endpoint weight (lighter = faster requests)
  const sleepTime = endpoint.weight > 0.3 ? 0.1 : 0.2; // 100-200ms
  sleep(sleepTime + Math.random() * 0.1); // Add small jitter
}

function selectEndpoint() {
  const random = Math.random();
  let cumulativeWeight = 0;

  for (const endpoint of STRESS_ENDPOINTS) {
    cumulativeWeight += endpoint.weight;
    if (random <= cumulativeWeight) {
      return endpoint;
    }
  }

  return STRESS_ENDPOINTS[0]; // fallback
}

export function handleSummary(data: any) {
  const totalRequests = data.metrics.stress_calls_total?.values?.count || 0;
  const errorRate = (
    data.metrics.stress_errors?.values?.rate * 100 || 0
  ).toFixed(2);
  const avgResponseTime = (
    data.metrics.stress_response_time?.values?.avg || 0
  ).toFixed(2);
  const p95ResponseTime = (
    data.metrics.http_req_duration?.values?.["p(95)"] || 0
  ).toFixed(2);
  const p99ResponseTime = (
    data.metrics.http_req_duration?.values?.["p(99)"] || 0
  ).toFixed(2);
  const requestsPerSecond = (data.metrics.http_reqs?.values?.rate || 0).toFixed(
    2
  );
  const maxVUs = Math.max(
    ...(data.metrics.vus?.values ? Object.values(data.metrics.vus.values) : [0])
  );

  return {
    "t3-large-stress-results.json": JSON.stringify(data, null, 2),
    stdout: `
🔥 T3.LARGE MAXIMUM STRESS TEST COMPLETED!

💻 MACHINE CAPACITY ANALYSIS:
• Total Requests: ${totalRequests.toLocaleString()}
• Peak Concurrent VUs: ${maxVUs.toLocaleString()}
• Average RPS: ${requestsPerSecond}
• Test Duration: ~17 minutes
• Machine Utilization: t3.large (2 vCPUs, 8GB RAM)

⚡ PERFORMANCE UNDER STRESS:
• Error Rate: ${errorRate}% ${parseFloat(errorRate) < 15 ? "🟢" : "🔴"}
• Average Response Time: ${avgResponseTime}ms
• 95th Percentile: ${p95ResponseTime}ms ${
      parseFloat(p95ResponseTime) < 15000 ? "🟢" : "🔴"
    }
• 99th Percentile: ${p99ResponseTime}ms

🎯 STRESS TEST RESULTS:
${
  parseFloat(errorRate) < 20 ? "🟢" : "🔴"
} Error Rate Target (< 20%): ${errorRate}%
${
  parseFloat(p95ResponseTime) < 15000 ? "🟢" : "🔴"
} Response Time Target (< 15s): ${p95ResponseTime}ms
${
  parseFloat(requestsPerSecond) > 300 ? "🟢" : "🔴"
} Throughput Target (> 300 RPS): ${requestsPerSecond} RPS
${maxVUs >= 1400 ? "🟢" : "🔴"} VU Capacity Target (> 1400 VUs): ${maxVUs} VUs

📊 SERVER STRESS ASSESSMENT:
• Request Volume Generated: ${totalRequests.toLocaleString()} total requests
• Peak Load Sustained: ${maxVUs} concurrent users for 5+ minutes
• Network Throughput: ~${(parseFloat(requestsPerSecond) * 0.5).toFixed(
      0
    )} KB/s estimated
• Connection Pool Stress: High (1,500 concurrent connections)

🚀 PRODUCTION READINESS:
${
  parseFloat(errorRate) < 10 && parseFloat(p95ResponseTime) < 10000
    ? "🟢 EXCELLENT - Server handles t3.large max load beautifully"
    : parseFloat(errorRate) < 20 && parseFloat(p95ResponseTime) < 15000
    ? "🟡 GOOD - Server handles stress with acceptable degradation"
    : "🔴 NEEDS OPTIMIZATION - Server struggles under maximum t3.large load"
}

💡 SCALING INSIGHTS:
• Max sustainable VUs on t3.large: ${maxVUs}
• Recommended production buffer: ${Math.floor(maxVUs * 0.7)} VUs (70% capacity)
• Bottleneck indicators: ${
      parseFloat(errorRate) > 15
        ? "High error rate suggests server limits"
        : "Client machine likely bottleneck"
    }

⚠️ MACHINE PERFORMANCE:
${
  maxVUs < 1000
    ? "🔴 OOM Risk - Consider reducing VUs or upgrading instance"
    : maxVUs < 1400
    ? "🟡 Near Limits - Monitor memory usage"
    : "🟢 Good Capacity - t3.large handling load well"
}

This test maximizes request volume from your t3.large instance to stress your production server.
Monitor server metrics (CPU, memory, DB connections) during this test for complete analysis.
    `,
  };
}
