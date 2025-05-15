/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type Props = {
  searchInput: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
  clearFilters: () => void;
  categories: { _id: string; categoryName: string }[];
};

export default function FiltersSidebar({
  searchInput,
  handleSearchChange,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  clearFilters,
  categories,
}: Props) {
  return (
    <div className="w-full md:w-64 space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-12">Filters</h3>

        {/* Search */}
        <div className="mb-8">
          <label className="block text-base font-semibold mb-3">Search</label>
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={handleSearchChange}
            className="border border-orange-400 focus:border-none"
          />
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="block text-base font-semibold mb-3">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border border-orange-400 focus:border-none">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category: any) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <label className="block text-base font-semibold mb-3">
            Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
          </label>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={(val: number[]) => setPriceRange([val[0], val[1]])}
            className="w-full"
          />
        </div>

        <Button
          variant="outline"
          className="w-full border border-red-500"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
