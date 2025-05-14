"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  productName: string;
  sku: string;
  price: number;
  discountPrice?: number;
  images: string[];
  quantity: number;
  unit: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.subtotal = calculateSubtotal(state.items);
      toast.success(`${action.payload.productName} added to cart!`);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        const itemName = state.items[itemIndex].productName;
        state.items.splice(itemIndex, 1);
        state.subtotal = calculateSubtotal(state.items);
        toast.success(`${itemName} removed from cart!`);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
        state.subtotal = calculateSubtotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      toast.success("Cart cleared");
    },
  },
});

const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
