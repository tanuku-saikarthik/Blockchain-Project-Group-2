
import supabase from '../supabaseClient.js';

/**
 * Retrieve a user by email.
 */
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
  return data;
};

/**
 * Create a new user record.
 */
export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
        role_id: userData.role_id,
        age: userData.age,
        phone_number: userData.phone_number,
        pan_number: userData.pan_number,
        aadhaar_number: userData.aadhaar_number,
        aadhaar_file_url: userData.aadhaar_file_url,
        wallet_address: userData.wallet_address
      }
    ])
    .single();
  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }
  return data;
};
