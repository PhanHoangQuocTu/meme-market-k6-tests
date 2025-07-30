import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import fs from "fs";

// ===== CONFIG =====
const SECRET_KEY = [
  77, 190, 169, 16, 219, 18, 78, 80, 107, 224, 222, 187, 91, 240, 91, 164, 231,
  149, 142, 223, 254, 40, 65, 86, 58, 211, 16, 57, 191, 65, 36, 13, 225, 37, 99,
  38, 28, 132, 46, 193, 220, 204, 214, 218, 51, 220, 21, 154, 116, 167, 110,
  251, 76, 239, 4, 85, 18, 14, 191, 173, 240, 127, 211, 34,
];
const SOLANA_CONNECTION = new Connection(clusterApiUrl("devnet"), {
  commitment: "finalized",
});
const ADMIN_WALLET = Keypair.fromSecretKey(new Uint8Array(SECRET_KEY));
const AMOUNT_SOL = 0.05;
const TOTAL_WALLETS = 500;
const OUTPUT_FILE = "wallets.json";
const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 500;

// ===== FUNCTION =====
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function transferSOL(from, toPubkey, amountSOL) {
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey,
      lamports: amountSOL * LAMPORTS_PER_SOL,
    })
  );

  const sig = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [from]);
  return sig;
}

function walletInfo(wallet, txSignature) {
  return {
    publicKey: wallet.publicKey.toBase58(),
    secretKey: Array.from(wallet.secretKey),
    privateKeyBase58: bs58.encode(wallet.secretKey),
    txSignature,
  };
}

async function transferWithRetry(from, to, amount, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await transferSOL(from, to, amount);
    } catch (err) {
      if (attempt === maxRetries - 1) throw err;
      const delay = Math.pow(2, attempt) * 1000;
      console.warn(
        `⏳ [RETRY] Attempt ${attempt + 1} failed: ${
          err.message
        }. Retrying in ${delay / 1000}s...`
      );
      await sleep(delay);
    }
  }
}

// ===== MAIN =====
(async () => {
  console.log(`⏳ [LOG] Start generating ${TOTAL_WALLETS} wallets...\n`);

  const wallets = Array.from({ length: TOTAL_WALLETS }, () =>
    Keypair.generate()
  );
  const successfulWallets = [];

  for (let i = 0; i < wallets.length; i += BATCH_SIZE) {
    const batch = wallets.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map(async (wallet, j) => {
        const index = i + j;
        const pubkey = wallet.publicKey.toBase58();
        console.log(`🔹 [LOG] Wallet #${index + 1}: ${pubkey}`);

        try {
          const sig = await transferWithRetry(
            ADMIN_WALLET,
            wallet.publicKey,
            AMOUNT_SOL
          );
          console.log(
            `✅ [LOG] Transferred ${AMOUNT_SOL} SOL to #${
              index + 1
            } - Tx: ${sig}`
          );
          return walletInfo(wallet, sig);
        } catch (err) {
          console.error(
            `❌ [ERROR] Failed to transfer to #${index + 1}: ${err.message}`
          );
          return null;
        }
      })
    );

    successfulWallets.push(
      ...results
        .filter((r) => r.status === "fulfilled" && r.value !== null)
        .map((r) => r.value)
    );

    console.log(`⏸️  [WAIT] Sleeping ${BATCH_DELAY_MS}ms before next batch...`);
    await sleep(BATCH_DELAY_MS);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(successfulWallets, null, 2));
  console.log(
    `\n✅ [DONE] Saved ${successfulWallets.length} wallet(s) to: ${OUTPUT_FILE}`
  );
})();
