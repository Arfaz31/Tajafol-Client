"use client";

import { useShop } from "@/hooks/use-shop";
// import { ShopHero } from "@/components/shop/shop-hero"
// import { CategoryFilters } from "@/components/shop/category-filters"
// import { ShopSidebar } from "@/components/shop/shop-sidebar"
// import { MobileFilters } from "@/components/shop/mobile-filters"
// import { ProductGrid } from "@/components/shop/product-grid"

export default function ShopPage() {
  const {
    // filters,
    // priceRange,
    // searchResults,
    // handleCategoryFilter,
    // handlePriceRangeChange,
    // applyPriceFilter,
    // handleSort,
    // handleResetFilters,
    // handleAddToCart,
  } = useShop();

  return (
    <div className="min-h-screen bg-background">
      {/* <div className="container-custom py-8">
        <ShopHero />
        
        <CategoryFilters 
          filters={filters} 
          handleCategoryFilter={handleCategoryFilter} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ShopSidebar
            filters={filters}
            priceRange={priceRange}
            handlePriceRangeChange={handlePriceRangeChange}
            applyPriceFilter={applyPriceFilter}
            handleCategoryFilter={handleCategoryFilter}
            handleSort={handleSort}
            handleResetFilters={handleResetFilters}
          />
          
          <div className="lg:col-span-3">
            <MobileFilters
              filters={filters}
              priceRange={priceRange}
              handlePriceRangeChange={handlePriceRangeChange}
              applyPriceFilter={applyPriceFilter}
              handleCategoryFilter={handleCategoryFilter}
              handleSort={handleSort}
              handleResetFilters={handleResetFilters}
              resultsCount={searchResults.length}
            />
            
            <ProductGrid 
              products={searchResults} 
              handleAddToCart={handleAddToCart} 
            />
          </div>
        </div>
      </div> */}
      <h1>Shop</h1>
    </div>
  );
}
