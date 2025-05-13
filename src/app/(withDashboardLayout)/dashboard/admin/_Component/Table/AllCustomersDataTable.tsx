/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserX } from "lucide-react";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import Image from "next/image";
import { useGetAllCustomersQuery } from "@/redux/api/userApi";

import userDefaultImage from "@/assets/user.png";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

// Define the customer type based on backend schema
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

const AllCustomersDataTable = ({
  searchQuery,
  statusFilter,
}: AllCustomersDataTableProps) => {
  //   const [loadingCustomer, setLoadingCustomer] = useState<{
  //     [key: string]: boolean;
  //   }>({});
  //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  //   const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  //   const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
  //     null
  //   );

  // Query parameters for API
  const queryParams: any = {};
  if (searchQuery) {
    queryParams.searchTerm = searchQuery;
  }
  if (statusFilter && statusFilter !== "all") {
    queryParams.isDeleted = statusFilter;
  }

  const { data: customersData, isLoading } =
    useGetAllCustomersQuery(queryParams);
  const customers = customersData?.data?.result || [];

  //   const handleDeleteCustomer = async (customer: ICustomer) => {
  //     setSelectedCustomer(customer);
  //     setIsDeleteDialogOpen(true);
  //   };

  //   const handleToggleCustomerStatus = async (customer: ICustomer) => {
  //     setSelectedCustomer(customer);
  //     setIsStatusDialogOpen(true);
  //   };

  //   const confirmDelete = async () => {
  //     if (!selectedCustomer) return;

  //     try {
  //       setLoadingCustomer(prev => ({ ...prev, [selectedCustomer._id]: true }));

  //       // Delete customer API call would go here
  //       // await deleteCustomerMutation(selectedCustomer._id);

  //       toast.success("Customer deleted successfully");
  //       refetch();
  //     } catch (error) {
  //            console.log(error);
  //       toast.error("Failed to delete customer");
  //     } finally {
  //       setLoadingCustomer(prev => ({ ...prev, [selectedCustomer._id]: false }));
  //       setIsDeleteDialogOpen(false);
  //     }
  //   };

  //   const confirmStatusChange = async () => {
  //     if (!selectedCustomer) return;

  //     try {
  //       setLoadingCustomer((prev) => ({ ...prev, [selectedCustomer._id]: true }));

  //       // Update customer status API call would go here
  //       // await updateCustomerStatusMutation({
  //       //   id: selectedCustomer._id,
  //       //   isDeleted: !selectedCustomer.isDeleted
  //       // });

  //       toast.success(
  //         `Customer marked as ${
  //           selectedCustomer.isDeleted ? "active" : "inactive"
  //         }`
  //       );
  //       refetch();
  //     } catch (error) {
  //       console.log(error);

  //       toast.error("Failed to update customer status");
  //     } finally {
  //       setLoadingCustomer((prev) => ({
  //         ...prev,
  //         [selectedCustomer._id]: false,
  //       }));
  //       setIsStatusDialogOpen(false);
  //     }
  //   };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Profile",
              "Customer Name",
              "Email",
              "Contact",
              "Emergency Contact",
              "Address",
              "Status",
            ].map((header) => (
              <TableHead key={header} className="font-semibold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-20">
                <div className="flex items-center justify-center w-full h-14">
                  <Lottie
                    animationData={spinner}
                    loop={true}
                    className="h-20 w-20"
                  />
                </div>
              </TableCell>
            </TableRow>
          ) : customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-40">
                <div className="flex flex-col items-center justify-center">
                  <UserX className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-lg font-medium text-gray-500">
                    No customers found
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer: ICustomer) => (
              <TableRow key={customer._id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="relative h-10 w-10">
                    <Image
                      src={customer.profileImage || userDefaultImage}
                      alt={customer.fullName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                        customer.isDeleted ? "bg-red-500" : "bg-green-500"
                      } border-2 border-white`}
                    ></span>
                  </div>
                </TableCell>

                <TableCell className="font-medium">
                  {customer.fullName}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.emergencyContact}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {customer.address}
                </TableCell>

                <TableCell>
                  <button
                    className={`${
                      customer.isDeleted ? "destructive" : "success"
                    } p-3`}
                  >
                    {customer.isDeleted ? "Inactive" : "Active"}
                  </button>
                </TableCell>

                {/* <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleToggleCustomerStatus(customer)}
                      disabled={loadingCustomer[customer._id]}
                    >
                      {customer.isDeleted ? (
                        <UserCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <UserX className="h-4 w-4 text-red-500" />
                      )}
                    </Button>

                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>

                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleDeleteCustomer(customer)}
                      disabled={loadingCustomer[customer._id]}
                    >
                      {loadingCustomer[customer._id] ? (
                        <span className="h-4 w-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-red-500" />
                      )}
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      {/* <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the customer{" "}
              <span className="font-semibold">{selectedCustomer?.fullName}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* Status Change Confirmation Dialog */}
      {/* <AlertDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Customer Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark customer{" "}
              <span className="font-semibold">
                {selectedCustomer?.fullName}
              </span>{" "}
              as {selectedCustomer?.isDeleted ? "active" : "inactive"}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusChange}
              className={
                selectedCustomer?.isDeleted
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
};

export default AllCustomersDataTable;
