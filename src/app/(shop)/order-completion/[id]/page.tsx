/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import React, { useRef } from "react";
import Link from "next/link";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import generatePDF, { Margin } from "react-to-pdf";
import {
  FaFilePdf,
  FaCheckCircle,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,

  FaCode,
} from "react-icons/fa";
import { MdReceipt } from "react-icons/md";
import Container from "@/components/Shared/Container";
import Image from "next/image";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-emerald-600"></div>
          <p className="mt-4 text-gray-600 font-medium">অর্ডার লোড হচ্ছে...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md border border-red-200">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            অর্ডার লোড করতে ত্রুটি
          </h2>
          <p className="text-gray-600">দয়া করে পুনরায় চেষ্টা করুন</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <Container className="mx-auto px-4 py-8">
        {/* Success Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white border border-green-200 rounded-lg shadow-sm p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FaCheckCircle className="text-green-600 text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                অর্ডার সফলভাবে সম্পন্ন হয়েছে!
              </h1>
              <p className="text-gray-600">
                TaazaFol-এ অর্ডার করার জন্য ধন্যবাদ
              </p>
            </div>
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex justify-end">
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 font-medium"
            >
              <FaFilePdf className="h-5 w-5 mr-2" />
              পিডিএফ ডাউনলোড
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={pdfRef}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* PDF Header */}
            <div className="bg-emerald-600 text-white p-8">
              <div className="text-center">
                <div className="mb-6">
                  <Link href="/" className="inline-block">
                    <Image src={tajafol} alt="TaazaFol Logo" width={120} height={72} />
                  </Link>
                </div>
                <h1 className="text-2xl font-bold mb-2">TaazaFol</h1>
                <p className="text-emerald-100 mb-6">বাংলাদেশের সেরা ফলের দোকান</p>
                <div className="bg-white/10 rounded-lg p-4 inline-block">
                  <h2 className="text-xl font-bold">অর্ডার ইনভয়েস</h2>
                  <p className="text-emerald-100">অর্ডার নং: #{order?.orderNo}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Order Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Order Details */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <MdReceipt className="text-emerald-600 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      অর্ডার বিবরণ
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">অর্ডার নং:</span>
                      <span className="font-medium text-gray-900">
                        #{order?.orderNo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">তারিখ:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(order?.createdAt).toLocaleDateString("bn-BD")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">মোট পরিমাণ:</span>
                      <span className="font-semibold text-emerald-600 text-lg">
                        ৳{order?.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">পেমেন্ট স্ট্যাটাস:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order?.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order?.paymentStatus === "paid"
                          ? "পরিশোধিত"
                          : "অপরিশোধিত"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-emerald-600 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      গ্রাহক তথ্য
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-gray-600 w-16">নাম:</span>
                      <span className="font-medium text-gray-900">{order?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-600 w-4 mr-2" />
                      <span className="font-medium text-gray-900">{order?.contact}</span>
                    </div>
                    {order?.email && (
                      <div className="flex items-center">
                        <FaEnvelope className="text-gray-600 w-4 mr-2" />
                        <span className="font-medium text-gray-900">{order?.email}</span>
                      </div>
                    )}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">ঠিকানা:</p>
                      <p className="font-medium text-gray-900">{order?.address}</p>
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
                  <FaShoppingBag className="text-emerald-600 text-xl mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    অর্ডার করা পণ্যসমূহ
                  </h3>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="hidden md:block bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 p-4 font-medium text-gray-700">
                      <div className="col-span-6">পণ্যের নাম</div>
                      <div className="col-span-2 text-center">পরিমাণ</div>
                      <div className="col-span-2 text-center">দাম (প্রতি)</div>
                      <div className="col-span-2 text-right">মোট</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-4">
                    {order?.orderItems?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="py-4 border-b border-gray-100 last:border-b-0"
                      >
                        {/* Mobile View */}
                        <div className="md:hidden space-y-3">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-600">পরিমাণ:</div>
                            <div className="text-right font-medium">{item.quantity}</div>
                            <div className="text-gray-600">দাম (প্রতি):</div>
                            <div className="text-right font-medium">
                              ৳{item.price?.toLocaleString()}
                            </div>
                            <div className="text-gray-600 font-medium">মোট:</div>
                            <div className="text-right font-semibold text-emerald-600">
                              ৳{(item.quantity * item.price)?.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-6">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                          </div>
                          <div className="col-span-2 text-center font-medium">
                            {item.quantity}
                          </div>
                          <div className="col-span-2 text-center font-medium">
                            ৳{item.price?.toLocaleString()}
                          </div>
                          <div className="col-span-2 text-right font-semibold text-emerald-600">
                            ৳{(item.quantity * item.price)?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">সাবটোটাল:</span>
                      <span className="font-medium text-gray-900">
                        ৳{order?.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ডেলিভারি চার্জ:</span>
                      <span className="font-medium text-gray-900">
                        ৳{order?.shippingCost?.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-gray-900">সর্বমোট:</span>
                        <span className="text-emerald-600">
                          ৳{(order?.totalPrice + order?.shippingCost)?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             

              {/* Footer */}
              <div className="text-center border-t border-gray-200 pt-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    ধন্যবাদ TaazaFol এর সাথে কেনাকাটা করার জন্য!
                  </h4>
                  <p className="text-gray-600 text-sm">
                    অর্ডার সংক্রান্ত যেকোনো সমস্যার জন্য আমাদের কাস্টমার সাপোর্টে যোগাযোগ করুন
                  </p>
                </div>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <FaCode className="mr-1" />
                  <span>Developed by Arvion Tech</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              আরও কেনাকাটা করুন
            </Link>

            {user?.id && (
              <Link
                href={`/dashboard/customer`}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-50 rounded-lg font-medium transition-colors duration-200"
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