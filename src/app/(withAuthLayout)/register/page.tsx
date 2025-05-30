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
import { Loader2, Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { useLoginMutation, useRegisterMutation } from "@/redux/api/authApi";
import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/Utils/verifyToken";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import Image from "next/image";
import React from "react";

// Enhanced schema with better validation
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
    email: z.string().email("Please enter a valid email address"),
    contact: z
      .string()
      .min(11, "Contact number must be at least 11 digits")
      .max(14, "Contact number must be less than 15 digits")
      .regex(/^[0-9+\-\s()]+$/, "Please enter a valid contact number"),
    emergencyContact: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 11 && val.length <= 14), {
        message: "Emergency contact must be 11-14 digits",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    address: z.string().optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

// Password strength checker
const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  return strength;
};

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [signup, { isLoading: isPending }] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const watchPassword = watch("password", "");

  // Update password strength when password changes
  React.useEffect(() => {
    setPasswordStrength(getPasswordStrength(watchPassword));
  }, [watchPassword]);

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
        toast.success("Registration successful! Welcome to Tajafol!");

        // Auto-login after registration
        const result = await loginUser({
          contact: data.contact,
          password: data.password,
        }).unwrap();

        const user: any = verifyToken(result?.data?.accessToken);
        dispatch(setUser({ user, token: result?.data?.accessToken }));
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500";
    if (strength < 3) return "bg-yellow-500";
    if (strength < 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak";
    if (strength < 3) return "Fair";
    if (strength < 4) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen ">
      <Container className="relative z-10">
        <div className="min-h-screen flex items-center justify-center py-4 px-0 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            {/* Header with logo and back button */}
            <div className="bg-gradient-to-br from-green-800 to-green-500 p-4 sm:p-6 text-center border-b border-green-300 rounded-t-xl relative">
              <Link
                href="/"
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-green-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                title="Back to Home"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>

              <Link href="/" className="block">
                <Image
                  src={tajafol}
                  alt="Tajafol Logo"
                  width={100}
                  height={60}
                  className="mx-auto sm:w-[120px] sm:h-[72px]"
                />
                <h1 className="text-lg sm:text-xl font-semibold text-white mt-2">
                  Create Account
                </h1>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  Join us for fresh finds, delivered daily
                </p>
              </Link>
            </div>

            {/* Form */}
            <div className="bg-white shadow-lg p-4 sm:p-6 lg:p-8 rounded-b-xl border border-green-200/50">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                {/* Form Fields Grid - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="col-span-1">
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        {...register("fullName")}
                        type="text"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base
                          ${
                            errors.fullName
                              ? "border-red-300 bg-red-50"
                              : touchedFields.fullName && !errors.fullName
                              ? "border-green-300 bg-green-50"
                              : "border-green-200"
                          }`}
                        placeholder="Enter your full name"
                      />
                      {touchedFields.fullName && !errors.fullName && (
                        <Check className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                      )}
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-span-1">
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        {...register("email")}
                        type="email"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base
                          ${
                            errors.email
                              ? "border-red-300 bg-red-50"
                              : touchedFields.email && !errors.email
                              ? "border-green-300 bg-green-50"
                              : "border-green-200"
                          }`}
                        placeholder="your@email.com"
                      />
                      {touchedFields.email && !errors.email && (
                        <Check className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="col-span-1">
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <input
                        {...register("contact")}
                        type="tel"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base
                          ${
                            errors.contact
                              ? "border-red-300 bg-red-50"
                              : touchedFields.contact && !errors.contact
                              ? "border-green-300 bg-green-50"
                              : "border-green-200"
                          }`}
                        placeholder="01XXXXXXXXX"
                      />
                      {touchedFields.contact && !errors.contact && (
                        <Check className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                      )}
                    </div>
                    {errors.contact && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.contact.message}
                      </p>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div className="col-span-1">
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Emergency Contact
                      <span className="text-gray-400 text-xs ml-1">
                        (Optional)
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("emergencyContact")}
                        type="tel"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base
                          ${
                            errors.emergencyContact
                              ? "border-red-300 bg-red-50"
                              : touchedFields.emergencyContact &&
                                !errors.emergencyContact
                              ? "border-green-300 bg-green-50"
                              : "border-green-200"
                          }`}
                        placeholder="01XXXXXXXXX"
                      />
                      {touchedFields.emergencyContact &&
                        !errors.emergencyContact && (
                          <Check className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        )}
                    </div>
                    {errors.emergencyContact && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.emergencyContact.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="col-span-1">
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        {...register("password")}
                        type={isVisible ? "text" : "password"}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base
                          ${
                            errors.password
                              ? "border-red-300 bg-red-50"
                              : "border-green-200"
                          }`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 p-1"
                      >
                        {isVisible ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>

                    {/* Password strength indicator */}
                    {watchPassword && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">
                            Password strength:
                          </span>
                          <span
                            className={`font-medium ${
                              passwordStrength >= 4
                                ? "text-green-600"
                                : passwordStrength >= 3
                                ? "text-blue-600"
                                : passwordStrength >= 2
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {getStrengthText(passwordStrength)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                              passwordStrength
                            )}`}
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {errors.password && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="col-span-1">
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={isConfirmVisible ? "text" : "password"}
                        {...register("confirmPassword")}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-16 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base
                          ${
                            errors.confirmPassword
                              ? "border-red-300 bg-red-50"
                              : touchedFields.confirmPassword &&
                                !errors.confirmPassword
                              ? "border-green-300 bg-green-50"
                              : "border-green-200"
                          }`}
                        placeholder="Confirm your password"
                      />
                      <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        {touchedFields.confirmPassword &&
                          !errors.confirmPassword &&
                          watchPassword && (
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                          )}
                        <button
                          type="button"
                          onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                          className="text-green-500 hover:text-green-600 p-1"
                        >
                          {isConfirmVisible ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address - Full width */}
                <div className="col-span-1">
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Address
                    <span className="text-gray-400 text-xs ml-1">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    {...register("address")}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none transition-all text-sm sm:text-base"
                    placeholder="Enter your full address for delivery"
                    rows={3}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="col-span-1">
                  <div className="flex items-start space-x-3">
                    <input
                      {...register("termsAccepted")}
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded flex-shrink-0"
                    />
                    <label className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-green-600 hover:text-green-700 underline"
                        target="_blank"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-green-600 hover:text-green-700 underline"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="col-span-1">
                  <Button
                    type="submit"
                    disabled={isPending || !isValid}
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        <span className="text-xs sm:text-sm">
                          Creating your account...
                        </span>
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Create Account</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-gray-600 text-xs sm:text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                  >
                    Sign in here
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

export default RegisterPage;
