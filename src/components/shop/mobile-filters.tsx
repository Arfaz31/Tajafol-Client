/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "../ui/slider"
import { Separator } from "../ui/separator"
import { categories } from "@/lib/data/categories"
import { Checkbox } from "../ui/checkbox"

interface MobileFiltersProps {
  filters: any
  priceRange: [number, number]
  handlePriceRangeChange: (value: [number, number]) => void
  applyPriceFilter: () => void
  handleCategoryFilter: (category: string | null) => void
  handleSort: (value: string) => void
  handleResetFilters: () => void
  resultsCount: number
}

export function MobileFilters({
  filters,
  priceRange,
  handlePriceRangeChange,
  applyPriceFilter,
  handleCategoryFilter,
  handleSort,
  handleResetFilters,
  resultsCount,
}: MobileFiltersProps) {
  return (
    <div className="lg:hidden mb-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {resultsCount} products found
      </p>
      
      <div className="flex gap-2">
        <Select onValueChange={handleSort} defaultValue={filters.sortBy || ""}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
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
                        id={`mobile-category-${category.id}`}
                        checked={filters.category === category.slug}
                        onCheckedChange={() => handleCategoryFilter(
                          filters.category === category.slug ? null : category.slug
                        )}
                      />
                      <label 
                        htmlFor={`mobile-category-${category.id}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name} ({category.itemCount})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleResetFilters}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}