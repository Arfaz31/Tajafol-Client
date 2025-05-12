/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Eye, EyeOff } from "lucide-react";

import { toast } from "sonner";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { Button } from "@/components/ui/button";

const passwordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePasswordModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const response = await changePassword(data).unwrap();

      if (response?.success) {
        toast.success("Password changed successfully");
        onClose();
        reset();
        dispatch(logout());
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create vendor");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md relative">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                {...register("oldPassword")}
                className={`w-full text-gray-700  px-4 py-2.5 rounded-lg border ${
                  errors.oldPassword ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10`}
                placeholder="Enter old password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className={`w-full  text-gray-700  px-4 py-2.5 rounded-lg border ${
                  errors.newPassword ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="px-4 py-2.5 text-gray-600 hover:text-white transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2.5  text-white rounded-lg  transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
