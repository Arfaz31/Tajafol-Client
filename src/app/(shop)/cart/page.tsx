/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { clearCart } from "@/redux/slices/cartSlice";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import Container from "@/components/Shared/Container";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import CartHeader from "./_Component/Header";
import CartItemsList from "./_Component/ItemsList";
import OrderSummary from "./_Component/OrderSummary";
import CartEmpty from "./_Component/EmptyCart";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { data: allProductsData } = useGetAllProductsQuery("");
  const allProducts = allProductsData?.data || [];

  const { products, selectedItems, totalPrice, shippingCost, grandTotal } =
    useAppSelector((store: any) => store.cart);

  // console.log("products", products);

  // Check if any product is out of stock
  const isCheckoutDisabled = products.some((cartProduct: any) => {
    const matchedProduct = allProducts.find(
      (dbProduct: any) => dbProduct._id === cartProduct._id
    );
    return (
      matchedProduct?.stockQuantity === 0 ||
      matchedProduct?.availability === false
    );
  });

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8 px-5">
        <CartHeader itemCount={selectedItems} onClearCart={handleClearCart} />

        {products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsList products={products} allProducts={allProducts} />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={totalPrice}
                shippingCost={shippingCost}
                total={grandTotal}
                isCheckoutDisabled={isCheckoutDisabled}
              />
            </div>
          </div>
        ) : (
          <CartEmpty />
        )}
      </Container>
    </div>
  );
}
