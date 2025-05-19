/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useGetAllCustomersQuery } from "@/redux/api/userApi";
import { User, Users, AlertCircle } from "lucide-react";

import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import CustomersManagement from "./_Component/manageCustomers";
import Container from "@/components/Shared/Container";

const AdminDashboardHome = () => {
  const { data: customersData, isLoading, isError } = useGetAllCustomersQuery({});

  const customers = customersData?.data?.result || [];
  const activeCustomers = customers.filter(
    (customer: any) => !customer.isDeleted
  ).length;
  const inactiveCustomers = customers.filter(
    (customer: any) => customer.isDeleted
  ).length;

  const cardData = [
    {
      label: "Total Customers",
      value: isLoading ? "..." : customers.length,
      icon: <Users className="h-6 w-6 text-white" />,
      color: "#8baaf3",
      bgColor: "bg-blue-500",
    },
    {
      label: "Active Customers",
      value: isLoading ? "..." : activeCustomers,
      icon: <User className="h-6 w-6 text-white" />,
      color: "#4ade80",
      bgColor: "bg-green-500",
    },
    {
      label: "Inactive Customers",
      value: isLoading ? "..." : inactiveCustomers,
      icon: <AlertCircle className="h-6 w-6 text-white" />,
      color: "#f87171",
      bgColor: "bg-red-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lottie animationData={spinner} loop={true} className="h-32 w-32 mx-auto" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Error loading dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <Container className="mx-auto py-6 px-4 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Overview of customer statistics and management
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ borderTopColor: card.color, borderTopWidth: '4px' }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div 
                  className={`${card.bgColor} rounded-full p-3 shadow-lg`}
                  style={{ backgroundColor: card.color }}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customers Management Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
          Customer Management
        </h2>
        <CustomersManagement />
      </div>
    </Container>
  );
};

export default AdminDashboardHome;