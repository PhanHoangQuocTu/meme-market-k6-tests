import http from "k6/http";
import { check } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 2000,
  duration: "2m",
  // iterations: 1000, // 1000 requests
};

export default function () {
  const now = new Date().toISOString();
  const res = http.get(
    "https://api-prod.mememarket.fun/api/v1/liquidity-rewards/week/1/stats?weekNumber=1"
  );

  check(res, {
    "status is 200": (r) => {
      if (r.status !== 200) {
        console.log(
          `[${now} - API "/liquidity-rewards/week/:weekNumber/stats"] ❌ Status: ${r.status}`
        );
      } else {
        console.log(
          `[${now} - API "/liquidity-rewards/week/:weekNumber/stats"] ✅ Success`
        );
      }
      return r.status === 200;
    },
  });
}
