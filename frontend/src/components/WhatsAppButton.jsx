import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '+919491204654';
  const message = 'Hello! I would like to know more about Andhra Darsan cultural experiences.';
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden group-hover:inline-block text-sm font-semibold whitespace-nowrap pr-2">
        Talk to Experience Curator
      </span>
    </button>
  );
};

export default WhatsAppButton;
