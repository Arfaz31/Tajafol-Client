"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  //   DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateAdminMutation } from "@/redux/api/userApi";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    contact: z.string().min(1, "Contact is required"),
    emergencyContact: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const CreateAdminModal = ({ isOpen, onClose }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [createAdmin, { isLoading: isPending }] = useCreateAdminMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const registerData = {
      password: data.password,
      admin: {
        fullName: data.fullName,
        email: data.email,
        contact: data.contact,
        emergencyContact: data.emergencyContact,
        address: data.address,
      },
    };

    try {
      const res = await createAdmin(registerData).unwrap();

      if (res?.success) {
        toast.success("Admin created successful!");
        reset();
        onClose();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Admin creation failed. Please try again."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md md:max-w-lg h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Admin</DialogTitle>
          <DialogDescription>Add a new admin for your store.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Contact Number
            </label>
            <input
              {...register("contact")}
              type="tel"
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="01XXXXXXXXX"
            />
            {errors.contact && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Emergency Contact No.
            </label>
            <input
              {...register("emergencyContact")}
              type="tel"
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="01XXXXXXXXX"
            />
            {errors.emergencyContact && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.emergencyContact.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={isVisible ? "text" : "password"}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600"
              >
                {isVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600"
              >
                {isVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Address (Optional)
            </label>
            <textarea
              {...register("address")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="123 Main St, Your City"
              rows={2}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4flex items-center justify-center"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminModal;
