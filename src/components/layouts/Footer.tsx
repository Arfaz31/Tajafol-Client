import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Crown,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import Image from "next/image";
import Container from "../Shared/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 text-white pt-16 pb-8">
      <Container className="px-4">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex-1">
              <Link href="/" className="block mb-4">
                <Image src={tajafol} alt="টাজাফল লোগো" width={120} height={60} />
              </Link>
              <p className="text-green-100 mb-6 text-sm leading-relaxed">
                চাঁপাইনবাবগঞ্জের আম রাজধানী থেকে সরাসরি আপনার ঘরে। বাংলাদেশের 
                সেরা আম, লিচু ও তাজা ফলের নিশ্চয়তা টাজাফলে।
              </p>
            </div>
            <div className="flex gap-3 mt-auto">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 hover:text-blue-400 transition-all"
              >
                <Facebook size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 hover:text-green-400 transition-all"
              >
                <MessageCircle size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 hover:text-pink-400 transition-all"
              >
                <Instagram size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 hover:text-red-400 transition-all"
              >
                <Youtube size={18} />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Crown className="h-5 w-5 text-yellow-400 mr-2" />
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-3 flex-1">
              <li>
                <Link
                  href="/about"
                  className="text-green-100 hover:text-yellow-300 transition-colors flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    → আমাদের সম্পর্কে
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-green-100 hover:text-yellow-300 transition-colors flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    → ফল কিনুন
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-100 hover:text-yellow-300 transition-colors flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    → যোগাযোগ
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-green-100 hover:text-yellow-300 transition-colors flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    → গোপনীয়তার নীতি
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-green-100 hover:text-yellow-300 transition-colors flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    → শর্তাবলী
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info & Services */}
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Phone className="h-5 w-5 text-yellow-400 mr-2" />
              যোগাযোগ ও সেবা
            </h3>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                <MapPin className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">প্রধান অফিস</p>
                  <span className="text-green-100 text-sm">
                    ৩৫ নং বাড়ি, রোড ১২, বনানী<br />ঢাকা-১২১৩, বাংলাদেশ
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                <Phone className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm font-semibold">হটলাইন</p>
                  <span className="text-green-100 text-sm">+৮৮০ ১৭১২৩৪৫৬১৮</span>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                <MessageCircle className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm font-semibold">WhatsApp</p>
                  <span className="text-green-100 text-sm">+৮৮০ ১৯১২৩৪৫৬৭৮</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Seasonal Promo Banner */}
          <div className="flex flex-col h-full">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-500 rounded-2xl p-6 text-center h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  🥭 আম সিজন {currentYear} শুরু! 🥭
                </h3>
                <p className="text-yellow-100 mb-4">
                  খিরসাপাত, গোপালভোগ, লাংড়া - সকল জাতের তাজা আম এখনই অর্ডার করুন!
                </p>
              </div>
              <Link href="/shop" className="mt-auto">
                <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-2 rounded-full w-full">
                  এখনই অর্ডার করুন
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-200 text-sm">
              © {currentYear} TaazaFol। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="text-green-200 text-sm">
              Developed with ❤️ by Arvion Tech
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;