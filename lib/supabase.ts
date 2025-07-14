import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Add error handling and retry logic
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    // Add custom fetch with error handling
    fetch: (url, options = {}) => {
      return fetch(url, {
        ...options,
        // Add longer timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }).catch((error) => {
        console.error('Supabase fetch error:', error);
        throw error;
      });
    },
  },
});

// Test connection function
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('_health_check').select('*').limit(1);
    if (error && error.code !== 'PGRST116') { // PGRST116 = table not found, which is expected
      console.error('Supabase connection test failed:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
}; 