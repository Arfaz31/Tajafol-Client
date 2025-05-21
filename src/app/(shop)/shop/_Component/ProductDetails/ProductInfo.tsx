import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { Minus, Plus, ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductInfoProps {
  product: {
    productName: string;
    price: number;
    discountPrice?: number;
    shortdescription: string;
    quantity: number;
    unit: number;
    productUnitType: string;
    category?: { name: string };
    isNewArrival?: boolean;
    isTrending?: boolean;
  };
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  handleAddToCart: () => void;
}

export default function ProductInfo({
  product,
  quantity,
  setQuantity,
  handleAddToCart,
}: ProductInfoProps) {
  // console.log("product", product);

  return (
    <div className="space-y-6 pt-5">
      {/* Product Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {product.productName}
        </h1>

        {/* Price */}
        <div className="mb-4">
          {product.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ৳{product.discountPrice}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ৳{product.price}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">৳{product.price}</span>
            </div>
          )}
        </div>

        {/* Short Description */}
        <p className="text-muted-foreground mb-6">{product.shortdescription}</p>

        <Separator className="my-4" />

        {/* Stock Status */}
        {product.quantity <= 0 && (
          <div className="text-red-500 font-semibold mb-4">Out of stock</div>
        )}

        {/* Unit Package */}
        <div className="mb-4">
          <span className="text-gray-700">
            1 = {product.unit} {product.productUnitType}
          </span>
        </div>

        {/* Quantity Selector - Only show if in stock */}
        {product.quantity > 0 && (
          <div className="mb-6">
            <span className="text-sm font-medium block mb-2">Quantity</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setQuantity(Math.min(product.quantity, quantity + 1))
                }
                disabled={quantity >= product.quantity}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Benefits List with Check Icons */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">১০০% খাঁটি ও কেমিক্যাল মুক্ত</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">১০০% মানি ব্যাক গ্যারান্টি</span>
          </div> */}
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">১০০% নিরাপদ পেমেন্ট</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">
              ডেলিভারি চার্জ পণ্যের মূল্যের সাথে সংযুক্ত
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {product.quantity > 0 ? (
          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white  transition-all"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Link href="/checkout" onClick={handleAddToCart} className="">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Buy Now
              </Button>
            </Link>
          </div>
        ) : (
          <Button
            size="lg"
            disabled
            className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            Out of Stock
          </Button>
        )}
      </div>
    </div>
  );
}
