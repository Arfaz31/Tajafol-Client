import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartHeaderProps {
  itemCount: number;
  onClearCart: () => void;
}

export default function CartHeader({
  itemCount,
  onClearCart,
}: CartHeaderProps) {
  return (
    <>
      <nav className="flex items-center text-sm  mb-8 pt-20">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Shopping Cart</span>
      </nav>

      <div className="flex justify-between items-center  mb-8">
        <h1 className="md:text-3xl text-xl font-bold">Your Shopping Cart</h1>
        {itemCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCart}
            className="text-muted-foreground hover:text-white border border-red-400"
          >
            Clear Cart
          </Button>
        )}
      </div>
    </>
  );
}
