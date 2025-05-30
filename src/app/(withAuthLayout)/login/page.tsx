
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/api/authApi";
import { verifyToken } from "@/Utils/verifyToken";
import { setUser } from "@/redux/slices/authSlice";
import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import Image from "next/image";
import { setTokenInCookies } from "@/app/ServerAction/AuthService";

// Schema definition
const loginSchema = z.object({
  contact: z.string().min(1, "Contact is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [login, { isLoading: isPending }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res?.success) {
        const user: any = verifyToken(res?.data?.accessToken);
        dispatch(setUser({ user, token: res?.data?.accessToken }));
        await setTokenInCookies(res?.data?.accessToken);

        toast.success(res?.message || "Login successful");
        // Redirect after login success
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 relative overflow-hidden h-[540px] rounded-xl flex items-center justify-center">
      {/* Background effects - Tropical Mango Theme */}

      {/* Main content */}
      <Container className="relative z-10">
        <div className="min-h-screen flex items-center justify-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:w-[450px] w-full"
          >
            <div className="bg-gradient-to-br from-green-800 to-green-500 p-6 text-center border-b border-green-300 rounded-t-xl relative">
              <Link
                href="/"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-green-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                title="Back to Home"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Contact Number
                  </label>
                  <input
                    {...register("contact")}
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.contact && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.contact.message}
                    </p>
                  )}
                </div>

                <div>
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

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      href="/forget-password"
                      className="text-green-600 hover:text-green-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 px-4 transition-all duration-200 flex items-center justify-center"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Sign up
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

export default LoginPage;