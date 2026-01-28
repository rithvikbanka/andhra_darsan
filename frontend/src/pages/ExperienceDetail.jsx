import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Check, Users, Calendar, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { experiences, testimonials } from '../mock';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = experiences.find((exp) => exp.id === parseInt(id));

  const [bookingType, setBookingType] = useState('private');
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [groupSize, setGroupSize] = useState(10);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [addOns, setAddOns] = useState({
    pickup: false,
    pickupLocation: '',
    specialPuja: 0,
    souvenirKits: adults,
    photography: false
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Experience not found</p>
      </div>
    );
  }

  // Calculate pricing based on booking type
  const calculatePrice = () => {
    let basePrice = 0;
    
    if (bookingType === 'private') {
      basePrice = 3600 + (adults - 1) * 2200 + kids * 1500;
    } else if (bookingType === 'shared') {
      basePrice = adults * 2500 + kids * 1700;
    } else if (bookingType === 'group') {
      if (groupSize <= 17) {
        basePrice = groupSize * 2200;
      } else if (groupSize <= 25) {
        basePrice = groupSize * 2000;
      }
    }

    let addOnsCost = 0;
    if (addOns.pickup) {
      const guestCount = adults + kids;
      const tripCount = Math.ceil(guestCount / 3);
      const pricePerTrip = addOns.pickupLocation === 'vijayawada' ? 1800 : 2300;
      addOnsCost += tripCount * pricePerTrip;
    }
    addOnsCost += addOns.specialPuja * 500;
    addOnsCost += addOns.souvenirKits * 1000;
    if (addOns.photography) addOnsCost += 1500;

    const subtotal = basePrice + addOnsCost;
    const gst = subtotal * 0.18;
    return { basePrice, addOnsCost, gst, total: subtotal + gst };
  };

  const pricing = calculatePrice();

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      alert('Please fill in all customer details');
      return;
    }
    
    // Mock booking confirmation
    const bookingId = 'BD' + Math.floor(Math.random() * 10000);
    alert(
      `Booking Confirmed!\n\nBooking ID: ${bookingId}\nExperience: ${experience.title}\nDate: ${selectedDate}\nTime: ${selectedTime}\nTotal: ₹${pricing.total.toFixed(2)}\n\nConfirmation sent to ${customerDetails.email}`
    );
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen pb-12">
      {/* Image Slideshow */}
      <div className="relative h-[60vh] bg-black">
        <img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="bg-[#8B0000] text-white text-sm px-4 py-1 rounded-full inline-block mb-4">
              {experience.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
              {experience.title}
            </h1>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#DAA520] text-[#DAA520]" />
                <span>{experience.rating} (125 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
                  About This Experience
                </h2>
                <p className="text-[#5C5C5C] leading-relaxed text-lg">
                  {experience.description}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
                  Experience Highlights
                </h2>
                <ul className="space-y-3">
                  {experience.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <span className="text-[#5C5C5C]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Who Is This For */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
                  Who Is This For?
                </h2>
                <p className="text-[#5C5C5C] leading-relaxed">
                  {experience.whoIsThisFor}
                </p>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
                  What's Included
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {experience.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#DAA520] flex-shrink-0 mt-0.5" />
                      <span className="text-[#5C5C5C]">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-6">
                  Traveler Reviews
                </h2>
                <div className="space-y-6">
                  {testimonials.slice(0, 2).map((testimonial) => (
                    <div key={testimonial.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-[#2C2C2C]">{testimonial.name}</div>
                          <div className="text-sm text-[#5C5C5C]">{testimonial.location}</div>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#DAA520] text-[#DAA520]" />
                        ))}
                      </div>
                      <p className="text-[#5C5C5C] leading-relaxed">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Booking Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="text-sm text-[#5C5C5C] mb-1">Starting from</div>
                    <div className="text-3xl font-bold text-[#8B0000]">₹{experience.price}</div>
                    <div className="text-sm text-[#5C5C5C]">per person</div>
                  </div>

                  {/* Step 1: Booking Type */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">1. Choose Experience Type</Label>
                    <Select value={bookingType} onValueChange={setBookingType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private Tour</SelectItem>
                        <SelectItem value="shared">Shared Experience</SelectItem>
                        <SelectItem value="group">Group Booking (10+ guests)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Step 2: Date & Time */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">2. Select Date & Time</Label>
                    <div className="space-y-3">
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Step 3: Guests */}
                  {bookingType !== 'group' && (
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">3. Number of Guests</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Adults</span>
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              disabled={adults <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{adults}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setAdults(adults + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Kids</span>
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setKids(Math.max(0, kids - 1))}
                              disabled={kids <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{kids}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setKids(kids + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingType === 'group' && (
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">3. Group Size</Label>
                      <Input
                        type="number"
                        value={groupSize}
                        onChange={(e) => setGroupSize(Math.max(10, parseInt(e.target.value) || 10))}
                        min="10"
                      />
                      {groupSize >= 25 && (
                        <p className="text-xs text-[#8B0000] mt-2">
                          For groups of 25+, please contact our sales team for custom pricing
                        </p>
                      )}
                    </div>
                  )}

                  {/* Step 4: Add-ons */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">4. Add-ons (Optional)</Label>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Checkbox
                            id="pickup"
                            checked={addOns.pickup}
                            onCheckedChange={(checked) =>
                              setAddOns({ ...addOns, pickup: checked, pickupLocation: checked ? 'vijayawada' : '' })
                            }
                          />
                          <Label htmlFor="pickup" className="text-sm cursor-pointer">
                            Pickup & Drop Off
                          </Label>
                        </div>
                        {addOns.pickup && (
                          <Select
                            value={addOns.pickupLocation}
                            onValueChange={(value) => setAddOns({ ...addOns, pickupLocation: value })}
                          >
                            <SelectTrigger className="ml-6">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vijayawada">Vijayawada (₹1,800 per 3 guests)</SelectItem>
                              <SelectItem value="guntur">Guntur (₹2,300 per 3 guests)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Special Puja Tickets (₹500 each)</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAddOns({ ...addOns, specialPuja: Math.max(0, addOns.specialPuja - 1) })}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">{addOns.specialPuja}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAddOns({ ...addOns, specialPuja: addOns.specialPuja + 1 })}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Souvenir Kits (₹1,000 each)</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAddOns({ ...addOns, souvenirKits: Math.max(0, addOns.souvenirKits - 1) })}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">{addOns.souvenirKits}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAddOns({ ...addOns, souvenirKits: addOns.souvenirKits + 1 })}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="photography"
                          checked={addOns.photography}
                          onCheckedChange={(checked) => setAddOns({ ...addOns, photography: checked })}
                        />
                        <Label htmlFor="photography" className="text-sm cursor-pointer">
                          Photography / Reels (₹1,500)
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Customer Details */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">5. Your Details</Label>
                    <div className="space-y-3">
                      <Input
                        placeholder="Full Name"
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                      />
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Experience Fee</span>
                      <span>₹{pricing.basePrice.toFixed(2)}</span>
                    </div>
                    {pricing.addOnsCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Add-ons</span>
                        <span>₹{pricing.addOnsCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>GST (18%)</span>
                      <span>₹{pricing.gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total</span>
                      <span className="text-[#8B0000]">₹{pricing.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-6 text-lg"
                    onClick={handleBooking}
                  >
                    Book This Experience
                  </Button>

                  <p className="text-xs text-center text-[#5C5C5C]">
                    Free cancellation up to 48 hours before experience
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;
