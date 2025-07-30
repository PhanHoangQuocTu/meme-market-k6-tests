import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PredictionMarket } from "../contract/types/prediction_market";
import { Program } from "@coral-xyz/anchor";
import marketIdl from "../contract/idl/prediction_market_idl";

// Get secret key from admin-secret.json
const SECRET_KEY = [
  77, 190, 169, 16, 219, 18, 78, 80, 107, 224, 222, 187, 91, 240, 91, 164, 231,
  149, 142, 223, 254, 40, 65, 86, 58, 211, 16, 57, 191, 65, 36, 13, 225, 37, 99,
  38, 28, 132, 46, 193, 220, 204, 214, 218, 51, 220, 21, 154, 116, 167, 110,
  251, 76, 239, 4, 85, 18, 14, 191, 173, 240, 127, 211, 34,
];
export const ADMIN_WALLET = Keypair.fromSecretKey(new Uint8Array(SECRET_KEY));

// SOLANA
export const SOLANA_CONNECTION = new Connection(clusterApiUrl("devnet"), {
  commitment: "finalized",
});

// SMART CONTRACT
export const MARKET_PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID!);
export const MARKET_PROGRAM = new Program<PredictionMarket>(marketIdl);

// TOKEN
export const TOKEN_ADDRESSES = {
  SOL: "So11111111111111111111111111111111111111112",
};
