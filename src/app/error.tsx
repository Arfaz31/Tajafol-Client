"use client";

import React from "react";
import Link from "next/link";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="max-w-6xl w-full rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left column - Visual */}
          <div className="relative overflow-hidden bg-green-800 text-white p-8 md:p-12 flex flex-col justify-between">
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
              >
                <defs>
                  <pattern
                    id="pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 20 L40 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M20 0 L20 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#pattern)"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Fresh Seasonal Fruits
              </h1>
              <div className="w-16 h-px bg-green-300 my-4"></div>
              <h2 className="text-xl md:text-2xl font-medium mb-2">
                Farm to Your Doorstep
              </h2>
              <p className="text-green-200 mb-6">
                Enjoy the freshest mangoes, litchis, jackfruits and more,
                handpicked and delivered straight from our orchards.
              </p>
            </div>

            <div className="relative z-10 mt-6">
              <Link href="/fruits" passHref>
                <button className="px-6 py-3 bg-white text-green-800 font-medium rounded hover:bg-green-50 transition-colors">
                  Browse Fruits
                </button>
              </Link>
            </div>
          </div>

          {/* Right column - Error Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">Error</h1>
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Something went wrong
              </h2>
              <p className="text-gray-500 mb-4">{error.message}</p>
              {error.digest && (
                <p className="text-sm text-gray-400">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => reset()}
                className="w-full px-6 py-3 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition-colors shadow-sm"
              >
                Try Again
              </button>

              <Link href="/" passHref>
                <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:border-green-700 hover:text-green-800 transition-colors">
                  Return Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
