// watchers/contractWatcher.js

import contract from '../config/blockchain.js';
import Property from '../models/Property.js';
import Offer from '../models/Offer.js';

function startContractWatcher() {
  console.log('Starting contract event watcher...');

  // -------------------------------
  // PROPERTY EVENTS
  // -------------------------------
  
  // Listen for PropertyListed event
  contract.on("PropertyListed", async (propertyId, seller, timestamp, event) => {
    console.log(`PropertyListed event detected: Property ID ${propertyId}`);
    try {
      // Save a basic property record.
      await Property.create({
        id: propertyId.toNumber(),
        seller: seller,
        owner: seller,
        isListed: true,
        area: 0,             // For demonstration; update as needed.
        askingPrice: "0",
        location: "unknown",
        documentHash: "",
        createdAt: new Date(timestamp.toNumber() * 1000)
      });
    } catch (err) {
      console.error('Error saving property:', err);
    }
  });

  // Listen for PropertyUpdated event (if you want to update offchain data)
  contract.on("PropertyUpdated", async (propertyId, seller, timestamp, event) => {
    console.log(`PropertyUpdated event detected: Property ID ${propertyId}`);
    // You might query the contract for full details here.
    // For example, update the offchain record if necessary.
  });

  // Listen for PropertyCancelled event
  contract.on("PropertyCancelled", async (propertyId, seller, timestamp, event) => {
    console.log(`PropertyCancelled event detected: Property ID ${propertyId}`);
    try {
      // Update the property record to mark it as not listed.
      await Property.update(
        { isListed: false },
        { where: { id: propertyId.toNumber() } }
      );
    } catch (err) {
      console.error('Error updating property cancellation:', err);
    }
  });

  // -------------------------------
  // OFFER EVENTS
  // -------------------------------

  // Listen for OfferSubmitted event
  contract.on("OfferSubmitted", async (offerId, propertyId, buyer, offerPrice, timestamp, event) => {
    console.log(`OfferSubmitted event detected: Offer ID ${offerId}`);
    try {
      await Offer.create({
        id: offerId.toNumber(),
        propertyId: propertyId.toNumber(),
        offerPrice: offerPrice.toString(),
        escrowAmount: "0",
        buyer: buyer,
        status: 0, // Pending
        createdAt: new Date(timestamp.toNumber() * 1000)
      });
    } catch (err) {
      console.error('Error saving offer:', err);
    }
  });

  // Listen for OfferCancelled event (if you want to log cancellations)
  contract.on("OfferCancelled", async (offerId, buyer, timestamp, event) => {
    console.log(`OfferCancelled event detected: Offer ID ${offerId}`);
    try {
      await Offer.update(
        { status: 7 }, // Cancelled (enum index 7)
        { where: { id: offerId.toNumber() } }
      );
    } catch (err) {
      console.error('Error updating cancelled offer:', err);
    }
  });

  // Listen for SellerAcceptedOffer event and update offer status to SellerAccepted (1)
  contract.on("SellerAcceptedOffer", async (offerId, timestamp, event) => {
    console.log(`SellerAcceptedOffer event detected: Offer ID ${offerId}`);
    try {
      await Offer.update(
        { status: 1 }, // SellerAccepted
        { where: { id: offerId.toNumber() } }
      );
    } catch (err) {
      console.error('Error updating offer after seller acceptance:', err);
    }
  });

  // Listen for SellerRejectedOffer event and update offer status to SellerRejected (3)
  contract.on("SellerRejectedOffer", async (offerId, timestamp, event) => {
    console.log(`SellerRejectedOffer event detected: Offer ID ${offerId}`);
    try {
      await Offer.update(
        { status: 3, escrowAmount: "0" },
        { where: { id: offerId.toNumber() } }
      );
    } catch (err) {
      console.error('Error updating offer after seller rejection:', err);
    }
  });

  // Listen for EscrowFunded event and update offer status to BuyerFunded (2)
  contract.on("EscrowFunded", async (offerId, buyer, amount, timestamp, event) => {
    console.log(`EscrowFunded event detected: Offer ID ${offerId}`);
    try {
      await Offer.update(
        { status: 2, escrowAmount: amount.toString() },
        { where: { id: offerId.toNumber() } }
      );
    } catch (err) {
      console.error('Error updating offer after escrow funding:', err);
    }
  });

  // Listen for InspectorApprovedOffer event and update offer status to InspectorApproved (4)
  contract.on("InspectorApprovedOffer", async (offerId, timestamp, event) => {
    console.log(`InspectorApprovedOffer event detected: Offer ID ${offerId}`);
    try {
      await Offer.update(
        { status: 4 },
        { where: { id: offerId.toNumber() } }
      );
    } catch (err) {
      console.error('Error updating offer after inspector approval:', err);
    }
  });

  // Listen for GovtApprovedOffer event and update offer status to GovtApproved (5)
  contract.on("GovtApprovedOffer", async (offerId, timestamp, event) => {
    console.log(`GovtApprovedOffer event detected: Offer ID ${offerId}`);
    try {
      await Offer.update(
        { status: 5, escrowAmount: "0" },
        { where: { id: offerId.toNumber() } }
      );
      // Optionally update the related property record if needed (e.g., change owner, mark not listed)
    } catch (err) {
      console.error('Error updating offer after government approval:', err);
    }
  });

  // Listen for GovtRejectedOffer event and update offer status to GovtRejected (6)
  contract.on("GovtRejectedOffer", async (offerId, timestamp, event) => {
    console.log(`GovtRejectedOffer event detected: Offer ID ${offerId}`);
    try {
      await Offer.update(
        { status: 6, escrowAmount: "0" },
        { where: { id: offerId.toNumber() } }
      );
    } catch (err) {
      console.error('Error updating offer after government rejection:', err);
    }
  });

  // Optionally, listen for FundsTransferred and FundsRefunded events for logging purposes.
  contract.on("FundsTransferred", async (offerId, recipient, amount, timestamp, event) => {
    console.log(`FundsTransferred event detected: Offer ID ${offerId}, Recipient: ${recipient}, Amount: ${amount.toString()}`);
    // You can log or update offchain records if necessary.
  });

  contract.on("FundsRefunded", async (offerId, recipient, amount, timestamp, event) => {
    console.log(`FundsRefunded event detected: Offer ID ${offerId}, Recipient: ${recipient}, Amount: ${amount.toString()}`);
    // You can log or update offchain records if necessary.
  });
}

export default startContractWatcher;
