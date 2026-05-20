import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Loader2,
  XCircle,
  Compass,
} from 'lucide-react';
import { useAuth } from '../src/auth/AuthContext';
import {
  COLORS,
  COMPONENT_STYLES,
  TYPOGRAPHY,
} from '../tokens';
import { cancelBooking, listUserBookings } from '../services/bookings';
import { getSupabaseErrorMessage } from '../utils/supabaseError';
import type { BookingWithDetails } from '../services/bookings';

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function statusBadgeClass(status: string) {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-600';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-amber-100 text-amber-800';
  }
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listUserBookings();
      setBookings(data);
    } catch (e) {
      setError(getSupabaseErrorMessage(e, 'Failed to load bookings.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleCancel = async (id: string) => {
    if (!window.confirm('Cancel this booking request?')) return;
    setCancellingId(id);
    try {
      await cancelBooking(id);
      await loadBookings();
    } catch (e) {
      setError(getSupabaseErrorMessage(e, 'Could not cancel booking.'));
    } finally {
      setCancellingId(null);
    }
  };

  const meta = user?.user_metadata;
  const displayName =
    [meta?.first_name, meta?.last_name].filter(Boolean).join(' ') ||
    user?.email?.split('@')[0] ||
    'Guest';

  return (
    <div className="w-full bg-stone-50 min-h-[70vh] py-16">
      <Helmet>
        <title>My Profile | New Manyatta Kenya</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={COMPONENT_STYLES.container.max}>
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-[0.3em] mb-2 block"
              style={{ color: COLORS.primary }}
            >
              Your account
            </span>
            <h1
              className="font-serif text-4xl text-dark"
              style={{ fontFamily: TYPOGRAPHY.fontFamily.serif }}
            >
              Hello, {displayName}
            </h1>
            <p className="text-gray-500 mt-2">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/booking"
              className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: COLORS.primary }}
            >
              New booking
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </header>

        <section>
          <h2 className="font-serif text-2xl text-dark mb-6">Booking history</h2>

          {loading && (
            <div className="flex items-center gap-2 text-gray-500 py-12 justify-center">
              <Loader2 className="animate-spin" size={22} />
              Loading bookings…
            </div>
          )}

          {error && (
            <p
              className="mb-6 px-4 py-3 rounded-lg text-sm"
              style={{ color: COLORS.error, backgroundColor: `${COLORS.error}12` }}
              role="alert"
            >
              {error}
            </p>
          )}

          {!loading && bookings.length === 0 && (
            <div className={`${COMPONENT_STYLES.card.base} p-10 text-center`}>
              <Compass size={40} className="mx-auto text-primary mb-4" />
              <p className="text-gray-600 mb-6">You have no bookings yet.</p>
              <Link
                to="/booking"
                className="inline-block px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-white"
                style={{ backgroundColor: COLORS.primary }}
              >
                Book your first stay
              </Link>
            </div>
          )}

          <div className="grid gap-6">
            {bookings.map((b) => {
              const title = b.properties?.name ?? 'Booking';
              const isSafari = b.properties?.type === 'safari';

              return (
                <article
                  key={b.id}
                  className={`${COMPONENT_STYLES.card.base} p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {isSafari ? (
                        <Compass size={18} style={{ color: COLORS.primary }} />
                      ) : (
                        <MapPin size={18} style={{ color: COLORS.primary }} />
                      )}
                      <h3 className="font-serif text-xl text-dark">{title}</h3>
                      <span
                        className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${statusBadgeClass(b.status)}`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar size={14} />
                      {formatDate(b.check_in_date)} — {formatDate(b.check_out_date)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {b.number_of_guests} guest{b.number_of_guests !== 1 ? 's' : ''}
                    </p>
                    {b.special_requests && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        &ldquo;{b.special_requests}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="font-serif text-2xl text-dark">
                      {b.currency} {Number(b.total_price).toLocaleString()}
                    </p>
                    {b.status === 'requested' && (
                      <button
                        type="button"
                        disabled={cancellingId === b.id}
                        onClick={() => handleCancel(b.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        <XCircle size={16} />
                        {cancellingId === b.id ? 'Cancelling…' : 'Cancel request'}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
