/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import {
  Loader2,
  Tag,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Hash,
  ImageIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
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
import EditCategoryModal from "../Modal/EditCategoryModal";

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
  totalItems: number;
  onPageChange: (page: number) => void;
}

const CategoryDataForMobile = ({
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
    <div className="w-full max-w-full overflow-hidden">
      {/* Categories Cards */}
      <div className="space-y-3 px-1">
        {categories.map((category) => (
          <Card key={category._id} className="w-full max-w-full">
            <CardHeader className="pb-3 px-3 sm:px-6">
              <div className="flex items-start gap-3 w-full">
                {/* Category Image */}
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-md border">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.categoryName}
                        height={56}
                        width={56}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Info */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h3 className="font-medium text-sm truncate pr-2">
                    {category.categoryName}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                    <Hash className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{category.slug}</span>
                  </p>
                </div>

                {/* Status & Actions */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                      category.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {category.status}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 px-3 sm:px-6">
              {/* Additional Info */}
              <div className="space-y-2">
                {/* Subcategories Count */}
                {category.subCategory && category.subCategory.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3 flex-shrink-0" />
                    <span>
                      {category.subCategory.length} subcategor
                      {category.subCategory.length === 1 ? "y" : "ies"}
                    </span>
                  </div>
                )}

                {/* Created Date */}
                {category.createdAt && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">
                      Created:{" "}
                      {format(new Date(category.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                )}
              </div>

              {/* Category ID (for reference) */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-muted-foreground font-mono truncate">
                  ID: {category._id}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
      >
        <AlertDialogContent className="max-w-[95vw] w-full mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category &quot;
              {categoryToDelete?.categoryName}&quot;. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

export default CategoryDataForMobile;
