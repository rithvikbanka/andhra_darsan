import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Shield, User } from 'lucide-react';
import { Button } from './ui/button';
import logoFull from '../assets/logo-full.png';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const userDisplayName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || '';

  const userAvatar = user?.user_metadata?.avatar_url
    || user?.user_metadata?.picture;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#8B4513]/10">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoFull}
              alt="Andhra Darsan"
              className="h-8 w-auto md:h-9"
            />
            {/* Previous text logo kept for fallback: Andhra Darsan */}
            {/* <div className="text-2xl font-serif font-bold text-[#8B0000]">
              Andhra Darsan
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#8B0000] ${
                  isActive(link.path) ? 'text-[#8B0000]' : 'text-[#2C2C2C]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && !user && (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}

            {!loading && user && (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="gap-2 text-[#8B0000]">
                      <Shield className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 px-2">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userDisplayName}
                      className="w-7 h-7 rounded-full border border-[#8B0000]/20"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-white text-xs font-bold">
                      {userDisplayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-[#2C2C2C] max-w-[120px] truncate">
                    {userDisplayName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-gray-600 hover:text-red-700"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            )}

            <Link to="/experiences">
              <Button
                size="sm"
                className="bg-[#8B0000] hover:bg-[#6B0000] text-white"
              >
                Book Experience
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2C2C2C]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
                  className={`text-sm font-medium transition-colors hover:text-[#8B0000] ${
                    isActive(link.path) ? 'text-[#8B0000]' : 'text-[#2C2C2C]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {!loading && !user && (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <User className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
              )}

              {!loading && user && (
                <>
                  <div className="flex items-center gap-2 py-2 border-t border-gray-200 pt-4">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt={userDisplayName}
                        className="w-7 h-7 rounded-full border border-[#8B0000]/20"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-white text-xs font-bold">
                        {userDisplayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[#2C2C2C]">
                      {userDisplayName}
                    </span>
                  </div>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full gap-2 text-[#8B0000] justify-start">
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2 text-gray-600 hover:text-red-700 justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              )}

              <Link to="/experiences" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white"
                >
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
