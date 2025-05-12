// components/GlassLoader.tsx
"use client";

import React from "react";

const GlassLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="glass-loader animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-80"></div>
    </div>
  );
};

export default GlassLoader;
