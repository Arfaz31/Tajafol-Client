/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingCart, CheckCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner1 from "@/assets/banner/mango-2.png";
import banner2 from "@/assets/banner/mango-3.png";
import banner3 from "@/assets/banner/litchi-2.png";
import Container from "../Shared/Container";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  link: string;
  image: any; // Changed to any to accept imported image
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Fresh and Authentic Mango",
    subtitle: "from Chapai Nawabganj",
    description:
      "Mango is a delicious fruit grown on various species of tropical plants of the Mangifera genus. Mangoes are green when unripe and yellow when ripe. Mango is an Indian subcontinental fruit. Its original habitat is South Asia. Chapai Nawabganj district of Bangladesh is called the mango capital. Mango, scientific name Mangifera indica, is one of the most widely cultivated fruits worldwide. Mangoes are believed to be around 600 years old.",
    cta: "Shop Mangoes",
    link: "/shop/mangoes",
    image: banner2, // Using the imported image
    bgColor: "bg-[#f7ffed]", // Light green background
  },
  {
    id: 2,
    title: "Premium Tropical Fruits",
    subtitle: "from Bangladesh's Finest Gardens",
    description:
      "Discover our collection of premium tropical fruits sourced directly from the best gardens across Bangladesh. We ensure each fruit is hand-picked at the perfect ripeness to deliver maximum flavor and nutrition to your doorstep.",
    cta: "Explore Collection",
    link: "/shop/tropical-fruits",
    image: banner1, // Using the imported image
    bgColor: "bg-[#fff6e9]", // Light yellow background
  },
  {
    id: 3,
    title: "Summer Fruits Special",
    subtitle: "Beat the Heat Naturally",
    description:
      "Our summer collection features refreshing seasonal fruits perfect for hot weather. Hydrate naturally with these juicy fruits packed with essential vitamins and minerals to keep you healthy and energized throughout summer.",
    cta: "Get Summer Fruits",
    link: "/shop/summer-fruits",
    image: banner3, // Using the imported image
    bgColor: "bg-[#e9f5ff]", // Light blue background
  },
];

// Process steps shown at the bottom of the hero
const processSteps = [
  {
    icon: <ShoppingCart className="h-8 w-8 text-orange-500" />,
    title: "Select Product",
    bgColor: "bg-red-50",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-green-500" />,
    title: "Add To Cart",
    bgColor: "bg-green-50",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-orange-500" />,
    title: "Check Out",
    bgColor: "bg-red-50",
  },
  {
    icon: <Truck className="h-8 w-8 text-green-500" />,
    title: "Fast Delivery",
    bgColor: "bg-green-50",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`${currentSlideData.bgColor} overflow-hidden`}>
      <Container className=" mx-auto px-5 py-16 min-h-[90vh] flex flex-col justify-between">
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-green-600 mb-2"
              >
                {currentSlideData.title}
              </motion.h1>

              <motion.h2
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-green-600 mb-6"
              >
                {currentSlideData.subtitle}
              </motion.h2>

              <motion.p
                key={`description-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-700 mb-8 leading-relaxed max-w-xl"
              >
                {currentSlideData.description}
              </motion.p>

              <motion.div
                key={`cta-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href={currentSlideData.link}>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg"
                  >
                    {currentSlideData.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center"
            >
              <div className="relative h-[400px] w-full">
                <Image
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Process Steps - Redesigned */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-green-200/50">
          <h3 className="text-center text-lg md:text-xl font-semibold text-green-600 mb-6">
            How It Works
          </h3>
          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-1 bg-green-100 mx-16"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center p-4 md:py-6 md:px-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-green-50"
                >
                  {/* Step number */}
                  <div className="relative mb-4">
                    <div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index % 2 === 0 ? "bg-orange-500" : "bg-green-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className={`${step.bgColor} p-3 rounded-full`}>
                      {step.icon}
                    </div>
                  </div>

                  <span className="font-medium text-gray-800 text-sm md:text-base">
                    {step.title}
                  </span>

                  {/* Mobile arrow (only show between steps on mobile) */}
                  {index < processSteps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-green-600"
                  : "w-3 bg-green-200 hover:bg-green-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HeroBanner;
