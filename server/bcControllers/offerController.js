import landRegistryContract from "../config/blockchain.js";
import { ethers } from "ethers";

export const submitOffer = async (req, res) => {
  try {
    const { buyer, propertyId, offerPrice } = req.body;
    const offerId = await landRegistryContract.submitOffer(
      propertyId,
      ethers.utils.parseEther(offerPrice.toString()),
      { from: buyer }
    );
    res.status(200).json({ offerId, message: "Offer submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sellerAcceptOffer = async (req, res) => {
  try {
    const { seller, offerId } = req.body;
    await landRegistryContract.sellerAcceptOffer(offerId, { from: seller });
    res.status(200).json({ message: "Offer accepted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
