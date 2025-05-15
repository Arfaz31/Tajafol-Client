"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { use } from "react"; // Import the use function

import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { addToCart } from "@/redux/slices/cartSlice";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import ErrorDisplay from "@/components/Shared/ErrorDisplay";
import ProductBreadcrumb from "../../_Component/ProductDetails/ProductBreadcrumb";
import ProductGallery from "../../_Component/ProductDetails/ProductGallery";
import ProductInfo from "../../_Component/ProductDetails/ProductInfo";
import ProductTabs from "../../_Component/ProductDetails/ProductTabs";
import Container from "@/components/Shared/Container";
import RelatedProducts from "../../_Component/ProductDetails/RelatedProducts";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params promise
  const { id } = use(params);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetSingleProductQuery(id); // Use the unwrapped id
  const [quantity, setQuantity] = useState(1);

  const product = data?.data;

  // Handle loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle error state
  if (isError || !product) {
    return <ErrorDisplay message="Product not found or an error occurred" />;
  }

  // console.log("product", product);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        productName: product.productName,
        price: product.discountPrice || product.price,
        images: product.images,
        quantity,
        unit: product.unit,
        sku: product.sku,
      })
    );
  };

  return (
    <div className="min-h-screen">
      <Container className="md:px-5 px-2 py-8  bg-[#f7fafc]">
        {/* Breadcrumb Navigation */}
        <ProductBreadcrumb productName={product.productName} />

        {/* Main Product Container */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <ProductGallery
              images={product.images}
              productName={product.productName}
              discountPrice={product.discountPrice}
              price={product.price}
            />

            {/* Product Info */}
            <ProductInfo
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
            />
          </div>

          {/* Product Tabs */}
          <ProductTabs product={product} />

          {/* Related Product */}
          <RelatedProducts currentProductId={product._id} />
        </div>
      </Container>
    </div>
  );
}
