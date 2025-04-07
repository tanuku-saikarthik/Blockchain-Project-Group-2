// supabaseClient.js
import { createClient }from '@supabase/supabase-js';

// Read environment variables
const supabaseUrl = process.env.SUPABASE_URL||'https://yivzvfseqfazsesqyjks.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Check if keys exist
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL and/or SUPABASE_ANON_KEY');
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
