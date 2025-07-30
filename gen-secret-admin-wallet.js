import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import * as fs from 'fs';

const privateKey = "2Z9tdvXhUrqxuuEaKTHNVHgvB8NrqdYwQvHCpX5jsZsTFQVkV13KKAXU7YL62ZwvqQQSBuFYBNBRfVVsHG3dvEyP"; // Admin wallet private key

const secretKey = bs58.decode(privateKey);
const keypair = Keypair.fromSecretKey(secretKey);

console.log(`[Log] Wallet PublicKey:`, keypair.publicKey.toString());

const secret_array = keypair.secretKey
    .toString() //convert secret key to string
    .split(',') //delimit string by commas and convert to an array of strings
    .map(value => Number(value)); //convert string values to numbers inside the array

const secret = JSON.stringify(secret_array); //Covert to JSON string

fs.writeFile('admin-secret.json', secret, 'utf8', function (err) {
    if (err) throw err;
    console.log('[Log] Wrote secret key to admin-secret.json.');
});