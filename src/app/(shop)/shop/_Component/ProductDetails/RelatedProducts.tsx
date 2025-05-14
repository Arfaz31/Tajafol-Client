// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
// import Link from "next/link";

// interface RelatedProductsProps {
//   categoryId: string;
//   currentProductId: string;
// }

// export default function RelatedProducts({
//   categoryId,
//   currentProductId,
// }: RelatedProductsProps) {
//   const { data: relatedProducts, isLoading } = useGetProductsByCategoryQuery(
//     { categoryId, limit: 6 }
//   );

//   if (isLoading || !relatedProducts || relatedProducts.length === 0) {
//     return null;
//   }

//   // Filter out current product and limit to 4 products
//   const filteredProducts = relatedProducts
//     .filter((product: any) => product._id !== currentProductId)
//     .slice(0, 4);

//   if (filteredProducts.length === 0) {
//     return null;
//   }

//   return (
//     <div className="mt-12">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold">Related Products</h2>
//         <Link href={`/shop/category/${categoryId}`}>
//           <Button variant="ghost" className="text-primary">
//             View All <ChevronRight className="ml-1 h-4 w-4" />
//           </Button>
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((product: any) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }
