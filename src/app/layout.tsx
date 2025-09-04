import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Developer - Full-Stack Developer Portfolio",
  description: "Personal portfolio of John Developer, a passionate full-stack developer specializing in modern web technologies and creating exceptional digital experiences.",
  keywords: ["portfolio", "developer", "full-stack", "web development", "React", "Next.js", "TypeScript"],
  authors: [{ name: "John Developer" }],
  openGraph: {
    title: "John Developer - Full-Stack Developer Portfolio",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
