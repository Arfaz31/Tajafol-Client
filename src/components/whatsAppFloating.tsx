'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppFloatingButtonProps {
  phoneNumber: string;
  message?: string;
}

const ClientWhatsAppButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber,
  message = 'Hello! I have a question about TazaFol.',
}) => {
  // Format the phone number (remove any non-numeric characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // Create the WhatsApp URL with the phone number and optional message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
      
      {/* Pulse animation */}
      <span className="absolute w-full h-full rounded-full bg-green-500 opacity-50 animate-ping"></span>
      
      {/* Tooltip that appears on hover */}
      <div className="absolute right-full mr-3 -mt-2 whitespace-nowrap bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat with us
      </div>
    </a>
  );
};

export default ClientWhatsAppButton;