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

  // Parse price range if it exists in the URL
  const priceRangeFromQuery: [number, number] = [0, 10000];
  if (searchParams.get("price")) {
    const priceRange = searchParams.get("price")?.split("-").map(Number);
    if (priceRange && priceRange.length === 2) {
      priceRangeFromQuery[0] = priceRange[0] || 0;
      priceRangeFromQuery[1] = priceRange[1] || 10000;
    }
  }

  const [searchInput, setSearchInput] = useState(searchTermFromQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);
  const [priceRange, setPriceRange] =
    useState<[number, number]>(priceRangeFromQuery);
  const [sortOption, setSortOption] = useState(sortOptionFromQuery);
  const [page, setPage] = useState(pageFromQuery);
  const [limit] = useState(10);

  // Update URL when filters change
  useEffect(() => {
    // Create a URLSearchParams object
    const params = new URLSearchParams();

    // Only add parameters that are not default values
    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    if (searchInput) {
      params.set("searchTerm", searchInput);
    }

    if (priceRange[0] > 0 || priceRange[1] < 10000) {
      params.set("price", `${priceRange[0]}-${priceRange[1]}`);
    }

    if (sortOption !== "newest") {
      params.set("sort", sortOption);
    }

    if (page > 1) {
      params.set("page", page.toString());
    }

    // Update the URL without reloading the page
    const queryString = params.toString();
    const newUrl = queryString ? `/shop?${queryString}` : "/shop";

    // Use router.replace to update the URL without adding to history stack
    router.replace(newUrl, { scroll: false });

    // We're using router.replace() with scroll: false to prevent scrolling to top
  }, [selectedCategory, searchInput, priceRange, sortOption, page, router]);

  const debouncedSearchTerm = useDebounce<string>(searchInput, 500);
  const debouncedPriceRange = useDebounce<[number, number]>(priceRange, 500);

  const { data: categoriesData } = useGetAllCategoriesQuery({ limit: 100 });
  const categories = categoriesData?.data?.result || [];

  // Build query params - only include non-default filters
  const queryParams: Record<string, any> = {
    page,
    limit,
  };

  // Handle sort option correctly - we need to set 'sort' not 'sortBy'
  if (sortOption === "newest") {
    queryParams.sort = "-createdAt"; // Newest first (descending)
  } else if (sortOption === "oldest") {
    queryParams.sort = "createdAt"; // Oldest first (ascending)
  } else if (sortOption === "priceHighToLow") {
    queryParams.sort = "-price"; // High to low
  } else if (sortOption === "priceLowToHigh") {
    queryParams.sort = "price"; // Low to high
  }

  // Only add search term if it's not empty
  if (debouncedSearchTerm) {
    queryParams.searchTerm = debouncedSearchTerm;
  }

  // Only add category if it's not "all"
  if (selectedCategory !== "all") {
    queryParams.category = selectedCategory;
  }

  // Only add price range if it's not the default
  if (debouncedPriceRange[0] > 0 || debouncedPriceRange[1] < 10000) {
    queryParams.price = `${debouncedPriceRange[0]}-${debouncedPriceRange[1]}`;
  }

  const { data, isLoading, isFetching } = useGetAllProductsQuery(queryParams);

  const products = data?.data || [];
  const meta = data?.meta || {};
  const totalPages = meta.totalPage || 1;
  const totalItems = meta.total || 0;

  const clearFilters = () => {
    setSearchInput("");
    setSelectedCategory("all");
    setPriceRange([0, 10000]);
    setSortOption("newest");
    setPage(1);

    // Clear URL parameters
    router.replace("/shop", { scroll: false });
  };

  return (
    <div className="bg-white">
      <div className="relative md:h-[300px] h-[300px] w-full">
        <Image
          className="object-cover"
          src={banner}
          alt="Banner"
          fill
          priority // optional: helps load the banner faster
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/15 opacity-25 z-10"></div>
      </div>

      <Container className="flex flex-col md:flex-row gap-8 py-20 px-5 ">
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
          priceRange={priceRange}
          setPriceRange={setPriceRange}
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
