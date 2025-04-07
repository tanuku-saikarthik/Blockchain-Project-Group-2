const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // Connect to the local JSON RPC provider.
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider); 

    // Create a deployer wallet using the PRIVATE_KEY from the .env file.
    console.log("Deploying the contract with the account:", deployer.address);

    // Get the list of available signers.
    const signers = await ethers.getSigners();
    console.log("Number of signers:", signers.length);

    // Use the second signer as inspector if available, otherwise fallback to the deployer.
    const inspector = signers[1] ? signers[1] : deployer;
    console.log("Inspector Role Address:", inspector.address);

    // Get the contract factory for LandRegistry using the deployer.
    const LandRegistry = await ethers.getContractFactory("LandRegistry", deployer);
    // Deploy the contract by passing the inspector's address as the constructor parameter.
    const landRegistry = await LandRegistry.deploy(inspector.address);

    await landRegistry.deployed();
    console.log("LandRegistry deployed to:", landRegistry.address);
    console.log("Inspector Role Address:", inspector.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
