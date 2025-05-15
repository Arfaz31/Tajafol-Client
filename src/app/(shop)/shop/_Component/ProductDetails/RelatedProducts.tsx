/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetRelatedProductsQuery } from "@/redux/api/productApi";
import ProductCardSkeleton from "../ProductCardSkeleton";
import ProductCard from "../ProductCard";
import Autoplay from "embla-carousel-autoplay";
interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({
  currentProductId,
}: RelatedProductsProps) {
  const {
    data: response, // Rename to 'response' since it contains the full API response
    isLoading,
    isError,
  } = useGetRelatedProductsQuery(currentProductId);

  // Extract products from response.data
  const relatedProducts = response?.data || [];

  if (isError) {
    return (
      <div className="mt-12 text-center py-12">
        <h3 className="text-lg font-medium text-gray-600">
          Failed to load related products. Please try again later.
        </h3>
      </div>
    );
  }

  if (!isLoading && relatedProducts.length === 0) {
    return (
      <div className="mt-12 text-center py-12">
        <h3 className="text-lg font-medium text-gray-600">
          No related products available at the moment.
        </h3>
      </div>
    );
  }

  return (
    <div className="my-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        {relatedProducts.length > 0 && (
          <Link href={`/shop/category/${relatedProducts[0]?.category?._id}`}>
            <Button variant="ghost" className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: "auto",
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full "
      >
        <CarouselContent className="h-[450px]">
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <CarouselItem
                  key={`skeleton-${index}`}
                  className="basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
                >
                  <ProductCardSkeleton />
                </CarouselItem>
              ))
            : relatedProducts.map((product: any) => (
                <CarouselItem
                  key={product._id}
                  className="basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="-left-6   border-primary text-primary hover:bg-primary hover:text-white" />
          <CarouselNext className="-right-6  border-primary text-primary hover:bg-primary hover:text-white" />
        </div>
      </Carousel>
    </div>
  );
}
