import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container-custom">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="flex items-center ">
                <Image src={tajafol} alt="Logo" width={100} height={60} />
              </Link>
            </div>
            <p className="text-background/80 mb-6">
              Delivering the freshest seasonal fruits from across Bangladesh
              straight to your doorstep.
            </p>
            <div className="flex gap-4">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full bg-background/10 hover:bg-background/20"
              >
                <Facebook size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full bg-background/10 hover:bg-background/20"
              >
                <Twitter size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full bg-background/10 hover:bg-background/20"
              >
                <Instagram size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full bg-background/10 hover:bg-background/20"
              >
                <Youtube size={18} />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/80">
                  Banani, Road 12, House 35, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/80">+880 1712345678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/80">info@tazafol.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-background/80 mb-4">
              Subscribe to our newsletter to receive updates on new arrivals and
              special offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background"
              />
              <Button className="bg-primary hover:bg-primary-hover text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-background/20 text-center text-background/70">
          <p>© {new Date().getFullYear()} TazaFol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
