import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
// TODO: Re-enable when email/password auth is ready
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// TODO: Re-enable when hooking to backend
// import { authAPI } from '../services/api';

// Demo mode imports kept for reference
// import { DEMO_USER } from '../demoData';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const { error: oauthError } = await signInWithGoogle();
      if (oauthError) setError(oauthError.message);
    } catch (err) {
      setError('Failed to start Google sign-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Old demo-mode fake login (commented out) ───
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', phone: ''
  });
  const [showDemoMessage, setShowDemoMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('token', 'demo-token-12345');
      localStorage.setItem('user', JSON.stringify(DEMO_USER));
      setShowDemoMessage(true);
      setLoading(false);
      setTimeout(() => { navigate('/dashboard'); }, 2000);
    }, 500);
  };
  ─── End old demo-mode logic ─── */

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B0000]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F0] to-white flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <Link to="/" className="inline-block mb-4">
            <div className="text-3xl font-serif font-bold text-[#8B0000]">
              Andhra Darsan
            </div>
          </Link>
          <CardTitle className="text-2xl text-[#2C2C2C]">
            Welcome
          </CardTitle>
          <p className="text-sm text-[#5C5C5C] mt-2">
            Sign in to manage your bookings and experiences
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Google OAuth sign-in */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-6 gap-3 text-base"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>

          {/* TODO: Re-enable when email/password auth is ready
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-6">
              Login
            </Button>
          </form>
          */}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-[#5C5C5C]">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
