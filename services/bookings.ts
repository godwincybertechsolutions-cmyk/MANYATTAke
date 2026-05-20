import { supabase } from './supabase';
import type { BookingStatus, DbBooking, DbProperty } from '../types';
import { ensureUserProfile } from './userProfile';

export interface CreateBookingInput {
  propertyId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  currency: string;
  specialRequests?: string;
}

export type BookingWithDetails = DbBooking & {
  properties?: Pick<DbProperty, 'id' | 'name' | 'slug' | 'type' | 'location'> | null;
};

function nightsBetween(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const ms = end.getTime() - start.getTime();
  return Math.max(Math.ceil(ms / (1000 * 60 * 60 * 24)), 1);
}

export function calculateBookingTotal(
  pricePerNight: number,
  checkInDate: string,
  checkOutDate: string
): number {
  return pricePerNight * nightsBetween(checkInDate, checkOutDate);
}

export async function createBooking(input: CreateBookingInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be signed in to create a booking.');

  await ensureUserProfile(user);

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      property_id: input.propertyId,
      check_in_date: input.checkInDate,
      check_out_date: input.checkOutDate,
      number_of_guests: input.numberOfGuests,
      total_price: input.totalPrice,
      currency: input.currency,
      status: 'requested' as BookingStatus,
      special_requests: input.specialRequests ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbBooking;
}

export async function listUserBookings() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be signed in to view bookings.');

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      properties ( id, name, slug, type, location )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as BookingWithDetails[];
}

export async function cancelBooking(bookingId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be signed in to cancel a booking.');

  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' as BookingStatus })
    .eq('id', bookingId)
    .eq('user_id', user.id)
    .eq('status', 'requested')
    .select()
    .single();

  if (error) throw error;
  return data as DbBooking;
}
