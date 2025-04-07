import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load ABI
const LandRegistryJSON = require('./abi/LandRegistry.json');
const abi = LandRegistryJSON.abi;

// Set up provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log("Using wallet address:", wallet.address);

// Validate contract address
const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) {
    console.error("ERROR: CONTRACT_ADDRESS is missing from .env");
    process.exit(1);
}
console.log("Loaded contract address:", contractAddress);

// Contract instance
const landRegistryContract = new ethers.Contract(contractAddress, abi, wallet);

// Function to send ETH to contract
async function fundContract(amountInEth) {
    try {
        const tx = await wallet.sendTransaction({
            to: contractAddress,
            value: ethers.parseEther(amountInEth), // Convert ETH to Wei
        });

        console.log("Transaction sent! Hash:", tx.hash);
        await tx.wait(); // Wait for confirmation
        console.log(`Successfully sent ${amountInEth} ETH to the contract!`);
    } catch (error) {
        console.error("Error funding contract:", error);
    }
}

// Fund contract with 1 ETH
await fundContract("1");

// Validate contract balance after funding
const contractBalance = await provider.getBalance(await landRegistryContract.getAddress());
console.log("Updated contract balance:", ethers.formatEther(contractBalance), "ETH");

export default landRegistryContract;
