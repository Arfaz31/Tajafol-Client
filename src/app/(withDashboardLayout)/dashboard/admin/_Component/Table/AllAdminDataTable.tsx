/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, UserX } from "lucide-react";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import Image from "next/image";
import { useDeleteUserMutation } from "@/redux/api/userApi";
import userDefaultImage from "@/assets/logo/man.png";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Pagination from "@/components/Shared/Pagination";

interface IAdmin {
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
  };
  createdAt: string;
  updatedAt: string;
}

interface AllAdminDataTableProps {
  admins: IAdmin[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const AllAdminDataTable = ({
  admins,
  isLoading,
  page,
  limit,
  totalPages,
  totalItems,
  onPageChange,
}: AllAdminDataTableProps) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdmin | null>(null);
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteAdmin = (admin: IAdmin) => {
    setSelectedAdmin(admin);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAdmin) return;

    try {
      setDeleteLoading(true);

      // Call the delete mutation
      const res = await deleteUser(selectedAdmin.user._id).unwrap();

      if (res.success) {
        toast.success("Admin deleted successfully");
      } else {
        toast.error(res.message || "Failed to delete admin");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to delete admin");
    } finally {
      setDeleteLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <div className="rounded-md border bg-slate-50">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Profile",
                "Admin Name",
                "Email",
                "Contact",
                "Emergency Contact",
                "Address",
                "Status",
                "Action",
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
            ) : admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-40">
                  <div className="flex flex-col items-center justify-center">
                    <UserX className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-lg font-medium text-gray-500">
                      No admins found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin) => (
                <TableRow key={admin._id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="relative h-10 w-10">
                      <Image
                        src={admin.profileImage || userDefaultImage}
                        alt={admin.fullName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                          admin.isDeleted ? "bg-red-500" : "bg-green-500"
                        } border-2 border-white`}
                      ></span>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    {admin.fullName}
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.contact}</TableCell>
                  <TableCell>{admin.emergencyContact}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {admin.address}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        admin.isDeleted
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {admin.isDeleted ? "Inactive" : "Active"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleDeleteAdmin(admin)}
                      disabled={deleteLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!open && !deleteLoading) {
            setIsDeleteDialogOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will{" "}
              {selectedAdmin?.isDeleted ? "permanently delete" : "deactivate"}{" "}
              the admin{" "}
              <span className="font-semibold">{selectedAdmin?.fullName}</span>.
              {!selectedAdmin?.isDeleted &&
                " They will no longer have access to the system."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {selectedAdmin?.isDeleted ? "Deleting..." : "Deactivating..."}
                </span>
              ) : selectedAdmin?.isDeleted ? (
                "Delete Permanently"
              ) : (
                "Deactivate"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={limit}
        totalItems={totalItems}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllAdminDataTable;
