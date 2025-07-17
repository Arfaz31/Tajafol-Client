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

import Container from "@/components/Shared/Container";
import useDebounce from "@/hooks/useDebounce"; // Import the useDebounce hook
import { useGetAllAdminQuery } from "@/redux/api/userApi";

import AllAdminDataTable from "../_Component/Table/AllAdminDataTable";
import CreateAdminModal from "../_Component/Modal/CreateAdminModal";
import AdminDataForMobile from "../_Component/Table/AdminDataForMobile";

const ManageAdminPage = () => {
  // State management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Apply debounce to search input to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // Prepare query parameters
  const queryParams = {
    page,
    limit,
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
  };

  // Fetch categories data
  const { data, isLoading, isFetching } = useGetAllAdminQuery(queryParams);

  // Extract data safely
  const admins = data?.data?.result || [];
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

  // Handle limit change
  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    // Reset to first page when limit changes
    setPage(1);
  };

  return (
    <Container className="py-8 ">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold">
          Manage Admins
        </h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Admin
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription> search Admins</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="w-full md:w-64">
            <Input
              placeholder="Search admin..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full rounded-full"
            />
          </div>

          <div className="w-full md:w-32">
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-full rounded-full">
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
        <div>
          <div className="hidden lg:block">
            <AllAdminDataTable
              admins={admins}
              isLoading={isLoading || isFetching}
              page={page}
              limit={limit}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="block lg:hidden">
            <AdminDataForMobile
              admins={admins}
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

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Container>
  );
};

export default ManageAdminPage;
