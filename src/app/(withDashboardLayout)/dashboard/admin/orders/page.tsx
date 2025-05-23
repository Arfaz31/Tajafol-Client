"use client";

import Container from "@/components/Shared/Container";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";

import { useState } from "react";
import OrdersDataTable from "../_Component/Table/OrdersDataTable";
import OrderDataForMobile from "../_Component/Table/OrderDataForMobile";

const OrdersPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const queryParams = {
    page,
    limit,
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
  };

  const { data, isLoading } = useGetAllOrdersQuery(queryParams);

  // Extract data safely
  const orders = data?.data || [];
  const meta = data?.meta || {};
  const totalPages = meta.totalPage || 1;
  const totalItems = meta.total || 0;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    setSearchInput(searchInput);
    setPage(1); // Reset to first page when search changes
  };

  return (
    <Container className="py-8  ">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold">
            Manage Orders
          </h1>
        </div>

        <div className="hidden lg:block">
          <OrdersDataTable
            orders={orders}
            isLoading={isLoading}
            page={page}
            limit={limit}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onSearchChange={handleSearchChange}
            searchInput={searchInput}
          />
        </div>
        <div className="block lg:hidden">
          <OrderDataForMobile
            orders={orders}
            isLoading={isLoading}
            page={page}
            limit={limit}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onSearchChange={handleSearchChange}
            searchInput={searchInput}
          />
        </div>
      </div>
    </Container>
  );
};

export default OrdersPage;
