/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import generatePDF, { Margin } from "react-to-pdf";
import { FaFilePdf } from "react-icons/fa";
import Container from "@/components/Shared/Container";

const OrderCompletionPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const pdfRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useGetSingleOrderQuery(id);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const order = data?.data;

  const handleDownloadPdf = () => {
    if (pdfRef.current) {
      generatePDF(pdfRef, {
        filename: `order_${order?.orderNo}.pdf`,
        page: {
          margin: Margin.SMALL,

          format: "a4",
          orientation: "portrait",
        },

        overrides: {
          pdf: {
            compress: true,
          },

          canvas: {
            useCORS: true,
          },
        },
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading order details
      </div>
    );

  return (
    <Container className=" mx-auto px-4 pt-5 pb-12 ">
      {/* PDF Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 flex items-center gap-2"
        >
          <FaFilePdf className="h-5 w-5" />
          Download PDF
        </button>
      </div>

      {/* PDF Content - Simplified and optimized for PDF generation */}
      <div
        ref={pdfRef}
        className="max-w-2xl mx-auto bg-white p-8 shadow-lg"
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Order Summary
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Order Number:</div>
            <div className="font-medium">#{order?.orderNo}</div>

            <div className="text-gray-600">Date:</div>
            <div className="font-medium">
              {new Date(order?.createdAt).toLocaleDateString()}
            </div>

            <div className="text-gray-600">Total Amount:</div>
            <div className="font-medium">
              ৳{order?.totalPrice?.toLocaleString()}
            </div>

            <div className="text-gray-600">Payment Status:</div>
            <div className="font-medium capitalize">{order?.paymentStatus}</div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Billing Address
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Name:</div>
            <div className="font-medium">{order?.name}</div>

            <div className="text-gray-600">Contact:</div>
            <div className="font-medium">{order?.contact}</div>

            {order?.email && (
              <>
                <div className="text-gray-600">Email:</div>
                <div className="font-medium">{order?.email}</div>
              </>
            )}

            <div className="text-gray-600">Division:</div>
            <div className="font-medium">{order?.division}</div>

            <div className="text-gray-600">District:</div>
            <div className="font-medium">{order?.district}</div>

            <div className="text-gray-600">Upazilla:</div>
            <div className="font-medium">{order?.upazilla}</div>

            <div className="text-gray-600">Address:</div>
            <div className="font-medium">{order?.address}</div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Order Items
          </h2>
          <div className="space-y-4">
            {order?.orderItems?.map((item: any, index: number) => (
              <div
                key={index}
                className="pb-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium mb-1">{item.name}</div>
                <div className="grid grid-cols-3 text-sm text-gray-600">
                  <span>Qty: {item.quantity}</span>
                  <span>৳{item.price?.toLocaleString()} each</span>
                  <span className="text-right">
                    ৳{(item.quantity * item.price)?.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Subtotal:</div>
              <div className="font-medium text-right">
                ৳{order?.totalPrice?.toLocaleString()}
              </div>

              <div className="font-medium">Shipping:</div>
              <div className="font-medium text-right">
                ৳{order?.shippingCost?.toLocaleString()}
              </div>

              <div className="font-bold">Total:</div>
              <div className="font-bold text-right">
                ৳{(order?.totalPrice + order?.shippingCost)?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Thank you for shopping with us!</p>
          <p className="mt-1">
            For any questions, please contact our customer support.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto mt-6">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-200"
          >
            Continue Shopping
          </Link>

          {user?.id && (
            <Link
              href={`/my-orders`}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition duration-200"
            >
              View Order Details
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletionPage;
