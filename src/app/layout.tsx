import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

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
  keywords: ["portfolio", "developer", "full-stack", "web development", "Angular", "Node.js", "TypeScript"],
  authors: [{ name: "Fasil Valiyattil" }],
  openGraph: {
    title: "Fasil Valiyattil - Full-Stack Developer Portfolio",
    description: "Personal portfolio showcasing modern web development projects and skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
