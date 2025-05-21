/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner1 from "@/assets/banner/mango-2.png";
import banner2 from "@/assets/banner/mango-3.png";
import banner3 from "@/assets/banner/litchi.png";
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
    description:
      "আমাদের প্রিয় বাংলাদেশের আম রাজধানী চাঁপাইনবাবগঞ্জের মিষ্টি আমে ভরে উঠুক আপনার ঘর। প্রতিটি আম সযত্নে বাছাই করা, রসে ভরপুর এবং প্রাকৃতিক মিষ্টতায় ভরা।",
    benefits: [
      "১০০% প্রাকৃতিক ও অর্গানিক",
      "ক্যাশ অন ডেলিভারি",
      "মাত্র ৩-৪ কার্যদিবসের মধ্যেই ডেলিভারি",
    ],
    cta: "আম অর্ডার করুন",
    link: "/shop",
    image: banner2,
    gradientFrom: "#FFF8DC",
    gradientTo: "#FFE135",
  },
  {
    id: 2,
    title: "মিষ্টি লিচু",
    subtitle: "গ্রীষ্মের মধুর উপহার",
    description:
      "রসালো ও মিষ্টি লিচুর স্বাদে মাতিয়ে দিন আপনার প্রিয়জনদের। দিনাজপুর ও রাজশাহীর বিখ্যাত লিচু বাগান থেকে সরাসরি।",
    benefits: [
      "তাজা ও রসালো লিচু",
      "মাত্র ৩-৪ কার্যদিবসের মধ্যেই ডেলিভারি",
      "১০০% ফ্রেশ ও প্রিমিয়াম কোয়ালিটি",
    ],
    cta: "লিচু অর্ডার করুন",
    link: "/shop",
    image: banner3,
    gradientFrom: "#FFF0F5",
    gradientTo: "#FFB6C1",
  },
  {
    id: 3,
    title: "ট্রপিক্যাল ফ্রুটস কালেকশন",
    subtitle: "স্বর্গীয় স্বাদের সমারোহ",
    description:
      "বাংলাদেশের সেরা উষ্ণমণ্ডলীয় ফলগুলির এক অনন্য সংগ্রহ। তাজা নারিকেল, মিষ্টি পেপে, সুগন্ধি কাঁঠাল এবং আরও অনেক কিছু।",
    benefits: [
      "৮+ প্রকার বিশেষ ফল",
      "স্বাস্থ্যের জন্য ১০০% কার্যকর",
      "প্রিমিয়াম প্যাকেজিং",
    ],
    cta: "কালেকশন দেখুন",
    link: "/shop",
    image: banner1,
    gradientFrom: "#F0FFF0",
    gradientTo: "#98FB98",
  },
];

// Enhanced animation variants with better transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 400 : -400,
    opacity: 0,
    scale: 0.95,
  }),
};

// Enhanced arrow button animations

// Image floating animation
const imageFloatVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate slides (paused on hover)
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovering]);

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

  const goToSlide = useCallback(
    (index: number) => {
      const newDirection = index > currentSlide ? 1 : -1;
      setDirection(newDirection);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${currentSlideData.gradientFrom} 0%, ${currentSlideData.gradientTo} 100%)`,
        minHeight: "calc(100vh - 60px)", // Account for header
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced Navigation Arrows - Both positioned on the right side */}

      <Container className="mx-auto px-4 sm:px-6 pt-20 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Main Hero Content - Improved responsive layout */}
        <div
          className="grid  grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-center"
          style={{
            minHeight: "calc(100vh - 120px)",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          {/* Content Section */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 280, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              {/* Main Title - Responsive scaling for 1440x984 */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-green-700 leading-tight"
                style={{
                  lineHeight: "1.1",
                  fontSize: "clamp(1.875rem, 4vw, 4.5rem)", // Better scaling for 1440x984
                }}
              >
                {currentSlideData.title}
              </motion.h1>

              {/* Subtitle - Better sizing for medium screens */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold text-green-600 opacity-90"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)", // Responsive scaling
                }}
              >
                {currentSlideData.subtitle}
              </motion.h2>

              {/* Description - Better text sizing and spacing */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed font-medium pt-3"
                style={{
                  maxWidth: "",
                  margin: "0 auto",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)", // Responsive text
                }}
              >
                {currentSlideData.description}
              </motion.p>

              {/* Benefits - Improved spacing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 lg:space-y-4"
              >
                {currentSlideData.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 lg:gap-4 justify-center lg:justify-start"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Heart className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </motion.div>
                    <span
                      className="text-gray-700 font-medium"
                      style={{
                        fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)",
                      }}
                    >
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button - Better sizing for all screens */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4 lg:pt-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link href={currentSlideData.link}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group touch-manipulation"
                      style={{
                        minHeight: "48px",
                        padding:
                          "clamp(0.75rem, 2vw, 1.5rem) clamp(1.5rem, 4vw, 3rem)",
                        fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                        fontWeight: "700",
                      }}
                    >
                      {currentSlideData.cta}
                      <motion.div
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" />
                      </motion.div>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Image Section - Fixed responsive sizing */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`image-${currentSlide}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 280, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="flex justify-center items-center px-4 lg:px-0"
            >
              <motion.div
                variants={imageFloatVariants}
                animate="animate"
                className="relative w-full"
                style={{
                  maxWidth: "min(90vw, 600px)",
                  height: "clamp(300px, 35vw, 500px)", // Better scaling for 1440x984
                  aspectRatio: "1",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 45vw"
                    className="object-contain drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Slide Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-3 lg:gap-4 pb-8 lg:pb-12"
        >
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 lg:h-4 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-10 lg:w-12 bg-green-600 shadow-lg"
                  : "w-3 lg:w-4 bg-green-200 hover:bg-green-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </Container>

      {/* How It Works Section */}
      <div className="px-5  pb-16 lg:pb-24 xl:max-w-7xl w-full mx-auto ">
        <HowItWorks />
      </div>
    </div>
  );
};

export default HeroBanner;
