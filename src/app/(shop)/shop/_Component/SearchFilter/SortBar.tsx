import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  sortOption: string;
  setSortOption: (val: string) => void;
};

export default function SortBar({ sortOption, setSortOption }: Props) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">All Products</h2>
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-[180px] border border-orange-400 focus:border-none">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">New to Old</SelectItem>
          <SelectItem value="oldest">Old to New</SelectItem>
          <SelectItem value="priceHighToLow">Price High to Low</SelectItem>
          <SelectItem value="priceLowToHigh">Price Low to High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
