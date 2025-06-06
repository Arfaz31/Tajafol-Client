/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProductMutation } from "@/redux/api/productApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";

const productSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .refine((sku) => !sku.includes(" "), {
      message: "SKU cannot contain spaces",
    }),
  shortdescription: z.string().min(1, "Short description is required"),
  broaddescription: z
    .string()
    .min(100, "Broad description should be at least 100 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price cannot be negative"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  // FIX 1: Use nullable for discountPrice to properly handle empty/zero values
  discountPrice: z.number().min(0).nullable().optional(),
  unit: z.number().int().min(0, "Unit cannot be negative"),
  productUnitType: z.string().min(1, "ProductUnitType is required"),
  isActive: z.boolean().default(true).optional(),
  isNewArrival: z.boolean().optional(),
  isTrending: z.boolean().optional(),
  isUpcoming: z.boolean().optional(),
  // Keep images validation simple
  images: z
    .any()
    .refine(
      (val) =>
        val instanceof FileList || (Array.isArray(val) && val.length > 0),
      {
        message: "At least one product image is required",
      }
    ),
});

// Create a type that makes the boolean fields optional
type FormValues = z.infer<typeof productSchema> & {
  isActive?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isUpcoming?: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProductModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [createProduct] = useCreateProductMutation();
  const { data: categoriesData } = useGetAllCategoriesQuery({ limit: 100 });
  const categories = categoriesData?.data?.result || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
      isNewArrival: false,
      isTrending: false,
      isUpcoming: false,
      quantity: 0,
      discountPrice: 0,
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get all selected files
    if (files) {
      const newFiles = Array.from(files); // Convert FileList to an array

      // Update imageFiles state with all selected files
      const updatedFiles = [...imageFiles, ...newFiles];
      setImageFiles(updatedFiles);

      //  Update the form's images field with our file array
      setValue("images", updatedFiles);

      // Create image previews for all selected files
      const newPreviews: string[] = [];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string); // Collect the image previews
          // Update state with previews after all files are read
          if (newPreviews.length === newFiles.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file); // Read the file as data URL
      });
    }
  };

  const handleRemoveImagePreview = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    //  Update the form's images field when removing an image
    setValue("images", updatedFiles.length > 0 ? updatedFiles : null);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);

      // Ensure we have images
      if (imageFiles.length === 0) {
        toast.error("At least one product image is required");
        setIsLoading(false);
        return;
      }

      const productData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        unit: Number(data.unit),
        discountPrice: Number(data.discountPrice || 0),
        isActive: data.isActive === undefined ? true : data.isActive,
        isNewArrival:
          data.isNewArrival === undefined ? false : data.isNewArrival,
        isTrending: data.isTrending === undefined ? false : data.isTrending,
        isUpcoming: data.isUpcoming === undefined ? false : data.isUpcoming,
      };

      console.log("productData", productData);
      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));

      // Append each image file from our imageFiles state
      // eslint-disable-next-line prefer-const
      for (let image of imageFiles) {
        formData.append("Product-Images", image);
      }

      await createProduct(formData).unwrap();

      toast.success("Product created successfully");
      reset();
      setImageFiles([]);
      setImagePreviews([]);
      onClose();
    } catch (error: any) {
      console.error("Failed to create product:", error);
      toast.error(error?.data?.message || "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your store inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Product Name<span className="text-red-500">*</span>
              </label>
              <input
                {...register("productName", { required: true })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter product name"
              />

              {errors.productName && (
                <p className="text-sm text-red-500">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* SKU */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                SKU<span className="text-red-500">*</span>
              </label>
              <input
                {...register("sku", { required: true })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter sku name"
              />
              {errors.sku && (
                <p className="text-sm text-red-500">{errors.sku.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Category<span className="text-red-500">*</span>
              </label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: any) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Price<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter price"
              />

              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Quantity<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter quantity"
              />

              {errors.quantity && (
                <p className="text-sm text-red-500">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* unit */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Per Package Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("unit", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter unit"
              />

              {errors.unit && (
                <p className="text-sm text-red-500">{errors.unit.message}</p>
              )}
            </div>

            {/* unit Type*/}
            {/* <div className="space-y-1">
              <label className="block text-sm font-medium">
                Unit Type<span className="text-red-500">*</span>
              </label>
              <input
                {...register("productUnitType", { required: true })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter unit"
              />

              {errors.productUnitType && (
                <p className="text-sm text-red-500">
                  {errors.productUnitType.message}
                </p>
              )}
            </div> */}
            {/* Unit Type */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Unit Type<span className="text-red-500">*</span>
              </label>
              <select
                {...register("productUnitType", {
                  required: "Unit type is required",
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
              >
                <option value="">Select Unit Type</option>
                <option value="কেজি">কেজি</option>
                <option value="পিস">পিস</option>
              </select>

              {errors.productUnitType && (
                <p className="text-sm text-red-500">
                  {errors.productUnitType.message}
                </p>
              )}
            </div>

            {/* Discount Price */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Discount Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("discountPrice", {
                  setValueAs: (v) => (v === "" ? null : Number(v)),
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter discountPrice"
              />
              {errors.discountPrice && (
                <p className="text-sm text-red-500">
                  {errors.discountPrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Short Description<span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("shortdescription")}
              placeholder="Enter short description"
              rows={2}
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
            />
            {errors.shortdescription && (
              <p className="text-sm text-red-500">
                {errors.shortdescription.message}
              </p>
            )}
          </div>

          {/* Broad Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Broad Description<span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("broaddescription")}
              placeholder="Enter detailed description (at least 100 characters)"
              rows={5}
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
            />
            {errors.broaddescription && (
              <p className="text-sm text-red-500">
                {errors.broaddescription.message}
              </p>
            )}
          </div>

          {/* Product Images */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Product Images<span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col space-y-4">
              {/* File Input */}
              <div className="relative">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="product-images"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG (Max. 5 images)
                      </p>
                    </div>
                    <input
                      id="product-images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-md border">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImagePreview(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.images && (
              <p className="text-sm text-red-500">
                {errors.images.message as string}
              </p>
            )}
          </div>

          {/* Product Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                {...register("isActive")}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active Product
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNewArrival"
                {...register("isNewArrival")}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="isNewArrival" className="text-sm font-medium">
                New Arrival
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isTrending"
                {...register("isTrending")}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="isTrending" className="text-sm font-medium">
                Trending
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isUpcoming"
                {...register("isUpcoming")}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="isUpcoming" className="text-sm font-medium">
                Upcoming
              </label>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
