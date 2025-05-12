import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/Provider/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TazaFol | Fresh Seasonal Fruits in Bangladesh",
  description:
    "Buy the best quality seasonal fruits from all over Bangladesh with fast delivery and great prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ReduxProvider>
            {children}
            <Toaster richColors position="top-center" />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
