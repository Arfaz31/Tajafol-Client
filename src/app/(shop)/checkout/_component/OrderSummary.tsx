/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppSelector } from "@/redux/hook";
import React from "react";

interface OrderSummaryProps {
  shippingCost: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ shippingCost }) => {
  const { products, totalPrice, grandTotal } = useAppSelector(
    (store: any) => store.cart
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">
        YOUR ORDER
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between font-medium text-gray-700 border-b pb-2">
          <span>PRODUCT</span>
          <span>SUBTOTAL</span>
        </div>

        {products.map((product: any, index: number) => (
          <div
            key={`${product.name}-${index}`}
            className="flex justify-between border-b pb-4"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {product.productName} × {product.cartQuantity}
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-800">
              ৳
              {(
                (product.discountPrice || product.price) * product.cartQuantity
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
        <div className="flex justify-between font-medium">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-800">৳{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span className="text-gray-700">Shipping</span>
          <span className="text-gray-800">
            {shippingCost
              ? `Outside Dhaka: ৳${shippingCost.toLocaleString()}`
              : "Not calculated"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between font-bold">
          <span className="text-gray-800">Total</span>
          <span className="text-green-600">৳{grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
