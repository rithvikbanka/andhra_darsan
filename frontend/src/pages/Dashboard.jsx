import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Download, Edit, Trash2, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockUser } from '../mock';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/');
  };

  const handleEditBooking = (bookingId) => {
    alert(`Edit booking ${bookingId} - Feature coming soon!`);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      alert(`Booking ${bookingId} cancelled successfully!`);
    }
  };

  const handleDownloadInvoice = (bookingId) => {
    alert(`Downloading invoice for ${bookingId} - Feature coming soon!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                Welcome, {mockUser.name}
              </h1>
              <p className="text-white/90">{mockUser.email}</p>
            </div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Experiences</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-6">
            {mockUser.upcomingBookings.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="py-16 text-center">
                  <Calendar className="w-16 h-16 text-[#5C5C5C] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2">
                    No Upcoming Bookings
                  </h3>
                  <p className="text-[#5C5C5C] mb-6">
                    Ready to explore Andhra? Book your next cultural experience.
                  </p>
                  <Link to="/experiences">
                    <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
                      Explore Experiences
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              mockUser.upcomingBookings.map((booking) => (
                <Card key={booking.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-[#FAF7F0] to-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl text-[#2C2C2C] mb-2">
                          {booking.experienceTitle}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-[#5C5C5C]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString('en-IN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </div>
                          <span>•</span>
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#5C5C5C] mb-1">Booking ID</div>
                        <div className="font-mono font-bold text-[#8B0000]">{booking.id}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#2C2C2C] mb-3">Booking Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#5C5C5C]" />
                            <span>{booking.guests.adults} Adults, {booking.guests.kids} Kids</span>
                          </div>
                          <div>
                            <span className="text-[#5C5C5C]">Type: </span>
                            <span className="font-semibold">{booking.type}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#2C2C2C] mb-3">Add-ons</h4>
                        <ul className="space-y-1 text-sm">
                          {booking.addOns.map((addOn, index) => (
                            <li key={index} className="text-[#5C5C5C]">• {addOn}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div>
                        <span className="text-sm text-[#5C5C5C]">Total Paid</span>
                        <div className="text-2xl font-bold text-[#8B0000]">₹{booking.totalPaid.toLocaleString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(booking.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Invoice
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBooking(booking.id)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Modify
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-[#FFF8DC] rounded-lg">
                      <p className="text-sm text-[#8B4513]">
                        <strong>Note:</strong> You can modify add-ons up to 24 hours before your experience. 
                        Free cancellation available up to 48 hours before the start time.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Past Experiences */}
          <TabsContent value="past" className="space-y-6">
            {mockUser.pastBookings.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="py-16 text-center">
                  <MapPin className="w-16 h-16 text-[#5C5C5C] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2">
                    No Past Experiences
                  </h3>
                  <p className="text-[#5C5C5C]">
                    Your completed experiences will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              mockUser.pastBookings.map((booking) => (
                <Card key={booking.id} className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-[#2C2C2C] mb-2">
                          {booking.experienceTitle}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-[#5C5C5C]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#5C5C5C] mb-1">Booking ID</div>
                        <div className="font-mono text-sm">{booking.id}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-[#5C5C5C]" />
                          <span className="text-sm">{booking.guests.adults} Adults, {booking.guests.kids} Kids</span>
                        </div>
                        <div className="text-sm text-[#5C5C5C]">
                          Total Paid: <span className="font-bold text-[#2C2C2C]">₹{booking.totalPaid.toLocaleString()}</span>
                        </div>
                        {booking.rating && (
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm text-[#5C5C5C]">Your Rating:</span>
                            <div className="flex gap-1">
                              {[...Array(booking.rating)].map((_, i) => (
                                <span key={i} className="text-[#DAA520]">★</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {booking.review && (
                          <p className="text-sm text-[#5C5C5C] mt-2 italic">"{booking.review}"</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(booking.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Invoice
                        </Button>
                        <Link to="/experiences">
                          <Button
                            size="sm"
                            className="bg-[#DAA520] hover:bg-[#B8860B] text-[#2C2C2C]"
                          >
                            Book Again
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
