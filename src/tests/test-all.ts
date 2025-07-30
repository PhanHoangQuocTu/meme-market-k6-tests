// page
import homePage from "./page/test-page-home.ts";
import marketPage from "./page/test-page-market.ts";
import marketHistoryPage from "./page/test-page-market-history.ts";
import activityPage from "./page/test-page-activity.ts";
// api
import apiMarkets from "./api/test-api-prediction-markets.ts";
import apiActivities from "./api/test-api-prediction-activities.ts";
import apiPredictionBets from "./api/test-api-prediction-bets.ts";
import apiPredictionMarketsHistory from "./api/test-api-prediction-markets-history.ts";
import apiPredictionMarketsByMarketAddress from "./api/test-api-prediction-markets-by-market-address.ts";
import apiTopBetVolume from "./api/test-api-top-bet-volume.ts";
import { Options } from "k6/options";

export const options: Options = {
  vus: 30,
  duration: "30s",
};

export default function () {
  // Page
  homePage();
  marketPage();
  marketHistoryPage();
  activityPage();

  // API
  apiMarkets();
  apiActivities();
  apiPredictionBets();
  apiPredictionMarketsHistory();
  apiPredictionMarketsByMarketAddress();
  apiTopBetVolume();
}
