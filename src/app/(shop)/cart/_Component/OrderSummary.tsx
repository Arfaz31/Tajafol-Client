import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  isCheckoutDisabled: boolean;
}

export default function OrderSummary({
  subtotal,

  total,
  isCheckoutDisabled,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal</span>
          <span>৳{subtotal.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total</span>
          <span>৳{total.toFixed(2)}</span>
        </div>
      </div>

      <Link href={isCheckoutDisabled ? "#" : "/checkout"}>
        <Button
          className="w-full bg-primary hover:bg-primary-hover text-white"
          disabled={isCheckoutDisabled}
        >
          Proceed to Checkout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
