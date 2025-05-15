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
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">
        {products.map((product: any) => (
          <div key={product._id} className="flex justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500">
                {product.selectedSize && `Size: ${product.selectedSize}`} • Qty:{" "}
                {product.cartQuantity}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-800">
              ৳{(product.discountPrice || product.price) * product.cartQuantity}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm font-medium text-gray-800">
            ৳{totalPrice}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Shipping</span>
          <span className="text-sm font-medium text-gray-800">
            {shippingCost ? `৳${shippingCost}` : "Not calculated"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-base font-medium text-gray-800">Total</span>
          <span className="text-base font-bold text-green-600">
            ৳{grandTotal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
