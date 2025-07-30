# scripts
<!-- website -->
k6 run src/tests/page/test-page-home.ts | tee "src/logs/page/test-page-home-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/page/test-page-market.ts | tee "src/logs/page/test-page-market-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/page/test-page-market-history.ts | tee "src/logs/page/test-page-market-history-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/page/test-page-activity.ts | tee "src/logs/page/test-page-activity-$(date +%Y%m%d-%H%M%S).txt"

<!-- api -->
k6 run src/tests/api/test-api-prediction-markets.ts | tee "src/logs/api/test-api-prediction-markets-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/api/test-api-prediction-activities.ts | tee "src/logs/api/test-api-prediction-activities-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/api/test-api-prediction-bets.ts | tee "src/logs/api/test-api-prediction-bets-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/api/test-api-top-bet-volume.ts | tee "src/logs/api/test-api-top-bet-volume-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/api/test-api-prediction-markets-by-market-address.ts | tee "src/logs/api/test-api-prediction-markets-by-market-address-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/api/test-api-prediction-markets-history.ts | tee "src/logs/api/test-api-prediction-markets-history-$(date +%Y%m%d-%H%M%S).txt"

<!-- smart-contract -->
k6 run src/tests/smct/test-bet-place.ts | tee "src/logs/smct/test-bet-place-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/smct/test-withdraw.ts | tee "src/logs/smct/test-withdraw-$(date +%Y%m%d-%H%M%S).txt"

<!-- all -->
k6 run src/tests/test-all.ts | tee "src/logs/all/test-all-$(date +%Y%m%d-%H%M%S).txt"
