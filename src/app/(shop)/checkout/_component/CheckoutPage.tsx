"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { billingSchema } from "@/Schemas/Schema";
import BillingAddressForm from "./BillingAddressForm";
import ShippingMethod from "./ShippingMethod";
import OrderSummary from "./OrderSummary";
// Type for TypeScript usage
export type BillingFormValues = z.infer<typeof billingSchema>;

type FormValues = BillingFormValues;

const CheckoutPage = () => {
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<"billing" | "shipping">(
    "billing"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      name: "",
      phone: "",
      division: "",
      district: "",
      upazila: "",
      address: "",
      email: "",
      orderNote: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form submitted:", data);
    // After form submission, move to shipping step
    setActiveStep("shipping");
  };

  const handleShippingMethodSelect = (cost: number) => {
    setShippingCost(cost);
    // Don't change the step here, we're already on shipping
  };

  const handleBackToBilling = () => {
    setActiveStep("billing");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Forms */}
          <div className="lg:w-2/3">
            {activeStep === "billing" ? (
              <BillingAddressForm
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                setValue={setValue}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            ) : (
              <ShippingMethod
                onSelectMethod={handleShippingMethodSelect}
                onBack={handleBackToBilling}
              />
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <OrderSummary shippingCost={shippingCost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
