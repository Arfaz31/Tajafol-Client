"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppFloatingButtonProps {
  phoneNumber: string;
  message?: string;
}

const ClientWhatsAppButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber,
  message = "Hello! I have a question about TazaFol.",
}) => {
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Format the phone number (remove any non-numeric characters)
  const formattedPhone = phoneNumber.replace(/\D/g, "");

  // Create the WhatsApp URL with the phone number and optional message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 group
        ${isMobile ? "bottom-24 right-4" : "bottom-6 right-6"}`}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-2xl" />

      {/* Pulse animation */}
      <span className="absolute w-full h-full rounded-full bg-green-500 opacity-50 animate-ping"></span>

      {/* Tooltip that appears on hover - only show on non-mobile */}
      {!isMobile && (
        <div className="absolute right-full mr-3 -mt-2 whitespace-nowrap bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Chat with us
        </div>
      )}
    </a>
  );
};

export default ClientWhatsAppButton;
