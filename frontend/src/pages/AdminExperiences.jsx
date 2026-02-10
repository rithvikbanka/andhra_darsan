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
    ]
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
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
      ]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/experiences/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Experience deleted successfully!');
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Failed to delete experience');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

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
      alert(error.response?.data?.detail || 'Failed to save experience');
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
      ]
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
