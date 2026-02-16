import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { saveExperience } from '../../utils/localStorage';

const CATEGORIES = [
  'Handlooms & Handicrafts',
  'Temples & Spirituality',
  'Heritage',
  'Culinary',
  'Nature',
  'Performing Arts'
];

const CALCULATION_TYPES = [
  { value: 'flat', label: 'Flat Price' },
  { value: 'per_person', label: 'Per Person' },
  { value: 'per_adult', label: 'Per Adult' },
  { value: 'per_3_guests', label: 'Per 3 Guests' }
];

const BOOKING_TYPES = ['private', 'shared', 'group'];

const ExperienceFormModal = ({ experience, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    duration: '',
    price: '',
    rating: '4.5',
    featured: false,
    description: '',
    whoIsThisFor: '',
    imageUrl: '',
    images: ['', '', ''],
    instagramReels: ['', '', ''],
    highlights: ['', '', ''],
    included: ['', '', ''],
    pricing: {
      private: { enabled: false, firstAdult: '', additionalAdult: '', child: '' },
      shared: { enabled: false, adult: '', child: '' },
      group: { enabled: false, tier1: { min: '', max: '', pricePerPerson: '' }, tier2: { min: '', max: '', pricePerPerson: '' } }
    },
    addOns: [],
    availability: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (experience) {
      setFormData({
        ...experience,
        images: experience.images || ['', '', ''],
        instagramReels: experience.instagramReels || ['', '', ''],
        highlights: experience.highlights || ['', '', ''],
        included: experience.included || ['', '', ''],
        pricing: experience.pricing || {
          private: { enabled: false, firstAdult: '', additionalAdult: '', child: '' },
          shared: { enabled: false, adult: '', child: '' },
          group: { enabled: false, tier1: { min: '', max: '', pricePerPerson: '' }, tier2: { min: '', max: '', pricePerPerson: '' } }
        },
        addOns: experience.addOns || [],
        availability: experience.availability || []
      });
    }
  }, [experience]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handlePricingChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [type]: {
          ...prev.pricing[type],
          [field]: value
        }
      }
    }));
  };

  const handlePricingTierChange = (type, tier, field, value) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [type]: {
          ...prev.pricing[type],
          [tier]: {
            ...prev.pricing[type][tier],
            [field]: value
          }
        }
      }
    }));
  };

  const addAddOn = () => {
    setFormData(prev => ({
      ...prev,
      addOns: [...prev.addOns, {
        id: `addon-${Date.now()}`,
        name: '',
        price: '',
        calculationType: 'flat',
        description: '',
        active: true
      }]
    }));
  };

  const updateAddOn = (index, field, value) => {
    setFormData(prev => {
      const newAddOns = [...prev.addOns];
      newAddOns[index] = { ...newAddOns[index], [field]: value };
      return { ...prev, addOns: newAddOns };
    });
  };

  const removeAddOn = (index) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.filter((_, i) => i !== index)
    }));
  };

  const addAvailabilityDate = () => {
    setFormData(prev => ({
      ...prev,
      availability: [...prev.availability, {
        date: '',
        timeSlots: []
      }]
    }));
  };

  const updateAvailabilityDate = (index, date) => {
    setFormData(prev => {
      const newAvailability = [...prev.availability];
      newAvailability[index].date = date;
      return { ...prev, availability: newAvailability };
    });
  };

  const removeAvailabilityDate = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const addTimeSlot = (dateIndex) => {
    setFormData(prev => {
      const newAvailability = [...prev.availability];
      newAvailability[dateIndex].timeSlots.push({
        time: '',
        bookingType: 'private',
        maxCapacity: '',
        currentBookings: 0,
        available: true
      });
      return { ...prev, availability: newAvailability };
    });
  };

  const updateTimeSlot = (dateIndex, slotIndex, field, value) => {
    setFormData(prev => {
      const newAvailability = [...prev.availability];
      newAvailability[dateIndex].timeSlots[slotIndex][field] = value;
      return { ...prev, availability: newAvailability };
    });
  };

  const removeTimeSlot = (dateIndex, slotIndex) => {
    setFormData(prev => {
      const newAvailability = [...prev.availability];
      newAvailability[dateIndex].timeSlots = newAvailability[dateIndex].timeSlots.filter((_, i) => i !== slotIndex);
      return { ...prev, availability: newAvailability };
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.rating || formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.whoIsThisFor.trim()) newErrors.whoIsThisFor = 'Who Is This For field is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Main image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Clean up data before saving
    const cleanedData = {
      ...formData,
      id: experience?.id,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      image: formData.imageUrl, // Maintain backward compatibility
      highlights: formData.highlights.filter(h => h.trim()),
      included: formData.included.filter(i => i.trim()),
      images: formData.images.filter(img => img.trim()),
      instagramReels: formData.instagramReels.filter(reel => reel.trim())
    };

    saveExperience(cleanedData);
    onSave();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#8B0000] text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {experience ? 'Edit Experience' : 'Add New Experience'}
          </h2>
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Handloom Heritage – Mangalagiri"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., Amaravati – Vijayawada"
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  placeholder="e.g., 4 hours, 2 days"
                  className={errors.duration ? 'border-red-500' : ''}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="2500"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="rating">Rating *</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleChange('rating', e.target.value)}
                  placeholder="4.5"
                  className={errors.rating ? 'border-red-500' : ''}
                />
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleChange('featured', checked)}
                />
                <Label htmlFor="featured" className="cursor-pointer">Featured Experience</Label>
              </div>
            </div>
          </section>

          {/* Descriptions */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Descriptions</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the experience in detail..."
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <Label htmlFor="whoIsThisFor">Who Is This For? *</Label>
                <Textarea
                  id="whoIsThisFor"
                  value={formData.whoIsThisFor}
                  onChange={(e) => handleChange('whoIsThisFor', e.target.value)}
                  placeholder="Culture enthusiasts, families, NRIs, etc."
                  rows={2}
                  className={errors.whoIsThisFor ? 'border-red-500' : ''}
                />
                {errors.whoIsThisFor && <p className="text-red-500 text-sm mt-1">{errors.whoIsThisFor}</p>}
              </div>
            </div>
          </section>

          {/* Images */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Images</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Main Image URL *</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  placeholder="https://..."
                  className={errors.imageUrl ? 'border-red-500' : ''}
                />
                {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
              </div>

              <div>
                <Label>Carousel Images</Label>
                {formData.images.map((img, index) => (
                  <Input
                    key={index}
                    value={img}
                    onChange={(e) => handleArrayChange('images', index, e.target.value)}
                    placeholder={`Image ${index + 1} URL`}
                    className="mt-2"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Instagram Reels */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Instagram Reels (Optional)</h3>
            <div className="space-y-2">
              {formData.instagramReels.map((reel, index) => (
                <Input
                  key={index}
                  value={reel}
                  onChange={(e) => handleArrayChange('instagramReels', index, e.target.value)}
                  placeholder={`Reel ${index + 1} URL`}
                />
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Highlights</h3>
            <div className="space-y-2">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                    placeholder={`Highlight ${index + 1}`}
                  />
                  {formData.highlights.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem('highlights', index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem('highlights')} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Highlight
              </Button>
            </div>
          </section>

          {/* What's Included */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">What's Included</h3>
            <div className="space-y-2">
              {formData.included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayChange('included', index, e.target.value)}
                    placeholder={`Included item ${index + 1}`}
                  />
                  {formData.included.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem('included', index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem('included')} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Item
              </Button>
            </div>
          </section>

          {/* Booking Configuration */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Booking Configuration</h3>
            
            {/* Private Tour */}
            <div className="mb-6 p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="private-enabled"
                  checked={formData.pricing.private.enabled}
                  onCheckedChange={(checked) => handlePricingChange('private', 'enabled', checked)}
                />
                <Label htmlFor="private-enabled" className="font-semibold cursor-pointer">Private Tour</Label>
              </div>
              {formData.pricing.private.enabled && (
                <div className="grid grid-cols-3 gap-3 ml-6">
                  <div>
                    <Label>First Adult (₹)</Label>
                    <Input
                      type="number"
                      value={formData.pricing.private.firstAdult}
                      onChange={(e) => handlePricingChange('private', 'firstAdult', e.target.value)}
                      placeholder="3600"
                    />
                  </div>
                  <div>
                    <Label>Additional Adult (₹)</Label>
                    <Input
                      type="number"
                      value={formData.pricing.private.additionalAdult}
                      onChange={(e) => handlePricingChange('private', 'additionalAdult', e.target.value)}
                      placeholder="2200"
                    />
                  </div>
                  <div>
                    <Label>Child (₹)</Label>
                    <Input
                      type="number"
                      value={formData.pricing.private.child}
                      onChange={(e) => handlePricingChange('private', 'child', e.target.value)}
                      placeholder="1500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Shared Experience */}
            <div className="mb-6 p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="shared-enabled"
                  checked={formData.pricing.shared.enabled}
                  onCheckedChange={(checked) => handlePricingChange('shared', 'enabled', checked)}
                />
                <Label htmlFor="shared-enabled" className="font-semibold cursor-pointer">Shared Experience</Label>
              </div>
              {formData.pricing.shared.enabled && (
                <div className="grid grid-cols-2 gap-3 ml-6">
                  <div>
                    <Label>Adult (₹)</Label>
                    <Input
                      type="number"
                      value={formData.pricing.shared.adult}
                      onChange={(e) => handlePricingChange('shared', 'adult', e.target.value)}
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <Label>Child (₹)</Label>
                    <Input
                      type="number"
                      value={formData.pricing.shared.child}
                      onChange={(e) => handlePricingChange('shared', 'child', e.target.value)}
                      placeholder="1700"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Group Booking */}
            <div className="mb-6 p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="group-enabled"
                  checked={formData.pricing.group.enabled}
                  onCheckedChange={(checked) => handlePricingChange('group', 'enabled', checked)}
                />
                <Label htmlFor="group-enabled" className="font-semibold cursor-pointer">Group Booking</Label>
              </div>
              {formData.pricing.group.enabled && (
                <div className="space-y-4 ml-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Tier 1</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Min</Label>
                        <Input
                          type="number"
                          value={formData.pricing.group.tier1.min}
                          onChange={(e) => handlePricingTierChange('group', 'tier1', 'min', e.target.value)}
                          placeholder="10"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Max</Label>
                        <Input
                          type="number"
                          value={formData.pricing.group.tier1.max}
                          onChange={(e) => handlePricingTierChange('group', 'tier1', 'max', e.target.value)}
                          placeholder="17"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Price/Person (₹)</Label>
                        <Input
                          type="number"
                          value={formData.pricing.group.tier1.pricePerPerson}
                          onChange={(e) => handlePricingTierChange('group', 'tier1', 'pricePerPerson', e.target.value)}
                          placeholder="2200"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Tier 2</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Min</Label>
                        <Input
                          type="number"
                          value={formData.pricing.group.tier2.min}
                          onChange={(e) => handlePricingTierChange('group', 'tier2', 'min', e.target.value)}
                          placeholder="18"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Max</Label>
                        <Input
                          type="number"
                          value={formData.pricing.group.tier2.max}
                          onChange={(e) => handlePricingTierChange('group', 'tier2', 'max', e.target.value)}
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Price/Person (₹)</Label>
                        <Input
                          type="number"
                          value={formData.pricing.group.tier2.pricePerPerson}
                          onChange={(e) => handlePricingTierChange('group', 'tier2', 'pricePerPerson', e.target.value)}
                          placeholder="2000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Add-ons */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Add-ons</h3>
            <div className="space-y-4">
              {formData.addOns.map((addOn, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={addOn.active}
                        onCheckedChange={(checked) => updateAddOn(index, 'active', checked)}
                      />
                      <Label className="font-medium">Active</Label>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAddOn(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Add-on Name</Label>
                      <Input
                        value={addOn.name}
                        onChange={(e) => updateAddOn(index, 'name', e.target.value)}
                        placeholder="Pickup & Drop Off"
                      />
                    </div>
                    <div>
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        value={addOn.price}
                        onChange={(e) => updateAddOn(index, 'price', e.target.value)}
                        placeholder="1800"
                      />
                    </div>
                    <div>
                      <Label>Calculation Type</Label>
                      <Select value={addOn.calculationType} onValueChange={(value) => updateAddOn(index, 'calculationType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CALCULATION_TYPES.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={addOn.description}
                        onChange={(e) => updateAddOn(index, 'description', e.target.value)}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addAddOn} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add New Add-on
              </Button>
            </div>
          </section>

          {/* Availability Calendar & Time Slots */}
          <section>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b">Availability Calendar & Time Slots</h3>
            <div className="space-y-4">
              {formData.availability.map((dateEntry, dateIndex) => (
                <div key={dateIndex} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={dateEntry.date}
                        onChange={(e) => updateAvailabilityDate(dateIndex, e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAvailabilityDate(dateIndex)}
                      className="mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Time Slots */}
                  <div className="ml-4 space-y-2">
                    <Label className="text-sm font-medium">Time Slots</Label>
                    {dateEntry.timeSlots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="grid grid-cols-5 gap-2 p-2 bg-gray-50 rounded">
                        <div>
                          <Label className="text-xs">Time</Label>
                          <Input
                            type="time"
                            value={slot.time}
                            onChange={(e) => updateTimeSlot(dateIndex, slotIndex, 'time', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Type</Label>
                          <Select value={slot.bookingType} onValueChange={(value) => updateTimeSlot(dateIndex, slotIndex, 'bookingType', value)}>
                            <SelectTrigger className="text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {BOOKING_TYPES.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Max Capacity</Label>
                          <Input
                            type="number"
                            value={slot.maxCapacity}
                            onChange={(e) => updateTimeSlot(dateIndex, slotIndex, 'maxCapacity', e.target.value)}
                            className="text-sm"
                            placeholder="6"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Current Bookings</Label>
                          <Input
                            type="number"
                            value={slot.currentBookings}
                            onChange={(e) => updateTimeSlot(dateIndex, slotIndex, 'currentBookings', e.target.value)}
                            className="text-sm"
                            placeholder="0"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTimeSlot(dateIndex, slotIndex)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTimeSlot(dateIndex)}
                      className="w-full"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Time Slot
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addAvailabilityDate} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Date
              </Button>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t sticky bottom-0 bg-white py-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#8B0000] hover:bg-[#6B0000]">
              {experience ? 'Update Experience' : 'Add Experience'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceFormModal;
