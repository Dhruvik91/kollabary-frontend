import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { ProfileCompletionProvider } from "@/contexts/profile-completion-context";
import { SocketProvider } from "@/contexts/socket-context";
import { Toaster } from "sonner";
import { ConfettiProvider } from '@/contexts/confetti-context';
import { PWAInstaller } from "@/components/pwa/PWAInstaller";
import { ThemeProvider } from "@/lib/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { CookieConsent } from "@/components/shared/CookieConsent";
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
    default: "Kollabary — Influencer Marketing Platform for Brand-Creator Campaigns",
  },
  description: "Kollabary connects premium brands with verified creators through a bid-driven marketplace. Launch campaigns, track performance, and settle in real-time. Join free.",
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
    title: "Kollabary — Influencer Marketing Platform for Brand-Creator Campaigns",
    description: "Kollabary connects premium brands with verified creators through a bid-driven marketplace. Launch campaigns, track performance, and settle in real-time.",
    images: [{ url: "https://kollabary.s3.ap-south-1.amazonaws.com/kollabary_preview_image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kollabary — Influencer Marketing Platform for Brand-Creator Campaigns",
    description: "Kollabary connects premium brands with verified creators through a bid-driven marketplace. Launch campaigns, track performance, and settle in real-time.",
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
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kollabary",
              "alternateName": ["Kollabary Platform", "Kollabary Influencer Platform"],
              "url": "https://www.kollabary.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.kollabary.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kollabary",
              "url": "https://www.kollabary.com",
              "logo": "https://kollabary.s3.ap-south-1.amazonaws.com/kollabary_logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@kollabary.com",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://twitter.com/kollabary",
                "https://www.linkedin.com/company/kollabary",
                "https://www.instagram.com/kollabary"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Kollabary",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          ]),
        }}
      />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-549HSQ8R'} />
      <body
        className={`${geistMono.variable} antialiased selection:bg-primary/10 selection:text-primary`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <AuthProvider>
              <ProfileCompletionProvider>
                <ConfettiProvider>
                  <SocketProvider>
                    <TooltipProvider>
                      <SmoothScroll>
                        {children}
                        <Toaster position="top-right" richColors closeButton />
                        <PWAInstaller />
                        <CookieConsent />
                      </SmoothScroll>
                    </TooltipProvider>
                  </SocketProvider>
                </ConfettiProvider>
              </ProfileCompletionProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
