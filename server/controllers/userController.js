// controllers/userController.js
import supabase from '../supabaseClient.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('-password')
      .eq('id', id)
      .single();
    if (error) return res.status(400).json({ error });
    res.json({ user: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('-password')
      .eq('id', userId)
      .single();
    if (error) return res.status(400).json({ error });
    res.json({ profile: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  const userId = req.user.id; // Ensure `req.user.id` exists from authentication middleware

  try {
    // Fetch transactions where user is either buyer or seller
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .or('buyer_id.eq.' + userId + ',seller_id.eq.' + userId); // Corrected `or()` syntax

    if (error) {
      console.error('Supabase Error:', error); // Log error for debugging
      return res.status(400).json({ error: error.message || 'Failed to fetch transactions' });
    }

    return res.status(200).json({ transactions: data });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};