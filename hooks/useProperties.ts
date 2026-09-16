import { useQuery } from '@tanstack/react-query';
import { getLocalizedProperties, getPropertyById, getPropertyBySlug } from '../services/properties';
import type { PropertyType } from '../types';
import { usePreferences, GOOGLE_TRANSLATE_LANGUAGES } from '../context/PreferencesContext';

export function useProperties(type?: PropertyType) {
  const { language, currency } = usePreferences();
  const langCode = GOOGLE_TRANSLATE_LANGUAGES.find((option) => option.label === language)?.code ?? 'en';

  return useQuery({
    queryKey: ['properties', type ?? 'all', langCode, currency],
    queryFn: () => getLocalizedProperties(langCode, currency, type),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePropertyById(id?: string) {
  return useQuery({
    queryKey: ['property', 'id', id],
    queryFn: () => (id ? getPropertyById(id) : null),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePropertyBySlug(slug?: string) {
  return useQuery({
    queryKey: ['property', 'slug', slug],
    queryFn: () => (slug ? getPropertyBySlug(slug) : null),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
