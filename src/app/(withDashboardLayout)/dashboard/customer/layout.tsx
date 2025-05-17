// import { Suspense } from "react"
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
}
