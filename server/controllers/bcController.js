// controllers/landRegistryController.js

import contract from '../config/blockchain.js';
// PROPERTY MANAGEMENT

// List a new property
const listProperty = async (req, res) => {
  try {
    const { location, area, askingPrice, documentHash } = req.body;
    const tx = await contract.listProperty(location, area, askingPrice, documentHash);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Property listed', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update a property listing
const updateProperty = async (req, res) => {
  try {
    const { propertyId, location, area, askingPrice, documentHash } = req.body;
    const tx = await contract.updateProperty(propertyId, location, area, askingPrice, documentHash);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Property updated', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Cancel a property listing
const cancelPropertyListing = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const tx = await contract.cancelPropertyListing(propertyId);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Property listing cancelled', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get active properties (view function)
const getActiveProperties = async (req, res) => {
  try {
    const activeProperties = await contract.getActiveProperties();
    res.status(200).json({ activeProperties });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// OFFER MANAGEMENT

// Submit an offer (no funds sent)
const submitOffer = async (req, res) => {
  try {
    const { propertyId, offerPrice } = req.body;
    const tx = await contract.submitOffer(propertyId, offerPrice);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Offer submitted', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Cancel an offer
const cancelOffer = async (req, res) => {
  try {
    const { offerId } = req.body;
    const tx = await contract.cancelOffer(offerId);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Offer cancelled', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Seller accepts an offer
const sellerAcceptOffer = async (req, res) => {
  try {
    const { offerId } = req.body;
    const tx = await contract.sellerAcceptOffer(offerId);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Offer accepted by seller', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Buyer deposits escrow funds (must send value equal to offerPrice)
const depositEscrowFunds = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { value } = req.body; // value in wei as string
    const tx = await contract.depositEscrowFunds(offerId, { value });
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Escrow funds deposited', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Seller rejects an offer
const sellerRejectOffer = async (req, res) => {
  try {
    const { offerId } = req.body;
    const tx = await contract.sellerRejectOffer(offerId);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Offer rejected by seller', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Inspector approves an offer
const inspectorApproveOffer = async (req, res) => {
  try {
    const { offerId } = req.body;
    const tx = await contract.inspectorApproveOffer(offerId);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Offer approved by inspector', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Government approves an offer
const govtApproveOffer = async (req, res) => {
  try {
    const { offerId } = req.body;
    const tx = await contract.govtApproveOffer(offerId);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Offer approved by government', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Government rejects an offer
const govtRejectOffer = async (req, res) => {
  try {
    const { offerId } = req.body;
    const tx = await contract.govtRejectOffer(offerId);
    const receipt = await tx.wait();
    res.status(200).json({ message: 'Offer rejected by government', txHash: tx.hash, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get offers for a specific property (view function)
const getOffersForProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const offers = await contract.getOffersForProperty(propertyId);
    res.status(200).json({ offers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get the best offer for a property
const getBestOffer = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const bestOfferId = await contract.getBestOffer(propertyId);
    res.status(200).json({ bestOfferId: bestOfferId.toString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// USER TRANSACTION TRACKING

// Get all transactions for a user
const getUserTransactions = async (req, res) => {
  try {
    const { userAddress } = req.params;
    const transactions = await contract.getUserTransactions(userAddress);
    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get paginated transactions for a user
const getUserTransactionsPaginated = async (req, res) => {
  try {
    const { userAddress, start, count } = req.params;
    const transactions = await contract.getUserTransactionsPaginated(userAddress, start, count);
    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default{
  listProperty,
  updateProperty,
  cancelPropertyListing,
  getActiveProperties,
  submitOffer,
  cancelOffer,
  sellerAcceptOffer,
  depositEscrowFunds,
  sellerRejectOffer,
  inspectorApproveOffer,
  govtApproveOffer,
  govtRejectOffer,
  getOffersForProperty,
  getBestOffer,
  getUserTransactions,
  getUserTransactionsPaginated
};