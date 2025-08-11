# scripts

<!-- website -->
<!-- home -->
k6 run src/tests/page/test-page-home.ts | tee "src/logs/page/test-page-home-$(date +%Y%m%d-%H%M%S).txt"
<!-- market -->
k6 run src/tests/page/test-page-market.ts | tee "src/logs/page/test-page-market-$(date +%Y%m%d-%H%M%S).txt"
<!-- market history -->
k6 run src/tests/page/test-page-market-history.ts | tee "src/logs/page/test-page-market-history-$(date +%Y%m%d-%H%M%S).txt"
<!-- activity -->
k6 run src/tests/page/test-page-activity.ts | tee "src/logs/page/test-page-activity-$(date +%Y%m%d-%H%M%S).txt"


<!-- api -->
<!-- prediction markets -->
k6 run src/tests/api/test-api-prediction-markets.ts | tee "src/logs/api/test-api-prediction-markets-$(date +%Y%m%d-%H%M%S).txt"
<!-- prediction activities -->
k6 run src/tests/api/test-api-prediction-activities.ts | tee "src/logs/api/test-api-prediction-activities-$(date +%Y%m%d-%H%M%S).txt"
<!-- prediction bets -->
k6 run src/tests/api/test-api-prediction-bets.ts | tee "src/logs/api/test-api-prediction-bets-$(date +%Y%m%d-%H%M%S).txt"
<!-- top bet volume -->
k6 run src/tests/api/test-api-top-bet-volume.ts | tee "src/logs/api/test-api-top-bet-volume-$(date +%Y%m%d-%H%M%S).txt"
<!-- prediction markets by market address -->
k6 run src/tests/api/test-api-prediction-markets-by-market-address.ts | tee "src/logs/api/test-api-prediction-markets-by-market-address-$(date +%Y%m%d-%H%M%S).txt"
<!-- prediction markets history -->
k6 run src/tests/api/test-api-prediction-markets-history.ts | tee "src/logs/api/test-api-prediction-markets-history-$(date +%Y%m%d-%H%M%S).txt"
<!-- get weekly statistic -->
k6 run src/tests/api/test-api-get-weekly-statistic.ts | tee "src/logs/api/test-api-get-weekly-statistic-$(date +%Y%m%d-%H%M%S).txt"
<!-- get current week statistics -->
k6 run src/tests/api/test-api-get-current-week-statistics.ts | tee "src/logs/api/test-api-get-current-week-statistics-$(date +%Y%m%d-%H%M%S).txt"
<!-- get weekly statistics by date -->
k6 run src/tests/api/test-api-get-weekly-statistics-by-date.ts | tee "src/logs/api/test-api-get-weekly-statistics-by-date-$(date +%Y%m%d-%H%M%S).txt"

<!-- smart-contract -->
<!-- bet place -->
k6 run src/tests/smct/test-bet-place.ts | tee "src/logs/smct/test-bet-place-$(date +%Y%m%d-%H%M%S).txt"
<!-- withdraw -->
k6 run src/tests/smct/test-withdraw.ts | tee "src/logs/smct/test-withdraw-$(date +%Y%m%d-%H%M%S).txt"

<!-- all -->
k6 run src/tests/test-all.ts | tee "src/logs/all/test-all-$(date +%Y%m%d-%H%M%S).txt"
