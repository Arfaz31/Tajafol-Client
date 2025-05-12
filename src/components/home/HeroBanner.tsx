"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  id: number
  title: string
  subtitle: string
  cta: string
  link: string
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Fresh Seasonal Mangoes",
    subtitle: "Enjoy the sweetest mangoes from Rajshahi and Chapainawabganj",
    cta: "Shop Mangoes",
    link: "/shop/mangoes",
    image: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg"
  },
  {
    id: 2,
    title: "Premium Tropical Fruits",
    subtitle: "Discover exotic fruits sourced from across Bangladesh",
    cta: "Explore Collection",
    link: "/shop/tropical-fruits",
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg"
  },
  {
    id: 3,
    title: "Summer Fruits Special",
    subtitle: "Beat the heat with our collection of refreshing summer fruits",
    cta: "Get Summer Fruits",
    link: "/shop/summer-fruits",
    image: "https://images.pexels.com/photos/3658366/pexels-photo-3658366.jpeg"
  }
]

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              priority
              sizes="100vw"
              className="object-cover brightness-[0.7]"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {slides[currentSlide].title}
          </motion.h1>
          
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href={slides[currentSlide].link}>
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white rounded-full px-8">
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "w-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner