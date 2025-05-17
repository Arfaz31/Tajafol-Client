/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useGetMyOrdersQuery } from "@/redux/api/orderApi";
import { Loader2, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <div className="bg-white rounded-lg shadow-lg p-8 my-12">
        <h1 className="text-2xl font-bold pb-5">My Orders</h1>

        {/* Orders Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    #{order.orderNo}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {order.orderItems.length} item
                    {order.orderItems.length !== 1 ? "s" : ""}
                  </TableCell>
                  <TableCell>৳{order.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs capitalize ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "shipped"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Order Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Order Details - #{selectedOrder?.orderNo}</span>
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Order Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>
                        <span className="text-gray-600">Order Date:</span>{" "}
                        {format(
                          new Date(selectedOrder.createdAt),
                          "MMM dd, yyyy hh:mm a"
                        )}
                      </p>
                      <p>
                        <span className="text-gray-600">Status:</span>{" "}
                        <span className="capitalize">
                          {selectedOrder.status}
                        </span>
                      </p>
                      <p>
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
                      <p>{selectedOrder.name}</p>
                      <p>{selectedOrder.address}</p>
                      <p>
                        {selectedOrder.upazilla}, {selectedOrder.district}
                      </p>
                      <p>{selectedOrder.division}</p>
                      <p>Contact: {selectedOrder.contact}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="border rounded-md">
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
                                ৳{(item.price * item.quantity).toLocaleString()}
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
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal:</span>
                    <span>৳{selectedOrder.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Shipping:</span>
                    <span>৳{selectedOrder.shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
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
                    <p className="bg-gray-50 p-4 rounded-md">
                      {selectedOrder.orderNote}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  );
};

export default MyOrdersPage;
