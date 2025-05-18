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
import Autoplay from "embla-carousel-autoplay";
const NewArrivalProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery({
    limit: 8,
    isNewArrival: true,
  });

  const newArrivalProducts = data?.data || [];

  return (
    <div className="py-12 sm:py-16 bg-background">
      <Container className=" px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-12 gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Discover our latest seasonal fruits just arrived in store
            </p>
          </div>
          <Link href="/shop" className="shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white text-sm sm:text-base"
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
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent className=" md:-ml-4 ml-0 h-[420px]">
                {isLoading
                  ? [...Array(4)].map((_, index) => (
                      <CarouselItem
                        key={`skeleton-${index}`}
                        className="pl-2 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                      >
                        <ProductCardSkeleton />
                      </CarouselItem>
                    ))
                  : newArrivalProducts.map((product: any, index: number) => (
                      <CarouselItem
                        key={product._id}
                        className="md:pl-6 pl-0  basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
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
              <CarouselPrevious className="md:block hidden absolute xl:left-[18%] lg:left-[25%] md:left-[30%] sm:left-[48%] xl:-top-[98px] lg:-top-24 md:-top-24 sm:-top-32  transform -translate-y-1/2   border-primary text-primary hover:bg-primary hover:text-white pl-2" />
              <CarouselNext className="pl-2 md:block hidden absolute xl:right-[72%] lg:right-[62%] md:right-[56%] sm:right-[28%] xl:-top-[98px] lg:-top-24 md:-top-24 sm:-top-32 transform -translate-y-1/2  border-primary text-primary hover:bg-primary hover:text-white" />
            </Carousel>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default NewArrivalProducts;
