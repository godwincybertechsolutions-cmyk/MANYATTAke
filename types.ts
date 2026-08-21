import React from 'react';

export type PropertyType = 'mountain' | 'safari' | 'urban';

export interface NavigationLink {
  name: string;
  path: string;
  submenu?: {
    name: string;
    path: string;
    icon?: React.ReactNode;
  }[];
}

export interface Amenity {
  icon: React.ReactNode;
  label: string;
}

export interface PricingTier {
  title: string;
  price: string;
  unit: string;
  features: string[];
}

export interface Activity {
  title: string;
  description: string;
  image: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  lodging: string;
}

export interface Itinerary {
  id: string;
  title: string;
  duration: string;
  locations: string[];
  description: string;
  image: string;
  pdf?: string;
  pricePerPerson: string;
  days: ItineraryDay[];
}

export interface Apartment {
  id: string;
  name: string;
  bedrooms: number;
  salePrice?: string;
  rentLongTerm: string;
  rentShortTerm: string;
  image: string;
  features: string[];
}

// Database schema types (matches Supabase SQL you executed)
export type BookingStatus = 'requested' | 'confirmed' | 'cancelled' | 'completed';

export interface DbUserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  nationality: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbProperty {
  id: string;
  type: PropertyType;
  name: string;
  slug: string;
  description: string | null;
  location: string;
  price_per_night: number;
  currency: string;
  capacity: number;
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[] | null;
  images: string[] | null;
  is_available: boolean;
  created_at: string;
}

export interface DbBooking {
  id: string;
  user_id: string;
  property_id: string | null;
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  total_price: number;
  currency: string;
  status: BookingStatus;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

/** Passed via react-router location.state when navigating to /booking */
export interface BookingLocationState {
  propertyId?: string;
  slug?: string;
  name: string;
  type?: PropertyType;
}
