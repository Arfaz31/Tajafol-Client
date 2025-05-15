/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Button } from "@/components/ui/button";

import CartItem from "./Item";

interface CartItemsListProps {
  products: any[];
  allProducts: any[];
}

export default function CartItemsList({
  products,
  allProducts,
}: CartItemsListProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {products.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                stockInfo={allProducts.find((p) => p._id === product._id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="/shop">
          <Button variant="outline" className="border border-orange-400">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
