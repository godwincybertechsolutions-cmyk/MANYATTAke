import { supabase } from './supabase';
import type { DbProperty, PropertyType } from '../types';

const PROPERTY_COLUMNS = [
  'id',
  'type',
  'name',
  'slug',
  'description',
  'location',
  'price_per_night',
  'currency',
  'capacity',
  'bedrooms',
  'bathrooms',
  'amenities',
  'images',
  'is_available',
  'created_at',
].join(',');

function normalizeProperty(property: DbProperty): DbProperty {
  return {
    ...property,
    images: Array.from(new Set((property.images ?? []).filter(Boolean))),
  };
}

function normalizeProperties(properties: DbProperty[] | null): DbProperty[] {
  return (properties ?? []).map(normalizeProperty);
}

export async function getProperties(type?: PropertyType) {
  let query = supabase
    .from('property_catalog')
    .select(PROPERTY_COLUMNS)
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return normalizeProperties(data as DbProperty[] | null);
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('property_catalog')
    .select(PROPERTY_COLUMNS)
    .eq('id', id)
    .single();

  if (error) throw error;
  return normalizeProperty(data as DbProperty);
}

export async function getPropertyBySlug(slug: string) {
  const { data, error } = await supabase
    .from('property_catalog')
    .select(PROPERTY_COLUMNS)
    .eq('slug', slug)
    .eq('is_available', true)
    .maybeSingle();

  if (error) throw error;
  return data ? normalizeProperty(data as DbProperty) : null;
}
