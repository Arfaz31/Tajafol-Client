// src/components/Dashboard/LoadingSpinner.tsx
import React from "react";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Lottie animationData={spinner} loop={true} className="h-32 w-32 mx-auto" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;