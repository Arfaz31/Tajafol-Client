"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, MessageCircle, Clock, Headphones, Truck, Gift, Facebook } from "lucide-react"


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 ">
      {/* Hero Section with SEO-optimized content */}
      <div className="relative pt-10 bg-gradient-to-r from-green-600 to-yellow-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              যোগাযোগ করুন টাজাফলের সাথে
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-8 leading-relaxed"
            >
              চাঁপাইনবাবগঞ্জের সেরা আম, রসালো লিচু ও তাজা ফলের জন্য আমাদের সাথে যোগাযোগ করুন।<br />
              <span className="text-yellow-200">২৪/৭ গ্রাহক সেবা । দ্রুত ডেলিভারি । ১০০% গুণগত মান</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">+৮৮০ ১৭১২৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <MessageCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">WhatsApp সহায়তা</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Quick Contact Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-center text-gray-800">ফোন কল</h3>
            <div className="text-center text-gray-600 space-y-1">
              <p className="font-semibold text-green-700">+৮৮০ ১৭১২৩৪৫৬৭৮</p>
              <p className="font-semibold text-green-700">+৮৮০ ১৮১২৩৪৫৬৭৮</p>
              <p className="text-sm">প্রতিদিন ৯টা - ১০টা</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-center text-gray-800">WhatsApp</h3>
            <div className="text-center text-gray-600 space-y-1">
              <p className="font-semibold text-emerald-700">+৮৮০ ১৯১২৩৪৫৬৭৮</p>
              <p className="text-sm">তাৎক্ষণিক বার্তা পাঠান</p>
              <p className="text-sm">২৪/৭ উপলব্ধ</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Facebook className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-center text-gray-800">Facebook Page</h3>
            <div className="text-center text-gray-600 space-y-1">
              <p className="font-semibold text-blue-700">@TazafolBangladesh</p>
              <p className="text-sm">Facebook এ মেসেজ করুন</p>
              <p className="text-sm">সক্রিয় সাপোর্ট</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-center text-gray-800">ইমেইল</h3>
            <div className="text-center text-gray-600 space-y-1">
              <p className="font-semibold text-orange-700">info@tazafol.com</p>
              <p className="font-semibold text-orange-700">order@tazafol.com</p>
              <p className="text-sm">২৪ ঘন্টার মধ্যে উত্তর</p>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-8 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">কেন টাজাফল বেছে নেবেন?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl mb-2">দ্রুত ডেলিভারি</h3>
              <p className="text-green-100">ঢাকায় ২৪ ঘন্টা, সারাদেশে ৩-৫ দিন</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl mb-2">তাজা গ্যারান্টি</h3>
              <p className="text-green-100">১০০% তাজা, নাহলে পুরো টাকা ফেরত</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl mb-2">২৪/৭ সাপোর্ট</h3>
              <p className="text-green-100">যেকোনো সমস্যায় আমরা আছি আপনার পাশে</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl mb-2">সারাদেশে ডেলিভারি</h3>
              <p className="text-green-100">৬৪ জেলায় আমাদের ডেলিভারি নেটওয়ার্ক</p>
            </div>
          </div>
        </motion.div>

        {/* Business Hours & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">কার্যসময়</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-700">অর্ডার ও ডেলিভারি</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>প্রতিদিন</span>
                    <span className="font-semibold">সকাল ৯টা - রাত ১০টা</span>
                  </li>
                  <li className="flex justify-between">
                    <span>জরুরি অর্ডার</span>
                    <span className="font-semibold">২৪/৭ WhatsApp এ</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-700">কাস্টমার সার্ভিস</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>প্রতিদিন</span>
                    <span className="font-semibold">সকাল ৯টা - সন্ধ্যা ৮টা</span>
                  </li>
                  <li className="flex justify-between">
                    <span>WhatsApp</span>
                    <span className="font-semibold text-green-600">২ৄ/৭ উপলব্ধ</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Facebook Page</span>
                    <span className="font-semibold text-blue-600">সক্রিয় সাপোর্ট</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">সরাসরি অর্ডার করুন</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">WhatsApp অর্ডার</h3>
                <p className="text-2xl font-bold text-green-700">+৮৮০ ১৯১২৩৪৫৬৭৮</p>
                <p className="text-sm text-green-600">*সরাসরি WhatsApp এ মেসেজ করুন</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Facebook Page</h3>
                <p className="text-lg font-semibold text-blue-700">@TazafolBangladesh</p>
                <p className="text-sm text-blue-600">*Facebook এ মেসেজ পাঠান</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h3 className="font-semibold text-orange-800 mb-2">ফোন কল</h3>
                <p className="text-lg font-semibold text-orange-700">+৮৮০ ১৭১২৩৪৫৬৭৮</p>
                <p className="text-sm text-orange-600">*সরাসরি কল করে অর্ডার করুন</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Location Map */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">আমাদের অবস্থান</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-green-700">প্রধান অফিস ও ওয়্যারহাউস</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">টাজাফল হেড অফিস</p>
                      <p>৩৫ নং বাড়ি, রোড ১২, বনানী</p>
                      <p>ঢাকা-১২১৩, বাংলাদেশ</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">চাঁপাইনবাবগঞ্জ সংগ্রহ কেন্দ্র</p>
                      <p>কানসাট মার্কেট এলাকা</p>
                      <p>চাঁপাইনবাবগঞ্জ, রাজশাহী</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">দিকনির্দেশনা</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• বনানী ১১ নং রোড থেকে ৫০ মিটার পূর্বে</li>
                    <li>• রোড মার্কেট সংলগ্ন</li>
                    <li>• পার্কিং সুবিধা উপলব্ধ</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">গুগল ম্যাপ এখানে সংযুক্ত হবে</p>
                  <p className="text-sm text-gray-400 mt-2">জিপিএস: ২ৃ.৭৯৩৬°N, ৯০.৪০৫৮°E</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">সচরাচর জিজ্ঞাসা</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-green-700 mb-2">অর্ডার করতে কি কি লাগবে?</h3>
                <p className="text-gray-600 text-sm">শুধু আপনার মোবাইল নম্বর ও ঠিকানা দিন। আমরা বাকি সব দেখে নেব।</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-green-700 mb-2">পেমেন্ট কিভাবে করব?</h3>
                <p className="text-gray-600 text-sm">ক্যাশ অন ডেলিভারি, বিকাশ, নগদ, রকেট - সব পদ্ধতিতে পেমেন্ট করতে পারবেন।</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-green-700 mb-2">ডেলিভারি কত সময় লাগে?</h3>
                <p className="text-gray-600 text-sm">ঢাকায় ২৪ ঘন্টা, অন্যান্য জেলায় ৩-৫ কার্যদিবস।</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-green-700 mb-2">ফল খারাপ হলে কি করব?</h3>
                <p className="text-gray-600 text-sm">১০০% রিপ্লেসমেন্ট গ্যারান্টি। ডেলিভারির ২৪ ঘন্টার মধ্যে জানান।</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}