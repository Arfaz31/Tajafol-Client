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
import { Edit, Loader2, MoreHorizontal, Package, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { useDeleteProductMutation } from "@/redux/api/productApi";

import Pagination from "@/components/Shared/Pagination";
import { Badge } from "@/components/ui/badge";
import EditProductModal from "../Modal/EditProductModal";

interface Product {
  _id: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  unit: number;
  productUnitType: string;
  discountPrice?: number;
  images: string[];
  isActive: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isUpcoming?: boolean;
  createdAt?: string;
  category?: {
    _id: string;
    categoryName: string;
  };
}

interface ProductsDataTableProps {
  products: Product[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const ProductsDataTable = ({
  products,
  isLoading,
  page,
  limit,
  totalPages,
  totalItems,
  onPageChange,
}: ProductsDataTableProps) => {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete._id).unwrap();
      toast.success("Product deleted successfully");
      setProductToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-md border p-8 text-center">
        <Package className="h-10 w-10 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No products found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No products match your current filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-slate-50 overflow-x-auto ">
        <Table className="w-[1500px]">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    {product.images?.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.productName}
                        height={48}
                        width={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {product.productName}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {product.sku}
                </TableCell>
                <TableCell>
                  {product.category?.categoryName || "Uncategorized"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span
                      className={
                        product.discountPrice
                          ? "line-through text-gray-500"
                          : ""
                      }
                    >
                      {product.price} ৳
                    </span>
                  </div>
                </TableCell>
                <TableCell>{product?.discountPrice} ৳</TableCell>
                <TableCell>
                  <Badge
                    variant={product.quantity > 0 ? "default" : "destructive"}
                    className="min-w-[60px] justify-center"
                  >
                    {product.quantity}
                  </Badge>
                </TableCell>

                <TableCell>
                  {product?.unit} {product?.productUnitType}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={product.isActive ? "default" : "destructive"}
                    className="capitalize"
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.isNewArrival && (
                      <Badge variant="secondary">New Arrival</Badge>
                    )}
                    {product.isTrending && (
                      <Badge variant="secondary">Trending</Badge>
                    )}
                    {product.isUpcoming && (
                      <Badge variant="secondary">Upcoming</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {product.createdAt
                    ? format(new Date(product.createdAt), "MMM dd, yyyy")
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
                        onClick={() => setProductToEdit(product)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setProductToDelete(product)}
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
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product and cannot be undone.
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

      {/* Edit Product Modal */}
      {productToEdit && (
        <EditProductModal
          isOpen={!!productToEdit}
          onClose={() => setProductToEdit(null)}
          product={productToEdit}
        />
      )}
    </>
  );
};

export default ProductsDataTable;
