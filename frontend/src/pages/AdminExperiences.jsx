import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminExperiences = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    duration: '',
    price: '',
    rating: '4.5',
    image: '',
    featured: false,
    description: '',
    highlights: [''],
    whoIsThisFor: '',
    included: [''],
    images: ['', '', ''],
    instagramReels: [
      { url: '', embedUrl: '' },
      { url: '', embedUrl: '' },
      { url: '', embedUrl: '' }
    ],
    bookingTypes: ['private', 'shared', 'group'],
    pricing: {
      private: {
        enabled: true,
        firstAdult: 3600,
        additionalAdult: 2200,
        child: 1500
      },
      shared: {
        enabled: true,
        adult: 2500,
        child: 1700
      },
      group: {
        enabled: true,
        tier1: { min: 10, max: 17, pricePerPerson: 2200 },
        tier2: { min: 18, max: 25, pricePerPerson: 2000 }
      }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: '', price: 1800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Pickup & Drop Off - Guntur', description: '', price: 2300, calculationType: 'per_3_guests', active: true },
      { id: 'addon-3', name: 'Special Puja Tickets', description: '', price: 500, calculationType: 'per_person', active: true },
      { id: 'addon-4', name: 'Souvenir Kits', description: '', price: 1000, calculationType: 'per_adult', active: true },
      { id: 'addon-5', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: []
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`${API}/experiences`);
      setExperiences(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setLoading(false);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      category: experience.category,
      location: experience.location,
      duration: experience.duration,
      price: experience.price.toString(),
      rating: experience.rating.toString(),
      image: experience.image,
      featured: experience.featured,
      description: experience.description,
      highlights: experience.highlights,
      whoIsThisFor: experience.whoIsThisFor,
      included: experience.included,
      images: experience.images,
      instagramReels: experience.instagramReels || [
        { url: '', embedUrl: '' },
        { url: '', embedUrl: '' },
        { url: '', embedUrl: '' }
      ],
      bookingTypes: experience.bookingTypes || ['private', 'shared', 'group'],
      pricing: experience.pricing || {
        private: { enabled: true, firstAdult: 3600, additionalAdult: 2200, child: 1500 },
        shared: { enabled: true, adult: 2500, child: 1700 },
        group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 2200 }, tier2: { min: 18, max: 25, pricePerPerson: 2000 } }
      },
      addOns: experience.addOns || [],
      availability: experience.availability || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      await axios.delete(`${API}/experiences/${id}`, config);
      alert('Experience deleted successfully!');
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert(error.response?.data?.detail || 'Failed to delete experience. You may need admin access.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const payload = {
        ...formData,
        price: parseInt(formData.price),
        rating: parseFloat(formData.rating),
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        included: formData.included.filter(i => i.trim() !== ''),
        images: formData.images.filter(img => img.trim() !== ''),
        instagramReels: formData.instagramReels.filter(reel => reel.url.trim() !== '')
      };

      if (editingExperience) {
        await axios.put(`${API}/experiences/${editingExperience.id}`, payload, config);
        alert('Experience updated successfully!');
      } else {
        await axios.post(`${API}/experiences`, payload, config);
        alert('Experience created successfully!');
      }

      setShowForm(false);
      setEditingExperience(null);
      resetForm();
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert(error.response?.data?.detail || 'Failed to save experience. You may need admin access.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      location: '',
      duration: '',
      price: '',
      rating: '4.5',
      image: '',
      featured: false,
      description: '',
      highlights: [''],
      whoIsThisFor: '',
      included: [''],
      images: ['', '', ''],
      instagramReels: [
        { url: '', embedUrl: '' },
        { url: '', embedUrl: '' },
        { url: '', embedUrl: '' }
      ],
      bookingTypes: ['private', 'shared', 'group'],
      pricing: {
        private: {
          enabled: true,
          firstAdult: 3600,
          additionalAdult: 2200,
          child: 1500
        },
        shared: {
          enabled: true,
          adult: 2500,
          child: 1700
        },
        group: {
          enabled: true,
          tier1: { min: 10, max: 17, pricePerPerson: 2200 },
          tier2: { min: 18, max: 25, pricePerPerson: 2000 }
        }
      },
      addOns: []
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleReelChange = (index, field, value) => {
    const newReels = [...formData.instagramReels];
    newReels[index][field] = value;
    setFormData({ ...formData, instagramReels: newReels });
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
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">Manage Experiences</h1>
            <p className="text-white/90">Create, edit, and manage all cultural experiences</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/admin/dashboard')}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => {
                resetForm();
                setEditingExperience(null);
                setShowForm(true);
              }}
              className="bg-[#DAA520] hover:bg-[#B8860B] text-[#2C2C2C]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Experience
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Experiences List */}
        <div className="grid grid-cols-1 gap-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">{exp.title}</h3>
                        <div className="flex gap-3 text-sm text-[#5C5C5C]">
                          <span className="bg-[#8B0000] text-white px-2 py-1 rounded text-xs">
                            {exp.category}
                          </span>
                          <span>{exp.location}</span>
                          <span>•</span>
                          <span>{exp.duration}</span>
                          <span>•</span>
                          <span className="font-semibold text-[#8B0000]">₹{exp.price}</span>
                          <span>•</span>
                          <span>★ {exp.rating}</span>
                        </div>
                      </div>
                      {exp.featured && (
                        <span className="bg-[#DAA520] text-white px-3 py-1 rounded-full text-xs">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#5C5C5C] mb-3 line-clamp-2">{exp.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(exp)}
                        className="bg-[#DAA520] hover:bg-[#B8860B] text-[#2C2C2C]"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(exp.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create/Edit Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingExperience ? 'Edit Experience' : 'Create New Experience'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2C2C2C]">Basic Information</h3>
              
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Temples & Spirituality">Temples & Spirituality</SelectItem>
                      <SelectItem value="Handlooms & Handicrafts">Handlooms & Handicrafts</SelectItem>
                      <SelectItem value="Heritage">Heritage</SelectItem>
                      <SelectItem value="Culinary">Culinary</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                      <SelectItem value="Performing Arts">Performing Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 hours"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
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
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured" className="cursor-pointer">Featured Experience</Label>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="whoIsThisFor">Who Is This For? *</Label>
                <Input
                  id="whoIsThisFor"
                  placeholder="e.g., Culture enthusiasts, families, NRIs"
                  value={formData.whoIsThisFor}
                  onChange={(e) => setFormData({ ...formData, whoIsThisFor: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2C2C2C]">Images</h3>
              
              <div>
                <Label htmlFor="mainImage">Main Image URL *</Label>
                <Input
                  id="mainImage"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Carousel Images (3 images) *</Label>
                {formData.images.map((img, index) => (
                  <Input
                    key={index}
                    type="url"
                    placeholder={`Image ${index + 1} URL`}
                    value={img}
                    onChange={(e) => handleArrayChange('images', index, e.target.value)}
                    className="mb-2"
                    required
                  />
                ))}
              </div>
            </div>

            {/* Instagram Reels */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2C2C2C]">Instagram Reels (Optional)</h3>
              {formData.instagramReels.map((reel, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-2">
                  <Label>Reel {index + 1}</Label>
                  <Input
                    type="url"
                    placeholder="Instagram Reel URL"
                    value={reel.url}
                    onChange={(e) => handleReelChange(index, 'url', e.target.value)}
                  />
                  <Input
                    type="url"
                    placeholder="Embed URL (add /embed to reel URL)"
                    value={reel.embedUrl}
                    onChange={(e) => handleReelChange(index, 'embedUrl', e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Highlights *</Label>
                <Button type="button" size="sm" onClick={() => addArrayItem('highlights')}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                    placeholder="Enter highlight"
                    required
                  />
                  {formData.highlights.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeArrayItem('highlights', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Included Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>What's Included *</Label>
                <Button type="button" size="sm" onClick={() => addArrayItem('included')}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {formData.included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayChange('included', index, e.target.value)}
                    placeholder="Enter included item"
                    required
                  />
                  {formData.included.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeArrayItem('included', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Booking Configuration */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-[#8B0000]">Booking Configuration</h3>
              
              {/* Booking Types */}
              <div>
                <Label className="mb-3 block">Enable Booking Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="private-enabled"
                      checked={formData.pricing?.private?.enabled}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        pricing: { ...formData.pricing, private: { ...formData.pricing.private, enabled: checked } }
                      })}
                    />
                    <Label htmlFor="private-enabled" className="cursor-pointer">Private Tour</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="shared-enabled"
                      checked={formData.pricing?.shared?.enabled}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        pricing: { ...formData.pricing, shared: { ...formData.pricing.shared, enabled: checked } }
                      })}
                    />
                    <Label htmlFor="shared-enabled" className="cursor-pointer">Shared Experience</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="group-enabled"
                      checked={formData.pricing?.group?.enabled}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        pricing: { ...formData.pricing, group: { ...formData.pricing.group, enabled: checked } }
                      })}
                    />
                    <Label htmlFor="group-enabled" className="cursor-pointer">Group Booking</Label>
                  </div>
                </div>
              </div>

              {/* Private Pricing */}
              {formData.pricing?.private?.enabled && (
                <Card className="bg-gray-50">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-[#2C2C2C]">Private Tour Pricing</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label>First Adult (₹)</Label>
                        <Input
                          type="number"
                          value={formData.pricing.private.firstAdult}
                          onChange={(e) => setFormData({
                            ...formData,
                            pricing: { ...formData.pricing, private: { ...formData.pricing.private, firstAdult: parseInt(e.target.value) } }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Additional Adult (₹)</Label>
                        <Input
                          type="number"
                          value={formData.pricing.private.additionalAdult}
                          onChange={(e) => setFormData({
                            ...formData,
                            pricing: { ...formData.pricing, private: { ...formData.pricing.private, additionalAdult: parseInt(e.target.value) } }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Child (₹)</Label>
                        <Input
                          type="number"
                          value={formData.pricing.private.child}
                          onChange={(e) => setFormData({
                            ...formData,
                            pricing: { ...formData.pricing, private: { ...formData.pricing.private, child: parseInt(e.target.value) } }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Shared Pricing */}
              {formData.pricing?.shared?.enabled && (
                <Card className="bg-gray-50">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-[#2C2C2C]">Shared Experience Pricing</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Adult (₹)</Label>
                        <Input
                          type="number"
                          value={formData.pricing.shared.adult}
                          onChange={(e) => setFormData({
                            ...formData,
                            pricing: { ...formData.pricing, shared: { ...formData.pricing.shared, adult: parseInt(e.target.value) } }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Child (₹)</Label>
                        <Input
                          type="number"
                          value={formData.pricing.shared.child}
                          onChange={(e) => setFormData({
                            ...formData,
                            pricing: { ...formData.pricing, shared: { ...formData.pricing.shared, child: parseInt(e.target.value) } }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Group Pricing */}
              {formData.pricing?.group?.enabled && (
                <Card className="bg-gray-50">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-[#2C2C2C]">Group Booking Pricing</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label>Tier 1 Min</Label>
                          <Input
                            type="number"
                            value={formData.pricing.group.tier1.min}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: { ...formData.pricing, group: { ...formData.pricing.group, tier1: { ...formData.pricing.group.tier1, min: parseInt(e.target.value) } } }
                            })}
                          />
                        </div>
                        <div>
                          <Label>Tier 1 Max</Label>
                          <Input
                            type="number"
                            value={formData.pricing.group.tier1.max}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: { ...formData.pricing, group: { ...formData.pricing.group, tier1: { ...formData.pricing.group.tier1, max: parseInt(e.target.value) } } }
                            })}
                          />
                        </div>
                        <div>
                          <Label>Price/Person (₹)</Label>
                          <Input
                            type="number"
                            value={formData.pricing.group.tier1.pricePerPerson}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: { ...formData.pricing, group: { ...formData.pricing.group, tier1: { ...formData.pricing.group.tier1, pricePerPerson: parseInt(e.target.value) } } }
                            })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label>Tier 2 Min</Label>
                          <Input
                            type="number"
                            value={formData.pricing.group.tier2.min}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: { ...formData.pricing, group: { ...formData.pricing.group, tier2: { ...formData.pricing.group.tier2, min: parseInt(e.target.value) } } }
                            })}
                          />
                        </div>
                        <div>
                          <Label>Tier 2 Max</Label>
                          <Input
                            type="number"
                            value={formData.pricing.group.tier2.max}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: { ...formData.pricing, group: { ...formData.pricing.group, tier2: { ...formData.pricing.group.tier2, max: parseInt(e.target.value) } } }
                            })}
                          />
                        </div>
                        <div>
                          <Label>Price/Person (₹)</Label>
                          <Input
                            type="number"
                            value={formData.pricing.group.tier2.pricePerPerson}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: { ...formData.pricing, group: { ...formData.pricing.group, tier2: { ...formData.pricing.group.tier2, pricePerPerson: parseInt(e.target.value) } } }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Add-ons Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Add-ons</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      addOns: [...formData.addOns, {
                        id: `addon-${Date.now()}`,
                        name: '',
                        description: '',
                        price: 0,
                        calculationType: 'flat',
                        active: true
                      }]
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add New Add-on
                  </Button>
                </div>
                {formData.addOns.map((addon, index) => (
                  <Card key={addon.id} className="bg-gray-50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={addon.active}
                            onCheckedChange={(checked) => {
                              const newAddOns = [...formData.addOns];
                              newAddOns[index].active = checked;
                              setFormData({ ...formData, addOns: newAddOns });
                            }}
                          />
                          <Label>Active</Label>
                        </div>
                        {formData.addOns.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const newAddOns = formData.addOns.filter((_, i) => i !== index);
                              setFormData({ ...formData, addOns: newAddOns });
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Add-on Name</Label>
                          <Input
                            value={addon.name}
                            onChange={(e) => {
                              const newAddOns = [...formData.addOns];
                              newAddOns[index].name = e.target.value;
                              setFormData({ ...formData, addOns: newAddOns });
                            }}
                          />
                        </div>
                        <div>
                          <Label>Price (₹)</Label>
                          <Input
                            type="number"
                            value={addon.price}
                            onChange={(e) => {
                              const newAddOns = [...formData.addOns];
                              newAddOns[index].price = parseInt(e.target.value);
                              setFormData({ ...formData, addOns: newAddOns });
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Calculation Type</Label>
                          <Select
                            value={addon.calculationType}
                            onValueChange={(value) => {
                              const newAddOns = [...formData.addOns];
                              newAddOns[index].calculationType = value;
                              setFormData({ ...formData, addOns: newAddOns });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="flat">Flat Price</SelectItem>
                              <SelectItem value="per_person">Per Person</SelectItem>
                              <SelectItem value="per_adult">Per Adult</SelectItem>
                              <SelectItem value="per_3_guests">Per 3 Guests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            value={addon.description}
                            placeholder="Optional"
                            onChange={(e) => {
                              const newAddOns = [...formData.addOns];
                              newAddOns[index].description = e.target.value;
                              setFormData({ ...formData, addOns: newAddOns });
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Availability Calendar */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-[#8B0000]">Availability Calendar & Time Slots</h3>
              
              <div className="flex items-center justify-between">
                <Label>Available Dates</Label>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setFormData({
                    ...formData,
                    availability: [...formData.availability, {
                      date: '',
                      timeSlots: []
                    }]
                  })}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Date
                </Button>
              </div>

              {formData.availability.map((day, dayIndex) => (
                <Card key={dayIndex} className="bg-gray-50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={day.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => {
                            const newAvailability = [...formData.availability];
                            newAvailability[dayIndex].date = e.target.value;
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            const newAvailability = [...formData.availability];
                            newAvailability[dayIndex].timeSlots.push({
                              time: '',
                              bookingType: 'private',
                              maxCapacity: 1,
                              currentBookings: 0,
                              available: true
                            });
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add Time Slot
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newAvailability = formData.availability.filter((_, i) => i !== dayIndex);
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Time Slots */}
                    {day.timeSlots.length > 0 && (
                      <div className="space-y-2 border-t pt-3">
                        <Label className="text-sm font-semibold">Time Slots</Label>
                        {day.timeSlots.map((slot, slotIndex) => (
                          <div key={slotIndex} className="grid grid-cols-5 gap-2 items-end bg-white p-3 rounded">
                            <div>
                              <Label className="text-xs">Time</Label>
                              <Input
                                type="time"
                                value={slot.time}
                                onChange={(e) => {
                                  const newAvailability = [...formData.availability];
                                  newAvailability[dayIndex].timeSlots[slotIndex].time = e.target.value;
                                  setFormData({ ...formData, availability: newAvailability });
                                }}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Booking Type</Label>
                              <Select
                                value={slot.bookingType}
                                onValueChange={(value) => {
                                  const newAvailability = [...formData.availability];
                                  newAvailability[dayIndex].timeSlots[slotIndex].bookingType = value;
                                  setFormData({ ...formData, availability: newAvailability });
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {formData.pricing.private.enabled && (
                                    <SelectItem value="private">Private</SelectItem>
                                  )}
                                  {formData.pricing.shared.enabled && (
                                    <SelectItem value="shared">Shared</SelectItem>
                                  )}
                                  {formData.pricing.group.enabled && (
                                    <SelectItem value="group">Group</SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">Max Capacity</Label>
                              <Input
                                type="number"
                                min="1"
                                value={slot.maxCapacity}
                                onChange={(e) => {
                                  const newAvailability = [...formData.availability];
                                  newAvailability[dayIndex].timeSlots[slotIndex].maxCapacity = parseInt(e.target.value) || 1;
                                  setFormData({ ...formData, availability: newAvailability });
                                }}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Current Bookings</Label>
                              <Input
                                type="number"
                                value={slot.currentBookings || 0}
                                disabled
                                className="bg-gray-100"
                              />
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                const newAvailability = [...formData.availability];
                                newAvailability[dayIndex].timeSlots = newAvailability[dayIndex].timeSlots.filter((_, i) => i !== slotIndex);
                                setFormData({ ...formData, availability: newAvailability });
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="submit" className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
                {editingExperience ? 'Update Experience' : 'Create Experience'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingExperience(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminExperiences;
