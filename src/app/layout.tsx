import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  AUTHOR,
  ROLE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  TWITTER_HANDLE,
  url,
} from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Browser chrome follows the active theme. Values match --background in each.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0f" },
  ],
  colorScheme: "light dark",
};

const DESCRIPTION =
  "Portfolio of Fasil Valiyattil, a full-stack developer building fintech and web products with Angular, React, Node.js, NestJS, MongoDB and AWS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR} — ${ROLE}`,
    template: `%s | ${AUTHOR}`,
  },
  description: DESCRIPTION,
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
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${AUTHOR} — ${ROLE}`,
    description: DESCRIPTION,
    url: url("/"),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    // Images come from opengraph-image.tsx. The previous inline entry pointed at
    // logo.png while declaring it 1200x630 — it is actually 831x814.
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR} — ${ROLE}`,
    description: DESCRIPTION,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR,
    url: url("/"),
    jobTitle: ROLE,
    description:
      "Fasil Valiyattil is a Full-Stack Developer specializing in Angular, React, Node.js and Express, with experience building fintech products, showcasing personal projects and technical blogs.",
    image: url("/logo.png"),
    worksFor: { "@type": "Organization", name: "Paywint" },
    knowsAbout: [
      "Angular",
      "React",
      "Node.js",
      "NestJS",
      "Express",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "Terraform",
      "Fintech",
    ],
    sameAs: SOCIAL_LINKS,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: url("/"),
    description: DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#person` },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variable lives on <html> so that :root actually defines it —
    // `@theme` in globals.css consumes it there.
    // suppressHydrationWarning: next-themes stamps data-theme before React
    // hydrates, so the server and client markup necessarily differ here.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        {/* Plain script, not next/script: this is static data, so it belongs in
            the server output where crawlers reliably parse it. It previously
            shipped with strategy="afterInteractive". */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="bg-primary text-primary-contrast focus-visible:outline-ring sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:px-4 focus:py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
