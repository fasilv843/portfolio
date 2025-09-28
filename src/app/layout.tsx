import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fasil Valiyattil",
  description: "Personal portfolio of Fasil Valiyattil, a passionate full-stack developer specializing in modern web technologies and creating exceptional digital experiences.",
  keywords: ["portfolio", "developer", "fava", "valiyattil", "vengara", "Muhammed Fasil V", "fasil"],
  authors: [{ name: "Fasil Valiyattil" }],
  icons: {
    icon: "/favicon.ico", // main favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // for iOS home screen
  },
  openGraph: {
    title: "Fasil Valiyattil Portfolio",
    description: "Personal portfolio showcasing modern web development projects and skills",
    type: "website",
    images: [
      {
        url: "https://fasilv.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Fasil Valiyattil Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fasil Valiyattil Portfolio",
    description: "Showcasing web development projects, skills, and experience.",
    site: "@fasilv843",
    images: ["https://fasilv.in/logo.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Fasil Valiyattil",
              "url": "https://www.fasilv.in",
              "jobTitle": "MEAN Developer / Node.js Developer",
              "description": "Fasil Valiyattil is a Software Developer specializing in Node.js, Express, Angular, showcasing personal projects and technical blogs.",
              "image": "https://www.fasilv.in/logo.png",
              "sameAs": [
                "https://github.com/fasilv843",
                "https://linkedin.com/in/fasilv843",
                "https://www.instagram.com/fa_sil_v/",
                "https://x.com/fasilv843",
                "https://www.facebook.com/fasilv843"
              ]
            }),
          }}
        />
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
