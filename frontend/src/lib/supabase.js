import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Set these in frontend/.env (local) and DigitalOcean env vars (production)
// REACT_APP_SUPABASE_URL=https://unalejnfkknqevwdfnyg.supabase.co
// REACT_APP_SUPABASE_ANON_KEY=eyJhbGci...

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase env vars missing. Auth is disabled.');
}

export { supabase };
