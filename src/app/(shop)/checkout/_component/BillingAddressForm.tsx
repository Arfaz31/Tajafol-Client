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
import { useRegisterMutation } from "@/redux/api/authApi";
import { useGetmeQuery } from "@/redux/api/userApi";

import { toast } from "sonner";
import { Loader2, UserPlus, Info, User, Mail, Phone, MapPin, FileText, Shield } from "lucide-react";

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
  const isAuthenticated = !!user;
  
  // Use skip parameter to avoid unnecessary queries
  const { data: userData, isLoading: isUserDataLoading } = useGetmeQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });
  
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();

  // Watched form values
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");
  const watchedName = watch("name");
  const watchedPhone = watch("phone");
  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  // Toggle state for custom input fields
  const [useCustomDivision, setUseCustomDivision] = useState(false);
  const [useCustomDistrict, setUseCustomDistrict] = useState(false);
  const [useCustomUpazila, setUseCustomUpazila] = useState(false);
  const [willAutoRegister, setWillAutoRegister] = useState(false);

  // Memoize location data to prevent unnecessary recalculations
  const divisions = useMemo(() => allDivision(), []);
  const districts = useMemo(() => 
    selectedDivision && !useCustomDivision ? districtsOf(selectedDivision) : [], 
    [selectedDivision, useCustomDivision]
  );
  const upazilas = useMemo(() => 
    selectedDistrict && !useCustomDistrict ? upazilasOf(selectedDistrict) : [], 
    [selectedDistrict, useCustomDistrict]
  );

  // Auto-fill form when user data is available
  useEffect(() => {
    if (isAuthenticated && userData?.data) {
      setValue("name", userData.data.fullName || "");
      setValue("phone", user.contact || "");
      setValue("email", user.email || "");
      // Set willAutoRegister to false since user is already logged in
      setWillAutoRegister(false);
    } else if (!isAuthenticated) {
      // Set willAutoRegister to true for guest checkout with valid data
      const hasValidData = watchedName && watchedPhone && watchedEmail;
      setWillAutoRegister(hasValidData);
    }
  }, [isAuthenticated, userData, user, setValue, watchedName, watchedPhone, watchedEmail]);

  // Memoize toggle functions to prevent recreating on each render
  const toggleCustomDivision = useCallback(() => {
    setUseCustomDivision(prev => {
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
    setUseCustomDistrict(prev => {
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
    setUseCustomUpazila(prev => {
      const newValue = !prev;
      if (newValue) {
        setValue("upazila", "");
      }
      return newValue;
    });
  }, [setValue]);

  // Handle auto-registration with proper password handling
  const handleAutoRegister = async (formData: any) => {
    if (!isAuthenticated && willAutoRegister) {
      try {
        // Use the password provided by the user or generate a random one
        const password = formData.password || `TaazaFol_${Date.now().toString().slice(-6)}`;
        
        const registerData = {
          password: password,
          customers: {
            fullName: formData.name,
            email: formData.email,
            contact: formData.phone,
            emergencyContact: "",
            address: formData.address,
          },
        };

        const response = await registerUser(registerData).unwrap();
        
        if (response?.data?.accessToken) {
          // If user provided a password, show success message with login instructions
          if (formData.password) {
            toast.success(
              "Account created successfully! You can now log in with your email and password to track orders."
            );
          } else {
            // If we generated a random password, show it to the user
            toast.success(
              `Account created! Your temporary password is: ${password} (Please save this)`
            );
          }
        }
      } catch (error: any) {
        // Don't fail the order if registration fails
        console.error("Auto-registration failed:", error);
        toast.warning("Order placed successfully, but account creation failed. You can create an account later.");
      }
    }
  };

  // Enhanced proceed to shipping handler
  const handleProceedToShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current form data
    const formData = {
      name: watchedName,
      phone: watchedPhone,
      email: watchedEmail,
      password: watchedPassword,
      division: watch("division"),
      district: watch("district"),
      upazila: watch("upazila"),
      address: watch("address"),
      orderNote: watch("orderNote"),
    };

    // Handle auto-registration if needed
    await handleAutoRegister(formData);
    
    // Proceed with shipping
    proceedToShipping();
  };

  // Show loading state while fetching user data
  if (isAuthenticated && isUserDataLoading) {
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              Billing & Shipping Information
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Please provide your details for delivery
            </p>
          </div>
          
          {/* User Status Indicator */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100 px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <User className="w-4 h-4" />
              {user?.fullName}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
              <UserPlus className="w-4 h-4" />
              Guest Checkout
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Auto-registration info for guests */}
        {!isAuthenticated && willAutoRegister && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <div className="flex items-center gap-2 font-medium mb-1">
                  <Shield className="w-4 h-4" />
                  Account will be created automatically
                </div>
                <p>We&apos;ll create an account for you to track your order. You&apos;ll receive login details via email after checkout.</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleProceedToShipping} className="space-y-6">
          
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium border-b border-gray-200 pb-2">
              <User className="h-5 w-5 text-emerald-600" />
              <span>Personal Information</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isAuthenticated ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <input
                    {...register("name", { required: "Name is required" })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                      errors.name
                        ? 'border-red-300 bg-red-50'
                        : isAuthenticated
                        ? 'bg-emerald-50 border-emerald-200'
                        : touchedFields.name && !errors.name
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                    readOnly={isAuthenticated}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name?.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address 
                  {!isAuthenticated ? <span className="text-red-500 ml-1">*</span> : <span className="text-gray-500 text-xs ml-1">(from profile)</span>}
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isAuthenticated ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <input
                    {...register("email", {
                      required: !isAuthenticated ? "Email is required for guest checkout" : false,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                      errors.email
                        ? 'border-red-300 bg-red-50'
                        : isAuthenticated
                        ? 'bg-emerald-50 border-emerald-200'
                        : touchedFields.email && !errors.email
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                    readOnly={isAuthenticated}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email?.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium border-b border-gray-200 pb-2">
              <Phone className="h-5 w-5 text-emerald-600" />
              <span>Contact Information</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isAuthenticated ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <input
                    {...register("phone", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: "Please enter a valid Bangladeshi mobile number (01XXXXXXXXX)",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                      errors.phone
                        ? 'border-red-300 bg-red-50'
                        : isAuthenticated
                        ? 'bg-emerald-50 border-emerald-200'
                        : touchedFields.phone && !errors.phone
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="01XXXXXXXXX"
                    readOnly={isAuthenticated}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone?.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium border-b border-gray-200 pb-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <span>Address Information</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    {...register("division", { required: "Division is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter division name"
                  />
                ) : (
                  <select
                    {...register("division", { required: "Division is required" })}
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
                  <p className="text-sm text-red-600">{errors.division?.message}</p>
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
                    {...register("district", { required: "District is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter district name"
                  />
                ) : (
                  <select
                    {...register("district", { required: "District is required" })}
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
                  <p className="text-sm text-red-600">{errors.district?.message}</p>
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
                    {...register("upazila", { required: "Upazila is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter upazila/thana name"
                  />
                ) : (
                  <select
                    {...register("upazila", { required: "Upazila is required" })}
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
                  <p className="text-sm text-red-600">{errors.upazila?.message}</p>
                )}
              </div>
            </div>

            {/* Full Address */}
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
                placeholder="Enter your complete address with house number, road, area details"
                rows={3}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address?.message}</p>
              )}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium border-b border-gray-200 pb-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              <span>Additional Information</span>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Order Note
                <span className="text-gray-400 text-xs ml-1">(Optional)</span>
              </label>
              <textarea
                {...register("orderNote")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Any special instructions for delivery or preferences"
                rows={2}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                !isValid || isRegistering
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
              }`}
              disabled={!isValid || isRegistering}
            >
              {isRegistering ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account & Processing...</span>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  <span>Proceed to Shipping</span>
                  {!isAuthenticated && willAutoRegister && (
                    <span className="text-xs bg-emerald-800 px-3 py-1 rounded-full">
                      + Create Account
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingAddressForm;