import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AlertCircle } from 'lucide-react';
// TODO: Re-enable when hooking to backend
// import { authAPI } from '../services/api';

// Demo mode: Using static data
import { DEMO_USER } from '../demoData';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoMessage, setShowDemoMessage] = useState(false);

  // TODO: Re-enable when hooking to backend
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);
  //
  //   try {
  //     if (isLogin) {
  //       // Login
  //       const response = await authAPI.login(formData.email, formData.password);
  //       localStorage.setItem('token', response.access_token);
  //       
  //       // Get user details
  //       const user = await authAPI.getMe();
  //       localStorage.setItem('user', JSON.stringify(user));
  //       
  //       navigate('/dashboard');
  //     } else {
  //       // Register
  //       const response = await authAPI.register(formData);
  //       localStorage.setItem('token', response.access_token);
  //       
  //       // Get user details
  //       const user = await authAPI.getMe();
  //       localStorage.setItem('user', JSON.stringify(user));
  //       
  //       navigate('/dashboard');
  //     }
  //   } catch (err) {
  //     console.error('Auth error:', err);
  //     setError(err.response?.data?.detail || 'Authentication failed');
  //     setLoading(false);
  //   }
  // };

  // Demo mode: Simulate login/signup without actual API calls
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      // Demo mode: Set demo user in localStorage and show message
      localStorage.setItem('token', 'demo-token-12345');
      localStorage.setItem('user', JSON.stringify(DEMO_USER));
      setShowDemoMessage(true);
      setLoading(false);
      
      // Navigate to dashboard after showing the message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 500);
  };

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
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <p className="text-sm text-[#5C5C5C] mt-2">
            {isLogin
              ? 'Login to manage your bookings and experiences'
              : 'Join us to book curated cultural experiences'}
          </p>
        </CardHeader>
        <CardContent>
          {/* Demo Mode Message */}
          {showDemoMessage && (
            <div className="bg-[#FFF8DC] border border-[#DAA520]/30 text-[#8B4513] px-4 py-3 rounded-md text-sm mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Demo Mode:</strong> Authentication is disabled. You're being logged in as a demo user. This page is only for preview purposes.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-[#8B0000] hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-6"
              disabled={loading || showDemoMessage}
            >
              {loading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#5C5C5C]">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[#8B0000] font-semibold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

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
