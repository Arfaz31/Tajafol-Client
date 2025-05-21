/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  allDivision,
  districtsOf,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useGetmeQuery } from "@/redux/api/userApi";

import { Loader2, UserPlus, User, Phone, MapPin, Mail } from "lucide-react";

interface BillingAddressFormProps {
  formMethods: any;
  proceedToShipping: () => void;
  isValid: boolean;
}

const BillingAddressForm: React.FC<BillingAddressFormProps> = ({
  formMethods,
  proceedToShipping,
  isValid,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = formMethods;

  // Get user state from Redux
  const { user } = useAppSelector((state: RootState) => state.auth);

  // Use skip parameter to avoid unnecessary queries
  const { data: userData, isLoading: isUserDataLoading } = useGetmeQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      skip: !user?.email, // Skip if no user email is available
    }
  );

  // Watched form values
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  // Toggle state for custom input fields
  const [useCustomDivision, setUseCustomDivision] = useState(false);
  const [useCustomDistrict, setUseCustomDistrict] = useState(false);
  const [useCustomUpazila, setUseCustomUpazila] = useState(false);

  // Memoize location data to prevent unnecessary recalculations
  const divisions = useMemo(() => allDivision(), []);
  const districts = useMemo(
    () =>
      selectedDivision && !useCustomDivision
        ? districtsOf(selectedDivision)
        : [],
    [selectedDivision, useCustomDivision]
  );
  const upazilas = useMemo(
    () =>
      selectedDistrict && !useCustomDistrict
        ? upazilasOf(selectedDistrict)
        : [],
    [selectedDistrict, useCustomDistrict]
  );

  // Auto-fill form when user data is available
  useEffect(() => {
    if (userData?.data) {
      // Set default values without preventing user edits
      setValue("name", userData.data.fullName || "");
    }

    if (user) {
      setValue("phone", user.contact || "");
      setValue("email", user.email || "");
    }
  }, [userData, user, setValue]);

  // Memoize toggle functions to prevent recreating on each render
  const toggleCustomDivision = useCallback(() => {
    setUseCustomDivision((prev) => {
      const newValue = !prev;
      if (newValue) {
        setValue("division", "");
        setValue("district", "");
        setValue("upazila", "");
        setUseCustomDistrict(true);
        setUseCustomUpazila(true);
      }
      return newValue;
    });
  }, [setValue]);

  const toggleCustomDistrict = useCallback(() => {
    setUseCustomDistrict((prev) => {
      const newValue = !prev;
      if (newValue) {
        setValue("district", "");
        setValue("upazila", "");
        setUseCustomUpazila(true);
      }
      return newValue;
    });
  }, [setValue]);

  const toggleCustomUpazila = useCallback(() => {
    setUseCustomUpazila((prev) => {
      const newValue = !prev;
      if (newValue) {
        setValue("upazila", "");
      }
      return newValue;
    });
  }, [setValue]);

  // Handle proceed to shipping
  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    proceedToShipping();
  };

  // Show loading state while fetching user data
  if (user?.email && isUserDataLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <span className="ml-3 text-gray-600">Loading your information...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-50 border-b border-emerald-100 p-6">
        <div className="flex md:flex-row flex-col md:items-center items-start gap-3 justify-between">
          <div>
            <h2 className="md:text-xl text-base font-semibold text-gray-900 flex md:items-center items-start gap-2">
              <MapPin className="h-5 w-5 text-emerald-600 md:block hidden" />
              Billing & Shipping Information
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Please provide your details for delivery
            </p>
          </div>

          <div>
            {/* User Status Indicator */}
            {user?.email ? (
              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <User className="w-4 h-4" />
                {user?.fullName || user?.email}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                <UserPlus className="w-4 h-4" />
                Guest Checkout
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleProceedToShipping} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.name
                      ? "border-red-300 bg-red-50"
                      : touchedFields.name && !errors.name
                      ? "border-green-300 bg-green-50"
                      : user?.email
                      ? "border-emerald-200"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name?.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : touchedFields.email && !errors.email
                      ? "border-green-300 bg-green-50"
                      : user?.email
                      ? "border-emerald-200"
                      : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email?.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  {...register("phone", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message:
                        "Please enter a valid Bangladeshi mobile number (01XXXXXXXXX)",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : touchedFields.phone && !errors.phone
                      ? "border-green-300 bg-green-50"
                      : user?.email
                      ? "border-emerald-200"
                      : "border-gray-300"
                  }`}
                  placeholder="01XXXXXXXXX"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone?.message}</p>
              )}
            </div>

            {/* Division */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Division<span className="text-red-500 ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={toggleCustomDivision}
                  className="text-xs text-emerald-600 hover:text-emerald-800 underline"
                >
                  {useCustomDivision ? "Select from list" : "Enter manually"}
                </button>
              </div>

              {useCustomDivision ? (
                <input
                  {...register("division", {
                    required: "Division is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter division name"
                />
              ) : (
                <select
                  {...register("division", {
                    required: "Division is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  onChange={(e) => {
                    setValue("division", e.target.value);
                    setValue("district", "");
                    setValue("upazila", "");
                  }}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division: string) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              )}
              {errors.division && (
                <p className="text-sm text-red-600">
                  {errors.division?.message}
                </p>
              )}
            </div>

            {/* District */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  District<span className="text-red-500 ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={toggleCustomDistrict}
                  className="text-xs text-emerald-600 hover:text-emerald-800 underline"
                >
                  {useCustomDistrict ? "Select from list" : "Enter manually"}
                </button>
              </div>

              {useCustomDistrict ? (
                <input
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter district name"
                />
              ) : (
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  disabled={!selectedDivision}
                  onChange={(e) => {
                    setValue("district", e.target.value);
                    setValue("upazila", "");
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map((district: string) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              )}
              {errors.district && (
                <p className="text-sm text-red-600">
                  {errors.district?.message}
                </p>
              )}
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Upazila/Thana<span className="text-red-500 ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={toggleCustomUpazila}
                  className="text-xs text-emerald-600 hover:text-emerald-800 underline"
                >
                  {useCustomUpazila ? "Select from list" : "Enter manually"}
                </button>
              </div>

              {useCustomUpazila ? (
                <input
                  {...register("upazila", {
                    required: "Upazila is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter upazila/thana name"
                />
              ) : (
                <select
                  {...register("upazila", {
                    required: "Upazila is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  disabled={!selectedDistrict}
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazilaObj: any) => (
                    <option key={upazilaObj.upazila} value={upazilaObj.upazila}>
                      {upazilaObj.upazila}
                    </option>
                  ))}
                </select>
              )}
              {errors.upazila && (
                <p className="text-sm text-red-600">
                  {errors.upazila?.message}
                </p>
              )}
            </div>
          </div>

          {/* Complete Address - Full Width */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Complete Address<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
              placeholder="Enter your complete address with road, area details"
              rows={2}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address?.message}</p>
            )}
          </div>

          {/* Order Note */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Order Note
              <span className="text-gray-400 text-xs ml-1">(Optional)</span>
            </label>
            <textarea
              {...register("orderNote")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
              placeholder="Any special instructions for delivery"
              rows={2}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                !isValid
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
              }`}
              disabled={!isValid}
            >
              <MapPin className="w-5 h-5" />
              <span>Proceed to Shipping</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingAddressForm;
