// import { Suspense } from "react"
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ClientWhatsAppButton from "@/components/whatsAppFloating";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow  lg:pt-16 pt-0 ">{children}</main>
      {/* WhatsApp Floating Button - replace with your actual WhatsApp number */}
      <ClientWhatsAppButton
        phoneNumber="+8801738753102"
        message="Hello! I'm interested in ordering fresh fruits from TazaFol."
      />
      <Footer />
    </div>
  );
}
