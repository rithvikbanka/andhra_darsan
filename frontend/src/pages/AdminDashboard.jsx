import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, DollarSign, Package, Users, TrendingUp, Clock, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [statsRes, bookingsRes, experiencesRes, subscribersRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, config),
        axios.get(`${API}/admin/bookings`, config),
        axios.get(`${API}/experiences`),
        axios.get(`${API}/admin/newsletter/subscribers`, config)
      ]);

      setStats(statsRes.data);
      setBookings(bookingsRes.data);
      setExperiences(experiencesRes.data);
      setSubscribers(subscribersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/admin/login');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/90">Manage bookings, experiences, and view analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5C5C5C]">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-5 h-5 text-[#8B0000]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2C2C2C]">
                ₹{stats.total_revenue.toLocaleString()}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">
                From {stats.confirmed_bookings} confirmed bookings
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5C5C5C]">
                Total Bookings
              </CardTitle>
              <Calendar className="w-5 h-5 text-[#DAA520]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2C2C2C]">
                {stats.total_bookings}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">
                {stats.cancelled_bookings} cancelled
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5C5C5C]">
                Experiences
              </CardTitle>
              <Package className="w-5 h-5 text-[#8B0000]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2C2C2C]">
                {stats.total_experiences}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">
                Active cultural experiences
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5C5C5C]">
                Total Users
              </CardTitle>
              <Users className="w-5 h-5 text-[#DAA520]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2C2C2C]">
                {stats.total_users}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">
                Registered customers
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5C5C5C]">
                Confirmed Bookings
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2C2C2C]">
                {stats.confirmed_bookings}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">
                Active bookings
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5C5C5C]">
                Avg. Booking Value
              </CardTitle>
              <DollarSign className="w-5 h-5 text-[#8B0000]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2C2C2C]">
                ₹{stats.confirmed_bookings > 0 ? Math.round(stats.total_revenue / stats.confirmed_bookings).toLocaleString() : 0}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">
                Per booking
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5C5C5C]">
                Newsletter Subscribers
              </CardTitle>
              <Mail className="w-5 h-5 text-[#DAA520]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2C2C2C]">
                {stats.total_subscribers}
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1">
                Active subscribers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings and Experiences Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="subscribers">Newsletter</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-[#5C5C5C] py-8">No bookings yet</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 10).map((booking) => (
                      <div key={booking.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-[#2C2C2C]">{booking.experience_title}</h4>
                            <p className="text-sm text-[#5C5C5C]">{booking.customer_name} • {booking.customer_email}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#5C5C5C]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {booking.date} at {booking.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {booking.guests.adults} Adults, {booking.guests.kids} Kids
                          </span>
                          <span className="font-semibold text-[#8B0000]">
                            ₹{booking.total_price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiences">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>All Experiences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-semibold text-[#2C2C2C] mb-1">{exp.title}</h4>
                            <p className="text-sm text-[#5C5C5C] mb-2">{exp.category} • {exp.location}</p>
                            <div className="flex items-center gap-3 text-xs text-[#5C5C5C]">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {exp.duration}
                              </span>
                              <span className="font-semibold text-[#8B0000]">
                                ₹{exp.price}
                              </span>
                              <span>★ {exp.rating}</span>
                            </div>
                          </div>
                        </div>
                        {exp.featured && (
                          <span className="px-2 py-1 bg-[#DAA520] text-white text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <p className="text-center text-[#5C5C5C] py-8">No subscribers yet</p>
                ) : (
                  <div className="space-y-3">
                    {subscribers.map((subscriber, index) => (
                      <div key={subscriber.id} className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#DAA520]/10 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-[#DAA520]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#2C2C2C]">{subscriber.email}</p>
                            <p className="text-xs text-[#5C5C5C]">
                              Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
