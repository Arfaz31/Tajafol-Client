"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/lib/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

const PopularProducts = () => {
  const dispatch = useDispatch();
  // Sort products by rating to get most popular ones
  const popularProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const handleAddToCart = (product: (typeof products)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountedPrice || product.price,
        image: product.images[0],
        quantity: 1,
        unit: product.unit,
      })
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="section-title mb-2">Most Popular Fruits in 2025</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover the fruits that our customers love the most this season
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
              {popularProducts.map((product, index) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="product-card group h-full">
                    <div className="relative h-56 overflow-hidden">
                      <Link href={`/shop/product/${product.id}`}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>

                      {/* Discount badge */}
                      {product.discountedPrice && (
                        <Badge className="absolute top-3 left-3 bg-accent text-white">
                          {Math.round(
                            (1 - product.discountedPrice / product.price) * 100
                          )}
                          % OFF
                        </Badge>
                      )}

                      {/* Quick actions */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <Link
                          href={`/shop/product/${product.id}`}
                          className="hover:text-primary"
                        >
                          <h3 className="font-medium text-lg line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                        <span className="category-badge">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {product.discountedPrice ? (
                          <>
                            <span className="font-semibold text-lg">
                              ৳{product.discountedPrice}
                            </span>
                            <span className="text-muted-foreground line-through">
                              ৳{product.price}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-lg">
                            ৳{product.price}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground ml-auto">
                          per {product.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-white" />
              <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-white" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularProducts;
