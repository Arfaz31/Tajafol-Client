/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useForm } from "react-hook-form"

import { products } from "@/lib/data/products"

type Filters = {
  category: string | null
  sortBy: string
  minPrice: number
  maxPrice: number
}

export const useShop = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [filters, setFilters] = useState<Filters>({
    category: null,
    sortBy: "",
    minPrice: 0,
    maxPrice: 500,
  })

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    }
  })

  const handleCategoryFilter = (category: string | null) => {
    setFilters(prev => ({ ...prev, category }))
  }

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value)
  }

  const applyPriceFilter = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }))
  }

  const handleSort = (value: string) => {
    setFilters(prev => ({ ...prev, sortBy: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      category: null,
      sortBy: "",
      minPrice: 0,
      maxPrice: 500,
    })
    setPriceRange([0, 500])
  }

  const handleAddToCart = (product: any) => {
    // Add to cart logic
    console.log("Added to cart:", product)
  }

  // Filter and sort products
  const searchResults = products
    .filter(product => {
      if (!filters.category) return true
      return product.category === filters.category
    })
    .filter(product => {
      return product.price >= filters.minPrice && product.price <= filters.maxPrice
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
            //@ts-ignore
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

  return {
    filters,
    priceRange,
    searchResults,
    register,
    handleSubmit,
    handleCategoryFilter,
    handlePriceRangeChange,
    applyPriceFilter,
    handleSort,
    handleResetFilters,
    handleAddToCart,
  }
}