// src/test.ts
import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 5000,
  duration: "1m",
};

export default function () {
  const now = new Date().toISOString();
  const res = http.get(`${process.env.API_URL}/prediction-markets`);

  check(res, {
    "status is 200": (r) => {
      if (r.status !== 200) {
        console.log(`[${now}] ❌ Status: ${r.status}`);
      } else {
        console.log(`[${now}] ✅ Success`);
      }
      return r.status === 200;
    },
  });

  sleep(0.5);
}
