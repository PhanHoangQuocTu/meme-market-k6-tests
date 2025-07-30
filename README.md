# Meme Market K6 Tests

## Getting Started

Follow these steps to set up and run the tests for this project:

### 1. Install Dependencies
- Install all required dependencies using pnpm:
  ```sh
  pnpm i
  ```

### 2. Generate Secret for Admin Wallet
- Run the function or script to generate the secret for the admin wallet:
  ```sh
  # Example (replace with your actual command)
  pnpm gen:admin-secret
  ```

### 3. Generate Wallets
- Run the function or script to generate additional wallets:
  ```sh
  # Example (replace with your actual command)
  pnpm gen:wallets
  ```


### 4. Run Test Scripts
- Execute the scripts listed in `scripts.md` to run the tests. For example:
  ```sh
  # Website tests
  k6 run src/tests/page/test-home-page.ts | tee "src/logs/page/test-home-page-$(date +%Y%m%d-%H%M%S).txt"
  k6 run src/tests/page/test-market-page.ts | tee "src/logs/page/test-market-page-$(date +%Y%m%d-%H%M%S).txt"
  # ...and so on for other scripts in scripts.md
  ```

Refer to the `scripts.md` file for the full list of available test scripts to run.

---

If you need more detailed instructions for any step, please let me know!