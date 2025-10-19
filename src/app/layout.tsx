import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ChatWidget from "@/components/ui/ChatWidget";

// MONOCODE: Observable Implementation - Structured font loading with clear naming
// Geist for UI elements, headings, and interactive components
// Inter for body text and paragraphs

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Geist is imported directly from the geist package with optimized variable font
// It provides --font-geist-sans CSS variable automatically

// MONOCODE: Explicit Error Handling - Comprehensive SEO metadata following style.md specifications
export const metadata: Metadata = {
  title: {
    default: "NavaTransport - Zuverlässige Logistik in ganz Europa",
    template: "%s | NavaTransport"
  },
  description: "Professionelle Logistiklösungen für Deutschland und Europa. Schnell, sicher, planbar. Express-Transport, Same-Day-Delivery und ADR-Transporte.",
  keywords: ["Logistik", "Transport", "Europa", "Deutschland", "Express", "Same-Day", "ADR", "Spedition"],
  authors: [{ name: "NavaTransport" }],
  creator: "NavaTransport",
  publisher: "NavaTransport",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: "https://navarrogroup.de",
    siteName: "NavaTransport",
    title: "NavaTransport - Zuverlässige Logistik in ganz Europa",
    description: "Professionelle Logistiklösungen für Deutschland und Europa. Schnell, sicher, planbar.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NavaTransport - Europäische Logistiklösungen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NavaTransport - Zuverlässige Logistik in ganz Europa",
    description: "Professionelle Logistiklösungen für Deutschland und Europa. Schnell, sicher, planbar.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "msapplication-TileColor": "#F37F3E",
    "theme-color": "#F37F3E",
  },
};

// MONOCODE: Dependency Transparency - Ensure proper responsive scaling on mobile
// This injects: <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// MONOCODE: Progressive Construction - Root layout with proper font loading and accessibility
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="de" 
      className={`${inter.variable} ${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* MONOCODE: Dependency Transparency - Preload critical fonts */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/geist-sans-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Style Guide: Brand colors and favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance optimization */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body 
        className="font-inter antialiased bg-surface-0 text-ink-900 overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* MONOCODE: Observable Implementation - Main application wrapper with consistent styling */}
        <div id="root" className="min-h-screen flex flex-col">
          {children}
        </div>
        
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-brand-600 text-white px-4 py-2 rounded-md"
        >
          Zum Hauptinhalt springen
        </a>
        
        {/* Chat Widget */}
        <ChatWidget />
      </body>
    </html>
  );
}
