/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import generatePDF, { Margin } from "react-to-pdf";
import { FaFilePdf, FaCheckCircle, FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { MdReceipt } from "react-icons/md";
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
        filename: `TaazaFol_Order_${order?.orderNo}.pdf`,
        page: {
          margin: Margin.MEDIUM,
          format: "a4",
          orientation: "portrait",
        },
        overrides: {
          pdf: {
            compress: true,
          },
          canvas: {
            useCORS: true,
            scale: 2,
          },
        },
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">অর্ডার লোড হচ্ছে...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">অর্ডার লোড করতে ত্রুটি</h2>
          <p className="text-gray-600">দয়া করে পুনরায় চেষ্টা করুন</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <Container className="mx-auto px-4 pt-8 pb-12">
        {/* Success Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <FaCheckCircle className="text-4xl mr-4" />
              <div className="text-center">
                <h1 className="text-3xl font-bold">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h1>
                <p className="text-green-100 mt-2">TaazaFol-এ অর্ডার করার জন্য ধন্যবাদ</p>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex justify-end">
            <button
              onClick={handleDownloadPdf}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 flex items-center gap-3 shadow-lg font-medium"
            >
              <FaFilePdf className="h-5 w-5" />
              পিডিএফ ডাউনলোড
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div
          ref={pdfRef}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* PDF Header */}
          <div className="bg-gradient-to-r from-green-600 to-yellow-500 text-white p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <FaShoppingBag className="text-4xl mr-4" />
              <div>
                <h1 className="text-3xl font-bold">TaazaFol</h1>
                <p className="text-green-100">বাংলাদেশের সেরা ফলের দোকান</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 mt-6">
              <h2 className="text-xl font-bold">অর্ডার ইনভয়েস</h2>
              <p className="text-green-100">অর্ডার নং: #{order?.orderNo}</p>
            </div>
          </div>

          <div className="p-8">
            {/* Order Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Order Details */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <MdReceipt className="text-green-600 text-2xl mr-3" />
                  <h3 className="text-xl font-bold text-green-800">অর্ডার বিবরণ</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">অর্ডার নং:</span>
                    <span className="font-semibold text-green-700">#{order?.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">তারিখ:</span>
                    <span className="font-semibold">{new Date(order?.createdAt).toLocaleDateString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">মোট পরিমাণ:</span>
                    <span className="font-bold text-green-700 text-lg">৳{order?.totalPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">পেমেন্ট স্ট্যাটাস:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order?.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order?.paymentStatus === 'paid' ? 'পরিশোধিত' : 'অপরিশোধিত'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="text-blue-600 text-2xl mr-3" />
                  <h3 className="text-xl font-bold text-blue-800">গ্রাহক তথ্য</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-20">নাম:</span>
                    <span className="font-semibold ml-2">{order?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-600 w-5" />
                    <span className="font-semibold ml-2">{order?.contact}</span>
                  </div>
                  {order?.email && (
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-600 w-5" />
                      <span className="font-semibold ml-2">{order?.email}</span>
                    </div>
                  )}
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">ঠিকানা:</p>
                    <p className="font-medium">{order?.address}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {order?.upazilla}, {order?.district}, {order?.division}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <FaShoppingBag className="text-orange-600 text-2xl mr-3" />
                <h3 className="text-xl font-bold text-orange-800">অর্ডার করা পণ্যসমূহ</h3>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4">
                  <div className="grid grid-cols-12 gap-4 font-bold">
                    <div className="col-span-6">পণ্যের নাম</div>
                    <div className="col-span-2 text-center">পরিমাণ</div>
                    <div className="col-span-2 text-center">দাম (প্রতি)</div>
                    <div className="col-span-2 text-right">মোট</div>
                  </div>
                </div>
                
                <div className="p-4">
                  {order?.orderItems?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-4 py-3 border-b border-orange-100 last:border-b-0 items-center"
                    >
                      <div className="col-span-6">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      </div>
                      <div className="col-span-2 text-center font-medium">{item.quantity}</div>
                      <div className="col-span-2 text-center font-medium">৳{item.price?.toLocaleString()}</div>
                      <div className="col-span-2 text-right font-bold text-orange-600">
                        ৳{(item.quantity * item.price)?.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">সাবটোটাল:</span>
                    <span className="font-semibold">৳{order?.totalPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">ডেলিভারি চার্জ:</span>
                    <span className="font-semibold">৳{order?.shippingCost?.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-green-300 pt-3">
                    <div className="flex justify-between text-xl font-bold text-green-700">
                      <span>সর্বমোট:</span>
                      <span>৳{(order?.totalPrice + order?.shippingCost)?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <h4 className="font-bold text-gray-800 mb-2">TaazaFol</h4>
                <p className="text-gray-600">বাংলাদেশের সেরা ফলের দোকান</p>
              </div>
              <div className="text-sm text-gray-500 border-t border-gray-300 pt-4">
                <p className="mb-1">অর্ডার সংক্রান্ত যেকোনো সমস্যার জন্য আমাদের কাস্টমার সাপোর্টে যোগাযোগ করুন</p>
                <p className="font-medium">ধন্যবাদ TaazaFol এর সাথে কেনাকাটা করার জন্য!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-300 shadow-lg text-center"
            >
              আরও কেনাকাটা করুন
            </Link>

            {user?.id && (
              <Link
                href={`/dashboard/customer`}
                className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 font-bold rounded-lg hover:bg-green-50 transition duration-300 shadow-lg text-center"
              >
                অর্ডার ডিটেইলস দেখুন
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderCompletionPage;