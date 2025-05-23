/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

import Container from "@/components/Shared/Container";
import useDebounce from "@/hooks/useDebounce";
import { Checkbox } from "@/components/ui/checkbox";
import CreateProductModal from "../_Component/Modal/CreateProductModal";
import ProductsDataTable from "../_Component/Table/ProductsDataTable";
import ProductDataForMobile from "../_Component/Table/ProductDataForMobile";

const ManageProductPage = () => {
  // State management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    isNewArrival: false,
    isTrending: false,
    isUpcoming: false,
  });

  // Apply debounce to search input to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // Fetch all categories for the dropdown
  const { data: categoriesData } = useGetAllCategoriesQuery({ limit: 100 });
  const categories = categoriesData?.data?.result || [];

  // Prepare query parameters for products
  const queryParams = {
    page,
    limit,
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
    ...(statusFilter !== "all" && { isActive: statusFilter === "ACTIVE" }),
    ...(categoryFilter !== "all" && { category: categoryFilter }),
    ...(filters.isNewArrival && { isNewArrival: true }),
    ...(filters.isTrending && { isTrending: true }),
    ...(filters.isUpcoming && { isUpcoming: true }),
  };

  // Fetch products data
  const { data, isLoading, isFetching } = useGetAllProductsQuery(queryParams);

  // Extract data safely
  const products = data?.data || [];
  const meta = data?.meta || {};
  const totalPages = meta.totalPage || 1;
  const totalItems = meta.total || 0;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1); // Reset to first page when search changes
  };

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1); // Reset to first page when filter changes
  };

  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setPage(1); // Reset to first page when filter changes
  };

  // Handle checkbox filters change
  const handleCheckboxChange = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setPage(1); // Reset to first page when filter changes
  };

  // Handle limit change
  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1); // Reset to first page when limit changes
  };

  return (
    <Container className="py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold">
          Manage Products
        </h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-[150px] text-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Product
        </Button>
      </div>

      <Card className="mb-6 w-[100%] md:w-[100%] lg:w-full mx-auto">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 w-full">
            <div className="w-full">
              <Input
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchChange}
                className="w-[300px] md:w-[250px] lg:w-full rounded-full"
              />
            </div>
            <div className="w-full">
              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[300px] md:w-[250px] lg:w-full rounded-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Select
                value={categoryFilter}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[300px] md:w-[250px] lg:w-full rounded-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Select
                value={limit.toString()}
                onValueChange={handleLimitChange}
              >
                <SelectTrigger className="w-[300px] md:w-[250px] lg:w-full rounded-full">
                  <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNewArrival"
                checked={filters.isNewArrival}
                onCheckedChange={() => handleCheckboxChange("isNewArrival")}
              />
              <label htmlFor="isNewArrival">New Arrivals</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isTrending"
                checked={filters.isTrending}
                onCheckedChange={() => handleCheckboxChange("isTrending")}
              />
              <label htmlFor="isTrending">Trending</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isUpcoming"
                checked={filters.isUpcoming}
                onCheckedChange={() => handleCheckboxChange("isUpcoming")}
              />
              <label htmlFor="isUpcoming">Upcoming</label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div>
            <div className="hidden lg:block">
              <ProductsDataTable
                products={products}
                isLoading={isLoading || isFetching}
                page={page}
                limit={limit}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="block md:block lg:hidden">
              <ProductDataForMobile
                products={products}
                isLoading={isLoading || isFetching}
                page={page}
                limit={limit}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Container>
  );
};

export default ManageProductPage;
