import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Check, Users, Calendar, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { experienceAPI, bookingAPI } from '../services/api';
import { testimonials } from '../mock';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    souvenirKits: 1,
    photography: false
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchExperience();
  }, [id]);

  useEffect(() => {
    setAddOns(prev => ({ ...prev, souvenirKits: adults }));
  }, [adults]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!experience || !experience.images) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % experience.images.length
      );
    }, 4000); // 4 seconds per image

    return () => clearInterval(interval);
  }, [experience]);

  const fetchExperience = async () => {
    try {
      const data = await experienceAPI.getById(parseInt(id));
      setExperience(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching experience:', error);
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? experience.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % experience.images.length
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading experience...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Experience not found</p>
      </div>
    );
  }

  // Calculate pricing based on booking type using experience's pricing structure
  const calculatePrice = () => {
    if (!experience.pricing) return { basePrice: 0, addOnsCost: 0, total: 0 };
    
    let basePrice = 0;
    
    if (bookingType === 'private' && experience.pricing.private?.enabled) {
      basePrice = experience.pricing.private.firstAdult + 
                  (adults - 1) * experience.pricing.private.additionalAdult + 
                  kids * experience.pricing.private.child;
    } else if (bookingType === 'shared' && experience.pricing.shared?.enabled) {
      basePrice = adults * experience.pricing.shared.adult + 
                  kids * experience.pricing.shared.child;
    } else if (bookingType === 'group' && experience.pricing.group?.enabled) {
      const tier = groupSize <= experience.pricing.group.tier1.max 
        ? experience.pricing.group.tier1 
        : experience.pricing.group.tier2;
      basePrice = groupSize * tier.pricePerPerson;
    }

    let addOnsCost = 0;
    const guestCount = adults + kids;
    
    // Calculate add-ons based on their calculation type
    (experience.addOns || []).forEach(addon => {
      if (!addon.active) return;
      
      if (addon.name.includes('Pickup') && addOns.pickup && addOns.pickupLocation) {
        const matchesLocation = 
          (addon.name.includes('Vijayawada') && addOns.pickupLocation === 'vijayawada') ||
          (addon.name.includes('Guntur') && addOns.pickupLocation === 'guntur');
        
        if (matchesLocation) {
          if (addon.calculationType === 'per_3_guests') {
            const tripCount = Math.ceil(guestCount / 3);
            addOnsCost += tripCount * addon.price;
          }
        }
      } else if (addon.name.includes('Special Puja')) {
        if (addon.calculationType === 'per_person') {
          addOnsCost += addOns.specialPuja * addon.price;
        }
      } else if (addon.name.includes('Souvenir')) {
        if (addon.calculationType === 'per_adult') {
          addOnsCost += addOns.souvenirKits * addon.price;
        }
      } else if (addon.name.includes('Photography') && addOns.photography) {
        if (addon.calculationType === 'flat') {
          addOnsCost += addon.price;
        }
      }
    });

    const total = basePrice + addOnsCost;
    return { basePrice, addOnsCost, total };
  };

  const pricing = calculatePrice();

  // Get available dates for selected booking type
  const getAvailableDates = () => {
    if (!experience.availability) return [];
    return experience.availability
      .filter(day => {
        // Check if this date has any available slots for selected booking type
        return day.timeSlots.some(slot => 
          slot.bookingType === bookingType && 
          slot.available && 
          slot.currentBookings < slot.maxCapacity
        );
      })
      .map(day => day.date);
  };

  // Get available time slots for selected date and booking type
  const getAvailableTimeSlots = () => {
    if (!experience.availability || !selectedDate) return [];
    const dayAvailability = experience.availability.find(day => day.date === selectedDate);
    if (!dayAvailability) return [];
    
    return dayAvailability.timeSlots.filter(slot => 
      slot.bookingType === bookingType && 
      slot.available && 
      slot.currentBookings < slot.maxCapacity
    );
  };

  const availableDates = getAvailableDates();
  const availableTimeSlots = getAvailableTimeSlots();

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      alert('Please fill in all customer details');
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to make a booking');
      navigate('/login');
      return;
    }

    try {
      const bookingData = {
        experience_id: experience.id,
        experience_title: experience.title,
        booking_type: bookingType,
        date: selectedDate,
        time: selectedTime,
        guests: { adults, kids },
        group_size: bookingType === 'group' ? groupSize : null,
        add_ons: addOns,
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone,
        total_price: pricing.total
      };

      const response = await bookingAPI.create(bookingData);
      
      alert(
        `Booking Confirmed!\n\nBooking ID: ${response.id}\nExperience: ${experience.title}\nDate: ${selectedDate}\nTime: ${selectedTime}\nTotal: ₹${pricing.total.toFixed(2)}\n\nConfirmation sent to ${customerDetails.email}`
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.response?.data?.detail || 'Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen pb-12">
      {/* Image Carousel */}
      <div className="relative h-[60vh] bg-black overflow-hidden">
        {/* Carousel Images */}
        {experience.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`${experience.title} - ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {experience.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
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

            {/* Instagram Reels Section */}
            {experience.instagramReels && experience.instagramReels.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-6">
                    See This Experience in Action
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {experience.instagramReels.map((reel, index) => (
                      <div key={index} className="relative aspect-[9/16] rounded-lg overflow-hidden bg-black">
                        <iframe
                          src={reel.embedUrl}
                          className="absolute inset-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`Instagram Reel ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
                        {experience.pricing?.private?.enabled && (
                          <SelectItem value="private">Private Tour</SelectItem>
                        )}
                        {experience.pricing?.shared?.enabled && (
                          <SelectItem value="shared">Shared Experience</SelectItem>
                        )}
                        {experience.pricing?.group?.enabled && (
                          <SelectItem value="group">Group Booking (10+ guests)</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Step 2: Date & Time */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">2. Select Date & Time</Label>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs mb-1 block">Select Date</Label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose available date" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDates.length === 0 ? (
                              <div className="px-2 py-1 text-sm text-gray-500">No dates available</div>
                            ) : (
                              availableDates.map(date => (
                                <SelectItem key={date} value={date}>
                                  {new Date(date).toLocaleDateString('en-IN', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {selectedDate && (
                        <div>
                          <Label className="text-xs mb-1 block">Select Time</Label>
                          <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTimeSlots.length === 0 ? (
                                <div className="px-2 py-1 text-sm text-gray-500">No slots available</div>
                              ) : (
                                availableTimeSlots.map(slot => (
                                  <SelectItem key={slot.time} value={slot.time}>
                                    {slot.time} ({slot.maxCapacity - slot.currentBookings} spots left)
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
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
                      {(experience.addOns || []).filter(addon => addon.active).map((addon) => {
                        // Pickup add-ons
                        if (addon.name.includes('Pickup')) {
                          const location = addon.name.includes('Vijayawada') ? 'vijayawada' : 'guntur';
                          if (!addOns.pickup) {
                            return (
                              <div key={addon.id}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Checkbox
                                    id={addon.id}
                                    checked={false}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setAddOns({ ...addOns, pickup: true, pickupLocation: location });
                                      }
                                    }}
                                  />
                                  <Label htmlFor={addon.id} className="text-sm cursor-pointer">
                                    {addon.name} - ₹{addon.price}
                                    {addon.calculationType === 'per_3_guests' && ' per 3 guests'}
                                  </Label>
                                </div>
                              </div>
                            );
                          } else if (addOns.pickupLocation === location) {
                            return (
                              <div key={addon.id}>
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    id={addon.id}
                                    checked={true}
                                    onCheckedChange={(checked) => {
                                      if (!checked) {
                                        setAddOns({ ...addOns, pickup: false, pickupLocation: '' });
                                      }
                                    }}
                                  />
                                  <Label htmlFor={addon.id} className="text-sm cursor-pointer">
                                    {addon.name} - ₹{addon.price}
                                    {addon.calculationType === 'per_3_guests' && ' per 3 guests'}
                                  </Label>
                                </div>
                                {addon.description && (
                                  <p className="text-xs text-gray-500 ml-6">{addon.description}</p>
                                )}
                              </div>
                            );
                          }
                          return null;
                        }

                        // Special Puja - quantity selector
                        if (addon.name.includes('Special Puja') || addon.name.includes('Puja Tickets')) {
                          return (
                            <div key={addon.id} className="flex items-center justify-between">
                              <Label className="text-sm">{addon.name} (₹{addon.price} each)</Label>
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
                          );
                        }

                        // Souvenir Kits - quantity selector
                        if (addon.name.includes('Souvenir')) {
                          return (
                            <div key={addon.id} className="flex items-center justify-between">
                              <Label className="text-sm">{addon.name} (₹{addon.price} each)</Label>
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
                          );
                        }

                        // Photography - checkbox
                        if (addon.name.includes('Photography') || addon.name.includes('Reels')) {
                          return (
                            <div key={addon.id} className="flex items-center gap-2">
                              <Checkbox
                                id={addon.id}
                                checked={addOns.photography}
                                onCheckedChange={(checked) => setAddOns({ ...addOns, photography: checked })}
                              />
                              <Label htmlFor={addon.id} className="text-sm cursor-pointer">
                                {addon.name} (₹{addon.price})
                                {addon.description && ` - ${addon.description}`}
                              </Label>
                            </div>
                          );
                        }

                        // Generic add-ons
                        return (
                          <div key={addon.id} className="flex items-center gap-2">
                            <Checkbox
                              id={addon.id}
                              checked={addOns[addon.id] || false}
                              onCheckedChange={(checked) => setAddOns({ ...addOns, [addon.id]: checked })}
                            />
                            <Label htmlFor={addon.id} className="text-sm cursor-pointer">
                              {addon.name} (₹{addon.price})
                              {addon.description && ` - ${addon.description}`}
                            </Label>
                          </div>
                        );
                      })}
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
