import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../src/auth/AuthContext';
import { COLORS, COMPONENT_STYLES, TYPOGRAPHY, TRANSITIONS } from '../tokens';
import { getSupabaseErrorMessage } from '../utils/supabaseError';

type AuthTab = 'signin' | 'signup';

const Auth: React.FC = () => {
  const location = useLocation();
  const routeState = location.state as Record<string, unknown> | null;
  const tabFromState = routeState?.tab === 'signup' ? 'signup' : 'signin';

  const [tab, setTab] = useState<AuthTab>(tabFromState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const redirectTo = (routeState?.from as string | undefined) ?? '/';

  React.useEffect(() => {
    if (routeState?.tab === 'signup') setTab('signup');
    if (routeState?.tab === 'signin') setTab('signin');
  }, [location.state, routeState?.tab]);

  const bookingRedirectState = React.useMemo(() => {
    if (!routeState) return undefined;
    const { from: _from, ...rest } = routeState;
    return Object.keys(rest).length > 0 ? rest : undefined;
  }, [location.state]);

  React.useEffect(() => {
    if (user) {
      navigate(redirectTo, {
        replace: true,
        state: redirectTo === '/booking' ? bookingRedirectState : undefined,
      });
    }
  }, [user, navigate, redirectTo, bookingRedirectState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    try {
      if (tab === 'signup') {
        await signUp(email, password, firstName, lastName);
        setMessage(
          'Account created. Check your email to confirm your address, then sign in.'
        );
        setTab('signin');
      } else {
        await signIn(email, password);
        navigate(redirectTo, {
          replace: true,
          state: redirectTo === '/booking' ? bookingRedirectState : undefined,
        });
      }
    } catch (err) {
      setError(getSupabaseErrorMessage(err, 'Authentication failed. Please check your credentials and connection.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-stone-50 to-white">
      <Helmet>
        <title>Sign In | New Manyatta Kenya</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div
        className={`w-full max-w-md ${COMPONENT_STYLES.card.base} p-8`}
        style={{ fontFamily: TYPOGRAPHY.fontFamily.sans }}
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-dark mb-2">Welcome</h1>
          <p className="text-gray-500 text-sm">
            Sign in to book stays and manage your reservations.
          </p>
        </div>

        <div
          className="flex rounded-xl overflow-hidden border border-gray-200 mb-8"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'signin'}
            onClick={() => {
              setTab('signin');
              setError(null);
              setMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
              tab === 'signin'
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: tab === 'signin' ? COLORS.primary : 'transparent',
              transition: TRANSITIONS.base,
            }}
          >
            <LogIn size={16} /> Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'signup'}
            onClick={() => {
              setTab('signup');
              setError(null);
              setMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
              tab === 'signup'
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: tab === 'signup' ? COLORS.primary : 'transparent',
              transition: TRANSITIONS.base,
            }}
          >
            <UserPlus size={16} /> Sign Up
          </button>
        </div>

        {error && (
          <p
            className="mb-4 px-4 py-3 rounded-lg text-sm"
            style={{ backgroundColor: `${COLORS.error}15`, color: COLORS.error }}
            role="alert"
          >
            {error}
          </p>
        )}
        {message && (
          <p
            className="mb-4 px-4 py-3 rounded-lg text-sm"
            style={{ backgroundColor: `${COLORS.success}15`, color: COLORS.success }}
            role="status"
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  First name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={COMPONENT_STYLES.input.base + ' pl-10'}
                    placeholder="First"
                    autoComplete="given-name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={COMPONENT_STYLES.input.base}
                  placeholder="Last"
                  autoComplete="family-name"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={COMPONENT_STYLES.input.base + ' pl-10'}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-bold uppercase text-gray-500 mb-1 block">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={COMPONENT_STYLES.input.base + ' pl-10'}
                placeholder="••••••••"
                autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-full text-sm font-bold uppercase tracking-widest text-white disabled:opacity-60 ${COMPONENT_STYLES.button.primary}`}
            style={{ backgroundColor: COLORS.primary }}
          >
            {submitting
              ? 'Please wait…'
              : tab === 'signin'
                ? 'Sign In'
                : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link to="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
