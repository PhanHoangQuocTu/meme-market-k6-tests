import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  stages: [
    { duration: "30s", target: 2000 },  // Ramp up to 2K users
    { duration: "1m", target: 5000 },   // Peak at 5K users  
    { duration: "30s", target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_failed: ["rate<0.10"],     // Less than 10% failure rate
    http_req_duration: ["p(95)<30000"], // 95% under 30 seconds
  },
};

export default function () {
  const res = http.get(
    "https://api-prod.mememarket.fun/api/v1/prediction-markets/simple",
    {
      timeout: "30s",
      tags: { name: "prediction-markets-simple" },
    }
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 30s": (r) => r.timings.duration < 30000,
    "has response body": (r) => r.body && r.body.length > 100,
  });

  // Realistic user think time
  sleep(0.5 + Math.random() * 2); // 0.5-2.5 seconds between requests
}
