import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Heart, Settings, LogOut, ChevronDown, ChevronUp, MapPin, Users, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const provider = user?.app_metadata?.provider;
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

  const bookings = (() => {
    try {
      const data = localStorage.getItem('bookingInterests');
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  })();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggle = (key) => setExpanded(expanded === key ? null : key);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-4">
            {avatar ? (
              <img src={avatar} alt={displayName} className="w-16 h-16 rounded-full object-cover border-2 border-[#8B0000]/20" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#8B0000] flex items-center justify-center text-white text-2xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              {memberSince && <p className="text-gray-400 text-xs mt-1">Member since {memberSince}</p>}
            </div>
            <button
              onClick={() => toast('Profile editing coming soon!', { icon: '🔜' })}
              className="hidden sm:block border border-[#8B0000] text-[#8B0000] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Bookings */}
          <div
            className={`bg-white rounded-xl shadow-md p-5 cursor-pointer transition-all hover:shadow-lg ${expanded === 'bookings' ? 'ring-2 ring-[#8B0000]' : ''}`}
            onClick={() => toggle('bookings')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#8B0000]" />
                <div>
                  <h3 className="font-semibold text-gray-900">My Bookings</h3>
                  <p className="text-gray-500 text-sm">{bookings.length} booking(s)</p>
                </div>
              </div>
              {expanded === 'bookings' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
          </div>

          {/* Saved */}
          <div
            className="bg-white rounded-xl shadow-md p-5 cursor-pointer transition-all hover:shadow-lg"
            onClick={() => toast('Wishlist feature coming soon!', { icon: '❤️' })}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-[#8B0000]" />
              <div>
                <h3 className="font-semibold text-gray-900">Saved Experiences</h3>
                <p className="text-gray-500 text-sm">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div
            className={`bg-white rounded-xl shadow-md p-5 cursor-pointer transition-all hover:shadow-lg ${expanded === 'settings' ? 'ring-2 ring-[#8B0000]' : ''}`}
            onClick={() => toggle('settings')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-[#8B0000]" />
                <div>
                  <h3 className="font-semibold text-gray-900">Account Settings</h3>
                  <p className="text-gray-500 text-sm">Password, security</p>
                </div>
              </div>
              {expanded === 'settings' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
          </div>
        </div>

        {/* Expanded: Bookings */}
        {expanded === 'bookings' && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Your Bookings</h3>
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No bookings yet.</p>
                <Link to="/experiences" className="text-[#8B0000] font-semibold hover:underline text-sm">Browse Experiences</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{b.experienceTitle || b.title || 'Experience'}</p>
                      {b.date && <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</p>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {b.groupSize && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{b.groupSize}</span>}
                      {b.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{b.phone}</span>}
                      {b.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{b.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expanded: Settings */}
        {expanded === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
              {provider === 'google' ? (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Signed in with Google
                </div>
              ) : (
                <Link to="/login" onClick={() => { }} className="block text-sm text-[#8B0000] hover:underline">
                  Change Password →
                </Link>
              )}

              <div className="pt-4 border-t border-gray-200">
                {showDeleteConfirm ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-700 mb-3">Are you sure you want to delete your account? This cannot be undone.</p>
                    <div className="flex gap-3">
                      <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
                      <button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          toast('Please contact hello@andhradarsan.com to delete your account.', { icon: 'ℹ️', duration: 5000 });
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowDeleteConfirm(true)} className="text-red-600 text-sm hover:underline">
                    Delete account
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sign Out */}
        <div className="text-center">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 border-2 border-[#8B0000] text-[#8B0000] hover:bg-red-50 rounded-lg px-6 py-3 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
