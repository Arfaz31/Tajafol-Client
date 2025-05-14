/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import Image from "next/image";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useRouter, useSearchParams } from "next/navigation";

// Schema definition
const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [resetPassword, { isLoading: isPending }] = useResetPasswordMutation();
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    try {
      if (!email || !token) {
        toast.error("Invalid reset link");
        return;
      }
      console.log("New Password:", data.newPassword);

      const response = await resetPassword({
        password: data.newPassword.trim(),
        token,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Password reset successfully");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="bg-gray-50 relative overflow-hidden h-[540px] rounded-xl flex items-center justify-center">
      {/* Background effects - Tropical Mango Theme */}

      {/* Main content */}
      <Container className="relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:w-[450px] w-full"
          >
            <div className="bg-gradient-to-br from-green-800 to-green-500 p-6 text-center border-b border-green-300 rounded-t-xl">
              <Link href="/">
                <Image
                  src={tajafol}
                  alt="Logo"
                  width={100}
                  height={60}
                  className="mx-auto"
                />
                <p className="text-sm text-white/80 mt-1">
                  Fresh Finds, Delivered Daily
                </p>
              </Link>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-b-xl border border-green-200/50">
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                Reset Your Password
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Enter your new password below
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("newPassword")}
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
                  {errors.newPassword && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
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
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 flex items-center justify-center"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
