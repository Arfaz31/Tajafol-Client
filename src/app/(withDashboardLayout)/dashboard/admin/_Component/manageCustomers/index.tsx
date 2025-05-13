"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AllCustomersDataTable from "../Table/AllCustomersDataTable";

const CustomersManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [isDeleted, setIsDeleted] = useState(
    searchParams.get("isDeleted") || "all"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    router.push(`/dashboard/admin?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => {
    setIsDeleted(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("isDeleted", value);
    } else {
      params.delete("isDeleted");
    }

    router.push(`/dashboard/admin?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b">
        <h2 className="text-2xl font-bold text-[#2b2b5e]">Customers List</h2>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search form */}
          <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
            <Input
              type="search"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 rounded-full bg-background border-primary/20"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>

          {/* Filter by status */}
          <Select value={isDeleted} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="false">Active</SelectItem>
              <SelectItem value="true">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6">
        <AllCustomersDataTable
          searchQuery={searchQuery}
          statusFilter={isDeleted}
        />
      </div>
    </div>
  );
};

export default CustomersManagement;
