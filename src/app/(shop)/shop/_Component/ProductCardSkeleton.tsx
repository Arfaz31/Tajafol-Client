"use client";

import { motion } from "framer-motion";

const ProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="product-card"
    >
      <div className="relative h-64 overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
      <div className="p-4 space-y-2">
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;
