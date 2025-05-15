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
      className="flex gap-4 p-4 border-b border-border last:border-b-0"
    >
      <div className="relative h-24 w-24 rounded-md overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.productName}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <Link
          href={`/shop/product/${product._id}`}
          className="hover:text-primary"
        >
          <h3 className="font-medium mb-1">{product.productName}</h3>
        </Link>

        {isOutOfStock && (
          <p className="text-sm text-destructive mb-1">Out of stock</p>
        )}

        <p className="text-sm text-muted-foreground mb-2">
          ৳{product.discountPrice || product.price} per {product.unit}
        </p>

        <div className="flex md:flex-row flex-col items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity("decrement")}
              disabled={product.cartQuantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{product.cartQuantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity("increment")}
              disabled={isOutOfStock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center md:gap-4 gap-8">
            {product.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="font-medium">৳{product.discountPrice}</span>
                <span className="text-lg text-muted-foreground line-through">
                  ৳{product.price}
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-medium">৳{product.price}</span>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-white"
              onClick={handleRemoveItem}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
