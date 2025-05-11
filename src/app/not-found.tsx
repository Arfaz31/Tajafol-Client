import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50 p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left column - Fruit Visual */}
          <div className="relative overflow-hidden bg-gradient-to-b from-green-600 to-green-800 text-white p-8 flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20">
              {/* Fruit pattern */}
              <svg
                viewBox="0 0 400 400"
                className="absolute top-0 left-0 h-full w-full"
              >
                <defs>
                  <pattern
                    id="fruit-pattern"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="30"
                      cy="30"
                      r="15"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M30 10 L35 25 L50 30 L35 35 L30 50 L25 35 L10 30 L25 25 Z"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#fruit-pattern)"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <h1 className="text-7xl md:text-9xl font-bold text-green-100">
                404
              </h1>
              <div className="h-1 w-24 bg-yellow-300 my-6"></div>
              <h2 className="text-2xl md:text-3xl font-medium mb-2">
                Fruit Not Found
              </h2>
              <p className="text-green-200 mb-8">
                Sorry, we couldn&apos;t find the juicy page you&apos;re looking
                for.
              </p>
            </div>

            <div className="relative z-10">
              <p className="text-sm text-green-200">
                &quot;Life is like a mango - sometimes sweet, sometimes tart,
                but always worth savoring.&quot; <br />
                <span className="italic">— TajaFol Wisdom</span>
              </p>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-yellow-100 rounded-full animate-ping opacity-25"></div>
              <div className="relative z-10 flex items-center justify-center h-full w-full bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-4">
              Lost in our orchard?
            </h3>

            <p className="text-gray-600 text-center mb-8">
              The page you&apos;re looking for might have been moved or is out
              of season. But don&apos;t worry - we have plenty of fresh fruits
              waiting for you!
            </p>

            <div className="flex flex-col gap-5">
              <Link href="/">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Back to Fresh Picks</span>
                </button>
              </Link>

              <Link href="/seasonal-fruits">
                <button className="w-full bg-white border border-green-300 hover:border-green-500 text-gray-700 hover:text-green-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Explore Seasonal Fruits</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
