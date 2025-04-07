// config/blockchain.js
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();


// Load the contract artifact (ensure the path is correct)import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artifactPath = path.join(__dirname, '../artifacts/LandRegistry.json');

console.log(artifactPath);

let LandRegistryArtifact;
try {
  LandRegistryArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
} catch (err) {
  console.error('Error reading contract artifact:', err);
  process.exit(1);
}
const LandRegistryABI = LandRegistryArtifact.abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, LandRegistryABI, wallet);

export default { provider, wallet, contract };
