import http from "k6/http";
import { check } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 20,
  duration: "10s",
};

export default function () {
  const now = new Date().toISOString();
  const res = http.get(
    "https://dev.mememarket.fun/market/X3ZXxSFtuxtsnnKvxayYV99JASPamBFfWo8Tk8LJ5ie"
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
}
