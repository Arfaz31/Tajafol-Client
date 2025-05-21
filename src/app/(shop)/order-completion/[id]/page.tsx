/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import tajafol from "@/assets/logo/tajafol-logo1.png";
import React, { useRef } from "react";
import Link from "next/link";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import generatePDF, { Resolution } from "react-to-pdf";
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
          // Set A4 size with proper margins
          margin: {
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          },
          format: "a4",
          orientation: "portrait",
        },
        method: "open",
        resolution: Resolution.NORMAL,
        overrides: {
          pdf: {
            compress: true,
          },
          canvas: {
            // Ensure images load properly with CORS enabled
            useCORS: true,
            scale: 2,
            logging: true,
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
    <div className="min-h-screen bg-gray-50">
      <Container className="mx-auto px-4 py-20 lg:py-32">
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
            style={{ maxWidth: "210mm", margin: "0 auto" }} // A4 width with auto margins for centering
          >
            {/* PDF Header */}
            <div className="bg-emerald-600 text-white p-6">
              <div className="text-center">
                {/* <div className="mb-4 flex justify-center">
               
                  <Image
                    src={tajafol.src}
                    alt="TaazaFol Logo"
                    width={50}
                    height={50}
                    className="h-16 w-auto"
                    style={{ maxWidth: "140px" }}
                  />
                </div> */}
                <h1 className="text-xl font-bold mb-1">TaazaFol</h1>
                <p className="text-emerald-100 mb-4 text-sm">
                  বাংলাদেশের সেরা ফলের দোকান
                </p>
                <div className="bg-white/10 rounded-lg p-3 inline-block">
                  <h2 className="text-lg font-bold">অর্ডার ইনভয়েস</h2>
                  <p className="text-emerald-100 text-sm">
                    অর্ডার নং: #{order?.orderNo || "ORD-6814"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Order Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Order Details */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <MdReceipt className="text-emerald-600 text-lg mr-2" />
                    <h3 className="text-base font-semibold text-gray-900">
                      অর্ডার বিবরণ
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">অর্ডার নং:</span>
                      <span className="font-medium text-gray-900">
                        #{order?.orderNo || "ORD-6814"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">তারিখ:</span>
                      <span className="font-medium text-gray-900">
                        {order?.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "bn-BD"
                            )
                          : "২১/৫/২০২৫"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">মোট পরিমাণ:</span>
                      <span className="font-semibold text-emerald-600">
                        ৳{order?.totalPrice?.toLocaleString() || "2,020"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">পেমেন্ট স্ট্যাটাস:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-center font-medium ${
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
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FaMapMarkerAlt className="text-emerald-600 text-lg mr-2" />
                    <h3 className="text-base font-semibold text-gray-900">
                      গ্রাহক তথ্য
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">নাম:</span>
                      <span className="font-medium text-gray-900">
                        {order?.name || "SuperAdmin"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-600 w-3 mr-2" />
                      <span className="font-medium text-gray-900">
                        {order?.contact || "01799370138"}
                      </span>
                    </div>
                    {(order?.email || true) && (
                      <div className="flex items-center">
                        <FaEnvelope className="text-gray-600 w-3 mr-2" />
                        <span className="font-medium text-gray-900 break-all">
                          {order?.email || "superadmin@gmail.com"}
                        </span>
                      </div>
                    )}
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">ঠিকানা:</p>
                      <p className="font-medium text-gray-900 break-words">
                        {order?.address || "kushtia khulna Bangladesh"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {order?.upazilla || "Kapasia"},{" "}
                        {order?.district || "Gazipur"},{" "}
                        {order?.division || "Dhaka"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <FaShoppingBag className="text-emerald-600 text-lg mr-2" />
                  <h3 className="text-base font-semibold text-gray-900">
                    অর্ডার করা পণ্যসমূহ
                  </h3>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-2 p-3 font-medium text-gray-700 text-sm">
                      <div className="col-span-6">পণ্যের নাম</div>
                      <div className="col-span-2 text-center">পরিমাণ</div>
                      <div className="col-span-2 text-center">দাম (প্রতি)</div>
                      <div className="col-span-2 text-right">মোট</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-3">
                    {(
                      order?.orderItems || [
                        { name: "Figs", quantity: 1, price: 1400 },
                        {
                          name: "Khirshapat Mango / হিরসাপাত আম",
                          quantity: 1,
                          price: 1500,
                        },
                      ]
                    ).map((item: any, index: number) => (
                      <div
                        key={index}
                        className="py-2 border-b border-gray-100 last:border-b-0"
                      >
                        {/* Item Details */}
                        <div className="grid grid-cols-12 gap-2 items-center text-sm">
                          <div className="col-span-6">
                            <h4 className="font-medium text-gray-900">
                              {item.name}
                            </h4>
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
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">সাবটোটাল:</span>
                      <span className="font-medium text-gray-900">
                        ৳{order?.totalPrice?.toLocaleString() || "2,900"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ডেলিভারি চার্জ:</span>
                      <span className="font-medium text-gray-900">
                        ৳{order?.shippingCost?.toLocaleString() || "120"}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-900">সর্বমোট:</span>
                        <span className="text-emerald-600">
                          ৳
                          {(
                            (order?.totalPrice || 2900) +
                            (order?.shippingCost || 120)
                          )?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-gray-200 pt-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                    ধন্যবাদ TaazaFol এর সাথে কেনাকাটা করার জন্য!
                  </h4>
                  <p className="text-gray-600 text-xs">
                    অর্ডার সংক্রান্ত যেকোনো সমস্যার জন্য আমাদের কাস্টমার
                    সাপোর্টে যোগাযোগ করুন
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
