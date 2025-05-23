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
import AllCustomersDataTable from "../_Component/Table/AllCustomersDataTable";
import CustomerDataForMobile from "../_Component/Table/CustomerDataForMobile";

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
    <div>
      <div className="bg-white rounded-lg shadow-lg w-full ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-10 lg:gap-16 p-6 border-b w-full">
          <div className="lg:flex-shrink-0 md:flex-shrink-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
              Customers List
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:flex-row lg:flex-row items-center justify-center lg:justify-end w-full">
            {/* Search form */}
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="search"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px] md:w-[250px] lg:w-full pl-9 rounded-full bg-background border-primary/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>

            {/* Filter by status */}
            <div className="w-full">
              <Select value={isDeleted} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[300px] md:w-[250px] lg:w-full rounded-full">
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
        </div>

        <div className="p-6 hidden lg:block">
          <AllCustomersDataTable
            searchQuery={searchQuery}
            statusFilter={isDeleted}
          />
        </div>
        <div className="p-6 block lg:hidden">
          <CustomerDataForMobile
            searchQuery={searchQuery}
            statusFilter={isDeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersManagement;
