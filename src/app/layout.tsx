import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prontly Notify — Browser Push Notifications for Websites",
  description:
    "Send AI-powered browser push notifications to your website visitors. Free forever plan, no credit card required.",
  icons: [{ rel: "icon", url: "/logo.svg" }],
  openGraph: {
    title: "Prontly Notify — Browser Push Notifications for Websites",
    description: "Send AI-powered browser push notifications to your website visitors. Free forever plan, no credit card required.",
    url: "https://notify.prontly.in",
    siteName: "Prontly Notify",
    images: [{ url: "https://notify.prontly.in/og/default.png", width: 1200, height: 630, alt: "Prontly Notify — Browser push notification platform" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prontly Notify — Browser Push Notifications for Websites",
    description: "Send AI-powered browser push notifications to your website visitors. Free forever plan.",
    images: ["https://notify.prontly.in/og/default.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Prontly Notify",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-assisted browser push notification platform for publishers, SaaS, and e-commerce.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-background text-text-primary antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
