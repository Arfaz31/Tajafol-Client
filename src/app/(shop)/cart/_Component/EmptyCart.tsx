import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartEmpty() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-10 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Looks like you haven&apos;t added any products to your cart yet. Browse
        our catalog to find fresh fruits for your basket!
      </p>
      <Link href="/shop">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary-hover text-white"
        >
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
