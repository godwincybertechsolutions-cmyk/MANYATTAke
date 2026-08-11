import { isSupabaseConfigured } from '../services/supabase';

/** Supabase/PostgREST errors are plain objects, not Error instances */
export function getSupabaseErrorMessage(err: unknown, fallback: string): string {
  if (!isSupabaseConfigured) {
    return 'Supabase backend is not configured on Vercel. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel Project Settings, then redeploy.';
  }

  let rawMessage = fallback;

  if (err instanceof Error) {
    rawMessage = err.message;
  } else if (err && typeof err === 'object' && 'message' in err) {
    const msg = String((err as { message: unknown }).message);
    const details =
      'details' in err && (err as { details: unknown }).details
        ? ` (${String((err as { details: unknown }).details)})`
        : '';
    rawMessage = msg + details;
  }

  if (
    rawMessage.toLowerCase().includes('failed to fetch') ||
    rawMessage.toLowerCase().includes('networkerror')
  ) {
    return 'Failed to connect to Supabase. Please ensure your Vercel Environment Variables (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY) are set correctly and your Supabase project is active.';
  }

  return rawMessage;
}

