/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Pagination from "@/components/Shared/Pagination";

type Props = {
  products: any[];
  isLoading: boolean;
  isFetching: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  onPageChange: (page: number) => void;
  clearFilters: () => void;
};

export default function ProductGrid({
  products,
  isLoading,
  isFetching,
  totalItems,
  totalPages,
  currentPage,
  limit,
  onPageChange,
  clearFilters,
}: Props) {
  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600">
          No products found matching your filters.
        </h3>
        <button className="mt-2 text-blue-500 underline" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={limit}
          totalItems={totalItems}
          isLoading={isLoading}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
