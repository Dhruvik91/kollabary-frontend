// const cspHeader = `
//   default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://apis.google.com https://*.firebaseapp.com https://*.google.com https://*.posthog.com;
//   style-src 'self' 'unsafe-inline';
//   img-src 'self' data: blob: https://kollabary.s3.ap-south-1.amazonaws.com https://*.googletagmanager.com https://*.google-analytics.com https://*.google.com https://*.posthog.com https://lh3.googleusercontent.com https://assets.calendly.com;
//   font-src 'self' data:;
//   connect-src 'self' http://localhost:3008 ws://localhost:3008 https://*.kollabary.com wss://*.kollabary.com https://*.googleapis.com https://*.firebaseapp.com https://*.google-analytics.com https://*.googletagmanager.com https://*.posthog.com;
//   frame-src 'self' https://*.firebaseapp.com https://*.google.com https://calendly.com;
//   object-src 'none';
//   base-uri 'self';
//   form-action 'self';
// `.replace(/\s{2,}/g, ' ').trim();

const permissionsPolicyHeader = "camera=(), microphone=(), geolocation=(), interest-cohort=()";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kollabary.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // PostHog reverse proxy
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // PWA Configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // {
          //   key: 'Content-Security-Policy',
          //   value: cspHeader,
          // },
          {
            key: 'Permissions-Policy',
            value: permissionsPolicyHeader,
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
