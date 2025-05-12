"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { products as initialProducts } from "@/lib/data/products"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  images: string[]
  category: string
  unit: string
  stock: number
  featured: boolean
  rating: number
  reviews: number
  nutritionFacts?: {
    calories: number
    protein: number
    carbs: number
    fiber: number
    sugar: number
    fat: number
    vitamins: { name: string, percentage: number }[]
  }
}
const getUniqueCategories = (products: Product[]): string[] => {
  const categories: string[] = [];
  for (let i = 0; i < products.length; i++) {
    const category = products[i].category;
    if (categories.indexOf(category) === -1) {
      categories.push(category);
    }
  }
  return categories;
};

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  loading: boolean
  filters: {
    category: string | null
    minPrice: number | null
    maxPrice: number | null
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | null
  }
}

const initialState: ProductsState = {
  products: initialProducts,
  filteredProducts: initialProducts,
  categories: getUniqueCategories(initialProducts),
  loading: false,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: null
  }
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.filteredProducts = applyFilters(state.products, state.filters)
    },
    resetFilters: (state) => {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
        sortBy: null
      }
      state.filteredProducts = state.products
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
      state.filteredProducts = applyFilters(state.products, state.filters)
      
      // Update categories if needed
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category)
      }
    },
    updateProduct: (state, action: PayloadAction<Partial<Product> & { id: string }>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload }
        state.filteredProducts = applyFilters(state.products, state.filters)
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
      state.filteredProducts = applyFilters(state.products, state.filters)
    }
  }
})

const applyFilters = (products: Product[], filters: ProductsState['filters']) => {
  let result = [...products]
  
  // Apply category filter
  if (filters.category) {
    result = result.filter(p => p.category === filters.category)
  }
  
  // Apply price filters
  if (filters.minPrice !== null) {
    result = result.filter(p => p.price >= filters.minPrice!)
  }
  
  if (filters.maxPrice !== null) {
    result = result.filter(p => p.price <= filters.maxPrice!)
  }
  
  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // This would work with timestamps, but we're using static data
        break
    }
  }
  
  return result
}

export const { setFilters, resetFilters, addProduct, updateProduct, deleteProduct } = productSlice.actions

export default productSlice.reducer