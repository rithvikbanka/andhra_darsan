import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    if (isLogin) {
      if (formData.email && formData.password) {
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Please enter email and password');
      }
    } else {
      if (formData.email && formData.password && formData.name && formData.phone) {
        alert('Account created successfully!');
        navigate('/dashboard');
      } else {
        alert('Please fill in all fields');
      }
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
            >
              {isLogin ? 'Login' : 'Create Account'}
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
