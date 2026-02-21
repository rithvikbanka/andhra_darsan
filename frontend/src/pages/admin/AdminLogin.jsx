import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ─── Old demo-mode admin login (preserved for reference) ───
import { DEMO_ADMIN } from '../../demoData';
const handleDemoSubmit = (e) => {
  e.preventDefault();
  localStorage.setItem('token', 'demo-admin-token-12345');
  localStorage.setItem('user', JSON.stringify(DEMO_ADMIN));
  navigate('/admin/dashboard');
};
─── End old demo-mode logic ─── */

const ADMIN_EMAILS = ['hello@andhradarsan.com'];

const Spinner = ({ className = 'h-5 w-5' }) => (
  <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`} />
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signInWithEmail, signInWithGoogle, signOut } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && isAdmin) navigate('/admin', { replace: true });
  }, [user, isAdmin, navigate]);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user: signedInUser } = await signInWithEmail(email, password);
      if (!ADMIN_EMAILS.includes(signedInUser?.email?.toLowerCase())) {
        await signOut();
        setError('Access denied. This account does not have admin privileges.');
      }
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Invalid login credentials'))
        setError('Incorrect email or password.');
      else setError(msg || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <Spinner className="h-12 w-12 text-[#8B0000]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-[#8B0000] mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Restricted access — authorized personnel only</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@andhradarsan.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000] text-sm" required />
          </div>
          <div>
            <label htmlFor="admin-pw" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input id="admin-pw" type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000] text-sm" required />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Spinner /> Signing in...</> : 'Sign In to Admin'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-4 text-gray-500">or</span></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-[#8B0000]">← Back to main website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
