import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Loader2, User, Mail, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import { COLORS, COMPONENT_STYLES, TYPOGRAPHY } from '../tokens';
import type { BookingLocationState, DbProperty, PropertyType } from '../types';
import {
  getPropertyById,
  getPropertyBySlug,
  getProperties,
} from '../services/properties';
import { calculateBookingTotal } from '../services/bookings';
import { getSupabaseErrorMessage } from '../utils/supabaseError';
import { usePreferences } from '../context/PreferencesContext';
import {
  CONCIERGE_1_DISPLAY,
  CONCIERGE_1_PHONE,
  CONCIERGE_2_DISPLAY,
  CONCIERGE_2_PHONE,
  CONTACT_EMAIL,
} from '../constants';

const TYPE_LABELS: Record<PropertyType, string> = {
  mountain: 'Mountain Villas',
  safari: 'Safaris',
  urban: 'Urban Apartments',
};

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = (location.state as BookingLocationState | null) ?? null;
  const { formatPrice } = usePreferences();

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [filterType, setFilterType] = useState<PropertyType | 'all'>(
    navState?.type ?? 'all'
  );
  const [property, setProperty] = useState<DbProperty | null>(null);
  const [catalog, setCatalog] = useState<DbProperty[]>([]);

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Booking Details
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState('');

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

  const constructBookingMessage = (): string => {
    if (!property) return '';
    return (
      `*NEW BOOKING REQUEST - NEW MANYATTA KENYA*\n\n` +
      `*Guest Name:* ${guestName.trim()}\n` +
      `*Email:* ${guestEmail.trim()}\n` +
      `*Phone:* ${guestPhone.trim()}\n` +
      `*Listing:* ${property.name}\n` +
      `*Location:* ${property.location}\n` +
      `*Check-in:* ${checkInDate}\n` +
      `*Check-out:* ${checkOutDate}\n` +
      `*Guests:* ${numberOfGuests}\n` +
      `*Estimated Total:* ${property.currency} ${estimatedTotal.toLocaleString()}\n` +
      `*Special Requests:* ${specialRequests.trim() || 'None'}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!guestName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!guestPhone.trim()) {
      setError('Please enter your phone/WhatsApp number.');
      return;
    }
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
    const msg = constructBookingMessage();
    setFormattedMessage(msg);
    setSuccess(true);
    setSubmitting(false);

    // Auto launch WhatsApp for Concierge 1
    const clean1 = CONCIERGE_1_PHONE.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${clean1}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getConcierge1WhatsappUrl = () => {
    const cleanNumber = CONCIERGE_1_PHONE.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedMessage)}`;
  };

  const getConcierge2WhatsappUrl = () => {
    const cleanNumber = CONCIERGE_2_PHONE.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedMessage)}`;
  };

  const getEmailMailtoUrl = () => {
    const subject = `Booking Request - ${property?.name ?? 'New Manyatta'}`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedMessage)}`;
  };

  if (success) {
    return (
      <div className="w-full bg-stone-50 min-h-[70vh] py-16 flex items-center justify-center">
        <Helmet>
          <title>Booking Request Sent | New Manyatta Kenya</title>
        </Helmet>
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h2 className="font-serif text-3xl text-dark mb-2">Request Ready to Send!</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We opened WhatsApp with your booking details formatted. If WhatsApp didn't open automatically, use any of the buttons below to reach our concierges directly via WhatsApp or Email.
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl text-left border border-gray-200/80 text-xs font-mono text-gray-700 whitespace-pre-wrap">
              {formattedMessage}
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={getConcierge1WhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-full font-bold uppercase tracking-wider text-xs shadow-md transition-all"
              >
                <MessageCircle size={18} />
                <span>{CONCIERGE_1_DISPLAY}</span>
              </a>

              <a
                href={getConcierge2WhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-full font-bold uppercase tracking-wider text-xs shadow-md transition-all"
              >
                <MessageCircle size={18} />
                <span>{CONCIERGE_2_DISPLAY}</span>
              </a>

              <a
                href={getEmailMailtoUrl()}
                className="w-full flex items-center justify-center gap-2 bg-dark hover:bg-black text-white py-3.5 px-6 rounded-full font-bold uppercase tracking-wider text-xs shadow-md transition-all"
              >
                <Mail size={18} />
                Send via Email ({CONTACT_EMAIL})
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setFormattedMessage('');
              }}
              className="text-xs text-gray-500 hover:text-primary underline font-medium pt-2 block mx-auto"
            >
              Modify Booking Details
            </button>
          </div>
        </div>
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
            Direct Reservations
          </span>
          <h1
            className="font-serif text-4xl md:text-5xl text-dark"
            style={{ fontFamily: TYPOGRAPHY.fontFamily.serif }}
          >
            Complete your booking request
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            No registration required. Submit your request directly to our company WhatsApp and Email.
          </p>
        </header>

        <div className={`${COMPONENT_STYLES.card.base} p-8`}>
          {loadingProduct ? (
            <div className="flex justify-center py-12 text-gray-500">
              <Loader2 className="animate-spin mr-2" size={24} />
              Loading listing…
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Listing Header */}
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

              {/* Category Filter */}
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

              {/* Property Select */}
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

              {/* Guest Details Section */}
              <div className="pt-2 border-t border-gray-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                  Guest Information
                </span>
                
                <div>
                  <label htmlFor="guest-name" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="guest-name"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className={COMPONENT_STYLES.input.base + ' pl-10'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guest-email" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="guest-email"
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className={COMPONENT_STYLES.input.base + ' pl-10'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="guest-phone" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="guest-phone"
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+254 700 000 000"
                        className={COMPONENT_STYLES.input.base + ' pl-10'}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="check-in" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                    Check in *
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
                    Check out *
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

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  Number of Guests
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

              {/* Special Requests */}
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

              {/* Total Calculation */}
              {estimatedTotal > 0 && property && (
                <div
                  className="rounded-xl px-5 py-4 flex justify-between items-center"
                  style={{ backgroundColor: COLORS.primaryBg }}
                >
                  <span className="text-sm font-medium text-gray-600">Estimated total</span>
                  <span className="font-serif text-2xl text-dark">
                    {formatPrice(estimatedTotal, property.currency)}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !property}
                className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-white flex items-center justify-center gap-2 disabled:opacity-50 ${COMPONENT_STYLES.button.primary}`}
              >
                <MessageCircle size={20} />
                <span>Submit Booking via WhatsApp & Email</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
