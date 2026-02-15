import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
// TODO: Re-enable when hooking to backend
// import { experienceAPI } from '../services/api';
// import { testimonials } from '../mock';

// Demo mode: Using static data instead of API calls
import { DEMO_EXPERIENCES, DEMO_TESTIMONIALS } from '../demoData';

const Home = () => {
  const [stats, setStats] = useState({ experiences: 0, guests: 0, facilitators: 0, cities: 0 });
  const [featuredExperiences, setFeaturedExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animate stats on mount
  useEffect(() => {
    fetchExperiences();
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { experiences: 50, guests: 5000, facilitators: 10, cities: 8 };
    let current = { experiences: 0, guests: 0, facilitators: 0, cities: 0 };

    const timer = setInterval(() => {
      let done = true;
      Object.keys(targets).forEach((key) => {
        if (current[key] < targets[key]) {
          current[key] = Math.min(
            current[key] + Math.ceil(targets[key] / steps),
            targets[key]
          );
          done = false;
        }
      });
      setStats({ ...current });
      if (done) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // TODO: Re-enable when hooking to backend
  // const fetchExperiences = async () => {
  //   try {
  //     const data = await experienceAPI.getAll();
  //     const featured = data.filter((exp) => exp.featured);
  //     setFeaturedExperiences(featured);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching experiences:', error);
  //     setLoading(false);
  //   }
  // };

  // Demo mode: Load featured experiences from static data
  const fetchExperiences = () => {
    // Simulate loading delay for realistic feel
    setTimeout(() => {
      // Get experiences marked as featured, or take first 6 if none are marked
      const featured = DEMO_EXPERIENCES.filter((exp) => exp.featured);
      setFeaturedExperiences(featured.length > 0 ? featured.slice(0, 6) : DEMO_EXPERIENCES.slice(0, 6));
      setLoading(false);
    }, 300);
  };

  return (
    <div className="bg-[#FAF7F0]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1714682120648-1811a1d52afb"
            alt="Andhra Temple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAF7F0]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Experience Andhra.<br />Become Andhra.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Curated cultural journeys, sacred rituals, crafts, and stories of Andhra Pradesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/experiences">
              <Button
                size="lg"
                className="bg-[#8B0000] hover:bg-[#6B0000] text-white text-lg px-8 py-6 h-auto"
              >
                Explore Experiences
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 h-auto"
              onClick={() => alert('Contact Experience Curator - Feature coming soon!')}
            >
              Plan a Private Experience
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-white">
              <div className="text-4xl font-bold text-[#DAA520]">{stats.experiences}+</div>
              <div className="text-sm mt-1 opacity-90">Curated Experiences</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-[#DAA520]">{stats.guests}+</div>
              <div className="text-sm mt-1 opacity-90">Guests Hosted</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-[#DAA520]">{stats.facilitators}+</div>
              <div className="text-sm mt-1 opacity-90">Cultural Facilitators</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-[#DAA520]">{stats.cities}+</div>
              <div className="text-sm mt-1 opacity-90">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2C2C] mb-4">
              Featured Experiences
            </h2>
            <p className="text-lg text-[#5C5C5C] max-w-2xl mx-auto">
              Handpicked cultural journeys that transform tourists into participants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((exp) => (
              <Card
                key={exp.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
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
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#2C2C2C] mb-3 group-hover:text-[#8B0000] transition-colors">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-[#5C5C5C] mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
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
                        View Experience
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/experiences">
              <Button
                size="lg"
                className="bg-[#8B0000] hover:bg-[#6B0000] text-white px-8"
              >
                View All Experiences
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Andhra Darsan Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#FAF7F0] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2C2C] mb-4">
              Why Andhra Darsan
            </h2>
            <p className="text-lg text-[#5C5C5C] max-w-2xl mx-auto">
              Not tourism. Cultural immersion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#6B0000] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">
                Cultural Facilitators
              </h3>
              <p className="text-[#5C5C5C] leading-relaxed">
                Not guides—experts who bring alive the soul of Andhra through authentic storytelling
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">
                Participatory Experiences
              </h3>
              <p className="text-[#5C5C5C] leading-relaxed">
                Witness, learn, and participate—from temple rituals to craft workshops
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#6B0000] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">
                VIP Access
              </h3>
              <p className="text-[#5C5C5C] leading-relaxed">
                Skip queues, exclusive entry, and insider access to sacred and cultural spaces
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">
                Memory Kits
              </h3>
              <p className="text-[#5C5C5C] leading-relaxed">
                Tangible memories—sacred items, handcrafted souvenirs, and ritual artifacts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Using DEMO_TESTIMONIALS */}
      <section className="py-20 px-6 bg-[#2C2C2C] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              What Travelers Say
            </h2>
            <p className="text-lg text-gray-300">
              Stories from those who became Andhra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.location}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#DAA520]">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Discover Andhra Through Curated Experiences
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Designed for curious travellers seeking meaningful cultural connections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/experiences">
              <Button
                size="lg"
                className="bg-white text-[#8B0000] hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              >
                Explore All Experiences
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              onClick={() => alert('Contact Experience Curator - Feature coming soon!')}
            >
              Contact Experience Curator
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
