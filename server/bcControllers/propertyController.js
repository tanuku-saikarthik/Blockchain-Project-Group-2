import landRegistryContract from "../config/blockchain.js";
import { ethers } from "ethers";

export const listProperty = async (req, res) => {
  try {
    const { seller, location, area, askingPrice, documentHash } = req.body;
    const propertyId = await landRegistryContract.listProperty(
      location,
      area,
      ethers.utils.parseEther(askingPrice.toString()),
      documentHash,
      { from: seller }
    );
    res.status(200).json({ propertyId, message: "Property listed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { seller, propertyId, location, area, askingPrice, documentHash } = req.body;
    await landRegistryContract.updateProperty(
      propertyId,
      location,
      area,
      ethers.utils.parseEther(askingPrice.toString()),
      documentHash,
      { from: seller }
    );
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
