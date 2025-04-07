// controllers/transactionsController.js
import supabase from '../supabaseClient.js';
import landRegistryContract from '../smartContract.js';
export const getPendingTransactions = async (req, res) => {
  try {
    let query = supabase
      .from('offers')
      .select('offer_id')
      .eq('status', 'Accepted');

    const { data: acceptedOffers, error: offerError } = await query;
    console.log('Accepted Offers:', acceptedOffers); // Debugging line
    
    if (offerError) {
      return res.status(400).json({ error: offerError });
    }

    // Extract offer_ids from acceptedOffers
    const acceptedOfferIds = acceptedOffers.map((offer) => offer.offer_id);

    if (acceptedOfferIds.length === 0) {
      return res.json({ transactions: [] }); // No accepted offers
    }

    // Fetch transactions linked to accepted offers
    let transactionQuery = supabase
      .from('transactions')
      .select('*')
      .in('offer_id', acceptedOfferIds)
      .eq('validation_status', 'Pending');

    let { data: transactions, error: transactionError } = await transactionQuery;

    if (transactionError) {
      console.error("Transaction Query Error:", transactionError);
      return res.status(400).json({ error: transactionError });
    }

    // If no transactions exist, create them
    if (transactions.length === 0) {
      for (let offer of acceptedOffers) {
        // Fetch offer details (including land_id, buyer, price)
        const { data: offerData, error: offerError } = await supabase
          .from('offers')
          .select('*')
          .eq('offer_id', offer.offer_id)
          .single();

        if (offerError || !offerData) {
         // console.error(`Error fetching offer data for offer_id ${offer.offer_id}:`, offerError);
          continue;
        }

        // Fetch land details based on land_id from the offer
        const { data: landData, error: landError } = await supabase
          .from('land') // Fixed table name (should match your DB)
          .select('*')
          .eq('id', offerData.land_id) // Ensure the correct field name
          .single();

        if (landError || !landData) {
         // console.error(`Error fetching land data for land_id ${offerData.land_id}:`, landError);
          continue;
        }
          
        // Insert a new transaction
        const { data: newTransaction, error: insertError } = await supabase
          .from('transactions')
          .insert([
            {
              offer_id: offer.offer_id,
              buyer_id: offerData.buyer_id, // Get buyer_id from offerData
              seller_id: landData.seller_id, // Get seller_id from landData
              land_id: offerData.land_id,
              status: 'Pending',
              validation_status: 'Pending',
              hash:"0x1234567890abcdee", // Placeholder for blockchain hash
              
            },
          ])
          .select()
          .single();

        if (insertError) {
         // console.error("Error inserting new transaction:", insertError);
        } else {
          transactions.push(newTransaction); // Add the new transaction to response
        }
      }
    }

   // console.log("Final Transactions:", transactions);
    return res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





export const validateTransaction = async (req, res) => {
  const { transactionId } = req.body;
  console.log("Transaction ID:", transactionId); // Debugging line

  try {
    // Fetch transaction details
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single();

    console.log("Transaction fetched:", transaction); // Debugging line
    console.log("Supabase error:", error); // Debugging line

    if (error || !transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    console.log("Transaction details:", transaction); // Debugging line

    // Ensure req.user exists
    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    // Call smart contract function to validate (if necessary)
    // For example, if interacting with a smart contract on the blockchain
    // const txHash = await someSmartContract.validateTransaction(transactionId);
    const buyerAddress = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65';
    const sellerAddress = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
    // Update validation status in the database
    const { data, error: updateError } = await supabase
      .from('transactions')
      .update({
        validation_status: 'Validated',
        validated_by: req.user.id,
        validation_date: new Date()
      })
      .eq('id', transactionId);

    console.log("Data after update:", data); // Debugging line
    console.log("Supabase update error:", updateError); // Debugging line
    

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }
 const tx = await landRegistryContract.transferFunds( buyerAddress, sellerAddress, 28);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    // Respond with success and transaction details
    return res.json({
      message: 'Transaction validated successfully',
      transaction: data,
      // txHash: txHash, // Uncomment if you have blockchain interaction
    });

  } catch (err) {
    console.error('Error validating transaction:', err); // Log the error
    return res.status(500).json({ error: err.message });
  }
};




export const rejectValidation = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const { data, error } = await supabase
      .from('transactions')
      .update({ validation_status: 'Rejected' })
      .eq('id', transactionId);
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Transaction validation rejected', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getValidatedTransactions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('validation_status', 'Validated');
    if (error) return res.status(400).json({ error });
    res.json({ transactions: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Fetch transaction details
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single();
      
    if (error || !transaction) return res.status(404).json({ error: 'Transaction not found' });

    // Call smart contract function to approve transaction
    const tx = await contract.govtApproveOffer(transaction.blockchain_id);
    await tx.wait(); // Wait for confirmation

    // Update Supabase
    const { data, error: updateError } = await supabase
      .from('transactions')
      .update({ status: 'Approved' })
      .eq('id', transactionId);

    if (updateError) return res.status(400).json({ error: updateError });
    res.json({ message: 'Transaction approved on blockchain', txHash: tx.hash, data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const rejectTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Fetch transaction details
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single();
      
    if (error || !transaction) return res.status(404).json({ error: 'Transaction not found' });

    // Call smart contract function to reject transaction
    const tx = await landRegistryContract.govtRejectOffer(transaction.blockchain_id);
    await tx.wait(); // Wait for confirmation

    // Update Supabase
    const { data, error: updateError } = await supabase
      .from('transactions')
      .update({ status: 'Rejected' })
      .eq('id', transactionId);

    if (updateError) return res.status(400).json({ error: updateError });
    res.json({ message: 'Transaction rejected on blockchain', txHash: tx.hash, data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const fundEscrow = async (req, res) => {
  const { transactionId } = req.params;
  const { amount } = req.body; // Amount in ETH (converted to Wei)

  try {
    // Fetch transaction details
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single();
      
    if (error || !transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Convert ETH to Wei
    const amountInWei = ethers.parseUnits(amount.toString(), 'ether');

    // Call contract to fund escrow
    const tx = await contract.depositEscrowFunds(transaction.blockchain_id, { value: amountInWei });
    await tx.wait(); // Wait for confirmation

    // Update Supabase to reflect escrow funding
    const { data, error: updateError } = await supabase
      .from('transactions')
      .update({ escrow_funded: true })
      .eq('id', transactionId);

    if (updateError) {
      return res.status(400).json({ error: updateError });
    }

    res.json({ message: 'Escrow funded on blockchain', txHash: tx.hash, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};