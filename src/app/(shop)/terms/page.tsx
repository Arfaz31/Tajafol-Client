import React from 'react';
import { FileText, Scale, ShoppingCart, Truck, AlertTriangle, Phone, Mail, MapPin } from "lucide-react";
import Container from '@/components/Shared/Container';



const TermsAndConditions = () => {
  return (
    <div className="min-h-screen mb-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <Container className="px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6">
            <FileText className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-bold mb-6">শর্তাবলী ও নিয়মাবলী</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            TaazaFol ব্যবহার করার আগে আমাদের শর্তাবলী পড়ুন। এই সেবা ব্যবহার করার মাধ্যমে আপনি এই সব শর্ত মেনে নিতে সম্মত হচ্ছেন।
          </p>
          <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>কার্যকর তারিখ: ১৫ মে, ২০২৫</span>
          </div>
        </Container>
      </div>

      <Container className="px-4 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Quick Navigation */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">দ্রুত নেভিগেশন</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#general" className="group flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-all">
                <Scale className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">সাধারণ শর্তাবলী</span>
              </a>
              <a href="#orders" className="group flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-all">
                <ShoppingCart className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">অর্ডার ও পেমেন্ট</span>
              </a>
              <a href="#delivery" className="group flex flex-col items-center p-4 rounded-lg hover:bg-purple-50 transition-all">
                <Truck className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">ডেলিভারি</span>
              </a>
              <a href="#responsibilities" className="group flex flex-col items-center p-4 rounded-lg hover:bg-orange-50 transition-all">
                <FileText className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">দায়বদ্ধতা</span>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* General Terms */}
            <section id="general" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8">
                <div className="flex items-center">
                  <Scale className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">সাধারণ শর্তাবলী</h2>
                    <p className="text-green-100 mt-2">টাজাফল সেবা ব্যবহারের মূল নিয়মাবলী</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-semibold mb-3">সেবার পরিধি</h3>
                    <p className="text-gray-700 mb-3">টাজাফল একটি অনলাইন তাজা ফল ও সবজি ডেলিভারি সেবা।</p>
                    <ul className="space-y-2">
                      <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>তাজা ফল ও সবজি সরবরাহ</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>দ্রুত ডেলিভারি সেবা</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-semibold mb-3">ব্যবহারকারীর যোগ্যতা</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>১৮ বছর বা তার চেয়ে বেশি বয়স্ক</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>বৈধ যোগাযোগের তথ্য প্রদান</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>শর্তাবলী মেনে চলা</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Orders and Payments */}
            <section id="orders" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                <div className="flex items-center">
                  <ShoppingCart className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">অর্ডার ও পেমেন্ট</h2>
                    <p className="text-blue-100 mt-2">অর্ডার প্রক্রিয়া এবং পেমেন্ট সংক্রান্ত নিয়মাবলী</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-green-700">অর্ডার প্রক্রিয়া</h3>
                    <p className="text-sm text-gray-600">অর্ডার নিশ্চিতকরণ এসএমএস/কল পাবেন এবং ডেলিভারি ট্র্যাক করতে পারবেন</p>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-700">পেমেন্ট পদ্ধতি</h3>
                    <p className="text-sm text-gray-600">কার্ড পেমেন্ট ও মোবাইল ব্যাংকিং। সকল পেমেন্ট SSL এনক্রিপ্টেড</p>
                  </div>
                  <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-purple-700">অর্ডার বাতিল</h3>
                    <p className="text-sm text-gray-600">প্যাকেজিংয়ের আগে বাতিল করা যাবে। ৩-৫ দিনে রিফান্ড</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Terms */}
            <section id="delivery" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8">
                <div className="flex items-center">
                  <Truck className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">ডেলিভারি নীতি</h2>
                    <p className="text-purple-100 mt-2">ডেলিভারি সময়, এলাকা এবং চার্জ</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-3 text-purple-600">ডেলিভারি সময়</h3>
                    <div className="space-y-2">
                      <div className="text-green-600 font-medium">সাধারণ: ৪-৬ ঘন্টা</div>
                      <div className="text-blue-600 font-medium">দ্রুত: ১-২ ঘন্টা</div>
                      <div className="text-sm text-gray-600">সকাল ৯টা - রাত ৯টা</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-3 text-purple-600">সেবা এলাকা</h3>
                    <div className="space-y-2">
                      <div>ঢাকা মেট্রোপলিটন এলাকা</div>
                      <div>নির্বাচিত উপজেলা</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-3 text-purple-600">ডেলিভারি চার্জ</h3>
                    <div className="space-y-2">
                      <div>সাধারণ: <span className="font-bold">৫০ টাকা</span></div>
                      <div>দ্রুত: <span className="font-bold">১০০ টাকা</span></div>
                      <div className="text-green-600">৫০০+ টাকায় ফ্রি</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsibilities */}
            <section id="responsibilities" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8">
                <div className="flex items-center">
                  <FileText className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">দায়বদ্ধতা ও রিফান্ড</h2>
                    <p className="text-orange-100 mt-2">আমাদের এবং আপনার দায়বদ্ধতা</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-3">রিফান্ড নীতি</h3>
                    <p className="text-gray-700 mb-3">নিম্নলিখিত ক্ষেত্রে রিফান্ড পাবেন:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>পণ্যের মান অসন্তোষজনক</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>ভুল পণ্য ডেলিভারি</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>ডেলিভারি না পৌঁছানো</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold mb-3">সীমাবদ্ধতা</h3>
                    <p className="text-gray-700 mb-3">নিম্নলিখিত ক্ষেত্রে আমরা দায়বদ্ধ নয়:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>প্রাকৃতিক দুর্যোগজনিত বিলম্ব</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>ভুল ঠিকানা প্রদান</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>গ্রাহকের অনুপস্থিতি</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-lg text-white overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">যোগাযোগ করুন</h2>
                  <p className="text-lg opacity-90">শর্তাবলী সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <Mail className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">ইমেইল</h3>
                    <p className="text-sm opacity-90">support@taazafol.com</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <Phone className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">ফোন</h3>
                    <p className="text-sm opacity-90">+৮৮০ ১৭১২৩৪৫৬৭৮</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <MapPin className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">ঠিকানা</h3>
                    <p className="text-sm opacity-90">৩৫ নং বাড়ি, রোড ১২<br />বনানী, ঢাকা-১২১৩</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsAndConditions;