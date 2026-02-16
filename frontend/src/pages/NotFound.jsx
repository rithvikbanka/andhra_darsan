import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Error */}
        <h1 className="text-9xl font-bold text-[#8B0000] mb-4">404</h1>
        
        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C2C] mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-[#5C5C5C] mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track to discover Andhra's cultural treasures.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] hover:bg-[#6B0000] text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-lg font-medium transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
        
        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-[#5C5C5C] mb-4">
            Popular pages:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/experiences"
              className="text-[#8B0000] hover:text-[#6B0000] hover:underline font-medium"
            >
              Browse Experiences
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/faq"
              className="text-[#8B0000] hover:text-[#6B0000] hover:underline font-medium"
            >
              FAQs
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/admin"
              className="text-[#8B0000] hover:text-[#6B0000] hover:underline font-medium"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
