import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ADMIN_EMAILS = ['hello@andhradarsan.com'];

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      navigate('/login');
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const redirect = sessionStorage.getItem('redirectAfterLogin');
        sessionStorage.removeItem('redirectAfterLogin');
        if (ADMIN_EMAILS.includes(session.user.email)) {
          navigate(redirect || '/admin');
        } else {
          navigate(redirect || '/');
        }
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B0000] mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Signing you in...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
};

export default AuthCallback;
