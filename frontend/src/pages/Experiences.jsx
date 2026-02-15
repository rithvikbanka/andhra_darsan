import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Clock, Star, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
// TODO: Re-enable when hooking to backend
// import { experienceAPI } from '../services/api';

// Demo mode: Using static data instead of API calls
import { DEMO_EXPERIENCES } from '../demoData';

const Experiences = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    locations: [],
    durations: [],
    priceRange: [1000, 10000]
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  // TODO: Re-enable when hooking to backend
  // const fetchExperiences = async () => {
  //   try {
  //     const data = await experienceAPI.getAll();
  //     setExperiences(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching experiences:', error);
  //     setLoading(false);
  //   }
  // };

  // Demo mode: Load static data instead of API call
  const fetchExperiences = () => {
    // Simulate loading delay for realistic feel
    setTimeout(() => {
      setExperiences(DEMO_EXPERIENCES);
      setLoading(false);
    }, 300);
  };

  const categories = [
    'Temples & Spirituality',
    'Handlooms & Handicrafts',
    'Performing Arts',
    'Heritage',
    'Culinary',
    'Nature',
    'Mix'
  ];

  const locations = [
    'Amaravati – Vijayawada',
    'Guntur',
    'Tirupati',
    'Vizag'
  ];

  const durations = [
    'Under 2 hours',
    '2–4 hours',
    'Half-day',
    'Full-day'
  ];

  // Helper function to check duration filter
  const matchesDuration = (expDuration, filterDuration) => {
    const hours = parseFloat(expDuration);
    switch (filterDuration) {
      case 'Under 2 hours':
        return hours < 2;
      case '2–4 hours':
        return hours >= 2 && hours <= 4;
      case 'Half-day':
        return hours > 4 && hours <= 6;
      case 'Full-day':
        return hours > 6;
      default:
        return true;
    }
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleLocationChange = (location) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location]
    }));
  };

  const handleDurationChange = (duration) => {
    setFilters((prev) => ({
      ...prev,
      durations: prev.durations.includes(duration)
        ? prev.durations.filter((d) => d !== duration)
        : [...prev.durations, duration]
    }));
  };

  const filteredExperiences = experiences.filter((exp) => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(exp.category)) {
      return false;
    }
    // Location filter
    if (filters.locations.length > 0 && !filters.locations.includes(exp.location)) {
      return false;
    }
    // Duration filter
    if (filters.durations.length > 0) {
      const matchesAnyDuration = filters.durations.some(d => matchesDuration(exp.duration, d));
      if (!matchesAnyDuration) {
        return false;
      }
    }
    // Price range filter
    if (exp.price < filters.priceRange[0] || exp.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <div className="text-xl">Loading experiences...</div>
      </div>
    );
  }

  const FilterPanel = () => (
    <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#2C2C2C]">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilters({ categories: [], locations: [], durations: [], priceRange: [1000, 10000] })}
          className="text-[#8B0000]"
        >
          Clear All
        </Button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-[#2C2C2C] mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-[#2C2C2C] mb-3">Location</h4>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center gap-2">
              <Checkbox
                id={location}
                checked={filters.locations.includes(location)}
                onCheckedChange={() => handleLocationChange(location)}
              />
              <Label htmlFor={location} className="text-sm cursor-pointer">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-[#2C2C2C] mb-3">Duration</h4>
        <div className="space-y-2">
          {durations.map((duration) => (
            <div key={duration} className="flex items-center gap-2">
              <Checkbox
                id={duration}
                checked={filters.durations.includes(duration)}
                onCheckedChange={() => handleDurationChange(duration)}
              />
              <Label htmlFor={duration} className="text-sm cursor-pointer">
                {duration}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-[#2C2C2C] mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
            min={1000}
            max={10000}
            step={500}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-[#5C5C5C]">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}+</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAF7F0] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Explore Experiences
          </h1>
          <p className="text-xl text-white/90">
            {filteredExperiences.length} curated cultural journeys waiting for you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterPanel />
          </div>

          {/* Right Side - Experience Cards */}
          <div className="lg:col-span-3">
            {filteredExperiences.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-[#5C5C5C]">
                  No experiences match your filters. Try adjusting your selection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredExperiences.map((exp) => (
                  <Card
                    key={exp.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={exp.image || exp.imageUrl}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#8B0000] text-white text-xs px-3 py-1 rounded-full">
                          {exp.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#DAA520] text-[#DAA520]" />
                        <span className="text-xs font-semibold">{exp.rating}</span>
                      </div>
                      {exp.featured && (
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-[#DAA520] text-white text-xs px-3 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-serif font-bold text-[#2C2C2C] mb-3 group-hover:text-[#8B0000] transition-colors">
                        {exp.title}
                      </h3>
                      <div className="space-y-2 text-sm text-[#5C5C5C] mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-2xl font-bold text-[#8B0000]">₹{exp.price}</span>
                          <span className="text-sm text-[#5C5C5C]"> / person</span>
                        </div>
                        <Link to={`/experience/${exp.id}`}>
                          <Button
                            size="sm"
                            className="bg-[#DAA520] hover:bg-[#B8860B] text-[#2C2C2C]"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
