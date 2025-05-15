/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: 1,
    };

    dispatch(addToCart(productToAdd));
  };

  return (
    <div className="product-card group bg-white rounded-xl  shadow-lg transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <Link href={`/shop/product/${product._id}`}>
          <Image
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {product.discountPrice && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white font-medium px-2 py-1">
            {Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )}
            % OFF
          </Badge>
        )}

        <Button
          size="icon"
          variant="secondary"
          aria-label="Add to favorites"
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <Heart className="h-4 w-4 text-rose-500" />
        </Button>

        {product.quantity > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 py-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="h-16">
          <Link
            href={`/shop/product/${product._id}`}
            className="hover:text-primary transition-colors duration-200 "
          >
            <h3 className="font-semibold text-lg  mb-2">
              {product.productName}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="font-bold text-lg text-primary">
                ৳{product.discountPrice.toLocaleString()}
              </span>
              <span className="text-muted-foreground line-through text-sm">
                ৳{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-bold text-lg text-primary">
              ৳{product.price.toLocaleString()}
            </span>
          )}
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-auto">
            {product.unit} কেজি
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
