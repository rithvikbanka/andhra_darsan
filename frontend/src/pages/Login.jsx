import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoFull from '../assets/logo-full.png';

/* ─── Old demo-mode fake login (preserved for reference) ───
import { DEMO_USER } from '../demoData';
const handleDemoSubmit = (e) => {
  e.preventDefault();
  localStorage.setItem('token', 'demo-token-12345');
  localStorage.setItem('user', JSON.stringify(DEMO_USER));
  navigate('/dashboard');
};
─── End old demo-mode logic ─── */

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Spinner = ({ className = 'h-5 w-5' }) => (
  <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`} />
);

const Login = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const [mode, setMode] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user) {
      const redirect = sessionStorage.getItem('redirectAfterLogin');
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirect || '/', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
      setGoogleLoading(false);
    }
  }, [user]);

  const clearState = () => {
    setError('');
    setSuccess('');
    setFieldErrors({});
  };

  const switchMode = (m) => {
    setMode(m);
    clearState();
  };

  const validateSignup = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email format';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8) errs.password = 'Min. 8 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    clearState();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Invalid login credentials'))
        setError('Incorrect email or password. Please try again.');
      else if (msg.includes('Email not confirmed'))
        setError('Please check your inbox and confirm your email before signing in.');
      else setError(msg || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    clearState();
    if (!validateSignup()) return;
    setLoading(true);
    try {
      await signUpWithEmail(email, password, fullName);
      setSuccess(email);
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('already registered'))
        setError('An account with this email already exists. Try signing in instead.');
      else setError(msg || 'Sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    clearState();
    if (!email.trim()) { setFieldErrors({ email: 'Please enter your email address' }); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(email);
    } catch {
      setSuccess(email);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    clearState();
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
      setGoogleLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <Spinner className="h-12 w-12 text-[#8B0000]" />
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border ${fieldErrors[field] ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-[#8B0000]'} focus:outline-none focus:ring-2 text-sm`;

  const PasswordInput = ({ value, onChange, show, onToggle, placeholder, id, field }) => (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass(field)}
      />
      <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );

  const FieldError = ({ field }) =>
    fieldErrors[field] ? <p className="text-red-600 text-xs mt-1">{fieldErrors[field]}</p> : null;

  const ErrorBanner = () =>
    error ? (
      <div className={`${error.includes('check your inbox') ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-red-50 border-red-200 text-red-700'} border px-4 py-3 rounded-lg text-sm mb-4 flex items-start gap-3`}>
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <span>{error}</span>
      </div>
    ) : null;

  const Divider = () => (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
      <div className="relative flex justify-center text-sm"><span className="bg-white px-4 text-gray-500">or continue with</span></div>
    </div>
  );

  const GoogleButton = () => (
    <button
      type="button"
      onClick={handleGoogle}
      disabled={googleLoading}
      className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
    >
      {googleLoading ? <Spinner /> : <GoogleIcon />}
      {googleLoading ? 'Redirecting...' : 'Continue with Google'}
    </button>
  );

  /* ═══════ FORGOT PASSWORD MODE ═══════ */
  if (mode === 'forgot') {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <button onClick={() => switchMode('signin')} className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#8B0000] mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {success ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 text-sm mb-6">
                If <strong>{success}</strong> is registered, you'll receive a reset link shortly. The link expires in 1 hour.
              </p>
              <button onClick={() => { setSuccess(''); }} className="text-sm text-gray-500 hover:text-[#8B0000] underline">
                Resend email
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Reset your password</h2>
              <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link</p>
              <ErrorBanner />
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input id="forgot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className={inputClass('email')} />
                  <FieldError field="email" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><Spinner /> Sending...</> : 'Send Reset Link'}
                </button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-6">
                <Link to="/forgot-email" className="text-[#8B0000] hover:underline">Forgot which email you used?</Link>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ═══════ SIGN UP SUCCESS ═══════ */
  if (mode === 'signup' && success) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account created!</h2>
          <p className="text-gray-600 text-sm mb-6">
            Please check your email at <strong>{success}</strong> and click the confirmation link to activate your account.
          </p>
          <button onClick={() => switchMode('signin')} className="text-[#8B0000] font-semibold hover:underline text-sm">
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  /* ═══════ SIGN IN / SIGN UP MODE ═══════ */
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo with text fallback */}
        <Link to="/" className="block text-center mb-6">
          <img
            src={logoFull}
            alt="Andhra Darsan"
            className="h-16 mx-auto"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }}
          />
          <span className="text-2xl font-serif font-bold text-[#8B0000]" style={{ display: 'none' }}>Andhra Darsan</span>
        </Link>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => switchMode('signin')}
            className={`flex-1 pb-3 text-sm font-medium transition-colors ${mode === 'signin' ? 'border-b-2 border-[#8B0000] text-[#8B0000]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`flex-1 pb-3 text-sm font-medium transition-colors ${mode === 'signup' ? 'border-b-2 border-[#8B0000] text-[#8B0000]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Create Account
          </button>
        </div>

        <ErrorBanner />

        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="si-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="si-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className={inputClass('email')} required />
            </div>
            <div>
              <label htmlFor="si-pw" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <PasswordInput id="si-pw" value={password} onChange={(e) => setPassword(e.target.value)} show={showPw} onToggle={() => setShowPw(!showPw)} placeholder="Enter your password" field="password" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-gray-300 text-[#8B0000] focus:ring-[#8B0000]" />
                Remember me
              </label>
              <button type="button" onClick={() => switchMode('forgot')} className="text-sm text-[#8B0000] hover:underline">Forgot Password?</button>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Spinner /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="su-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="su-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className={inputClass('fullName')} />
              <FieldError field="fullName" />
            </div>
            <div>
              <label htmlFor="su-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="su-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className={inputClass('email')} />
              <FieldError field="email" />
            </div>
            <div>
              <label htmlFor="su-pw" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <PasswordInput id="su-pw" value={password} onChange={(e) => setPassword(e.target.value)} show={showPw} onToggle={() => setShowPw(!showPw)} placeholder="Min. 8 characters" field="password" />
              <FieldError field="password" />
            </div>
            <div>
              <label htmlFor="su-cpw" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <PasswordInput id="su-cpw" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} show={showConfirmPw} onToggle={() => setShowConfirmPw(!showConfirmPw)} placeholder="Confirm your password" field="confirmPassword" />
              <FieldError field="confirmPassword" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Spinner /> Creating account...</> : 'Create Account'}
            </button>
          </form>
        )}

        <Divider />
        <GoogleButton />

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
