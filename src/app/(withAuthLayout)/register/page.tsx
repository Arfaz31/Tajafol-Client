/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useLoginMutation, useRegisterMutation } from "@/redux/api/authApi";
import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/Utils/verifyToken";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import Image from "next/image";
// Schema definition
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    contact: z.string().min(1, "Contact is required"),
    emergencyContact: z.string().min(1, "Emergency Contact is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [signup, { isLoading: isPending }] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const registerData = {
      password: data.password,
      customers: {
        fullName: data.fullName,
        email: data.email,
        contact: data.contact,
        emergencyContact: data.emergencyContact,
        address: data.address,
      },
    };

    try {
      const res = await signup(registerData).unwrap();

      if (res?.data?.accessToken) {
        toast.success("Registration successful!");
        //Login after registration
        const result = await loginUser({
          contact: data.contact,
          password: data.password,
        }).unwrap();

        const user: any = verifyToken(result?.data?.accessToken);
        dispatch(setUser({ user, token: result?.data?.accessToken }));
        router.push("/");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-50 relative overflow-hidden md:h-[720px] h-full md:py-2 py-4 rounded-xl flex items-center justify-center">
      {/* Background effects - Tropical Mango Theme */}

      {/* Main content */}
      <Container className="relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:w-[550px] w-full"
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

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-green-600 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
