/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { billingSchema } from "@/Schemas/Schema";
import BillingAddressForm from "./BillingAddressForm";
import ShippingMethod from "./ShippingMethod";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/hook";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

export type BillingFormValues = z.infer<typeof billingSchema>;

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<"billing" | "shipping">(
    "billing"
  );
  const { products, totalPrice } = useAppSelector((state) => state.cart);
  // console.log("products", products);

  const formMethods = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    mode: "onChange",
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

  const {
    watch,
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const proceedToShipping = handleSubmit(
    () => {
      setActiveStep("shipping");
    },
    (errors) => {
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  );

  const handlePlaceOrder = async () => {
    const formData = watch();
    const orderItems = products.map((product) => ({
      productId: product._id,
      quantity: product.cartQuantity,
      price: product.discountPrice || product.price,
      name: product.productName,
    }));

    try {
      const orderData = {
        name: formData.name,
        userId: user?.id || undefined,
        email: formData.email || undefined,
        contact: formData.phone,
        division: formData.division,
        district: formData.district,
        upazilla: formData.upazila,
        address: formData.address,
        orderNote: formData.orderNote || undefined,
        totalPrice: totalPrice + shippingCost,
        orderItems,
        shippingCost,
      };

      // console.log("Order Data:", orderData);

      const result = await createOrder(orderData).unwrap();

      if (result?.success) {
        toast.success(result.message);
        dispatch(clearCart());
        router.push(`/order-completion/${result.data._id}`);
      } else {
        toast.error(result?.message || "Order creation failed");
      }
    } catch (error: any) {
      console.error("Order creation failed:", error);
      if (!error?.data?.success) {
        toast.error(error?.data?.message || "Failed to create order");
      }
    }
  };

  const handleShippingMethodSelect = (cost: number) => {
    setShippingCost(cost);
  };

  const handleBackToBilling = () => {
    setActiveStep("billing");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            {activeStep === "billing" ? (
              <BillingAddressForm
                formMethods={formMethods}
                proceedToShipping={proceedToShipping}
                isValid={isValid}
              />
            ) : (
              <ShippingMethod
                onSelectMethod={handleShippingMethodSelect}
                onBack={handleBackToBilling}
                onPlaceOrder={handlePlaceOrder}
                isLoading={isLoading}
              />
            )}
          </div>

          <div className="lg:w-[45%]">
            <OrderSummary shippingCost={shippingCost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
