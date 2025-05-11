import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "sonner";

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "TajaFol | Fresh Seasonal Fruits in Bangladesh",
  description:
    "Premium quality fresh seasonal fruits including mango, litchi, and more delivered across Bangladesh. Taste the freshness of local seasonal produce.",
  keywords:
    "fresh fruits, Bangladesh fruits, mango, litchi, seasonal fruits, fruit delivery, TajaFol",
  authors: [{ name: "TajaFol" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    // url: "https://tajafol.com/",
    title: "TajaFol | Fresh Seasonal Fruits in Bangladesh",
    description:
      "Premium quality fresh seasonal fruits including mango, litchi, and more delivered across Bangladesh.",
    siteName: "TajaFol",
    images: [
      {
        url: "/images/tajafol-og.jpg",
        width: 1200,
        height: 630,
        alt: "TajaFol - Fresh Seasonal Fruits",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "TajaFol | Fresh Seasonal Fruits in Bangladesh",
  //   description: "Premium quality fresh seasonal fruits including mango, litchi, and more delivered across Bangladesh.",
  //   images: ["/images/tajafol-twitter.jpg"]
  // },
  // alternates: {
  //   canonical: "https://tajafol.com"
  // }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn-BD"
      suppressHydrationWarning
      className={`${inter.variable} ${bengaliFont.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "TajaFol",
            image: "/images/tajafol-logo.jpg",
            description: "Fresh seasonal fruits delivery service in Bangladesh",
            // url: "https://tajafol.com",
            // telephone: "+8801XXXXXXXXX",
            // address: {
            //   "@type": "PostalAddress",
            //   streetAddress: "123 Main Street",
            //   addressLocality: "Rajshahi",
            //   addressRegion: "Rajshahi Division",
            //   postalCode: "6000",
            //   addressCountry: "BD"
            // },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "24.3745",
              longitude: "88.6042",
            },

            paymentAccepted: "Cash, bKash, Nagad",
          })}
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className}`}>
        <main className="flex-1">{children}</main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
