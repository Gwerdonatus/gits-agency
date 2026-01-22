// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_NAME = "GITS";
const SITE_DESCRIPTION = "GITS — premium UI/UX, web engineering, and automation.";

// IMPORTANT: change this to your real deployed domain
// Example: "https://gits.donatusgwer.workers.dev"
const SITE_URL = "https://gits.donatusgwer.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  // This controls favicon / tab icon and also helps link previews in some places
  icons: {
    icon: [
      { url: "/gits.png" }, // your logo
    ],
    apple: [
      { url: "/gits.png" },
    ],
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/gits.png",
        width: 1200,
        height: 630,
        alt: "GITS",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/gits.png"],
    // optional: add your handle if you have one
    // creator: "@yourhandle",
  },
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
