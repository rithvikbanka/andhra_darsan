import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Shield, User } from 'lucide-react';
import { Button } from './ui/button';
import logoFull from '../assets/logo-full.png';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };

  const displayName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || '';

  const avatar = user?.user_metadata?.avatar_url
    || user?.user_metadata?.picture;

  const Avatar = ({ size = 'w-8 h-8', textSize = 'text-sm' }) =>
    avatar ? (
      <img src={avatar} alt={displayName} className={`${size} rounded-full object-cover border border-[#8B0000]/20`} referrerPolicy="no-referrer" />
    ) : (
      <div className={`${size} rounded-full bg-[#8B0000] flex items-center justify-center text-white ${textSize} font-bold`}>
        {displayName.charAt(0).toUpperCase()}
      </div>
    );

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#8B4513]/10">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoFull} alt="Andhra Darsan" className="h-8 w-auto md:h-9" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#8B0000] ${isActive(link.path) ? 'text-[#8B0000]' : 'text-[#2C2C2C]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && !user && (
              <Link to="/login">
                <button className="border border-[#8B0000] text-[#8B0000] hover:bg-red-50 rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Login
                </button>
              </Link>
            )}

            {!loading && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:bg-amber-50 rounded-lg px-3 py-2 transition-colors"
                >
                  <Avatar />
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate hidden lg:block">
                    {displayName.split(' ')[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/my-account"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 w-full"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 w-full text-left"
                      onClick={() => { toast('Bookings feature coming soon!', { icon: '📅' }); setDropdownOpen(false); }}
                    >
                      My Bookings
                    </button>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-amber-700 font-medium hover:bg-amber-50 w-full"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Link to="/experiences">
              <Button size="sm" className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
                Book Experience
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#2C2C2C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#8B4513]/10 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-[#8B0000] ${isActive(link.path) ? 'text-[#8B0000]' : 'text-[#2C2C2C]'}`}
                >
                  {link.name}
                </Link>
              ))}

              {!loading && !user && (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-2 border-[#8B0000] text-[#8B0000]">
                    <User className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
              )}

              {!loading && user && (
                <>
                  <div className="flex items-center gap-3 py-2 border-t border-gray-200 pt-4">
                    <Avatar size="w-8 h-8" textSize="text-xs" />
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">{displayName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/my-account" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-700 hover:text-[#8B0000]">
                    My Account
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-sm text-amber-700 font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}
                  <button onClick={handleSignOut} className="text-sm text-red-700 text-left hover:underline">
                    Sign Out
                  </button>
                </>
              )}

              <Link to="/experiences" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white">
                  Book Experience
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
