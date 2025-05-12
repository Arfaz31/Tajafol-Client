/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ShoppingBag, Star, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { setFilters, resetFilters } from "@/lib/redux/slices/productSlice"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { categories } from "@/lib/data/categories"

export default function ShopPage() {
  const dispatch = useDispatch()
  const { products, filteredProducts, filters } = useSelector((state: RootState) => state.products)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(filteredProducts)
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(filteredProducts)
    } else {
      const results = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    }
  }, [searchQuery, filteredProducts])
  
  // Handle price range filter
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }
  
  const applyPriceFilter = () => {
    dispatch(setFilters({ minPrice: priceRange[0], maxPrice: priceRange[1] }))
  }
  
  // Handle category filter
  const handleCategoryFilter = (categorySlug: string | null) => {
    if (!categorySlug) {
      dispatch(setFilters({ category: null }))
      return
    }
    
    const category = categories.find(c => c.slug === categorySlug)
    if (category) {
      dispatch(setFilters({ category: category.name }))
    }
  }
  
  // Handle sort
  const handleSort = (value: string) => {
    dispatch(setFilters({ 
      sortBy: value as 'price-asc' | 'price-desc' | 'rating' | 'newest' | null 
    }))
  }
  
  // Handle reset filters
  const handleResetFilters = () => {
    dispatch(resetFilters())
    setPriceRange([0, 500])
    setSearchQuery("")
  }
  
  // Add to cart
  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.price,
      image: product.images[0],
      quantity: 1,
      unit: product.unit
    }))
  }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Shop Hero */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop Fresh Fruits</h1>
              <p className="text-muted-foreground mb-6">
                Browse our wide selection of fresh seasonal fruits sourced directly from farms across Bangladesh. 
                From sweet mangoes to juicy litchis, we have everything you need.
              </p>
              
              <form className="relative max-w-md">
                <Input
                  type="search"
                  placeholder="Search for fruits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-primary/20"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </form>
            </div>
            
            <div className="hidden md:block relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg"
                alt="Fresh fruits"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant="outline" 
            className={`rounded-full ${filters.category === null ? 'bg-primary text-white hover:bg-primary-hover' : ''}`}
            onClick={() => handleCategoryFilter(null)}
          >
            All Fruits
          </Button>
          
          {categories.map((category) => (
            <Button 
              key={category.id}
              variant="outline" 
              className={`rounded-full ${filters.category === category.name ? 'bg-primary text-white hover:bg-primary-hover' : ''}`}
              onClick={() => handleCategoryFilter(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Desktop */}
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
                          checked={filters.category === category.name}
                          onCheckedChange={() => handleCategoryFilter(
                            filters.category === category.name ? null : category.slug
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
                  <Select onValueChange={handleSort} defaultValue={filters.sortBy || ""}>
                    <SelectTrigger className="w-full">
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
          
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {searchResults.length} products found
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
                              checked={filters.category === category.name}
                              onCheckedChange={() => handleCategoryFilter(
                                filters.category === category.name ? null : category.slug
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
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            {searchResults.length > 0 ? (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {searchResults.map((product) => (
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
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="mb-4 text-muted-foreground">
                  <X className="h-12 w-12 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">No products found</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button onClick={handleResetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}