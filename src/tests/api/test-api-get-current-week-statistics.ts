import http from "k6/http";
import { check } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 10,
  duration: "10s",
  // iterations: 1000, // 1000 requests
};

export default function () {
  const now = new Date().toISOString();
  const res = http.get(
    "https://meme-market.var-meta.com/api/v1/liquidity-rewards/current-week/stats"
  );

  check(res, {
    "status is 200": (r) => {
      if (r.status !== 200) {
        console.log(
          `[${now} - API "/liquidity-rewards/current-week/stats"] ❌ Status: ${r.status}`
        );
      } else {
        console.log(
          `[${now} - API "/liquidity-rewards/current-week/stats"] ✅ Success`
        );
      }
      return r.status === 200;
    },
  });
}
