import { createClient } from '@supabase/supabase-js';
import type { Database } from '../supabasetypes';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase env vars VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set. Auth and data features will not work until they are provided.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Db = Database;
