import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Curated Modern Living",
  description: "Discover thoughtfully designed products for modern living. Premium quality, timeless style.",
  keywords: ["modern living", "home decor", "premium products", "curated design"],
  openGraph: {
    title: "Lumière — Curated Modern Living",
    description: "Discover thoughtfully designed products for modern living.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-stone-50 text-slate-900 antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}