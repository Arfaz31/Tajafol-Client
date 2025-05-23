/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  Loader2,
  Package,
  Eye,
  Calendar,
  Phone,
  MapPin,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
} from "@/redux/api/orderApi";
import { toast } from "sonner";
import Pagination from "@/components/Shared/Pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OrdersDataTableProps {
  orders: any[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

type TOrderStatus = "pending" | "confirmed" | "shipped" | "cancelled";

const OrderDataForMobile = ({
  orders,
  isLoading,
  page,
  limit,
  totalPages,
  totalItems,
  onPageChange,
  onSearchChange,
  searchInput,
}: OrdersDataTableProps) => {
  const [activeTab, setActiveTab] = useState<TOrderStatus>("pending");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

  const handleStatusChange = async (
    orderId: string,
    newStatus: TOrderStatus
  ) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const handlePaymentStatusChange = async (
    orderId: string,
    newPaymentStatus: "paid" | "unpaid"
  ) => {
    try {
      await updatePaymentStatus({
        id: orderId,
        paymentStatus: newPaymentStatus,
      }).unwrap();
      toast.success("Payment status updated successfully");
    } catch (error) {
      console.error("Failed to update payment status:", error);
      toast.error("Failed to update payment status");
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-md border p-8 text-center">
        <Package className="h-10 w-10 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No orders found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No orders match your current filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="w-full">
        <Input
          placeholder="Search orders..."
          value={searchInput}
          onChange={onSearchChange}
          className="w-full"
        />
      </div>

      {/* Status Tabs */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {(["pending", "confirmed"] as TOrderStatus[]).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="capitalize text-sm"
              size="sm"
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["shipped", "cancelled"] as TOrderStatus[]).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="capitalize text-sm"
              size="sm"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Cards */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card key={order._id} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-sm">#{order.orderNo}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    ৳{order.totalPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.orderItems.length} item
                    {order.orderItems.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Customer Info */}
              <div className="space-y-1">
                <p className="font-medium text-sm">{order.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {order.contact}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {order.district}, {order.division}
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex gap-2">
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
                <span
                  className={`px-2 py-1 rounded-full text-xs capitalize flex items-center gap-1 ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <CreditCard className="h-3 w-3" />
                  {order.paymentStatus}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order._id, value as TOrderStatus)
                    }
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      {order.status === "pending" && (
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  <Select
                    value={order.paymentStatus}
                    onValueChange={(value) =>
                      handlePaymentStatusChange(
                        order._id,
                        value as "paid" | "unpaid"
                      )
                    }
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Payment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(order)}
                  className="w-full h-8 text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm">
              Order Details - #{selectedOrder?.orderNo}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer Information */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Customer Information</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-1">
                  <p className="text-sm">
                    <span className="text-gray-600">Name:</span>{" "}
                    {selectedOrder.name}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Contact:</span>{" "}
                    {selectedOrder.contact}
                  </p>
                  {selectedOrder.email && (
                    <p className="text-sm">
                      <span className="text-gray-600">Email:</span>{" "}
                      {selectedOrder.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Shipping Address</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-1">
                  <p className="text-sm">
                    <span className="text-gray-600">Address:</span>{" "}
                    {selectedOrder.address}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Upazilla:</span>{" "}
                    {selectedOrder.upazilla}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">District:</span>{" "}
                    {selectedOrder.district}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Division:</span>{" "}
                    {selectedOrder.division}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.orderItems.map((item: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            ৳{item.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-sm">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-3 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>৳{selectedOrder.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>৳{selectedOrder.shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t">
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
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Order Note</h3>
                  <p className="bg-gray-50 p-3 rounded-md text-sm">
                    {selectedOrder.orderNote}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={limit}
        totalItems={totalItems}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default OrderDataForMobile;
