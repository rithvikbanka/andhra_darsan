import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, TrendingUp, Users, Package, DollarSign, CheckCircle, Mail, Pencil } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { getExperiences, getExperienceStats } from '../../utils/localStorage';
import ExperienceFormModal from '../../components/admin/ExperienceFormModal';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    cancelledBookings: 0,
    confirmedBookings: 0,
    totalUsers: 0,
    avgBookingValue: 0,
    newsletterSubscribers: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const experiencesData = getExperiences();
    setExperiences(experiencesData);
    
    const expStats = getExperienceStats();
    setStats(prev => ({
      ...prev,
      experiences: expStats.total,
      featured: expStats.featured
    }));
  };

  const handleEdit = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
    loadData(); // Reload data after save
    toast.success(selectedExperience ? 'Experience updated successfully!' : 'Experience added successfully!');
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      subtitle: `from ${stats.confirmedBookings} confirmed bookings`,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      subtitle: `${stats.cancelledBookings} cancelled`,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Experiences',
      value: experiences.length,
      subtitle: `${experiences.filter(e => e.featured).length} featured`,
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      subtitle: 'registered customers',
      icon: Users,
      color: 'text-orange-600'
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmedBookings,
      subtitle: 'active bookings',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Booking Value',
      value: `₹${stats.avgBookingValue.toLocaleString()}`,
      subtitle: 'per booking',
      icon: TrendingUp,
      color: 'text-indigo-600'
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletterSubscribers,
      subtitle: 'active subscribers',
      icon: Mail,
      color: 'text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-[#8B0000] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
              <p className="text-white/80 mt-1">Andhra Darsan Management</p>
            </div>
            <Link to="/">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View Website
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                    <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="experiences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>

          {/* Recent Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recent Bookings</h2>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No bookings yet. Bookings will appear here once customers start booking experiences.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">All Experiences</h2>
                  <Link to="/admin/experiences">
                    <Button className="bg-[#8B0000] hover:bg-[#6B0000]">
                      Manage Experiences
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experiences.map((exp) => (
                    <Card key={exp.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={exp.imageUrl || exp.image}
                          alt={exp.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {exp.featured && (
                          <Badge className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600">
                            Featured
                          </Badge>
                        )}
                        <Badge className="absolute top-3 left-3 bg-white text-gray-800">
                          {exp.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{exp.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-semibold">{exp.rating}</span>
                            </div>
                            <span className="font-bold text-[#8B0000]">₹{exp.price.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        {/* Quick Edit Button */}
                        <Button
                          onClick={() => handleEdit(exp)}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white gap-2"
                          aria-label={`Edit ${exp.title}`}
                        >
                          <Pencil className="w-4 h-4" />
                          Quick Edit
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {experiences.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No experiences yet. Add your first experience to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletter Tab */}
          <TabsContent value="newsletter" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Newsletter Subscribers</h2>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No subscribers yet. Subscribers will appear here when users sign up for the newsletter.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Experience Form Modal - Shared with Manage Experiences */}
      {isModalOpen && (
        <ExperienceFormModal
          experience={selectedExperience}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedExperience(null);
          }}
          onSave={handleSaveSuccess}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
