import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 30,
  duration: "30s",
};

export default function () {
  const now = new Date().toISOString();
  // marketId: "Bh8eYrbhMaKrjBwXoHfzQeWzLBddtQ1v2vZ4JCuw8Vug"
  const res = http.get(
    "https://dev.mememarket.fun/market/Bh8eYrbhMaKrjBwXoHfzQeWzLBddtQ1v2vZ4JCuw8Vug"
  );

  check(res, {
    "status is 200": (r) => {
      if (r.status !== 200) {
        console.log(`[${now} - Page Market] ❌ Status: ${r.status}`);
      } else {
        console.log(`[${now} - Page Market] ✅ Success`);
      }
      return r.status === 200;
    },
  });

  sleep(0.5);
}
