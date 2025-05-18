/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Loader2, Package } from "lucide-react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const OrdersDataTable = ({
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
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search orders..."
          value={searchInput}
          onChange={onSearchChange}
          className="max-w-md"
        />

        <div className="flex md:flex-row flex-col gap-2">
          {(
            ["pending", "confirmed", "shipped", "cancelled"] as TOrderStatus[]
          ).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">#{order.orderNo}</TableCell>
                <TableCell>
                  <div>
                    <p>{order.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.contact}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
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
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex  gap-2 items-end justify-end">
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order._id, value as TOrderStatus)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
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
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </div>
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
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button> */}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      {selectedOrder.name}
                    </p>
                    <p>
                      <span className="text-gray-600">Contact:</span>{" "}
                      {selectedOrder.contact}
                    </p>
                    {selectedOrder.email && (
                      <p>
                        <span className="text-gray-600">Email:</span>{" "}
                        {selectedOrder.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      <span className="text-gray-600">Address:</span>{" "}
                      {selectedOrder.address}
                    </p>
                    <p>
                      <span className="text-gray-600">Upazilla:</span>{" "}
                      {selectedOrder.upazilla}
                    </p>
                    <p>
                      <span className="text-gray-600">District:</span>{" "}
                      {selectedOrder.district}
                    </p>
                    <p>
                      <span className="text-gray-600">Division:</span>{" "}
                      {selectedOrder.division}
                    </p>
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
                        <TableHead>Qty</TableHead>
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

export default OrdersDataTable;
