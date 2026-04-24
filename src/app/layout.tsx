import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { SocketProvider } from "@/contexts/socket-context";
import { Toaster } from "sonner";
import { PWAInstaller } from "@/components/pwa/PWAInstaller";
import { ThemeProvider } from "@/lib/theme-provider";
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google';

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.kollabary.com"),
  title: {
    template: "%s | Kollabary",
    default: "Kollabary - Enterprise Influencer Collaboration Platform",
  },
  description: "Scale your brand through authentic human connections. The next generation influencer management platform for seamless collaborations.",
  keywords: ["influencer marketing", "brand collaboration", "influencer management", "creators", "enterprise marketing", "Kollabary"],
  authors: [{ name: "Kollabary Team" }],
  creator: "Kollabary",
  publisher: "Kollabary",
  applicationName: "Kollabary",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "https://kollabary.s3.ap-south-1.amazonaws.com/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "https://kollabary.s3.ap-south-1.amazonaws.com/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "https://kollabary.s3.ap-south-1.amazonaws.com/favicon.ico",
    apple: [
      { url: "https://kollabary.s3.ap-south-1.amazonaws.com/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kollabary",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Kollabary",
    title: "Kollabary - Enterprise Influencer Collaboration Platform",
    description: "Scale your brand through authentic human connections. The next generation influencer management platform.",
    images: [{ url: "https://kollabary.s3.ap-south-1.amazonaws.com/kollabary_preview_image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kollabary - Enterprise Influencer Collaboration Platform",
    description: "Scale your brand through authentic human connections. The next generation influencer management platform.",
    images: [{ url: "https://kollabary.s3.ap-south-1.amazonaws.com/kollabary_preview_image.jpg", width: 1200, height: 630 }],
    site: "@kollabary",
    creator: "@kollabary",
  },
  category: "technology",
  verification: {
    google: "oULfLngOS9DM_WJH4Ca6k1r6-fmWlFrt08RbCxrn5ZE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kollabary",
            "alternateName": ["Kollabary Platform", "Kollabary Influencer Platform"],
            "url": "https://www.kollabary.com"
          }),
        }}
      />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-549HSQ8R'} />
      <body
        className={`${geistMono.variable} antialiased selection:bg-primary/10 selection:text-primary`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <SocketProvider>
                {children}
                <Toaster position="top-right" richColors closeButton />
                <PWAInstaller />

              </SocketProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
