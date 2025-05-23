import useDebounce from "@/hooks/useDebounce";
import { useGetAllCustomersQuery } from "@/redux/api/userApi";
import { useState } from "react";
import {
  Loader2,
  Users,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Pagination from "@/components/Shared/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ICustomer {
  _id: string;
  fullName: string;
  email: string;
  contact: string;
  emergencyContact: string;
  profileImage?: string;
  address: string;
  isDeleted: boolean;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface AllCustomersDataTableProps {
  searchQuery: string;
  statusFilter: string;
}

const CustomerDataForMobile = ({
  searchQuery,
  statusFilter,
}: AllCustomersDataTableProps) => {
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Query parameters for API
  const queryParams = {
    page,
    limit,
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
    ...(statusFilter !== "all" && { status: statusFilter }),
  };

  const { data: customersData, isLoading } =
    useGetAllCustomersQuery(queryParams);
  const customers = customersData?.data?.result || [];
  const meta = customersData?.data?.meta || {};
  const totalPages = meta.totalPage || 1;
  const totalItems = meta.total || 0;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleViewDetails = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!customers.length) {
    return (
      <div className="rounded-md border p-8 text-center">
        <Users className="h-10 w-10 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No customers found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No customers match your current filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[320px] md:w-full mx-auto overflow-hidden">
      {/* Customers Cards */}
      <div className="space-y-3 px-1">
        {customers.map((customer: ICustomer) => (
          <Card key={customer._id} className="w-full max-w-full">
            <CardHeader className="pb-3 px-3 sm:px-6">
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                    <AvatarImage
                      src={customer.profileImage}
                      alt={customer.fullName}
                    />
                    <AvatarFallback className="text-xs">
                      {customer.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0 overflow-hidden">
                  <h3 className="font-medium text-sm truncate pr-2">
                    {customer.fullName}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                    <User className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{customer.user.name}</span>
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                      customer.isDeleted
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {customer.isDeleted ? "Inactive" : "Active"}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 px-3 sm:px-6">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground truncate">
                    {customer.contact}
                  </p>
                </div>

                {customer.email && (
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground truncate">
                      {customer.email}
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-2 min-w-0">
                  <MapPin className="h-3 w-3 flex-shrink-0 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground line-clamp-2 break-words">
                    {customer.address}
                  </p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  Joined: {new Date(customer.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(customer)}
                className="w-full h-8 text-xs mt-3"
              >
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] w-full mx-auto overflow-y-auto rounded-md">
          <DialogHeader className="px-4 sm:px-6">
            <DialogTitle className="text-sm flex items-center gap-2 truncate">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage
                  src={selectedCustomer?.profileImage}
                  alt={selectedCustomer?.fullName}
                />
                <AvatarFallback className="text-xs">
                  {selectedCustomer?.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">
                Customer Details - {selectedCustomer?.fullName}
              </span>
            </DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-4 px-4 sm:px-6">
              {/* Basic Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Basic Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                      <AvatarImage
                        src={selectedCustomer.profileImage}
                        alt={selectedCustomer.fullName}
                      />
                      <AvatarFallback className="text-lg">
                        {selectedCustomer.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm break-words">
                        {selectedCustomer.fullName}
                      </p>
                      <p className="text-xs text-gray-600 break-words">
                        User: {selectedCustomer.user.name}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                          selectedCustomer.isDeleted
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedCustomer.isDeleted ? "Inactive" : "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Contact Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-3">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-600">Primary Contact</p>
                      <p className="text-sm font-medium break-words">
                        {selectedCustomer.contact}
                      </p>
                    </div>
                  </div>

                  {selectedCustomer.emergencyContact && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600">
                          Emergency Contact
                        </p>
                        <p className="text-sm font-medium break-words">
                          {selectedCustomer.emergencyContact}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedCustomer.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="text-sm font-medium break-words">
                          {selectedCustomer.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Address</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm break-words">
                      {selectedCustomer.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Account Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="text-gray-600 text-sm">Customer ID:</span>
                    <span className="font-mono text-xs break-all">
                      {selectedCustomer._id}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="text-gray-600 text-sm">User ID:</span>
                    <span className="font-mono text-xs break-all">
                      {selectedCustomer.user._id}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="text-gray-600 text-sm">Join Date:</span>
                    <span className="text-sm">
                      {new Date(
                        selectedCustomer.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="text-gray-600 text-sm">Last Updated:</span>
                    <span className="text-sm">
                      {new Date(
                        selectedCustomer.updatedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <div className="mt-4 px-1">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={limit}
          totalItems={totalItems}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CustomerDataForMobile;
