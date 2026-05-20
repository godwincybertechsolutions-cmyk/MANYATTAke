import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Loader2 } from 'lucide-react';
import { COLORS, COMPONENT_STYLES, TYPOGRAPHY } from '../tokens';
import type { BookingLocationState, DbProperty, PropertyType } from '../types';
import {
  getPropertyById,
  getPropertyBySlug,
  getProperties,
} from '../services/properties';
import { createBooking, calculateBookingTotal } from '../services/bookings';
import { getSupabaseErrorMessage } from '../utils/supabaseError';

const TYPE_LABELS: Record<PropertyType, string> = {
  mountain: 'Mountain Villas',
  safari: 'Safaris',
  urban: 'Urban Apartments',
};

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = (location.state as BookingLocationState | null) ?? null;

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [filterType, setFilterType] = useState<PropertyType | 'all'>(
    navState?.type ?? 'all'
  );
  const [property, setProperty] = useState<DbProperty | null>(null);
  const [catalog, setCatalog] = useState<DbProperty[]>([]);

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingProduct(true);
      setError(null);
      try {
        const all = await getProperties();
        if (cancelled) return;
        setCatalog(all);

        let selected: DbProperty | null = null;
        if (navState?.propertyId) {
          selected = await getPropertyById(navState.propertyId);
        } else if (navState?.slug) {
          selected = await getPropertyBySlug(navState.slug);
        } else if (navState?.type) {
          selected = all.find((p) => p.type === navState.type) ?? null;
        }

        if (selected) {
          setProperty(selected);
          setFilterType(selected.type);
          setNumberOfGuests(Math.min(2, selected.capacity));
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            getSupabaseErrorMessage(
              e,
              'Could not load listings. Check that the properties table exists and RLS allows public read.'
            )
          );
        }
      } finally {
        if (!cancelled) setLoadingProduct(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [navState?.propertyId, navState?.slug, navState?.type]);

  const filteredCatalog = useMemo(() => {
    if (filterType === 'all') return catalog;
    return catalog.filter((p) => p.type === filterType);
  }, [catalog, filterType]);

  const estimatedTotal = useMemo(() => {
    if (!property || !checkInDate || !checkOutDate) return 0;
    return calculateBookingTotal(
      Number(property.price_per_night),
      checkInDate,
      checkOutDate
    );
  }, [property, checkInDate, checkOutDate]);

  const handleSelectProperty = (id: string) => {
    const p = catalog.find((x) => x.id === id);
    if (p) {
      setProperty(p);
      setFilterType(p.type);
      setNumberOfGuests(Math.min(numberOfGuests, p.capacity));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!property) {
      setError('Please select a listing.');
      return;
    }
    if (!checkInDate || !checkOutDate) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setError('Check-out must be after check-in.');
      return;
    }
    if (numberOfGuests > property.capacity) {
      setError(`Maximum ${property.capacity} guests for this listing.`);
      return;
    }

    setSubmitting(true);
    try {
      await createBooking({
        propertyId: property.id,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        totalPrice: estimatedTotal,
        currency: property.currency,
        specialRequests: specialRequests || undefined,
      });
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      setError(getSupabaseErrorMessage(err, 'Booking failed.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-6 py-20 text-center max-w-lg">
        <h2 className="font-serif text-3xl text-dark mb-4">Request received</h2>
        <p className="text-gray-600">
          Your booking request has been submitted. Redirecting to your profile…
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-stone-50 min-h-[70vh] py-16">
      <Helmet>
        <title>Book Your Stay | New Manyatta Kenya</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={`${COMPONENT_STYLES.container.max} max-w-2xl`}>
        <header className="mb-10 text-center">
          <span
            className="text-xs font-bold uppercase tracking-[0.3em] mb-2 block"
            style={{ color: COLORS.primary }}
          >
            Reservations
          </span>
          <h1
            className="font-serif text-4xl md:text-5xl text-dark"
            style={{ fontFamily: TYPOGRAPHY.fontFamily.serif }}
          >
            Complete your booking
          </h1>
        </header>

        <div className={`${COMPONENT_STYLES.card.base} p-8`}>
          {loadingProduct ? (
            <div className="flex justify-center py-12 text-gray-500">
              <Loader2 className="animate-spin mr-2" size={24} />
              Loading listing…
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-start gap-2 text-dark pb-4 border-b border-gray-100">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-serif text-xl block">
                    {property?.name ?? navState?.name ?? 'Select a listing'}
                  </span>
                  {property?.location && (
                    <span className="text-sm text-gray-500">{property.location}</span>
                  )}
                </div>
              </div>

              {!property && filteredCatalog.length > 0 && (
                <p className="text-sm text-amber-700 bg-amber-50 px-4 py-3 rounded-lg">
                  Choose a listing below, or return to a property page to pre-select one.
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {(['all', 'mountain', 'safari', 'urban'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      filterType === t
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {t === 'all' ? 'All' : TYPE_LABELS[t]}
                  </button>
                ))}
              </div>

              <div>
                <label htmlFor="listing-select" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  Listing
                </label>
                <select
                  id="listing-select"
                  className={COMPONENT_STYLES.input.base}
                  value={property?.id ?? ''}
                  onChange={(e) => handleSelectProperty(e.target.value)}
                >
                  <option value="">Select a listing…</option>
                  {filteredCatalog.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.currency} {Number(p.price_per_night).toLocaleString()}
                      {p.type === 'safari' ? ' (package)' : '/night'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="check-in" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                    Check in
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                    <input
                      id="check-in"
                      type="date"
                      required
                      value={checkInDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className={COMPONENT_STYLES.input.base + ' pl-10'}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="check-out" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                    Check out
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                    <input
                      id="check-out"
                      type="date"
                      required
                      value={checkOutDate}
                      min={checkInDate || undefined}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className={COMPONENT_STYLES.input.base + ' pl-10'}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  Guests
                </label>
                <div className="relative">
                  <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    id="guests"
                    type="number"
                    min={1}
                    max={property?.capacity ?? 20}
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                    className={COMPONENT_STYLES.input.base + ' pl-10'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="requests" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  Special requests (optional)
                </label>
                <textarea
                  id="requests"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className={COMPONENT_STYLES.input.base + ' resize-none'}
                  placeholder="Dietary needs, arrival time, etc."
                />
              </div>

              {estimatedTotal > 0 && property && (
                <div
                  className="rounded-xl px-5 py-4 flex justify-between items-center"
                  style={{ backgroundColor: COLORS.primaryBg }}
                >
                  <span className="text-sm font-medium text-gray-600">Estimated total</span>
                  <span className="font-serif text-2xl text-dark">
                    {property.currency} {estimatedTotal.toLocaleString()}
                  </span>
                </div>
              )}

              {error && (
                <p
                  className="text-sm px-4 py-3 rounded-lg"
                  style={{ color: COLORS.error, backgroundColor: `${COLORS.error}12` }}
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !property}
                className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-white disabled:opacity-50 ${COMPONENT_STYLES.button.primary}`}
              >
                {submitting ? 'Submitting…' : 'Submit booking request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
