import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { scrollToTop, scrollToElement, isValidEmail } from '../utils/helpers';
import logoFull from '../assets/logo-full.png';
import toast from 'react-hot-toast';

// Social Media Icon with Tooltip Component
const SocialIcon = ({ Icon, name }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <button
        className="text-gray-400 hover:text-[#DAA520] transition-colors cursor-not-allowed"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={(e) => {
          e.preventDefault();
          toast.info('Social media links coming soon!');
        }}
        aria-label={`${name} (Coming Soon)`}
      >
        <Icon className="w-5 h-5" />
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
          Coming Soon
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle newsletter submission via mailto
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      const subject = encodeURIComponent('Newsletter Subscription Request');
      const body = encodeURIComponent(`New newsletter subscription request from: ${email}`);
      window.location.href = `mailto:vyshnavikorlakunta@gmail.com?subject=${subject}&body=${body}`;
      
      toast.success('Thank you! Opening your email client...');
      setEmail('');
    } catch (error) {
      toast.error('Unable to open email client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle smooth scroll to homepage sections
  const handleSectionScroll = (e, sectionId) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // Already on homepage, just scroll
      scrollToElement(sectionId);
    } else {
      // Navigate to homepage with scroll state
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  // Handle category link click
  const handleCategoryClick = (category) => {
    scrollToTop(100);
  };

  // Handle phone call with confirmation
  const handlePhoneClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Do you want to call +91 98765 43210?');
    if (confirmed) {
      window.location.href = 'tel:+919876543210';
    }
  };

  return (
    <footer className="bg-[#2C2C2C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {/* Clickable Logo */}
            <Link to="/" onClick={() => scrollToTop()}>
              <img
                src={logoFull}
                alt="Andhra Darsan"
                className="h-6 w-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Experience Andhra. Become Andhra. Curated cultural journeys, sacred rituals, crafts, and stories of Andhra Pradesh.
            </p>
            
            {/* Social Media Icons with Tooltips */}
            <div className="flex gap-3">
              <SocialIcon Icon={Facebook} name="Facebook" />
              <SocialIcon Icon={Instagram} name="Instagram" />
              <SocialIcon Icon={Twitter} name="Twitter" />
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-semibold mb-4 text-[#DAA520]">Experiences</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link 
                  to="/experiences?category=Temples & Spirituality" 
                  onClick={() => handleCategoryClick('Temples & Spirituality')}
                  className="hover:text-[#DAA520] transition-colors"
                >
                  Temples & Spirituality
                </Link>
              </li>
              <li>
                <Link 
                  to="/experiences?category=Handlooms & Handicrafts"
                  onClick={() => handleCategoryClick('Handlooms & Handicrafts')}
                  className="hover:text-[#DAA520] transition-colors"
                >
                  Handlooms & Handicrafts
                </Link>
              </li>
              <li>
                <Link 
                  to="/experiences?category=Culinary"
                  onClick={() => handleCategoryClick('Culinary')}
                  className="hover:text-[#DAA520] transition-colors"
                >
                  Culinary
                </Link>
              </li>
              <li>
                <Link 
                  to="/experiences?category=Heritage"
                  onClick={() => handleCategoryClick('Heritage')}
                  className="hover:text-[#DAA520] transition-colors"
                >
                  Heritage
                </Link>
              </li>
              <li>
                <Link 
                  to="/experiences?category=Nature"
                  onClick={() => handleCategoryClick('Nature')}
                  className="hover:text-[#DAA520] transition-colors"
                >
                  Nature
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#DAA520]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleSectionScroll(e, 'about')}
                  className="hover:text-[#DAA520] transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  onClick={() => scrollToTop(100)}
                  className="hover:text-[#DAA520] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              {/* Demo mode: My Account disabled until auth is ready */}
              {/* <li>
                <Link to="/login" className="hover:text-[#DAA520] transition-colors">
                  My Account
                </Link>
              </li> */}
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleSectionScroll(e, 'contact')}
                  className="hover:text-[#DAA520] transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Privacy Policy page coming soon!');
                  }}
                  className="hover:text-[#DAA520] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div id="contact">
            <h4 className="font-semibold mb-4 text-[#DAA520]">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300 mb-6">
              {/* Clickable Address - Opens Google Maps */}
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Amaravati,+Andhra+Pradesh,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-[#DAA520] transition-colors group"
                >
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 group-hover:text-[#DAA520]" />
                  <span className="hover:underline">Amaravati, Andhra Pradesh, India</span>
                </a>
              </li>
              
              {/* Clickable Phone - Shows Confirmation */}
              <li>
                <a 
                  href="tel:+919876543210"
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2 hover:text-[#DAA520] transition-colors group"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 group-hover:text-[#DAA520]" />
                  <span className="hover:underline">+91 98765 43210</span>
                </a>
              </li>
              
              {/* Clickable Email - Opens Mail Client */}
              <li>
                <a 
                  href="mailto:vyshnavikorlakunta@gmail.com?subject=Inquiry%20about%20Cultural%20Experiences"
                  className="flex items-center gap-2 hover:text-[#DAA520] transition-colors group"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 group-hover:text-[#DAA520]" />
                  <span className="hover:underline">vyshnavikorlakunta@gmail.com</span>
                </a>
              </li>
            </ul>

            {/* Newsletter Form */}
            <div>
              <h5 className="font-semibold mb-2 text-sm">Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm"
                  required
                  disabled={loading}
                  aria-label="Email for newsletter"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-[#DAA520] hover:bg-[#B8860B] text-[#2C2C2C]"
                  disabled={loading}
                >
                  {loading ? '...' : 'Subscribe'}
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                Subscribe to receive updates about new experiences
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Andhra Darsan. All rights reserved. Crafted with cultural pride.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
