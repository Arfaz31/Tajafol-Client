// import { Suspense } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow lg:pt-20 pt-5">
        {/* <Suspense
          fallback={<div className="container-custom py-10">Loading...</div>}
        >
       
        </Suspense> */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
