import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Info } from 'lucide-react';

const ForgotEmail = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [phone, setPhone] = useState('');
  const [partialEmail, setPartialEmail] = useState('');
  const [submitted, setSubmitted] = useState(null);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setSubmitted('phone');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setSubmitted('email');
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <button onClick={() => navigate('/login')} className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#8B0000] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Find your account</h2>
        <p className="text-gray-500 text-sm mb-6">We'll help you recover access to your account</p>

        <div className="space-y-4">
          {/* Option 1: Phone */}
          <div
            className={`border rounded-xl p-4 cursor-pointer transition-colors ${expanded === 'phone' ? 'border-[#8B0000] bg-red-50/30' : 'border-gray-200 hover:border-[#8B0000]'}`}
            onClick={() => { setExpanded('phone'); setSubmitted(null); }}
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#8B0000]" />
              <span className="text-sm font-medium text-gray-800">I remember my phone number</span>
            </div>
            {expanded === 'phone' && (
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                {submitted === 'phone' ? (
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-700">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Please contact <strong>hello@andhradarsan.com</strong> with your phone number and we'll help recover your account within 24 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]" required />
                    <button type="submit" className="px-4 py-2 bg-[#8B0000] hover:bg-[#6B0000] text-white rounded-lg text-sm font-medium">Look up</button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Option 2: Partial email */}
          <div
            className={`border rounded-xl p-4 cursor-pointer transition-colors ${expanded === 'email' ? 'border-[#8B0000] bg-red-50/30' : 'border-gray-200 hover:border-[#8B0000]'}`}
            onClick={() => { setExpanded('email'); setSubmitted(null); }}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#8B0000]" />
              <span className="text-sm font-medium text-gray-800">I remember part of my email</span>
            </div>
            {expanded === 'email' && (
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                {submitted === 'email' ? (
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-700">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>For security, contact <strong>hello@andhradarsan.com</strong> and our team will help verify your identity and recover access.</span>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex gap-2">
                    <input type="text" value={partialEmail} onChange={(e) => setPartialEmail(e.target.value)} placeholder="e.g. vaish...@gmail" className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]" required />
                    <button type="submit" className="px-4 py-2 bg-[#8B0000] hover:bg-[#6B0000] text-white rounded-lg text-sm font-medium">Search</button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-2 text-center text-sm">
          <p><Link to="/login" className="text-[#8B0000] hover:underline">Remember your email?</Link></p>
          <p><Link to="/login" className="text-gray-500 hover:underline">Back to login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotEmail;
