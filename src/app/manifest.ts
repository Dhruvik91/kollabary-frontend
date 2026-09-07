import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kollabary - Influencer Marketing Platform',
    short_name: 'Kollabary',
    description: 'Connect brands with influencers for authentic collaborations',
    start_url: '/',
    display: 'standalone',
    background_color: '#130c18',
    theme_color: '#ff5722',
    orientation: 'portrait-primary',
    icons: [
      {
        src: 'https://kollabary.s3.ap-south-1.amazonaws.com/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://kollabary.s3.ap-south-1.amazonaws.com/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'productivity', 'social'],
  };
}
