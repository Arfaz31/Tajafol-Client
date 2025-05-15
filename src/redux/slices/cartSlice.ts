/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [] as any[],
  selectedItems: 0,
  totalPrice: 0,
  shippingCost: 0,
  grandTotal: 0,
};

// --- Internal utility functions for reducer use ---
const calculateSelectedItems = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    return total + product.cartQuantity;
  }, 0);

const calculateTotalPrice = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    const price =
      product.discountPrice && product.discountPrice > 0
        ? product.discountPrice
        : product.price;
    return total + product.cartQuantity * price;
  }, 0);

const calculateGrandTotal = (state: any) =>
  calculateTotalPrice(state) + (state.shippingCost || 0);

// --- Slice ---
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product: any) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.cartQuantity += action.payload.quantity || 1;
      } else {
        state.products.push({
          ...action.payload,
          cartQuantity: action.payload.quantity || 1,
          selectedSize: action.payload.selectedSize || "",
        });
      }

      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);

      state.grandTotal = calculateGrandTotal(state);
    },

    updateQuantity: (state, action) => {
      state.products = state.products.map((product: any) => {
        if (product._id === action.payload._id) {
          if (action.payload.type === "increment") {
            product.cartQuantity += 1;
          } else if (
            action.payload.type === "decrement" &&
            product.cartQuantity > 1
          ) {
            product.cartQuantity -= 1;
          }
        }
        return product;
      });

      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);

      state.grandTotal = calculateGrandTotal(state);
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product: any) => product._id !== action.payload
      );

      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);

      state.grandTotal = calculateGrandTotal(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.shippingCost = 0;
      state.grandTotal = 0;
    },

    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
      state.grandTotal = calculateGrandTotal(state);
    },
  },
});

// --- Selectors for use in components (pass full redux state) ---
export const selectCartProducts = (state: any) => state.cart.products;
export const selectSelectedItems = (state: any) => state.cart.selectedItems;
export const selectTotalPrice = (state: any) => state.cart.totalPrice;
export const selectDiscountTotalPrice = (state: any) =>
  state.cart.discountTotalPrice;
export const selectShippingCost = (state: any) => state.cart.shippingCost || 0;
export const selectGrandTotal = (state: any) => state.cart.grandTotal;

export const {
  addToCart,
  updateQuantity,
  removeProduct,
  clearCart,
  setShippingCost,
} = cartSlice.actions;

export default cartSlice.reducer;
