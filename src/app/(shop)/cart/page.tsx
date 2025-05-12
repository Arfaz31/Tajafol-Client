/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  ChevronRight, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { removeFromCart, updateQuantity, clearCart } from "@/lib/redux/slices/cartSlice"

export default function CartPage() {
  const dispatch = useDispatch()
  const { items, subtotal } = useSelector((state: RootState) => state.cart)
  
  // Calculate totals
  const deliveryFee = 60
  const discount = 0
  const total = subtotal + deliveryFee - discount
  
  // Handle quantity updates
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    } else {
      dispatch(removeFromCart(id))
    }
  }
  
  // Handle remove item
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }
  
  // Handle clear cart
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-foreground font-medium">Shopping Cart</span>
        </nav>
        
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Cart Items ({items.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleClearCart}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={index !== 0 ? "pt-6 border-t border-border" : ""}
                      >
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <Link href={`/shop/product/${item.id}`} className="hover:text-primary">
                              <h3 className="font-medium mb-1">{item.name}</h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2">
                              ৳{item.price} per {item.unit}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className="font-medium">৳{item.price * item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <Link href="/shop">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
                
                <Link href="/checkout">
                  <Button className="bg-primary hover:bg-primary-hover text-white">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>৳{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>৳{deliveryFee}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount</span>
                      <span>-৳{discount}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>৳{total}</span>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-md">
                  <h3 className="text-sm font-medium mb-2">We accept:</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
              Browse our catalog to find fresh fruits for your basket!
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}