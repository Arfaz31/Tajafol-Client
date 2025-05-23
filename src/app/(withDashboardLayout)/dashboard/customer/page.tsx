/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useGetMyOrdersQuery } from "@/redux/api/orderApi";
import {
  Loader2,
  Package,
  Calendar,
  ShoppingBag,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
import Container from "@/components/Shared/Container";

const MyOrdersPage = () => {
  const { data, isLoading } = useGetMyOrdersQuery("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = data?.data;

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="rounded-md border px-8 flex flex-col justify-center h-[400px] text-center ">
        <Package className="h-10 w-10 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No orders found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven&apos;t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <Container className="mb-32">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 my-12">
        <h1 className="text-2xl font-bold pb-5">My Orders</h1>

        {/* Orders Grid - Card Layout */}
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Order Info - Full width on mobile, first column on desktop */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Order</span>
                    <span className="font-semibold">#{order.orderNo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(order.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                {/* Items & Total - Second column */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">
                      {order.orderItems.length} item
                      {order.orderItems.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-600" />
                    <span className="font-semibold">
                      ৳{order.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status - Third column */}
                <div className="flex justify-start md:justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Action Button - Fourth column */}
                <div className="flex justify-start md:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order)}
                    className="w-full md:w-auto"
                  >
                    <span>View Details</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Mobile Summary - Only visible on small screens */}
              <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-lg">
                    ৳{order.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[95%] h-[500px] max-w-4xl max-h-[90vh] overflow-hidden rounded-sm">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Order Details - #{selectedOrder?.orderNo}</span>
              </DialogTitle>
            </DialogHeader>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-1">
              {selectedOrder && (
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Order Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm mb-1">
                          <span className="text-gray-600">Order Date:</span>{" "}
                          {format(
                            new Date(selectedOrder.createdAt),
                            "MMM dd, yyyy hh:mm a"
                          )}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="text-gray-600">Status:</span>{" "}
                          <span className="capitalize">
                            {selectedOrder.status}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-600">Payment Status:</span>{" "}
                          <span className="capitalize">
                            {selectedOrder.paymentStatus}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Shipping Address</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm">{selectedOrder.name}</p>
                        <p className="text-sm">{selectedOrder.address}</p>
                        <p className="text-sm">
                          {selectedOrder.upazilla}, {selectedOrder.district}
                        </p>
                        <p className="text-sm">{selectedOrder.division}</p>
                        <p className="text-sm">
                          Contact: {selectedOrder.contact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium mb-2">Order Items</h3>

                    {/* Mobile Card Layout */}
                    <div className="md:hidden space-y-3">
                      {selectedOrder.orderItems.map(
                        (item: any, index: number) => (
                          <div
                            key={index}
                            className="border rounded-md p-3 bg-gray-50"
                          >
                            <div className="space-y-2">
                              <p className="font-medium text-sm">{item.name}</p>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Price:</span>
                                <span>৳{item.price.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Quantity:</span>
                                <span>{item.quantity}</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium border-t pt-2">
                                <span>Total:</span>
                                <span>
                                  ৳
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Desktop Table Layout */}
                    <div className="hidden md:block border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.orderItems.map(
                            (item: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                  ৳{item.price.toLocaleString()}
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell className="text-right">
                                  ৳
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Subtotal:</span>
                      <span>৳{selectedOrder.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Shipping:</span>
                      <span>
                        ৳{selectedOrder.shippingCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t pt-2">
                      <span>Total:</span>
                      <span>
                        ৳
                        {(
                          selectedOrder.totalPrice + selectedOrder.shippingCost
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Notes */}
                  {selectedOrder.orderNote && (
                    <div>
                      <h3 className="font-medium mb-2">Order Note</h3>
                      <p className="bg-gray-50 p-4 rounded-md text-sm">
                        {selectedOrder.orderNote}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  );
};

export default MyOrdersPage;
