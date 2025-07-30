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
    "https://meme-market.var-meta.com/api/v1/prediction-bets/top-bet-volumes"
  );

  check(res, {
    "status is 200": (r) => {
      if (r.status !== 200) {
        console.log(
          `[${now} - API "/prediction-bets/top-bet-volumes"] ❌ Status: ${r.status}`
        );
      } else {
        console.log(
          `[${now} - API "/prediction-bets/top-bet-volumes"] ✅ Success`
        );
      }
      return r.status === 200;
    },
  });

  sleep(0.5);
}
