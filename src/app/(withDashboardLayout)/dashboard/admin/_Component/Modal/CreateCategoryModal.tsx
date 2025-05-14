"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formSchema } from "@/Schemas/Schema";
import Image from "next/image";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  categoryName: string;
  description?: string;
  slug: string;
  image: File;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// Define the type for form inputs
type FormInputs = z.infer<typeof formSchema>;

const CreateCategoryModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [createCategory] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setValue("image", file);
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const categoryData = {
      categoryName: values.categoryName,
      slug: values.slug,
      description: values.description,
    };
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("data", JSON.stringify(categoryData));
      formData.append("image", values.image);

      await createCategory(formData).unwrap();

      toast.success("Category created successfully");
      reset();
      setPreviewUrl(null);
      onClose();
    } catch (error: any) {
      console.error("Failed to create category:", error);
      toast.error(error?.data?.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md md:max-w-lg h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new product category to your store.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Category Name*</label>
            <input
              {...register("categoryName")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Enter category name"
            />
            {errors.categoryName && (
              <p className="text-sm text-red-500">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium">Slug*</label>
            </div>
            <input
              {...register("slug")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="category-slug"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Enter category description"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Category Image*</label>

            {/* File Input Container */}
            <div className="relative">
              {/* Custom styled file input */}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
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
                      PNG, JPG, JPEG (Max. 2MB)
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                    onChange={(e) => {
                      register("image").onChange(e);
                      handleImageChange(e);
                    }}
                  />
                </label>
              </div>

              {/* Image Preview with Cancel Button */}
              {previewUrl && (
                <div className="mt-4 relative">
                  <div className="relative h-48  rounded-md border  overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      height={200}
                      width={200}
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setValue("image", null as unknown as File); // Clear the file input
                        const fileInput = document.getElementById(
                          "image-upload"
                        ) as HTMLInputElement;
                        if (fileInput) fileInput.value = "";
                      }}
                      className="absolute top-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
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
                </div>
              )}
            </div>

            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image.message}
              </p>
            )}
          </div>

          <DialogFooter>
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
                "Create Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
