/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { removeProduct, updateQuantity } from "@/redux/slices/cartSlice";
import { useAppDispatch } from "@/redux/hook";

interface CartItemProps {
  product: any;
  stockInfo?: any;
}

export default function CartItem({ product, stockInfo }: CartItemProps) {
  const dispatch = useAppDispatch();
  const isOutOfStock =
    stockInfo?.stockQuantity === 0 || stockInfo?.availability === false;

  const handleUpdateQuantity = (type: "increment" | "decrement") => {
    dispatch(
      updateQuantity({
        _id: product._id,
        type,
      })
    );
  };

  const handleRemoveItem = () => {
    dispatch(removeProduct(product._id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 sm:gap-4 p-3 sm:p-4 border-b border-border last:border-b-0"
    >
      {/* Product Image - Responsive sizing */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-md overflow-hidden">
        {product.images && product.images.length > 0 && (
          <Image
            src={product.images[0]}
            alt={product.productName || 'Product image'}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0"> {/* min-w-0 prevents text overflow */}
        <Link
          href={`/shop/product/${product._id}`}
          className="hover:text-primary block"
        >
          <h3 className="font-medium mb-1 text-sm sm:text-base line-clamp-2">
            {product.productName}
          </h3>
        </Link>

        {isOutOfStock && (
          <p className="text-xs sm:text-sm text-destructive mb-1">Out of stock</p>
        )}

        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
          ৳{product.discountPrice || product.price} per {product.unit}
        </p>

        {/* Controls and Price - Responsive Layout */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => handleUpdateQuantity("decrement")}
              disabled={product.cartQuantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {product.cartQuantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => handleUpdateQuantity("increment")}
              disabled={isOutOfStock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price and Remove Button */}
          <div className="flex items-center justify-between sm:justify-end sm:gap-4">
            {/* Price Display */}
            <div className="flex items-baseline gap-2">
              {product.discountPrice ? (
                <>
                  <span className="font-medium text-sm sm:text-base">
                    ৳{(product.discountPrice * product.cartQuantity).toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    ৳{(product.price * product.cartQuantity).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-medium text-sm sm:text-base">
                  ৳{(product.price * product.cartQuantity).toFixed(2)}
                </span>
              )}
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={handleRemoveItem}
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}