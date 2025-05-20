"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  X,
  User,
  LogIn,
  LayoutDashboard,
  Home,
  Info,
  Store,
  Phone,
  UserCircle,
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
import { removeTokenFromCookies } from "@/app/ServerAction/AuthService";

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
    removeTokenFromCookies();
    setIsMobileMenuOpen(false);

    if (protectedRoutes.some((route: string) => pathname.match(route))) {
      router.push("/");
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "About", href: "/about", icon: <Info className="h-5 w-5" /> },
    { name: "Shop", href: "/shop", icon: <Store className="h-5 w-5" /> },
    { name: "Contact", href: "/contact", icon: <Phone className="h-5 w-5" /> },
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
    <>
      {/* Desktop Header */}
      <header
        className={cn(
          "hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white shadow-md py-3" : "bg-white py-2"
        )}
      >
        <Container className="mx-auto lg:px-4 px-2 flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center">
              <Image src={tajafol} alt="Logo" width={100} height={60} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-base transition-colors hover:text-primary text-foreground relative",
                  pathname === link.href ? "text-amber-400 font-medium" : ""
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-amber-400"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-4">
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
                  <div className="rounded-full border-2 border-amber-300 cursor-pointer">
                    <Image
                      src={userData?.data?.profileImage || userImage}
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
                <Button onClick={() => router.push("/register")}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </Container>
      </header>

      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Search Button/Icon - Made Much Larger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className=" bg-amber-400 border border-orange-500 rounded-full p-2"
          >
            <Search className="w-6 h-6 text-white flex items-center justify-center" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={tajafol} alt="Logo" width={90} height={55} />
          </Link>

          {/* Profile/Auth - Made Much Larger */}
          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className=" border-2 border-amber-300 rounded-full   flex items-center justify-center"
                >
                  <Image
                    src={userData?.data?.profileImage || userImage}
                    alt="user profile picture"
                    width={24}
                    height={24}
                    className="w-10 h-10 rounded-full object-cover object-center border "
                  />
                </button>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/login")}
              className="p-4 h-10 w-10"
            >
              <UserCircle className="h-8 w-8" />
            </Button>
          )}
        </div>
      </header>

      {/* Mobile Bottom App Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-0 flex-1",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.icon}
              <span className="text-xs mt-1 truncate">{link.name}</span>
            </Link>
          ))}

          {/* Cart in bottom bar */}
          <Link
            href="/cart"
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-0 flex-1 relative",
              pathname === "/cart"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-white"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Search</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search Form */}
              <div className="p-4">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-base rounded-full bg-gray-50 border-0 focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                </form>
              </div>

              {/* Quick Actions */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {!user?.email ? (
                    <>
                      <Button
                        variant="outline"
                        className="justify-start h-12"
                        onClick={() => {
                          router.push("/login");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                      <Button
                        className="justify-start h-12"
                        onClick={() => {
                          router.push("/register");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    </>
                  ) : (
                    authLinks.map((link) => (
                      <Button
                        key={link.name}
                        variant="outline"
                        className="justify-start h-12"
                        onClick={() => {
                          router.push(link.href);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {link.icon}
                        <span className="ml-2">{link.name}</span>
                      </Button>
                    ))
                  )}
                </div>
                {user?.email && (
                  <Button
                    variant="destructive"
                    className="w-full justify-start h-12 mt-3"
                    onClick={handleLogout}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add bottom padding to body content on mobile */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          body {
            padding-bottom: 70px;
            padding-top: 70px;
          }
        }
        @media (min-width: 1024px) {
          body {
            padding-bottom: 0;
            padding-top: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
