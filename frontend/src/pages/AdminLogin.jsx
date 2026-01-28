import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login with FormData as OAuth2PasswordRequestForm expects
      const formDataObj = new FormData();
      formDataObj.append('username', formData.email);
      formDataObj.append('password', formData.password);

      const response = await axios.post(`${API}/auth/login`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Store token
      localStorage.setItem('token', response.data.access_token);

      // Get user details
      const userResponse = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${response.data.access_token}` }
      });

      // Check if admin
      if (!userResponse.data.is_admin) {
        setError('Access denied. Admin privileges required.');
        localStorage.removeItem('token');
        setLoading(false);
        return;
      }

      // Store user info
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F0] to-white flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="text-3xl font-serif font-bold text-[#8B0000] mb-4">
            Andhra Darsan
          </div>
          <CardTitle className="text-2xl text-[#2C2C2C]">Admin Login</CardTitle>
          <p className="text-sm text-[#5C5C5C] mt-2">
            Access admin dashboard and management tools
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@andhradarsan.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-6"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to Admin Panel'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-[#5C5C5C]">
              Default credentials: admin@andhradarsan.com / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
