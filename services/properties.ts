import { supabase } from './supabase';
import type { DbProperty, PropertyType } from '../types';

export async function getProperties(type?: PropertyType) {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as DbProperty[];
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as DbProperty;
}

export async function getPropertyBySlug(slug: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('is_available', true)
    .maybeSingle();

  if (error) throw error;
  return data as DbProperty | null;
}
