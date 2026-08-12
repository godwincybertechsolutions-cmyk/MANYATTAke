import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, LoaderCircle, XCircle } from 'lucide-react';
import { supabase } from '../services/supabase';
import { COLORS, COMPONENT_STYLES } from '../tokens';

const AuthConfirm: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Confirming your email address…');

  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | undefined;

    const finish = (nextStatus: 'success' | 'error', nextMessage: string) => {
      if (!mounted) return;
      setStatus(nextStatus);
      setMessage(nextMessage);
    };

    const confirm = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          finish('error', 'This confirmation link is invalid or has expired.');
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        finish('error', 'We could not confirm your email. Please request a new link.');
        return;
      }

      if (data.session) {
        finish('success', 'Your email has been confirmed. Redirecting you now…');
        window.setTimeout(() => navigate('/', { replace: true }), 1200);
        return;
      }

      subscription = supabase.auth.onAuthStateChange((event, session) => {
        if (session && ['SIGNED_IN', 'TOKEN_REFRESHED', 'INITIAL_SESSION'].includes(event)) {
          finish('success', 'Your email has been confirmed. Redirecting you now…');
          window.setTimeout(() => navigate('/', { replace: true }), 1200);
        }
      }).data.subscription;

      window.setTimeout(() => {
        if (mounted && status === 'loading') {
          finish('error', 'This confirmation link is invalid or has expired.');
        }
      }, 8000);
    };

    confirm().catch(() => finish('error', 'We could not confirm your email. Please request a new link.'));

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [navigate, status]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-stone-50 to-white">
      <Helmet>
        <title>Confirm Email | New Manyatta Kenya</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={`${COMPONENT_STYLES.card.base} w-full max-w-md p-8 text-center`}>
        {status === 'loading' && <LoaderCircle className="mx-auto mb-5 animate-spin" size={44} style={{ color: COLORS.primary }} />}
        {status === 'success' && <CheckCircle2 className="mx-auto mb-5" size={44} style={{ color: COLORS.success }} />}
        {status === 'error' && <XCircle className="mx-auto mb-5" size={44} style={{ color: COLORS.error }} />}
        <h1 className="font-serif text-3xl text-dark mb-3">
          {status === 'loading' ? 'Confirming your email' : status === 'success' ? 'Email confirmed' : 'Confirmation failed'}
        </h1>
        <p className="text-gray-500 leading-relaxed">{message}</p>
        {status === 'error' && (
          <Link to="/auth" className="inline-block mt-6 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-white" style={{ backgroundColor: COLORS.primary }}>
            Return to sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthConfirm;
