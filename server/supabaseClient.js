// supabaseClient.js
import { createClient }from '@supabase/supabase-js';

// Read environment variables
const supabaseUrl = process.env.SUPABASE_URL||'https://yivzvfseqfazsesqyjks.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY||'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpdnp2ZnNlcWZhenNlc3F5amtzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDU4MzcyNSwiZXhwIjoyMDU2MTU5NzI1fQ.XGeVwUlakiK0yaGe3nRSedKBOdr5AGc2qvYyAM-4uPI';

// Check if keys exist
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL and/or SUPABASE_ANON_KEY');
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
