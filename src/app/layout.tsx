import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Sora } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { AuthProvider } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'
import { AppShell } from '@/components/AppShell'
import { GTMPageView } from '@/components/GTMPageView'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora'
})

export const metadata: Metadata = {
  title: {
    default: 'Kollabary - The Ultimate Influencer Marketplace',
    template: '%s | Kollabary'
  },
  description: 'Connect with top influencers and brands. Kollabary is the premier platform for influencer marketing collaborations, brand deals, and social media growth.',
  keywords: ['influencer marketplace', 'brand collaborations', 'social media marketing', 'influencer marketing', 'brand deals', 'Kollabary'],
  authors: [{ name: 'Kollabary' }],
  creator: 'Kollabary',
  publisher: 'Kollabary',
  applicationName: 'Kollabary',
  metadataBase: new URL('https://kollabary.com'),
  alternates: {
    canonical: '/'
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kollabary'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kollabary.com',
    title: 'Kollabary - The Ultimate Influencer Marketplace',
    description: 'Connect with top influencers and brands for premium collaborations.',
    siteName: 'Kollabary',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kollabary - Influencer Marketplace'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kollabary - The Ultimate Influencer Marketplace',
    description: 'Connect with top influencers and brands for premium collaborations.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kollabary",
              "alternateName": ["Kollabary Marketplace", "Kollabary App"],
              "url": "https://kollabary.com"
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange={false}
            >
              <AppShell>
                <GTMPageView />
                {children}
              </AppShell>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}