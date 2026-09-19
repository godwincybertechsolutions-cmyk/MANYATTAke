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

async function queryPropertiesTable(table: 'properties' | 'property_catalog', type?: PropertyType) {
  let query = supabase
    .from(table)
    .select(PROPERTY_COLUMNS)
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (type) query = query.eq('type', type);

  return query;
}

export async function getProperties(type?: PropertyType) {
  const primary = await queryPropertiesTable('properties', type);
  if (!primary.error && primary.data?.length) {
    return normalizeProperties(primary.data as DbProperty[]);
  }

  const fallback = await queryPropertiesTable('property_catalog', type);
  if (fallback.error) throw primary.error ?? fallback.error;
  return normalizeProperties(fallback.data as DbProperty[] | null);
}

export async function getPropertyById(id: string) {
  const primary = await supabase.from('properties').select(PROPERTY_COLUMNS).eq('id', id).maybeSingle();
  if (!primary.error && primary.data) return normalizeProperty(primary.data as DbProperty);

  const fallback = await supabase.from('property_catalog').select(PROPERTY_COLUMNS).eq('id', id).maybeSingle();
  if (fallback.error) throw primary.error ?? fallback.error;
  return fallback.data ? normalizeProperty(fallback.data as DbProperty) : null;
}

export async function getPropertyBySlug(slug: string) {
  const primary = await supabase.from('properties').select(PROPERTY_COLUMNS).eq('slug', slug).eq('is_available', true).maybeSingle();
  if (!primary.error && primary.data) return normalizeProperty(primary.data as DbProperty);

  const fallback = await supabase.from('property_catalog').select(PROPERTY_COLUMNS).eq('slug', slug).eq('is_available', true).maybeSingle();
  if (fallback.error) throw primary.error ?? fallback.error;
  return fallback.data ? normalizeProperty(fallback.data as DbProperty) : null;
}

export async function getLocalizedProperties(languageCode: string, currencyCode: string, type?: PropertyType) {
  const localized = await supabase.rpc('get_localized_properties', {
    p_lang_code: languageCode,
    p_currency_code: currencyCode,
  });

  if (!localized.error && localized.data?.length) {
    let properties = normalizeProperties(localized.data as DbProperty[]);
    if (type) properties = properties.filter((property) => property.type === type);
    return properties;
  }

  // Keep the booking flow working when the optional localization RPC is absent
  // or when the database stores listings in public.properties.
  return getProperties(type);
}
