/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartDataItem, CustomerStats, OrderStats, StatCardItem, StatusDataItem } from "@/types";
import { 
  User, 
  Users, 
  AlertCircle, 
  Package, 
  TrendingUp, 
  CreditCard
} from "lucide-react";
import React from "react";


/**
 * Process customer data to generate statistics
 */
export const processCustomerData = (customers: any[]): CustomerStats => {
  // Ensure customers is an array
  const customersArray = Array.isArray(customers) ? customers : [];
  
  const activeCustomers = customersArray.filter((customer) => !customer.isDeleted).length;
  const inactiveCustomers = customersArray.filter((customer) => customer.isDeleted).length;

  const cardData: StatCardItem[] = [
    {
      label: "Total Customers",
      value: customersArray.length,
      icon: React.createElement(Users, { className: "h-6 w-6 text-white" }),
      color: "#8baaf3",
      bgColor: "bg-blue-500",
    },
    {
      label: "Active Customers",
      value: activeCustomers,
      icon: React.createElement(User, { className: "h-6 w-6 text-white" }),
      color: "#4ade80",
      bgColor: "bg-green-500",
    },
    {
      label: "Inactive Customers",
      value: inactiveCustomers,
      icon: React.createElement(AlertCircle, { className: "h-6 w-6 text-white" }),
      color: "#f87171",
      bgColor: "bg-red-500",
    },
  ];

  return { cardData };
};

/**
 * Process order data to generate statistics
 */
export const processOrderData = (orders: any[]): OrderStats => {
  // Ensure orders is an array
  const ordersArray = Array.isArray(orders) ? orders : [];
  
  // Log the first few orders for debugging
  if (ordersArray.length > 0) {
    console.log("Sample order for processing:", ordersArray[0]);
  } else {
    console.log("No orders to process");
  }
  
  // Order status statistics
  const pendingOrders = ordersArray.filter((order) => order?.status === "pending").length;
  const confirmedOrders = ordersArray.filter((order) => order?.status === "confirmed").length;
  const shippedOrders = ordersArray.filter((order) => order?.status === "shipped").length;
  const cancelledOrders = ordersArray.filter((order) => order?.status === "cancelled").length;
  
  // Income statistics
  const totalOrders = ordersArray.length;
  const paidOrders = ordersArray.filter((order) => order?.paymentStatus === "paid");
  const unpaidOrders = ordersArray.filter((order) => order?.paymentStatus === "unpaid");
  
  // Calculate total income by summing totalPrice and shippingCost for paid orders
  const totalIncome = paidOrders.reduce((sum, order) => {
    const orderTotal = (Number(order?.totalPrice) || 0) + (Number(order?.shippingCost) || 0);
    return sum + orderTotal;
  }, 0);
  
  // Calculate potential income from unpaid orders
  const potentialIncome = unpaidOrders.reduce((sum, order) => {
    const orderTotal = (Number(order?.totalPrice) || 0) + (Number(order?.shippingCost) || 0);
    return sum + orderTotal;
  }, 0);

  // Chart data for order status
  const statusData: StatusDataItem[] = [
    { name: 'Pending', value: pendingOrders, color: '#FFBB28' },
    { name: 'Confirmed', value: confirmedOrders, color: '#0088FE' },
    { name: 'Shipped', value: shippedOrders, color: '#8884d8' },
    { name: 'Cancelled', value: cancelledOrders, color: '#FF8042' }
  ];

  // Chart data for payment status
  const paymentData: StatusDataItem[] = [
    { name: 'Paid', value: paidOrders.length, color: '#4CAF50' },
    { name: 'Unpaid', value: unpaidOrders.length, color: '#f87171' }
  ];

  // Card data for order statistics
  const cardData: StatCardItem[] = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: React.createElement(Package, { className: "h-6 w-6 text-white" }),
      color: "#8b5cf6",
      bgColor: "bg-purple-500",
    },
    {
      label: "Total Income",
      value: `৳${totalIncome.toLocaleString()}`,
      icon: React.createElement(TrendingUp, { className: "h-6 w-6 text-white" }),
      color: "#06b6d4",
      bgColor: "bg-cyan-500",
    },
    {
      label: "Pending Income",
      value: `৳${potentialIncome.toLocaleString()}`,
      icon: React.createElement(CreditCard, { className: "h-6 w-6 text-white" }),
      color: "#f59e0b",
      bgColor: "bg-amber-500",
    },
  ];

  return { 
    statusData, 
    paymentData, 
    cardData,
    rawData: {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      cancelledOrders,
      paidOrders: paidOrders.length,
      unpaidOrders: unpaidOrders.length,
      totalIncome,
      potentialIncome
    }
  };
};

/**
 * Generate chart data based on time range
 */
export const generateChartData = (orders: any[], timeRange: string): ChartDataItem[] => {
  // Ensure orders is an array
  const ordersArray = Array.isArray(orders) ? orders : [];
  
  const currentDate = new Date();
  let dateFormat: Intl.DateTimeFormatOptions = { month: 'short' };
  let periodsToShow = 6;
  
  if (timeRange === "weekly") {
    dateFormat = { weekday: 'short' };
    periodsToShow = 7; // days
  } else if (timeRange === "yearly") {
    periodsToShow = 12;
  }

  const chartData: ChartDataItem[] = [];
  
  for (let i = periodsToShow - 1; i >= 0; i--) {
    const date = new Date();
    let label;
    let startOfPeriod;
    let endOfPeriod;
    
    if (timeRange === "weekly") {
      date.setDate(currentDate.getDate() - i);
      label = date.toLocaleDateString('en-US', dateFormat);
      
      startOfPeriod = new Date(date);
      startOfPeriod.setHours(0, 0, 0, 0);
      
      endOfPeriod = new Date(date);
      endOfPeriod.setHours(23, 59, 59, 999);
    } else if (timeRange === "monthly") {
      date.setMonth(currentDate.getMonth() - i);
      label = date.toLocaleDateString('en-US', dateFormat);
      
      startOfPeriod = new Date(date.getFullYear(), date.getMonth(), 1);
      endOfPeriod = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    } else {
      // Yearly
      date.setFullYear(currentDate.getFullYear() - i);
      label = date.getFullYear().toString();
      
      startOfPeriod = new Date(date.getFullYear(), 0, 1);
      endOfPeriod = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
    }
    
    // Filter orders for the current period
    const periodOrders = ordersArray.filter((order) => {
      if (!order?.createdAt) return false;
      
      try {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfPeriod && orderDate <= endOfPeriod;
      } catch (error) {
        console.error("Error parsing date:", order.createdAt);
        return false;
      }
    });
    
    // Calculate total sales for the period
    const sales = periodOrders.reduce((sum, order) => {
      return sum + (Number(order?.totalPrice) || 0);
    }, 0);
      
    // Calculate actual income from paid orders
    const income = periodOrders
      .filter((order) => order?.paymentStatus === "paid")
      .reduce((sum, order) => sum + (Number(order?.totalPrice) || 0), 0);
    
    chartData.push({
      name: label,
      sales,
      income,
      orders: periodOrders.length
    });
  }
  
  return chartData;
};