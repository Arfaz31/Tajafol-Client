/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductGridProps {
  products: any[]
  handleAddToCart: (product: any) => void
}

export function ProductGrid({ products, handleAddToCart }: ProductGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="mb-4 text-muted-foreground">
          <X className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">No products found</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item} className="product-card group">
          <div className="relative h-64 overflow-hidden">
            <Link href={`/shop/product/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
            
            {/* Discount badge */}
            {product.discountedPrice && (
              <Badge className="absolute top-3 left-3 bg-accent text-white">
                {Math.round((1 - product.discountedPrice / product.price) * 100)}% OFF
              </Badge>
            )}
            
            {/* Quick actions */}
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Button 
                onClick={() => handleAddToCart(product)}
                className="w-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-1">
              <Link href={`/shop/product/${product.id}`} className="hover:text-primary">
                <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
              </Link>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm ml-1">{product.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
              <span className="category-badge">{product.category}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {product.discountedPrice ? (
                <>
                  <span className="font-semibold text-lg">৳{product.discountedPrice}</span>
                  <span className="text-muted-foreground line-through">৳{product.price}</span>
                </>
              ) : (
                <span className="font-semibold text-lg">৳{product.price}</span>
              )}
              <span className="text-sm text-muted-foreground ml-auto">
                per {product.unit}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}