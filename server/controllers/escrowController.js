// controllers/escrowController.js
import landRegistryContract from '../smartContract.js';
import supabase from '../supabaseClient.js';

export const depositEscrowFunds = async (req, res) => {
  const { purchaseId, depositAmount } = req.body;
  try {
    const { data, error } = await supabase
      .from('escrow')
      .insert([{
        transaction_id: purchaseId,
        escrow_amount: depositAmount,
        escrow_status: 'Held',
      }])
      .single();
    if (error) return res.status(400).json({ error });
    res.json({ message: 'Escrow funds deposited successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for inspector to approve the offer and transfer escrow funds to the seller
export const sendEscrowToSeller = async (req, res) => {
  const { landId, transaction_id } = req.body;
  

  
 // const sellerAddress = seller.seller_address;
  
  try {
    const {data:offersData, error:offersError} = supabase.
    from('offers')
    .select('offer_id') 
    .eq('land_id', landId)

  
    // Call the inspectorApproveOffer function on-chain, passing the offerId and the seller address
    const tx = await landRegistryContract.inspectorApproveOffer(45, '0x90F79bf6EB2c4f870365E785982E1f101E93b906', 5);
    
    // Wait for the transaction to be mined.
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      return res.status(200).json({
        message: 'Funds successfully transferred to the seller and property updated',
        transactionHash: tx.hash,
      });
    } else {
      return res.status(500).json({ error: 'Transaction failed' });
    }
  } catch (error) {
    console.error('Error processing escrow transfer:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




