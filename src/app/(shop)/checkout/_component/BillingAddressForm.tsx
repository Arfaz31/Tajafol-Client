/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import {
  allDivision,
  districtsOf,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";

const BillingAddressForm = ({
  register,
  errors,
  watch,
  setValue,
  handleSubmit,
  onSubmit,
}: any) => {
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  const divisions = allDivision();
  const districts = selectedDivision ? districtsOf(selectedDivision) : [];
  const upazilas = selectedDistrict ? upazilasOf(selectedDistrict) : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Billing & Shipping Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Name*
            </label>
            <input
              {...register("name")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name?.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone*
            </label>
            <input
              {...register("phone")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Division*
            </label>
            <select
              {...register("division")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
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
            {errors.division && (
              <p className="text-sm text-red-500">{errors.division?.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              District*
            </label>
            <select
              {...register("district")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
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
            {errors.district && (
              <p className="text-sm text-red-500">{errors.district?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Upazila/Thana*
            </label>
            <select
              {...register("upazila")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
              disabled={!selectedDistrict}
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazilaObj: any) => (
                <option key={upazilaObj.upazila} value={upazilaObj.upazila}>
                  {upazilaObj.upazila}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-sm text-red-500">{errors.upazila?.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email (optional)
            </label>
            <input
              {...register("email")}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Address*
          </label>
          <textarea
            {...register("address")}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
            placeholder="Enter full address"
            rows={3}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address?.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Order Note (optional)
          </label>
          <textarea
            {...register("orderNote")}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-500"
            placeholder="Any special instructions?"
            rows={2}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Proceed to Shipping
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingAddressForm;
