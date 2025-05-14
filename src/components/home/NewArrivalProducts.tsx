/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCardSkeleton from "@/app/(shop)/shop/_Component/ProductCardSkeleton";
import ProductCard from "@/app/(shop)/shop/_Component/ProductCard";
import Container from "../Shared/Container";

const NewArrivalProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery({
    limit: 8,
    isNewArrival: true, // Only fetch new arrival products
  });

  const newArrivalProducts = data?.data || [];

  return (
    <div className="py-16 bg-background ">
      <Container className="xl:px-20 lg:px-16 px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="section-title mb-2">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our latest seasonal fruits just arrived in store
            </p>
          </div>
          <Link href="/shop" className="shrink-0">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All
            </Button>
          </Link>
        </motion.div>

        {isError ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600">
              Failed to load new arrivals. Please try again later.
            </h3>
          </div>
        ) : newArrivalProducts.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600">
              No new arrivals available at the moment.
            </h3>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {isLoading
                  ? [...Array(4)].map((_, index) => (
                      <CarouselItem
                        key={`skeleton-${index}`}
                        className="pl-2 md:pl-8 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <ProductCardSkeleton />
                      </CarouselItem>
                    ))
                  : newArrivalProducts.map((product: any, index: number) => (
                      <CarouselItem
                        key={product._id}
                        className="pl-2 md:pl-8 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 h-[400px]"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      </CarouselItem>
                    ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-white" />
                <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-white" />
              </div>
            </Carousel>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default NewArrivalProducts;
