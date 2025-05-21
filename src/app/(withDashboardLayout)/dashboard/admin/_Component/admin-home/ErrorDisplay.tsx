// src/components/Dashboard/ErrorDisplay.tsx
import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  message?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  message = "An error occurred" 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;