import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 30,
  duration: "30s",
};

export default function () {
  const now = new Date().toISOString();
  const res = http.get("https://dev.mememarket.fun/market/history");

  check(res, {
    "status is 200": (r) => {
      if (r.status !== 200) {
        console.log(`[${now} - Page Market History] ❌ Status: ${r.status}`);
      } else {
        console.log(`[${now} - Page Market History] ✅ Success`);
      }
      return r.status === 200;
    },
  });

  sleep(0.5);
}
