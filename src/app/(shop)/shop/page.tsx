/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import banner from "@/assets/banner/mang.jpeg";
import ProductGrid from "./_Component/ProductGrid";
import FiltersSidebar from "./_Component/SearchFilter/FiltersSidebar";
import SortBar from "./_Component/SearchFilter/SortBar";
import Container from "@/components/Shared/Container";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get parameters from URL query params
  const categoryFromQuery = searchParams.get("category") || "all";
  const searchTermFromQuery = searchParams.get("searchTerm") || "";
  const sortOptionFromQuery = searchParams.get("sort") || "newest";
  const pageFromQuery = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;
  const minPriceFromQuery = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice")!, 10)
    : undefined;
  const maxPriceFromQuery = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice")!, 10)
    : undefined;

  // State management
  const [searchInput, setSearchInput] = useState(searchTermFromQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);
  const [minPrice, setMinPrice] = useState<number | undefined>(
    minPriceFromQuery
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    maxPriceFromQuery
  );
  const [sortOption, setSortOption] = useState(sortOptionFromQuery);
  const [page, setPage] = useState(pageFromQuery);
  const [limit] = useState(10);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    if (searchInput) {
      params.set("searchTerm", searchInput);
    }

    if (minPrice !== undefined) {
      params.set("minPrice", minPrice.toString());
    }

    if (maxPrice !== undefined) {
      params.set("maxPrice", maxPrice.toString());
    }

    if (sortOption !== "newest") {
      params.set("sort", sortOption);
    }

    if (page > 1) {
      params.set("page", page.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/shop?${queryString}` : "/shop";
    router.replace(newUrl, { scroll: false });
  }, [
    selectedCategory,
    searchInput,
    minPrice,
    maxPrice,
    sortOption,
    page,
    router,
  ]);

  const debouncedSearchTerm = useDebounce<string>(searchInput, 500);
  const debouncedMinPrice = useDebounce<number | undefined>(minPrice, 500);
  const debouncedMaxPrice = useDebounce<number | undefined>(maxPrice, 500);

  const { data: categoriesData } = useGetAllCategoriesQuery({ limit: 100 });
  const categories = categoriesData?.data?.result || [];

  // Build query params
  const queryParams: Record<string, any> = {
    page,
    limit,
  };

  // Handle sort options
  if (sortOption === "newest") {
    queryParams.sort = "-createdAt";
  } else if (sortOption === "oldest") {
    queryParams.sort = "createdAt";
  } else if (sortOption === "priceHighToLow") {
    queryParams.sort = "-price";
  } else if (sortOption === "priceLowToHigh") {
    queryParams.sort = "price";
  }

  // Add search term if not empty
  if (debouncedSearchTerm) {
    queryParams.searchTerm = debouncedSearchTerm;
  }

  // Add category if not "all"
  if (selectedCategory !== "all") {
    queryParams.category = selectedCategory;
  }

  // Add price range if specified
  if (debouncedMinPrice !== undefined) {
    queryParams.minPrice = debouncedMinPrice;
  }
  if (debouncedMaxPrice !== undefined) {
    queryParams.maxPrice = debouncedMaxPrice;
  }

  console.log("Query Params:", queryParams);

  const { data, isLoading, isFetching } = useGetAllProductsQuery(queryParams);

  const products = data?.data || [];
  const meta = data?.meta || {};
  const totalPages = meta.totalPage || 1;
  const totalItems = meta.total || 0;

  const clearFilters = () => {
    setSearchInput("");
    setSelectedCategory("all");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSortOption("newest");
    setPage(1);
    router.replace("/shop", { scroll: false });
  };

  return (
    <div className="bg-white">
      <div className="relative md:h-[300px] h-[300px] pt-20 w-full">
        <Image
          className="object-cover"
          src={banner}
          alt="Banner"
          fill
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/15 opacity-25 z-10"></div>
      </div>

      <Container className="flex flex-col md:flex-row gap-8 py-20 px-5">
        <FiltersSidebar
          searchInput={searchInput}
          handleSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(e.target.value);
            setPage(1);
          }}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => {
            setSelectedCategory(category);
            setPage(1);
          }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={(price) => {
            setMinPrice(price);
            setPage(1);
          }}
          setMaxPrice={(price) => {
            setMaxPrice(price);
            setPage(1);
          }}
          clearFilters={clearFilters}
          categories={categories}
        />

        <div className="flex-1">
          <SortBar sortOption={sortOption} setSortOption={setSortOption} />

          <ProductGrid
            products={products}
            isLoading={isLoading}
            isFetching={isFetching}
            totalItems={totalItems}
            totalPages={totalPages}
            currentPage={page}
            limit={limit}
            onPageChange={setPage}
            clearFilters={clearFilters}
          />
        </div>
      </Container>
    </div>
  );
}
