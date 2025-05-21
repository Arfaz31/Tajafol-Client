/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

import Link from "next/link";
import ProductCardSkeleton from "@/app/(shop)/shop/_Component/ProductCardSkeleton";
import ProductCard from "@/app/(shop)/shop/_Component/ProductCard";
import Container from "../Shared/Container";

const FeaturedProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery({
    limit: 8,
  });

  const featuredProducts = data?.data || [];

  return (
    <div className="bg-white">
      <Container className="py-16 px-5">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Best Quality Seasonal Fruits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selection of the finest seasonal fruits from across
              Bangladesh&apos;s premium growing regions
            </p>
          </motion.div>

          {isError ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600">
                Failed to load products. Please try again later.
              </h3>
            </div>
          ) : featuredProducts.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600">
                No products available at the moment.
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {isLoading
                ? [...Array(8)].map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ProductCardSkeleton />
                    </motion.div>
                  ))
                : featuredProducts.map((product: any, index: number) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-24"
          >
            <Link href="/shop">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                View All Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
