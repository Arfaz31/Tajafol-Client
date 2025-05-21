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
    <div className="flex md:flex-row flex-col-reverse justify-between items-center md:mb-6 mb-10 gap-6 md:gap-0">
      <h2 className="text-2xl font-bold">All Products</h2>
      <div className="w-full md:w-auto">
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full md:w-[180px] border border-orange-400 focus:border-none">
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
    </div>
  );
}
