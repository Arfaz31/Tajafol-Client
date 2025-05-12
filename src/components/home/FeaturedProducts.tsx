/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const featuredProducts = products.filter((product) => product.featured);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

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
    <section className="py-16 bg-white">
      <div className="container-custom">
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
            Bangladesh's premium growing regions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="product-card group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative h-64 overflow-hidden">
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

                {/* Wishlist button */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  <Heart className="h-4 w-4" />
                </Button>

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
                  <span className="category-badge">{product.category}</span>
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
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
    </section>
  );
};

export default FeaturedProducts;
