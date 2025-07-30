# scripts
k6 run src/tests/test-website.ts | tee src/logs/test-website.txt
k6 run src/tests/test-api-markets.ts | tee src/logs/test-api-markets.txt
k6 run src/tests/test-bet-place.ts | tee src/logs/test-bet-place.txt
