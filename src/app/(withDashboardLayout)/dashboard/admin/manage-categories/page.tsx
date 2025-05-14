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
import CategoriesTable from "../_Component/Table/CategoriesTable";

import Container from "@/components/Shared/Container";
import useDebounce from "@/hooks/useDebounce"; // Import the useDebounce hook
import CreateCategoryModal from "../_Component/Modal/CreateCategoryModal";

const ManageCategoriesPage = () => {
  // State management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Apply debounce to search input to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // Prepare query parameters
  const queryParams = {
    page,
    limit,
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
    ...(statusFilter !== "all" && { status: statusFilter }),
  };

  // Fetch categories data
  const { data, isLoading, isFetching } = useGetAllCategoriesQuery(queryParams);

  // Extract data safely
  const categories = data?.data?.result || [];
  const meta = data?.data?.meta || {};
  const totalPages = meta.totalPage || 1;
  const totalItems = meta.total || 0;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    // Reset to first page when search changes
    setPage(1);
  };

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    // Reset to first page when filter changes
    setPage(1);
  };

  // Handle limit change
  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    // Reset to first page when limit changes
    setPage(1);
  };

  return (
    <Container className="py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Category
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search categories</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="w-full md:w-64">
            <Input
              placeholder="Search categories..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-32">
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-full">
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
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <CategoriesTable
          categories={categories}
          isLoading={isLoading || isFetching}
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      )}

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Container>
  );
};

export default ManageCategoriesPage;
