/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useGetAllCustomersQuery } from "@/redux/api/userApi";
import { User, Users, AlertCircle } from "lucide-react";

import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import CustomersManagement from "./_Component/manageCustomers";

const AdminDashboardHome = () => {
  const { data: customersData, isLoading } = useGetAllCustomersQuery({});

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
    },
    {
      label: "Active Customers",
      value: isLoading ? "..." : activeCustomers,
      icon: <User className="h-6 w-6 text-white" />,
      color: "#4ade80",
    },
    {
      label: "Inactive Customers",
      value: isLoading ? "..." : inactiveCustomers,
      icon: <AlertCircle className="h-6 w-6 text-white" />,
      color: "#f87171",
    },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Lottie animationData={spinner} loop={true} className="h-32 w-32" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-[#2b2b5e]">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg border-t-4 transition-all hover:translate-y-[-5px] duration-300"
            style={{ borderColor: card.color }}
          >
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="bg-[#2b2b5e] rounded-full p-3 mb-4 shadow-md">
                {card.icon}
              </div>
              <p className="text-3xl font-bold mb-2">{card.value}</p>
              <p className="text-gray-600">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <CustomersManagement />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
