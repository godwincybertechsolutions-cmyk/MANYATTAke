import { supabase, isSupabaseConfigured } from './supabase';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { ensureUserProfile } from './userProfile';

export interface SignUpOptions {
  firstName?: string;
  lastName?: string;
}

export async function signUp(
  email: string,
  password: string,
  options?: SignUpOptions
) {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase environment variables are missing on Vercel. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel Project Settings, then redeploy.'
    );
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/#/auth/confirm`,
      data: {
        first_name: options?.firstName ?? '',
        last_name: options?.lastName ?? '',
      },
    },
  });
  if (error) throw error;
  if (data.user) await ensureUserProfile(data.user);
  return data;
}

export async function signIn(email: string, password: string) {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase environment variables are missing on Vercel. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel Project Settings, then redeploy.'
    );
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (data.user) await ensureUserProfile(data.user);
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.warn('[auth] getCurrentUser error:', error.message);
      return null;
    }
    return data?.user ?? null;
  } catch (err) {
    console.warn('[auth] getCurrentUser exception:', err);
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn('[auth] getSession error:', error.message);
      return null;
    }
    return data?.session ?? null;
  } catch (err) {
    console.warn('[auth] getSession exception:', err);
    return null;
  }
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
) {
  try {
    return supabase.auth.onAuthStateChange(callback);
  } catch (err) {
    console.warn('[auth] onAuthStateChange error:', err);
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
}

