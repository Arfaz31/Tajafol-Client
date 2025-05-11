"use client";

import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full bg-background fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center overflow-hidden">
      {/* Blurred Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[200px] md:w-[300px] h-[300px] bg-[rgba(33,150,243,0.2)] blur-[100px] absolute top-[28%] left-[20%]" />
        <div className="w-[200px] md:w-[300px] h-[300px] bg-[rgba(255,193,7,0.2)] blur-[100px] absolute bottom-[10%] right-[20%]" />
      </div>

      {/* Main Content */}
      <div className="z-50 relative flex flex-col items-center gap-8">
        {/* Spinner with TajaFol branding */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin [animation-duration:800ms]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin [animation-duration:1200ms] [animation-direction:reverse]" />
          </div>
        </div>

        {/* Text that matches TajaFol branding */}
        <div className="text-center">
          <h2 className="text-2xl font-medium text-foreground mb-2">TajaFol</h2>
          <p className="text-sm text-muted-foreground">
            Preparing your fresh content experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
