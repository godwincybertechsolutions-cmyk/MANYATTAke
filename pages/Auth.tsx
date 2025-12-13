import React, { useState } from 'react';
import { supabase } from '../src/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const callback = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(callback);
      } else {
        // Sign up and set a profile row using trigger/edge or client-side insert
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
        if (error) throw error;
        setMessage('Account created. Please check your email to confirm, then log in.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin + '/#' + callback } });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white shadow-xl border border-gray-100 rounded-xl p-8">
        <h1 className="text-2xl font-serif mb-1">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
        <p className="text-gray-500 mb-6">Use email and password or continue with a provider.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Jane Doe" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {message && <div className="text-sm text-green-600">{message}</div>}

          <button type="submit" disabled={loading} className="w-full bg-dark hover:bg-black text-white rounded-md py-2.5">
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign up'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs uppercase tracking-wider text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleOAuth('google')} className="border rounded-md py-2 font-medium hover:bg-gray-50">Google</button>
          <button onClick={() => handleOAuth('github')} className="border rounded-md py-2 font-medium hover:bg-gray-50">GitHub</button>
        </div>

        <p className="mt-6 text-sm text-gray-600 text-center">
          {isLogin ? (
            <>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-primary font-medium">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setIsLogin(true)} className="text-primary font-medium">Login</button></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
