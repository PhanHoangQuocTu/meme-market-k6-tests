import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 30,
  duration: "30s",
  // iterations: 1000, // 1000 requests
};

export default function () {
  const now = new Date().toISOString();
  const res = http.get(
    "https://meme-market.var-meta.com/api/v1/prediction-markets/by-market-address/Bh8eYrbhMaKrjBwXoHfzQeWzLBddtQ1v2vZ4JCuw8Vug"
  );

  check(res, {
    "status is 200": (r) => {
      if (r.status !== 200) {
        console.log(
          `[${now} - API "/prediction-markets/by-market-address"] ❌ Status: ${r.status}`
        );
      } else {
        console.log(
          `[${now} - API "/prediction-markets/by-market-address"] ✅ Success`
        );
      }
      return r.status === 200;
    },
  });

  sleep(0.5);
}
