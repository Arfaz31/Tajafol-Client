/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from "@/lib/data/categories"

interface ShopSidebarProps {
  filters: any
  priceRange: [number, number]
  handlePriceRangeChange: (value: [number, number]) => void
  applyPriceFilter: () => void
  handleCategoryFilter: (category: string | null) => void
  handleSort: (value: string) => void
  handleResetFilters: () => void
}

export function ShopSidebar({
  filters,
  priceRange,
  handlePriceRangeChange,
  applyPriceFilter,
  handleCategoryFilter,
  handleSort,
  handleResetFilters,
}: ShopSidebarProps) {
  return (
    <div className="hidden lg:block space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="px-2">
              <Slider
                defaultValue={[0, 500]}
                value={priceRange}
                min={0}
                max={500}
                step={10}
                onValueChange={handlePriceRangeChange}
                className="mb-6"
              />
              
              <div className="flex items-center justify-between mb-4">
                <span>৳{priceRange[0]}</span>
                <span>৳{priceRange[1]}</span>
              </div>
              
              <Button 
                onClick={applyPriceFilter}
                className="w-full bg-primary hover:bg-primary-hover text-white"
              >
                Apply Filter
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={filters.category === category.slug}
                    onCheckedChange={() => handleCategoryFilter(
                      filters.category === category.slug ? null : category.slug
                    )}
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name} ({category.itemCount})
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Sort */}
         <div>
            <h4 className="font-medium mb-3">Sort By</h4>
            <Select 
              onValueChange={handleSort} 
              value={filters.sortBy || "default"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}