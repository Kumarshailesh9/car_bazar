import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alamcarbazar.com"),

  title: {
    default: "Best Used Cars in Gorakhpur | Alam Car Bazar",
    template: "%s | Alam Car Bazar",
  },

  description:
    "Buy verified used cars in Gorakhpur, Deoria, and Kushinagar at best price. Affordable second hand cars with easy EMI, exchange offers, and full documents.",

  keywords: [
    "used car showroom in Gorakhpur",
    "best second hand car in Gorakhpur",
    "old car showroom near me Gorakhpur",
    "second hand car dealer in Deoria",
    "used cars in Kushinagar",
    "best car bazaar in Gorakhpur",
    "budget cars in Gorakhpur",
    "certified used cars Gorakhpur",
    "low price second hand cars near me",
    "affordable cars in Gorakhpur UP",
    "used car showroom near me",
    "second hand car near me",
    "car dealer near me Gorakhpur",
    "old car showroom in Gorakhpur city",
    "best car showroom in Deoria near me",
    "second hand car shop Kushinagar",
    "nearby used car dealer UP",
    "buy second hand car in Gorakhpur",
    "best deal on used cars in Gorakhpur",
    "cheapest second hand car in UP",
    "low EMI used cars Gorakhpur",
    "exchange old car Gorakhpur",
    "second hand car finance available",
    "best price used car dealer near me",
    "trusted used car dealer in Gorakhpur",
    "affordable family cars in Kushinagar",
    "verified used cars with documents in Gorakhpur",
  ],

  openGraph: {
    title: "Alam Car Bazar Gorakhpur",
    description:
      "Find the best second hand cars in Gorakhpur with best price, EMI options and verified documents.",
    url: "https://alamcarbazar.com",
    siteName: "Alam Car Bazar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/banner.jpg", // 👉 put your banner image in public folder
        width: 1200,
        height: 630,
        alt: "Used Cars in Gorakhpur",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Used Cars in Gorakhpur",
    description:
      "Affordable second hand cars in Gorakhpur with best deals and easy EMI.",
    images: ["/banner.jpg"],
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}