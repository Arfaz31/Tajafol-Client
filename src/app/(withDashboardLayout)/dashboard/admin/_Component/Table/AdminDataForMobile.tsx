/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  UserX,
  Mail,
  Phone,
  AlertTriangle,
  MapPin,
  Calendar,
  Loader2,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useDeleteUserMutation } from "@/redux/api/userApi";
import { toast } from "sonner";

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

interface AdminDataForMobileProps {
  admins: IAdmin[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const AdminDataForMobile = ({
  admins,
  isLoading,
  page,
  limit,
  totalPages,
  totalItems,
  onPageChange,
}: AdminDataForMobileProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdmin | null>(null);
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDeleteAdmin = (admin: IAdmin) => {
    setSelectedAdmin(admin);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAdmin) return;

    try {
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
      setIsDeleteDialogOpen(false);
      setSelectedAdmin(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!admins.length) {
    return (
      <div className="rounded-md border p-8 text-center">
        <UserX className="h-10 w-10 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No admins found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No admins match your current filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full  overflow-hidden z-10">
      {/* Mobile Tabs */}

      {/* Admin Cards */}
      <div className="space-y-3 px-1">
        {admins?.map((admin) => (
          <Card key={admin._id} className="w-full max-w-full">
            <CardHeader className="pb-3 px-3 sm:px-6">
              <div className="flex items-start gap-3 w-full">
                {/* Admin Profile Image */}
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 sm:h-14 sm:w-14  rounded-lg">
                    {admin.profileImage ? (
                      <Image
                        src={admin.profileImage}
                        alt={admin.fullName}
                        height={56}
                        width={56}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {admin.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Info */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h3 className="font-medium text-sm truncate pr-2">
                    {admin.fullName}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                    <span className="truncate">#{admin._id.slice(-6)}</span>
                  </p>
                </div>

                {/* Status & Actions */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                      admin.isDeleted
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {admin.isDeleted ? "INACTIVE" : "ACTIVE"}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteAdmin(admin)}
                        className="cursor-pointer text-destructive focus:text-white"
                        disabled={deleteLoading}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 px-3 sm:px-6">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{admin.email}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3 flex-shrink-0" />
                  <span>{admin.contact}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                  <span>{admin.emergencyContact}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span className="truncate">{admin.address}</span>
                </div>

                {/* Created Date */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">
                    Created: {formatDate(admin.createdAt)}
                  </span>
                </div>
              </div>

              {/* Admin ID (for reference) */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-muted-foreground font-mono truncate">
                  ID: {admin._id}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => !open && setIsDeleteDialogOpen(false)}
      >
        <AlertDialogContent className="max-w-[95vw] w-full mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the admin &quot;
              {selectedAdmin?.fullName}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pagination */}
      <div className="mt-4 px-1">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={limit}
          totalItems={totalItems}
          isLoading={isLoading}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AdminDataForMobile;
