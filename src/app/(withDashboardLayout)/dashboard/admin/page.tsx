/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useGetAllCustomersQuery } from "@/redux/api/userApi";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { 
  Download,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

import Container from "@/components/Shared/Container";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { generateChartData, processCustomerData, processOrderData } from "@/lib/dashboardUtils";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import ErrorDisplay from "@/components/Shared/ErrorDisplay";
import DashboardPDF from "./_Component/admin-home/DownloadPDF";
import StatCards from "./_Component/admin-home/StatCards";
import SalesRevenueChart from "./_Component/admin-home/SalesRevenueChart";
import StatusCharts from "./_Component/admin-home/StatusCharts";
import OrderTrendsChart from "./_Component/admin-home/OrderTrendChart";

// Import components


// Utilities


const AdminDashboardHome = () => {
  // State for time range and pagination
  const [timeRange, setTimeRange] = useState("monthly");
  const [page] = useState(1);
  const [limit] = useState(100); // Fetch more data for statistics

  // Query parameters for orders
  const orderQueryParams = {
    page,
    limit,
  };

  // Query parameters for customers with status filter options
  const customerQueryParams = {
    page,
    limit,
  };

  // Fetch data using the API hooks
  const { 
    data: customersData, 
    isLoading: isLoadingCustomers, 
    isError: isErrorCustomers 
  } = useGetAllCustomersQuery(customerQueryParams);
  
  const { 
    data: ordersData, 
    isLoading: isLoadingOrders, 
    isError: isErrorOrders 
  } = useGetAllOrdersQuery(orderQueryParams);

  useEffect(() => {
    // Log the data structure to help with debugging
    if (ordersData) {
      console.log("Orders API Response:", ordersData);
    }
  }, [ordersData]);

  const isLoading = isLoadingCustomers || isLoadingOrders;
  const isError = isErrorCustomers || isErrorOrders;

  // Extract data safely based on the API structure
  const customers = customersData?.data?.result || [];
  
  // For the orders, extract from the correct path in the response
  // Based on your OrdersPage component, this is how you extract orders
  const orders = ordersData?.data || [];
  
  // Process stats data only if data is available
  const customerStats = processCustomerData(customers);
  const orderStats = processOrderData(orders);
  const chartData = generateChartData(orders, timeRange);

  if (isLoading) {
    return <LoadingSpinner  />;
  }

  if (isError) {
    return <ErrorDisplay message="Error loading dashboard data" />;
  }

  return (
    <Container className="mx-auto py-6 px-4 sm:py-8 lg:py-12">
      <div className="flex flex-wrap items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Overview of sales, income and customer statistics
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Select 
            defaultValue="monthly" 
            value={timeRange}
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <PDFDownloadLink 
            document={
              <DashboardPDF 
                customerStats={customerStats || { cardData: [] }}
                orderStats={orderStats || { cardData: [], statusData: [], paymentData: [], rawData: {} as any }}
                chartData={chartData || []}
                timeRange={timeRange}
              />
            } 
            fileName="dashboard-report.pdf"
            className="inline-flex"
          >
            {({ loading }) => (
              <Button 
                variant="outline" 
                disabled={loading}
                className="space-x-2"
                onClick={() => {
                  if (!loading) toast.success("Report download started!");
                }}
              >
                <Download className="h-4 w-4" />
                <span>{loading ? "Preparing..." : "Export PDF"}</span>
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="space-y-6">
        {/* Order Stats Cards */}
        <StatCards 
          title="Order Statistics" 
          stats={orderStats.cardData} 
        />

        {/* Sales & Revenue Chart */}
        <SalesRevenueChart data={chartData} />

        {/* Order Status & Payment Status Charts */}
        <StatusCharts
          orderStatusData={orderStats.statusData} 
          paymentStatusData={orderStats.paymentData}
        />

        {/* Order Trends */}
        <OrderTrendsChart data={chartData} />

        {/* Customer Stats Cards */}
        <StatCards 
          title="Customer Statistics" 
          stats={customerStats.cardData} 
        />
      </div>
    </Container>
  );
};

export default AdminDashboardHome;