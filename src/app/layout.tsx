import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fasilv.in"),
  title: "Fasil Valiyattil",
  description:
    "Personal portfolio of Fasil Valiyattil, a passionate full-stack developer specializing in modern web technologies and creating exceptional digital experiences.",
  keywords: [
    "portfolio",
    "developer",
    "fava",
    "valiyattil",
    "vengara",
    "Muhammed Fasil V",
    "fasil",
    "full-stack developer",
    "fintech developer",
    "Angular developer",
    "React developer",
    "Node.js developer",
  ],
  authors: [{ name: "Fasil Valiyattil" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico", // main favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // for iOS home screen
  },
  openGraph: {
    title: "Fasil Valiyattil Portfolio",
    description:
      "Personal portfolio showcasing modern web development projects and skills",
    type: "website",
    images: [
      {
        url: "https://www.fasilv.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Fasil Valiyattil Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fasil Valiyattil Portfolio",
    description: "Showcasing web development projects, skills, and experience.",
    site: "@fasilv843",
    images: ["https://www.fasilv.in/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variable lives on <html> so that :root actually defines it —
    // `@theme` in globals.css consumes it there.
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Fasil Valiyattil",
              url: "https://www.fasilv.in",
              jobTitle: "Full-Stack Developer",
              description:
                "Fasil Valiyattil is a Full-Stack Developer specializing in Angular, React, Node.js and Express, with experience building fintech products, showcasing personal projects and technical blogs.",
              image: "https://www.fasilv.in/logo.png",
              sameAs: [
                "https://github.com/fasilv843",
                "https://linkedin.com/in/fasilv843",
                "https://www.instagram.com/fa_sil_v/",
                "https://x.com/fasilv843",
                "https://www.facebook.com/fasilv843",
              ],
            }),
          }}
        />
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
