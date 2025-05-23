/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteProductMutation } from "@/redux/api/productApi";
import {
  Loader2,
  Package,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Hash,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/Shared/Pagination";
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

const ProductDataForMobile = ({
  products,
  isLoading,
  page,
  limit,
  totalPages,
  totalItems,
  onPageChange,
}: ProductsDataTableProps) => {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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
    <div className="space-y-4">
      {/* Products Cards */}
      <div className="space-y-3">
        {products.map((product) => (
          <Card key={product._id} className="w-[320px] mx-auto">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                  {product.images?.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.productName}
                      height={64}
                      width={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">
                    {product.productName}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Hash className="h-3 w-3" />
                    {product.sku}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {product.category?.categoryName || "Uncategorized"}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant={product.isActive ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(product)}
                        className="cursor-pointer"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
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
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Price Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium ${
                        product.discountPrice
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      ৳{product.price}
                    </span>
                    {product.discountPrice && (
                      <span className="text-sm font-medium text-green-600">
                        ৳{product.discountPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                  <Badge
                    variant={product.quantity > 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {product.quantity} {product.productUnitType}
                  </Badge>
                </div>
              </div>

              {/* Unit Info */}
              <div className="text-xs text-muted-foreground">
                Unit: {product.unit} {product.productUnitType}
              </div>

              {/* Tags */}
              {(product.isNewArrival ||
                product.isTrending ||
                product.isUpcoming) && (
                <div className="flex flex-wrap gap-1">
                  {product.isNewArrival && (
                    <Badge variant="secondary" className="text-xs">
                      New Arrival
                    </Badge>
                  )}
                  {product.isTrending && (
                    <Badge variant="secondary" className="text-xs">
                      Trending
                    </Badge>
                  )}
                  {product.isUpcoming && (
                    <Badge variant="secondary" className="text-xs">
                      Upcoming
                    </Badge>
                  )}
                </div>
              )}

              {/* Created Date */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Created:{" "}
                {product.createdAt
                  ? format(new Date(product.createdAt), "MMM dd, yyyy")
                  : "N/A"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw]  h-[600px] overflow-y-auto rounded-md">
          <DialogHeader>
            <DialogTitle className="text-sm flex items-center gap-2">
              <Package className="h-4 w-4" />
              Product Details - {selectedProduct?.productName}
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              {/* Product Image */}
              <div className="flex justify-center">
                <div className="h-32 w-32 overflow-hidden rounded-md">
                  {selectedProduct.images?.length > 0 ? (
                    <Image
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.productName}
                      height={128}
                      width={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Basic Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product Name:</span>
                    <span className="font-medium">
                      {selectedProduct.productName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SKU:</span>
                    <span className="font-mono text-xs">
                      {selectedProduct.sku}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span>
                      {selectedProduct.category?.categoryName ||
                        "Uncategorized"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <Badge
                      variant={
                        selectedProduct.isActive ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {selectedProduct.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Pricing Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Regular Price:</span>
                    <span className="font-medium">
                      ৳{selectedProduct.price}
                    </span>
                  </div>
                  {selectedProduct.discountPrice && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount Price:</span>
                      <span className="font-medium text-green-600">
                        ৳{selectedProduct.discountPrice}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stock Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Stock Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <Badge
                      variant={
                        selectedProduct.quantity > 0 ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {selectedProduct.quantity}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Unit:</span>
                    <span>
                      {selectedProduct.unit} {selectedProduct.productUnitType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {(selectedProduct.isNewArrival ||
                selectedProduct.isTrending ||
                selectedProduct.isUpcoming) && (
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.isNewArrival && (
                      <Badge variant="secondary">New Arrival</Badge>
                    )}
                    {selectedProduct.isTrending && (
                      <Badge variant="secondary">Trending</Badge>
                    )}
                    {selectedProduct.isUpcoming && (
                      <Badge variant="secondary">Upcoming</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Additional Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product ID:</span>
                    <span className="font-mono text-xs">
                      {selectedProduct._id}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Created:</span>
                    <span>
                      {selectedProduct.createdAt
                        ? format(
                            new Date(selectedProduct.createdAt),
                            "MMM dd, yyyy"
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product &quot;
              {productToDelete?.productName}&quot; and cannot be undone.
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

      {/* Pagination */}
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

export default ProductDataForMobile;
