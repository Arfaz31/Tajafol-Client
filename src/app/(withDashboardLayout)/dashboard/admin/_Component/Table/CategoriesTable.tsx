/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { toast } from "sonner";
import { Edit, Loader2, MoreHorizontal, Tag, Trash2 } from "lucide-react";
import { format } from "date-fns";

import Image from "next/image";
import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import EditCategoryModal from "../Modal/EditCategoryModal";
import Pagination from "@/components/Shared/Pagination";

// Define better types for the component props
interface Category {
  _id: string;
  categoryName: string;
  slug: string;
  status: string;
  image: string;
  subCategory?: Array<any>;
  createdAt?: string;
}

interface CategoriesTableProps {
  categories: Category[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number; // Total number of items (needed for pagination)
  onPageChange: (page: number) => void;
}

const CategoriesTable = ({
  categories,
  isLoading,
  page,
  limit,
  totalPages,
  totalItems,
  onPageChange,
}: CategoriesTableProps) => {
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete._id).unwrap();
      toast.success("Category deleted successfully");
      setCategoryToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="rounded-md border p-8 text-center">
        <Tag className="h-10 w-10 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No categories found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No categories match your current filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-slate-50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <Image
                      src={category.image}
                      alt={category.categoryName}
                      height={48}
                      width={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {category.categoryName}
                </TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>
                  <button
                    className={
                      category.status === "ACTIVE"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1 rounded-xl"
                        : "bg-red-100 text-red-800 hover:bg-red-100 px-2 py-1 rounded-lg"
                    }
                  >
                    {category.status}
                  </button>
                </TableCell>

                <TableCell>
                  {category.createdAt
                    ? format(new Date(category.createdAt), "MMM dd, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setCategoryToEdit(category)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCategoryToDelete(category)}
                        className="cursor-pointer text-destructive focus:text-white"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Use the new Pagination component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={limit}
        totalItems={totalItems}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
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

      {/* Edit Category Modal */}
      {categoryToEdit && (
        <EditCategoryModal
          isOpen={!!categoryToEdit}
          onClose={() => setCategoryToEdit(null)}
          category={categoryToEdit}
        />
      )}
    </>
  );
};

export default CategoriesTable;
