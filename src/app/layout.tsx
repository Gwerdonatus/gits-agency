// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GITS",
  description: "GITS — premium UI/UX, web engineering, and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Global fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-screen bg-white text-gray-900 antialiased overflow-x-hidden">
        {/* Fixed navbar sits over every page/hero */}
        <Navbar />

        {/* No extra spacing — pages control their own top padding */}
        {children}

        <Footer />
      </body>
    </html>
  );
}
