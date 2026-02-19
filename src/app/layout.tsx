import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";
import { PWAInstaller } from "@/components/pwa/PWAInstaller";

import { ThemeProvider } from "@/lib/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kollabary - Enterprise Influencer Collaboration Platform",
  description: "Scale your brand through authentic human connections. The next generation influencer management platform.",
  manifest: "/manifest.json",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Kollabary - Enterprise Influencer Collaboration Platform",
    description: "Scale your brand through authentic human connections. The next generation influencer management platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/10 selection:text-primary`}
      >
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster position="top-right" richColors closeButton />
              <PWAInstaller />
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
