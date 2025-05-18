"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  LogIn,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { RootState } from "@/redux/store";
import { useGetmeQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import userImage from "@/assets/logo/man.png";
import tajafol from "@/assets/logo/tajafol-logo1.png";
import { logout } from "@/redux/slices/authSlice";
import Container from "../Shared/Container";
import { protectedRoutes } from "@/constant";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useAppSelector((store) => store.cart.products);
  const cartItemCount = cartItems.length;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: userData } = useGetmeQuery("");
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Navigate to shop page with search query
    if (searchQuery.trim()) {
      router.push(`/shop?searchTerm=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // router.push("/login");
    setIsMobileMenuOpen(false);

    if (protectedRoutes.some((route: string) => pathname.match(route))) {
      router.push("/"); //protected route gulo te thaka obosthai logout korle homepage redirect korbe only.
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    // { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const rolePath =
    user?.role === "SUPER_ADMIN" || user?.role === "ADMIN"
      ? "admin"
      : user?.role === "CUSTOMER"
      ? "customer"
      : "";

  const authLinks = user?.email
    ? [
        {
          name: "Dashboard",
          href: `/dashboard/${rolePath}`,
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          name: "Profile",
          href: `/profile`,
          icon: <User className="h-4 w-4" />,
        },
      ]
    : [
        {
          name: "Login",
          href: "/login",
          icon: <LogIn className="h-4 w-4" />,
        },
        {
          name: "Register",
          href: "/register",
          icon: <User className="h-4 w-4" />,
        },
      ];

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-2"
      )}
    >
      <Container className=" mx-auto lg:px-4 px-2 flex items-center justify-between">
        {/* Logo */}
        <div className="lg:block hidden">
          <Link href="/" className="flex items-center ">
            <Image src={tajafol} alt="Logo" width={100} height={60} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base transition-colors hover:text-primary text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search form */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-52 pl-9 rounded-full bg-background border-primary/20"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#f59f00] rounded-full p-2 text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Auth Links - Desktop */}
          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="rounded-full border-2 border-white cursor-pointer">
                  <Image
                    src={userData?.data?.profileImg || userImage}
                    alt="user profile picture"
                    width={35}
                    height={35}
                    className="rounded-full object-cover object-center w-9 h-9"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {authLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.name}
                    asChild
                    onClick={() => handleNavigation(`${link.href}`)}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center w-full p-2 hover:bg-accent cursor-pointer"
                    >
                      {link.icon}
                      <span className="ml-2">{link.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center w-full p-2 hover:bg-accent cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="ml-2">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hover:bg-[#169344]"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                // className="bg-[#fdb900] hover:bg-[#ffb005]"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          // variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Logo */}
        <div className="lg:hidden block">
          <Link href="/" className="flex items-center ">
            <Image src={tajafol} alt="Logo" width={100} height={60} />
          </Link>
        </div>

        {/* Mobile cart */}
        <Link href="/cart" className="relative lg:hidden mr-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-[#f59f00] rounded-full p-2 text-white"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </Link>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 rounded-full bg-background border-primary/20"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </form>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-2 px-3 rounded-md transition-colors text-foreground hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-2 pt-4 border-t">
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center py-2 px-3 rounded-md transition-colors text-foreground hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ))}
                {user?.email && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 px-3 rounded-md transition-colors text-foreground hover:bg-muted w-full"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="ml-2">Logout</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
