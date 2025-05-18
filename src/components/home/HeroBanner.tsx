/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner1 from "@/assets/banner/mango-2.png";
import banner2 from "@/assets/banner/mango-3.png";
import banner3 from "@/assets/banner/litchi-2.png";
import Container from "../Shared/Container";
import HowItWorks from "./HowitWorks";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  cta: string;
  link: string;
  image: any;
  gradientFrom: string;
  gradientTo: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "সতেজ ও খাঁটি আম",
    subtitle: "চাঁপাইনবাবগঞ্জের সোনালি স্বাদ",
    description: "আমাদের প্রিয় বাংলাদেশের আম রাজধানী চাঁপাইনবাবগঞ্জের মিষ্টি আমে ভরে উঠুক আপনার ঘর। প্রতিটি আম সযত্নে বাছাই করা, রসে ভরপুর এবং প্রাকৃতিক মিষ্টতায় ভরা।",
    benefits: ["১০০% প্রাকৃতিক ও অর্গানিক", "বিনামূল্যে হোম ডেলিভারি", "১৫ দিনের মানি ব্যাক গ্যারান্টি"],
    cta: "আম অর্ডার করুন",
    link: "/shop",
    image: banner2,
    gradientFrom: "#FFF8DC", // Cornsilk - light creamy yellow
    gradientTo: "#FFE135",   // Golden yellow matching mango color
  },
  {
    id: 2,
    title: "মিষ্টি লিচু",
    subtitle: "গ্রীষ্মের মধুর উপহার",
    description: "রসালো ও মিষ্টি লিচুর স্বাদে মাতিয়ে দিন আপনার প্রিয়জনদের। দিনাজপুর ও রাজশাহীর বিখ্যাত লিচু বাগান থেকে সরাসরি।",
    benefits: ["তাজা ও রসালো লিচু", "৪৮ ঘন্টার মধ্যে ডেলিভারি", "বিনামূল্যে স্যাম্পল টেস্টিং"],
    cta: "লিচু অর্ডার করুন",
    link: "/shop",
    image: banner3,
    gradientFrom: "#FFF0F5", // Lavender blush - light pinkish
    gradientTo: "#FFB6C1",   // Light pink matching litchi skin color
  },
  {
    id: 3,
    title: "ট্রপিক্যাল ফ্রুটস কালেকশন",
    subtitle: "স্বর্গীয় স্বাদের সমারোহ",
    description: "বাংলাদেশের সেরা উষ্ণমণ্ডলীয় ফলগুলির এক অনন্য সংগ্রহ। তাজা নারিকেল, মিষ্টি পেপে, সুগন্ধি কাঁঠাল এবং আরও অনেক কিছু।",
    benefits: ["৮+ প্রকার বিশেষ ফল", "স্বাস্থ্যের জন্য ১০০% কার্যকর", "প্রিমিয়াম প্যাকেজিং"],
    cta: "কালেকশন দেখুন",
    link: "/shop",
    image: banner1,
    gradientFrom: "#F0FFF0", // Honeydew - light green
    gradientTo: "#98FB98",   // Pale green representing tropical freshness
  },
];

// Simplified animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      if (newDirection > 0) {
        return prev === slides.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? slides.length - 1 : prev - 1;
      }
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    const newDirection = index > currentSlide ? 1 : -1;
    setDirection(newDirection);
    setCurrentSlide(index);
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className="relative overflow-hidden min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${currentSlideData.gradientFrom} 0%, ${currentSlideData.gradientTo} 100%)`,
      }}
    >
      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-green-600 hover:bg-green-50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-green-600 hover:bg-green-50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <Container className="mx-auto px-5 py-16 min-h-screen relative z-10">
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex flex-col justify-center space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-green-700 leading-tight">
                {currentSlideData.title}
              </h1>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-green-600 opacity-90">
                {currentSlideData.subtitle}
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed max-w-xl font-medium">
                {currentSlideData.description}
              </p>

              {/* Benefits */}
              <div className="space-y-3">
                {currentSlideData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={currentSlideData.link}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl px-10 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {currentSlideData.cta}
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Image */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`image-${currentSlide}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex justify-center items-center"
            >
              <div className="relative h-[500px] w-full max-w-lg">
                <Image
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 ">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-10 bg-green-600"
                  : "w-3 bg-green-200 hover:bg-green-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <HowItWorks />
      </Container>
    </div>
  );
};

export default HeroBanner;