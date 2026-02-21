import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, MapPin, Clock, Star, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { getExperiences, deleteExperience } from '../../utils/localStorage';
import { debounce } from '../../utils/helpers';
import ExperienceFormModal from '../../components/admin/ExperienceFormModal';
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = [
  'All Categories',
  'Handlooms & Handicrafts',
  'Temples & Spirituality',
  'Heritage',
  'Culinary',
  'Nature',
  'Performing Arts'
];

const ManageExperiences = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const loadExperiences = () => {
    const data = getExperiences();
    setExperiences(data);
  };

  const filterExperiences = useCallback(() => {
    let filtered = [...experiences];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query) ||
        exp.category.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(exp => exp.category === selectedCategory);
    }

    setFilteredExperiences(filtered);
  }, [experiences, searchQuery, selectedCategory]);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 300),
    []
  );

  useEffect(() => {
    loadExperiences();
  }, []);

  useEffect(() => {
    filterExperiences();
  }, [filterExperiences]);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleEdit = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      deleteExperience(id);
      loadExperiences();
      toast.success('Experience deleted successfully!');
    }
  };

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
    loadExperiences();
    toast.success(selectedExperience ? 'Experience updated successfully!' : 'Experience added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-[#8B0000] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif">Manage Experiences</h1>
              <p className="text-white/80 mt-1">{experiences.length} total experiences</p>
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-white text-[#8B0000] hover:bg-gray-100 gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Experience
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Three-Column Control Bar: Back | Search | Filter */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-6">
          {/* LEFT: Back Button */}
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:text-[#8B0000] border border-gray-300 rounded-lg hover:border-[#8B0000] transition-all whitespace-nowrap"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </button>

          {/* CENTER: Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search experiences by title, location, or category..."
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000]"
              aria-label="Search experiences"
            />
          </div>

          {/* RIGHT: Category Filter */}
          <div className="lg:min-w-[240px]">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-[#8B0000]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-6">
          Showing {filteredExperiences.length} of {experiences.length} experiences
          {searchQuery && ` matching your search`}
          {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
        </div>

        {/* Compact Experience Grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((exp) => (
              <Card key={exp.id} className="overflow-hidden hover:shadow-xl transition-all">
                {/* Image with Badges */}
                <div className="relative h-48">
                  <img
                    src={exp.imageUrl || exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Category Badge - Top Left */}
                  <Badge className="absolute top-3 left-3 bg-white text-gray-800 hover:bg-white">
                    {exp.category}
                  </Badge>
                  {/* Featured Badge - Top Right */}
                  {exp.featured && (
                    <Badge className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600 text-white">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>

                {/* Card Content */}
                <CardContent className="p-4">
                  {/* Title */}
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem]">
                    {exp.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-sm">{exp.rating}</span>
                      </div>
                      <span className="font-bold text-[#8B0000] text-xl">
                        ₹{exp.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={() => handleEdit(exp)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 gap-2 text-sm"
                      aria-label={`Edit ${exp.title}`}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(exp.id, exp.title)}
                      variant="outline"
                      className="flex-1 text-red-600 border-red-600 hover:bg-red-50 gap-2 text-sm"
                      aria-label={`Delete ${exp.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                {experiences.length === 0 ? (
                  <>
                    <Plus className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No Experiences Yet</h3>
                    <p className="mb-6">Get started by adding your first cultural experience.</p>
                    <Button onClick={handleAddNew} className="bg-[#8B0000] hover:bg-[#6B0000]">
                      <Plus className="w-5 h-5 mr-2" />
                      Add Your First Experience
                    </Button>
                  </>
                ) : (
                  <>
                    <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No Experiences Found</h3>
                    <p className="mb-6">
                      No experiences match your search criteria. Try adjusting your filters.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All Categories');
                      }}
                      variant="outline"
                      className="border-[#8B0000] text-[#8B0000] hover:bg-red-50"
                    >
                      Clear Filters
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Experience Form Modal */}
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

export default ManageExperiences;
