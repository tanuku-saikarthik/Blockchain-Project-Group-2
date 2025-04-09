// controllers/offersController.js
import supabase from '../supabaseClient.js';
import { ethers } from 'ethers';
import landRegistryContract from '../smartContract.js';



// Buyer submits an offer with escrow funds deposited.
// The smart contract function: submitOffer(uint256 _propertyId, uint256 _offerPrice) payable
 /* export const createOffer = async (req, res) => {
    const { landId, offerPrice, notes, escrowAmount, walletAddress } = req.body;
    const buyer_id = req.user.id;
    
    try {
      // Insert offer into Supabase DB (if desired)
      const { data: dbData, error: dbError } = await supabase
        .from('offers')
        .insert([{
          land_id: landId,
          offer_price: offerPrice,
          buyer_id,
          notes,
          // status defaults to 'Pending'
        }])
        .single();

      if (dbError) return res.status(400).json({ error: dbError });

      // Call the smart contract submitOffer.
      // We assume that the buyer funds the offer by sending the offerPrice (in wei) as msg.value.
      const tx = await landRegistryContract.submitOffer(
        landId,
        ethers.utils.parseUnits(String(offerPrice), "wei"),
        { value: ethers.utils.parseUnits(String(offerPrice), "wei") }
      );
      // depositEscrowfunds
      const tx1 = await landRegistryContract.depositEscrowFunds(landId, {
      value: ethers.utils.parseUnits(String(escrowAmount), "wei"),
    });
      const receipt = await tx.wait();

      res.status(201).json({
        message: 'Offer created',
        offer: dbData,
        contractTx: receipt.transactionHash
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };*/
  export const createOffer = async (req, res) => {
    const { landId, offerPrice, escrowAmount, notes, walletAddress } = req.body;
  
    try {
      console.log("Received wallet address:", walletAddress);
      console.log("Offer details:", { landId, offerPrice, escrowAmount, notes });
  
      // Insert the offer into Supabase DB
    
      // Interact with smart contract
      const tx = await landRegistryContract.submitOffer(
        1,
        {
          value: ethers.parseEther(String(offerPrice)), // send Ether as value
        }
      );
  
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt.transactionHash);
      const { data, error } = await supabase
      .from("offers")
      .insert([
        {
          land_id: landId,
          buyer_id: req.userId,
          offer_price: offerPrice,
          notes,
        },
      ])
      .select();

    if (error) throw error;

    const dbData = data[0];

    // Log contract call parameters
    console.log("Calling smart contract with:");
    console.log("landId:", landId);
    console.log("offerPrice (in ETH):", offerPrice);
    const offers = await landRegistryContract.getOffers(2);
    const formatted = offers.map(o => ({
        buyer: o.buyer,
        offerPrice: ethers.formatEther(o.offerPrice),
        status: o.status,
    }));
console.log("Formatted offers:", formatted);
      // Return response only once
      res.status(201).json({
        message: "Offer created and escrow funded on-chain",
        offer: dbData,
        escrowTx: receipt.transactionHash,
      });
  
    } catch (err) {
      console.error("❌ Error in createOffer:", err); // Debug log
      res.status(500).json({ error: err.message || "Unknown error occurred" });
    }
  };
  
  
  

  // (Optionally) Deposit escrow funds once seller accepts – calls onchain function.
  export const depositEscrowFunds = async (req, res) => {
    const { offerId, offerPrice } = req.body;
    try {
      const tx = await landRegistryContract.depositEscrowFunds(offerId, {
        value: ethers.utils.parseUnits(String(offerPrice), "wei"),
      });
      const receipt = await tx.wait();
      res.json({ message: 'Escrow funded on-chain', contractTx: receipt.transactionHash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


// Update offer – this example only updates the DB; you can extend it to call a smart contract function if needed.
/*export const updateOffer = async (req, res) => {
  const { offerId } = req.params;
  const { offerPrice, notes, escrowAmount, walletAddress } = req.body;
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ offer_price: offerPrice, notes })
      .eq('offer_id', offerId);
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Offer updated', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel offer – if allowed before seller acceptance.
export const cancelOffer = async (req, res) => {
  const { offerId } = req.params;
  try {
    const { data, error } = await supabase
      .from('offers')
      .delete()
      .eq('offer_id', offerId);
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Offer canceled', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBuyerOffers = async (req, res) => {
  const buyer_id = req.user.id;
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('buyer_id', buyer_id);
    if (error) return res.status(400).json({ error });
    res.json({ offers: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// For seller actions, updating offer status on-chain could be added.
// For now, these update the DB to reflect accepted or rejected status.
export const acceptOffer = async (req, res) => {
  const { offerId } = req.params;
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ status: 'Accepted' })
      .eq('offer_id', offerId);
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Offer accepted', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectOffer = async (req, res) => {
  const { offerId } = req.params;
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ status: 'Rejected' })
      .eq('offer_id', offerId);
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Offer rejected', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/

// Update offer – here we update only the backup DB.
/*export const updateOffer = async (req, res) => {
  const { offerId } = req.params;
  const { offerPrice, notes } = req.body;
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ offer_price: offerPrice, notes })
      .eq('offer_id', offerId);
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Offer updated in DB', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
// Cancel offer – for simplicity we delete from backup DB (the onchain offer remains immutable).
export const cancelOffer = async (req, res) => {
  const { offerId } = req.params;
  try {
    const { data, error } = await supabase
      .from('offers')
      .delete()
      .eq('offer_id', offerId);
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Offer canceled in DB', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get buyer's offers – here we fetch onchain offers by iterating over the offer count.
// (In production, you may want to use event logs or an indexing service.)
// Fetch Buyer Offers for Seller's Lands
export const fetchBuyerOffersbyId = async (req, res) => {
  try {
      // Ensure req.userId is not undefined
      const sellerId = req.userId;
      if (!sellerId) {
          return res.status(400).json({ error: 'Seller ID is missing or invalid' });
      }
      
      // Fetch the seller's lands
      const { data: lands, error: landError } = await supabase
          .from('land')
          .select('id')
          .eq('owner_id', sellerId); // Ensure `owner_id` is correct

      if (landError) throw landError;

      if (!lands || lands.length === 0) {
          return res.status(404).json({ error: 'No lands found for this seller' });
      }

      console.log('Lands:', lands[0]); // Log to verify the structure

      // Extract land ids from the seller's lands
      const landIds = lands.map(land => land.id); // Ensure this matches the database schema
console.log('Land IDs:', landIds.land_id); // Log to verify the structure
      // Now fetch the buyer offers for those lands
      const { data, error } = await supabase
    .from('offers')
    .select('*')
    .in('land_id', lands.map(land => land.id))
    .eq('status', 'Pending');
 // Ensure this matches the database schema

      if (error) throw error;

      console.log('Offers:', data); // Log to verify the structure
      res.json(data);
  } catch (err) {
      console.error('Error fetching buyer offers:', err); // Log the error
      res.status(400).json({ error: err.message });
  }
};




export const getBuyerOffers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*');
    if (error) return res.status(400).json({ error });
    //res.json({ offers: data });
    const offers = await landRegistryContract.getOffers(1);
    const formatted = offers.map(o => ({
        buyer: o.buyer,
        offerPrice: ethers.formatEther(o.offerPrice),
        status:o.status.toString(),
        

    }));
console.log("Formatted offers:", formatted); // Debugging line
    res.json(formatted);
    

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// For seller actions, we call the corresponding onchain functions and update backup DB.


// Controller for accepting an offer
export const acceptOffer = async (req, res) => {
  const { offerId } = req.params;
  const { offerId: offerid } = req.body;

  console.log("Accepting offer with ID:", offerid);

  try {
    // Step 1: Get full offer data (not just land_id)
    const { data: offerData, error: offerError } = await supabase
      .from('offers')
      .select('offer_id, land_id, buyer_id')
      .eq('offer_id', offerid)
      .single();

    if (offerError) return res.status(400).json({ error: offerError.message });
    if (!offerData) return res.status(404).json({ error: 'Offer not found' });

    const { land_id, buyer_id, seller_id, price } = offerData;

    // Step 2: Update the offer status to "Accepted"
    const { error: updateError } = await supabase
      .from('offers')
      .update({ status: 'Accepted' })
      .eq('offer_id', offerid);

    if (updateError) return res.status(400).json({ error: updateError.message });

    // Step 3: Delete all other offers for the same land
    const { error: deleteError } = await supabase
      .from('offers')
      .delete()
      .eq('land_id', land_id)
      .neq('offer_id', offerid);

    if (deleteError) return res.status(400).json({ error: deleteError.message });

    // Step 4: Insert into transactions table
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          land_id,
          buyer_id,
          status: 'Pending',
          hash:"0x00000000000000000",
          validation_date: new Date().toISOString(), // current timestamp
          validation_status: 'Pending',// or 'Pending', based on your logic,
          offer_id: offerid, // Link to the accepted offer
        }
      ]);

    if (transactionError) return res.status(400).json({ error: transactionError.message });

    res.json({
      message: 'Offer accepted, other offers deleted, and transaction recorded.',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectOffer = async (req, res) => {
  const { offer_id } = req.params;
  try {
    // Fetch the offer to get the associated land_id
    const { data: offerData, error: offerError } = await supabase
      .from('offers')
      .select('land_id')
      .eq('offer_id', offer_id)
      .single();

    if (offerError) return res.status(400).json({ error: offerError });
    if (!offerData) return res.status(404).json({ error: 'Offer not found' });

    const land_id = offerData.land_id;

    // Update the offer status to 'Rejected'
    const { data, error } = await supabase
      .from('offers')
      .update({ status: 'Rejected' })
      .eq('offer_id', offer_id);

    if (error) return res.status(400).json({ error });

    // Delete all other offers for the same land_id
    const { deleteData, deleteError } = await supabase
      .from('offers')
      .delete()
      .eq('land_id', land_id)
      .neq('offer_id', offer_id); // Make sure not to delete the rejected offer

    if (deleteError) return res.status(400).json({ error: deleteError });

    res.json({
      message: 'Offer rejected, and other offers for the land are deleted',
      data,
      deleteData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
