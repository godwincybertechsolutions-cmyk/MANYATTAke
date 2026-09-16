import { useQuery } from '@tanstack/react-query';
import { getProperties, getPropertyById, getPropertyBySlug } from '../services/properties';
import type { PropertyType } from '../types';

export function useProperties(type?: PropertyType) {
  return useQuery({
    queryKey: ['properties', type ?? 'all'],
    queryFn: () => getProperties(type),
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
