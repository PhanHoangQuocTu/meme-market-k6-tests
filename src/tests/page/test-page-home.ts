import http from "k6/http";
import { check } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 1000, // Start with just 10 users to test
  duration: "2m", // Short duration for verification
  // iterations: 1000, // 1000 requests
};

export default function () {
  const now = new Date().toISOString();

  // Test API endpoint (direct to ALB, no WAF)
  const apiRes = http.get("https://trade.mememarket.fun/k6-test", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    },
  });

  check(apiRes, {
    "API status is OK": (r) => {
      if (r.status !== 200 && r.status !== 401) {
        console.log(
          `[${now} - API] ❌ Status: ${r.status}, URL: ${r.url}`,
          r.html
        );
      } else {
        console.log(`[${now} - API] ✅ Success - Status: ${r.status}`);
      }
      return r.status === 200 || r.status === 401; // 401 is OK for auth endpoints
    },
    "API response time < 5000ms": (r) => r.timings.duration < 5000,
  });
}
