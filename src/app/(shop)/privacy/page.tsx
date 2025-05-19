import Container from "@/components/Shared/Container";
import { Shield, Eye, Lock, UserCheck, FileText, AlertCircle, Phone, Mail, MapPin } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen mb-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <Container className="px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-bold mb-6">গোপনীয়তার নীতি</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
 TaazaFol আপনার ব্যক্তিগত তথ্যের সুরক্ষা এবং গোপনীয়তার প্রতি সম্পূর্ণ প্রতিশ্রুতিবদ্ধ। 
            আমরা আন্তর্জাতিক মানের নিরাপত্তা ব্যবস্থা অনুসরণ করি।
          </p>
          <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>সর্বশেষ আপডেট: ১৫ মে, ২০২৫</span>
          </div>
        </Container>
      </div>

      <Container className="px-4 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Quick Navigation */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">দ্রুত নেভিগেশন</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#collection" className="group flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-all">
                <Eye className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">তথ্য সংগ্রহ</span>
              </a>
              <a href="#usage" className="group flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-all">
                <UserCheck className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">তথ্যের ব্যবহার</span>
              </a>
              <a href="#security" className="group flex flex-col items-center p-4 rounded-lg hover:bg-purple-50 transition-all">
                <Lock className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">নিরাপত্তা</span>
              </a>
              <a href="#rights" className="group flex flex-col items-center p-4 rounded-lg hover:bg-orange-50 transition-all">
                <FileText className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">আপনার অধিকার</span>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Information Collection */}
            <section id="collection" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8">
                <div className="flex items-center">
                  <Eye className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">তথ্য সংগ্রহ</h2>
                    <p className="text-green-100 mt-2">আমরা কী ধরনের তথ্য সংগ্রহ করি এবং কেন</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="border-l-4 border-green-500 pl-6">
                      <h3 className="text-xl font-semibold mb-3">ব্যক্তিগত তথ্য</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>পূর্ণ নাম</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>মোবাইল নম্বর</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>ইমেইল ঠিকানা</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>জন্ম তারিখ (ঐচ্ছিক)</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h3 className="text-xl font-semibold mb-3">ঠিকানার তথ্য</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>বিতরণের ঠিকানা</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>শহর ও এলাকা</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>পোস্টাল কোড</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>ল্যান্ডমার্ক</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-500 pl-6">
                      <h3 className="text-xl font-semibold mb-3">অর্ডার তথ্য</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>পণ্যের পছন্দ</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>ক্রয়ের ইতিহাস</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>পেমেন্ট তথ্য</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>ডেলিভারি নির্দেশনা</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h3 className="text-xl font-semibold mb-3">প্রযুক্তিগত তথ্য</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>IP ঠিকানা</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>ব্রাউজার ধরন</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>ডিভাইস তথ্য</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>ব্যবহারের প্যাটার্ন</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Usage */}
            <section id="usage" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                <div className="flex items-center">
                  <UserCheck className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">তথ্যের ব্যবহার</h2>
                    <p className="text-blue-100 mt-2">আপনার তথ্য কীভাবে এবং কেন ব্যবহার করা হয়</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">অর্ডার প্রসেসিং</h3>
                    <p className="text-sm text-gray-600">অর্ডার নিশ্চিতকরণ, প্যাকেজিং এবং সময়মতো ডেলিভারি নিশ্চিত করা</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">গ্রাহক যোগাযোগ</h3>
                    <p className="text-sm text-gray-600">অর্ডার আপডেট, প্রোমো অফার এবং গুরুত্বপূর্ণ বিজ্ঞপ্তি পাঠানো</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">সেবা উন্নতি</h3>
                    <p className="text-sm text-gray-600">আমাদের সেবার মান বৃদ্ধি এবং গ্রাহক অভিজ্ঞতা উন্নতি করা</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">নিরাপত্তা</h3>
                    <p className="text-sm text-gray-600">জালিয়াতি প্রতিরোধ এবং আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করা</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section id="security" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8">
                <div className="flex items-center">
                  <Lock className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">ডেটা নিরাপত্তা</h2>
                    <p className="text-purple-100 mt-2">আমরা কীভাবে আপনার তথ্যের নিরাপত্তা নিশ্চিত করি</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">SSL এনক্রিপশন</h3>
                    <p className="text-gray-600">সমস্ত ডেটা ট্রান্সমিশন 256-বিট SSL এনক্রিপশন দিয়ে সুরক্ষিত</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">অ্যাক্সেস কন্ট্রোল</h3>
                    <p className="text-gray-600">শুধুমাত্র অনুমোদিত কর্মীরা আপনার তথ্য অ্যাক্সেস করতে পারেন</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">নিয়মিত অডিট</h3>
                    <p className="text-gray-600">নিরাপত্তা ব্যবস্থার নিয়মিত পরীক্ষা ও আপডেট</p>
                  </div>
                </div>
                <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-center">অতিরিক্ত নিরাপত্তা ব্যবস্থা</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>নিয়মিত ডেটা ব্যাকআপ</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>ফায়ারওয়াল সুরক্ষা</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>২৪/৭ নিরাপত্তা মনিটরিং</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>নিরাপদ পেমেন্ট গেটওয়ে</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section id="rights" className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8">
                <div className="flex items-center">
                  <FileText className="w-10 h-10 mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold">আপনার অধিকার</h2>
                    <p className="text-orange-100 mt-2">ডেটা সুরক্ষা বিষয়ে আপনার অধিকারসমূহ</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold mb-3 text-green-600">তথ্য অ্যাক্সেসের অধিকার</h3>
                      <p className="text-gray-600">আমাদের কাছে সংরক্ষিত আপনার ব্যক্তিগত তথ্য দেখার এবং কপি পাওয়ার অধিকার রয়েছে।</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold mb-3 text-blue-600">তথ্য সংশোধনের অধিকার</h3>
                      <p className="text-gray-600">ভুল বা অসম্পূর্ণ তথ্য সংশোধন করার অধিকার রয়েছে।</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold mb-3 text-purple-600">তথ্য মুছে ফেলার অধিকার</h3>
                      <p className="text-gray-600">নির্দিষ্ট পরিস্থিতিতে আপনার ব্যক্তিগত তথ্য মুছে ফেলার অধিকার রয়েছে।</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold mb-3 text-orange-600">আপত্তি জানানোর অধিকার</h3>
                      <p className="text-gray-600">আপনার তথ্যের নির্দিষ্ট ব্যবহারে আপত্তি জানানোর অধিকার রয়েছে।</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">কীভাবে আপনার অধিকার প্রয়োগ করবেন</h3>
                  <p className="text-gray-700">আপনার যে কোনো অধিকার প্রয়োগ করতে আমাদের সাথে যোগাযোগ করুন। আমরা ৩০ দিনের মধ্যে আপনার অনুরোধের জবাব দেব।</p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className=" bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-lg text-white overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">যোগাযোগ করুন</h2>
                  <p className="text-lg opacity-90">গোপনীয়তা সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <Mail className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">ইমেইল</h3>
                    <p className="text-sm opacity-90">privacy@taazafol.com</p>
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

export default PrivacyPolicy;