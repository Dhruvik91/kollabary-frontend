import React from 'react';
import { Metadata } from 'next';
import { AboutContainer } from '@/features/marketing/containers/AboutContainer';

export const metadata: Metadata = {
  title: 'About Us — Empowering Brand & Creator Partnerships',
  description: 'Learn how Kollabary is reshaping creator monetization and brand collaborations through transparency, bid-driven pricing, real-time analytics, and guaranteed milestone protection.',
  openGraph: {
    title: 'About Kollabary — Next-Gen Influencer Marketing Marketplace',
    description: 'Empowering authentic creator collaborations through verified data, transparent bidding, and secure milestone settlements.',
  }
};

export default function AboutPage() {
  return <AboutContainer />;
}
