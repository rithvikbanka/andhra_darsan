import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

/* ─── Previous ForgotEmail with phone/partial-email lookup (preserved for reference) ───
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Info } from 'lucide-react';
// Two expandable option cards: phone lookup + partial email search
// with inline forms and "contact hello@andhradarsan.com" responses
─── End previous version ─── */

const ForgotEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <Mail className="w-14 h-14 text-[#8B0000] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Need help with your email?</h2>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          If you've forgotten which email you used to sign up, please contact us at{' '}
          <a href="mailto:support@andhradarsan.com" className="text-[#8B0000] font-medium hover:underline">
            support@andhradarsan.com
          </a>{' '}
          and we'll help you recover your account.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white py-3 rounded-lg font-medium text-sm transition-colors"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotEmail;
