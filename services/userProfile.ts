import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

/**
 * Ensures a row exists in public.user_profiles for the signed-in auth user.
 * Required because bookings.user_id references user_profiles(id), not auth.users.
 */
export async function ensureUserProfile(user: User): Promise<void> {
  if (!user.email) {
    throw new Error('Your account has no email address. Cannot sync profile.');
  }

  const { data: existing, error: readError } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (readError) throw readError;
  if (existing) return;

  const { error: insertError } = await supabase.from('user_profiles').insert({
    id: user.id,
    email: user.email,
    first_name: (user.user_metadata?.first_name as string | undefined) ?? '',
    last_name: (user.user_metadata?.last_name as string | undefined) ?? '',
  });

  if (insertError) {
    // Another request or the DB trigger may have created the row first
    if (insertError.code === '23505') return;
    throw insertError;
  }
}
