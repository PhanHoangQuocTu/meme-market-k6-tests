# scripts
k6 run src/tests/test-website.ts | tee src/logs/test-website-$(date +%Y%m%d-%H%M%S).txt
k6 run src/tests/test-api-markets.ts | tee src/logs/test-api-markets-$(date +%Y%m%d-%H%M%S).txt
k6 run src/tests/test-bet-place.ts | tee "src/logs/test-bet-place-$(date +%Y%m%d-%H%M%S).txt"
k6 run src/tests/test-withdraw.ts | tee "src/logs/test-withdraw-$(date +%Y%m%d-%H%M%S).txt"
