/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/api/authApi";
import { verifyToken } from "@/Utils/verifyToken";
import { setUser } from "@/redux/slices/authSlice";
import Container from "@/components/Shared/Container";

// Schema definition
const loginSchema = z.object({
  contact: z.string().min(1, "Contact is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
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

        toast.success(res?.message || "Login successful");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-yellow-600 relative overflow-hidden h-[550px] rounded-xl flex items-center justify-center">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-950 to-green-900/80" />

        {/* Organic shapes */}
        <div className="absolute w-[300px] h-[300px] bg-green-600/5 rounded-full blur-3xl top-1/4 -left-1/4" />
        <div className="absolute w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-3xl bottom-1/4 -right-1/4" />
        <div className="absolute w-[250px] h-[250px] bg-emerald-400/5 rounded-full blur-3xl top-3/4 left-1/2" />
      </div>

      {/* Main content */}
      <Container className="relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:w-[450px] w-full"
          >
            <div className="bg-gradient-to-br from-green-900/70 to-green-800/50 p-6 text-center border-b border-green-700/30 rounded-t-xl">
              <Link href="/">
                <h1 className="text-2xl font-bold text-green-400">TajaFol</h1>
                <p className="text-sm text-green-200/60 mt-1">
                  Fresh Finds, Delivered Daily
                </p>
              </Link>
            </div>

            <div className="bg-green-950/50 p-6 rounded-b-xl border border-green-800/30">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-green-100 mb-2 text-sm font-medium">
                    Contact Number
                  </label>
                  <input
                    {...register("contact")}
                    type="text"
                    className="w-full px-4 py-2.5 bg-green-900/30 border border-green-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-green-50 placeholder-green-400/40"
                    placeholder="+8801XXXXXXXXX"
                  />
                  {errors.contact && (
                    <p className="mt-1.5 text-sm text-red-400">
                      {errors.contact.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-green-100 mb-2 text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={isVisible ? "text" : "password"}
                      className="w-full px-4 py-2.5 bg-green-900/30 border border-green-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-green-50 placeholder-green-400/40"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                    >
                      {isVisible ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-green-700 bg-green-800/50 text-green-500 focus:ring-green-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-green-200"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="text-green-400 hover:text-green-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-lg text-white font-medium shadow-lg shadow-green-900/20 transition-all duration-200 flex items-center justify-center"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-green-300/70 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-green-400 hover:text-green-300 font-medium"
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
