"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Crown, MapPin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background ">
      {/* Hero Section */}
      <div className="relative h-[70vh] pt-20 overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Chapai Nawabganj mango orchards"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-6"
            >
              <Crown className="h-12 w-12 text-yellow-400 mr-4 drop-shadow-lg" />
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                TaazaFol সম্পর্কে
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed drop-shadow-md"
            >
              বাংলাদেশের আম রাজধানী চাঁপাইনবাবগঞ্জ থেকে সরাসরি আপনার দোরগোড়ায়<br />
              <span className="text-yellow-300 font-semibold">সতেজ, খাঁটি ও প্রাকৃতিক ফলের নিশ্চয়তা</span>
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Heritage Story */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="order-2 lg:order-1">
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">আমাদের ঐতিহ্য</h2>
            </div>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                চাঁপাইনবাবগঞ্জ - বাংলাদেশের আম রাজধানী, যেখানে শতাব্দীর পর শতাব্দী ধরে চাষ হয়ে আসছে বিশ্বের সেরা আম। এই অঞ্চলে রয়েছে ২৭০+ জাতের আম, যার মধ্যে খিরসাপাত, গোপালভোগ, লাংড়া, ফজলী অন্যতম।
              </p>
              <p>
                টাজাফল প্রতিষ্ঠিত হয়েছে ২০২৩ সালে একটি সহজ লক্ষ্য নিয়ে - চাঁপাইনবাবগঞ্জের ৩৭,৫৮৮ হেক্টর জমির ২৮,২৬,০০০ আম গাছ থেকে সরাসরি কৃষকদের কাছ থেকে সর্বোচ্চ মানের ফল সংগ্রহ করে সারাদেশের মানুষের কাছে পৌঁছে দেওয়া।
              </p>
              <p>
                কানসাট আম বাজার - বাংলাদেশের সবচেয়ে আইকনিক আম বাজার এবং স্থানীয় চাষীদের সাথে আমাদের দৃঢ় সম্পর্ক আমাদের পণ্যের গুণমান নিশ্চিত করে।
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/about-2.jpeg"
              alt="Chapai Nawabganj mango farmers"
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center bg-gradient-to-r from-green-600 to-yellow-600 text-white rounded-2xl p-12"
        >
          <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            বাংলাদেশের সেরা ফলের স্বাদ নিন
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            চাঁপাইনবাবগঞ্জের ঐতিহ্যবাহী আম থেকে শুরু করে সারাদেশের সেরা ফল - সবই পাবেন টাজাফলে। 
            আমাদের সাথে যুক্ত হন এবং প্রকৃতির সেরা উপহার উপভোগ করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                এখনই অর্ডার করুন
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-700 transition-colors"
              >
                আমাদের সাথে যোগাযোগ
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}