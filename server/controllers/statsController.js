// controllers/statsController.js
import supabase from '../supabaseClient.js';

// Buyer dashboard stats: active offers, completed purchases, pending transactions, etc.
export const fetchBuyerStats = async (req, res) => {
  const buyer_id = req.userId;
  try {
    const offers = await supabase.from('offers').select('*').eq('buyer_id', buyer_id);
    const purchases = await supabase.from('transactions').select('*').eq('buyer_id', buyer_id).eq('status', 'Approved');
    const pendingTransactions = await supabase.from('transactions').select('*').eq('buyer_id', buyer_id).eq('status', 'Pending');
    console.log("Buyer ID:", buyer_id);
    console.log("Offers:", offers.data); // Debugging line
    console.log("Purchases:", purchases.data); // Debugging line
    console.log("Pending Transactions:", pendingTransactions.data); // Debugging line
    
    res.json({
      buyerStats: {
        offers: offers.data?.length || 0,
        purchases: purchases.data?.length || 0,
        pendingTransactions: pendingTransactions.data?.length || 0,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Seller dashboard stats: active listings, offers received, transactions, completed sales.
export const fetchSellerStats = async (req, res) => {
  const seller_id = req.userId;
  try {
    const listings = await supabase.from('land').select('*').eq('owner_id', seller_id);
    const offersReceived = await supabase.from('offers').select('*');
    const inProgressTransactions = await supabase.from('transactions').select('*').eq('seller_id', seller_id).eq('status', 'Pending');
    const completedSales = await supabase.from('transactions').select('*').eq('seller_id', seller_id).eq('status', 'Approved');
    console.log("Seller ID:", seller_id);
    //console.log("Listings:", listings.data); // Debugging line
   // console.log("Offers Received:", offersReceived.data); // Debugging line
    console.log("In Progress Transactions:", inProgressTransactions.data); // Debugging line
    console.log("Completed Sales:", completedSales.data); // Debugging line

    res.json({
      sellerStats: {
        listings: listings.data?.length || 0,
        offersReceived: offersReceived.data?.length || 0,
  
        completedSales: completedSales.data?.length || 0,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Inspector dashboard stats: pending verifications, validated and rejected transactions.
export const fetchInspectorStats = async (req, res) => {
  try {
    const pendingVerifications = await supabase.from('land').select('*').eq('is_verified', false);
    const validatedTransactions = await supabase.from('transactions').select('*').eq('validation_status', 'Validated');
    const rejectedValidations = await supabase.from('transactions').select('*').eq('validation_status', 'Rejected');
    
    res.json({
      inspectorStats: {
        pendingVerifications: pendingVerifications.data?.length || 0,
        validatedTransactions: validatedTransactions.data?.length || 0,
        rejectedValidations: rejectedValidations.data?.length || 0,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
