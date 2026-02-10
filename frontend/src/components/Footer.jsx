import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { newsletterAPI } from '../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await newsletterAPI.subscribe(email);
      setMessage('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <footer className="bg-[#2C2C2C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-serif font-bold text-[#DAA520] mb-4">
              Andhra Darsan
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Experience Andhra. Become Andhra. Curated cultural journeys, sacred rituals, crafts, and stories of Andhra Pradesh.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-[#DAA520] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#DAA520] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#DAA520] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-semibold mb-4 text-[#DAA520]">Experiences</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/experiences?category=temples" className="hover:text-[#DAA520] transition-colors">
                  Temples & Spirituality
                </Link>
              </li>
              <li>
                <Link to="/experiences?category=handlooms" className="hover:text-[#DAA520] transition-colors">
                  Handlooms & Handicrafts
                </Link>
              </li>
              <li>
                <Link to="/experiences?category=culinary" className="hover:text-[#DAA520] transition-colors">
                  Culinary
                </Link>
              </li>
              <li>
                <Link to="/experiences?category=heritage" className="hover:text-[#DAA520] transition-colors">
                  Heritage
                </Link>
              </li>
              <li>
                <Link to="/experiences?category=nature" className="hover:text-[#DAA520] transition-colors">
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
                <Link to="/" className="hover:text-[#DAA520] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#DAA520] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#DAA520] transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#DAA520] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#DAA520] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-[#DAA520]">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Amaravati, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@andhradarsan.com</span>
              </li>
            </ul>

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
              {message && (
                <p className={`text-xs mt-2 ${message.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
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
