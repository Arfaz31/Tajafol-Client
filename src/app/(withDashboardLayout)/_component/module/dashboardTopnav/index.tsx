/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetmeQuery } from "@/redux/api/userApi";
import userImage from "@/assets/logo/man.png";
import tazafol from "@/assets/logo/tajafol-logo1.png";

interface DashboardTopnavProps {
  onMenuClick?: () => void;
}

const DashboardTopnav: React.FC<DashboardTopnavProps> = ({ onMenuClick }) => {
  //@ts-ignore

  const { data: userData } = useGetmeQuery("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown-container")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo for mobile view */}
          <div className="lg:hidden">
            <Image
              src={tazafol}
              alt="Taaza Fol Logo"
              width={80}
              height={24}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search button for mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown-container">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <Image
                src={userData?.data?.profileImage || userImage}
                alt="User profile picture"
                width={32}
                height={32}
                className="rounded-full object-cover object-center w-8 h-8"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {userData?.data?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userData?.data?.user?.email || "user@email.com"}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer outline-none"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="h-4 w-4 mr-3" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200 cursor-pointer outline-none"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <span>Sign out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardTopnav;
