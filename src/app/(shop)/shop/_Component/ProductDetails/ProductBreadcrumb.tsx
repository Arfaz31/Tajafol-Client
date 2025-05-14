import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbProps {
  productName: string;
}

export default function ProductBreadcrumb({
  productName,
}: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm mb-8 overflow-x-auto whitespace-nowrap pb-2">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </Link>
      <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
      <Link
        href="/shop"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Shop
      </Link>
      {/* <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
      <Link
        href={`/shop/${categorySlug}`}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {category}
      </Link> */}
      <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
      <span className="text-foreground font-medium truncate">
        {productName}
      </span>
    </nav>
  );
}
