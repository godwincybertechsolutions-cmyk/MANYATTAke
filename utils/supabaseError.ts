/** Supabase/PostgREST errors are plain objects, not Error instances */
export function getSupabaseErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object' && 'message' in err) {
    const msg = String((err as { message: unknown }).message);
    const details =
      'details' in err && (err as { details: unknown }).details
        ? ` (${String((err as { details: unknown }).details)})`
        : '';
    return msg + details;
  }
  return fallback;
}
