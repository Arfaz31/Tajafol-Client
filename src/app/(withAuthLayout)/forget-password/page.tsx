"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import Image from "next/image";
import { useForgetPasswordMutation } from "@/redux/api/authApi";

// Schema definition
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [forgotPassword, { isLoading: isPending }] =
    useForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    try {
      const response = await forgotPassword({
        email: data.email.trim(),
      }).unwrap();

      if (response && response.success) {
        toast.success("Password reset link sent to your email");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset link. Please try again.");
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
                Forgot your password?
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Enter your email address and we&apos;ll send you a password
                reset link.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Email Address
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

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 flex items-center justify-center"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Remembered your password?{" "}
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

export default ForgotPassword;
