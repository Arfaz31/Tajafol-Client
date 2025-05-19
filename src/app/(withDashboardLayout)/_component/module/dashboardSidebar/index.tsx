/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import tazafol from "@/assets/logo/tajafol-logo1.png";

import { LineChart, SquarePen, Menu, X, Home } from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaShippingFast } from "react-icons/fa";
import { useGetmeQuery } from "@/redux/api/userApi";
import { IoNewspaperSharp } from "react-icons/io5";

interface DashboardSidebarProps {
  onToggle?: (collapsed: boolean) => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onToggle, isMobile = false, onMobileClose }) => {
  const { data: user } = useGetmeQuery("");
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const adminDashboardLinks = [
    { 
      name: "Insights", 
      link: "/dashboard/admin", 
      icon: <LineChart className="w-5 h-5" />,
      color: "text-orange-300"
    },
    {
      name: "Manage Orders",
      link: "/dashboard/admin/orders",
      icon: <FaShippingFast className="w-5 h-5" />,
      color: "text-blue-300"
    },
    {
      name: "Manage Products",
      link: "/dashboard/admin/manage-products",
      icon: <SquarePen className="w-5 h-5" />,
      color: "text-green-300"
    },
    {
      name: "Manage Categories",
      link: "/dashboard/admin/manage-categories",
      icon: <SquarePen className="w-5 h-5" />,
      color: "text-purple-300"
    },
    {
      name: "Create Admin",
      link: "/dashboard/admin/create-admin",
      icon: <MdAdminPanelSettings className="w-5 h-5" />,
      color: "text-red-300"
    },
    // {
    //   name: "Create Blog",
    //   link: "/dashboard/admin/create-blog",
    //   icon: <IoNewspaperSharp className="w-5 h-5" />,
    //   color: "text-yellow-300"
    // },
  ];

  const links = adminDashboardLinks;

  const isActive = (link: string): boolean => {
    if (pathname === "/dashboard/admin") {
      return link === pathname;
    }
    return pathname === link;
  };

  const toggleSidebar = () => {
    if (isMobile && onMobileClose) {
      // On mobile, just close the sidebar
      onMobileClose();
    } else {
      // On desktop, toggle collapse state
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);
      if (onToggle) {
        onToggle(newCollapsedState);
      }
    }
  };

  // Notify parent component of initial state
  useEffect(() => {
    if (onToggle) {
      onToggle(isCollapsed);
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-orange-600 via-orange-700 to-orange-800 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-5 w-20 h-20 rounded-full bg-white"></div>
        <div className="absolute top-32 right-3 w-12 h-12 rounded-full bg-white"></div>
        <div className="absolute bottom-20 left-3 w-16 h-16 rounded-full bg-white"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 p-4 border-b border-orange-500/30">
        <div className="flex items-center justify-between">
          {(isMobile || !isCollapsed) && (
            <div className="flex items-center space-x-3">
              <Image 
                src={tazafol} 
                alt="Taaza Fol Logo" 
                width={100} 
                height={30}
                className="rounded-lg ml-12"
              />
              
            </div>
          )}
          {/* Only show toggle button on desktop or close button on mobile */}
          {(isMobile || !isMobile) && (
            <button
              onClick={toggleSidebar}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200 hover:scale-110 ml-auto"
              aria-label={isMobile ? "Close Sidebar" : "Toggle Sidebar"}
            >
              {isMobile ? <X className="w-5 h-5" /> : (isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />)}
            </button>
          )}
        </div>
        
        {(isMobile || !isCollapsed) && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-white text-sm font-medium">Welcome to Dashboard</p>
            <p className="text-orange-200 text-xs mt-1">
              {user?.data?.user?.role === "SUPER_ADMIN" || user?.data?.user?.role === "ADMIN"
                ? "Admin Panel"
                : "User Panel"}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="flex-1 p-4 relative z-10">
        <nav className="space-y-2">
          {links.map((link, index) => (
            <div key={link.name} className="relative group">
              <Link
                href={link.link}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] relative overflow-hidden ${
                  isActive(link.link)
                    ? "bg-white/25 shadow-lg backdrop-blur-sm border border-white/30"
                    : "hover:bg-white/15 hover:shadow-md"
                }`}
              >
                {/* Active indicator bar */}
                {isActive(link.link) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                )}
                
                <span className={`${link.color} transition-all duration-200 group-hover:scale-110 flex-shrink-0`}>
                  {link.icon}
                </span>
                
                {(isMobile || !isCollapsed) && (
                  <span className="text-white font-medium text-sm group-hover:text-orange-100 transition-colors duration-200 truncate">
                    {link.name}
                  </span>
                )}
                
                {isActive(link.link) && (isMobile || !isCollapsed) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>

              {/* Tooltip for collapsed state - only show on desktop when collapsed */}
              {!isMobile && isCollapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
                  {link.name}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-orange-500/30 relative z-10">
        <Link href="/">
          <button className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 ${
            (isMobile || !isCollapsed) ? 'py-3 px-6' : 'p-3'
          }`}>
            {(isMobile || !isCollapsed) ? (
              <span className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Go To Shop
              </span>
            ) : (
              <Home className="w-5 h-5 mx-auto" />
            )}
          </button>
        </Link>
      </div>

      {/* Mango decoration - only show when not collapsed or on mobile */}
      {(isMobile || !isCollapsed) && (
        <div className="absolute bottom-5 right-5 text-4xl opacity-20 animate-pulse">
          🥭
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;