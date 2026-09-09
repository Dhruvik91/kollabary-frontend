import React from 'react';
import { Metadata } from 'next';
import { PricingContainer } from '@/features/marketing/containers/PricingContainer';

export const metadata: Metadata = {
  title: 'Pricing & Token Economy — Simple, Fair & Transparent',
  description: 'Learn about Kollabary transparent pricing, platform transaction fees, KC Token settlement benefits, and Prestige tier rewards.',
};

export default function PricingPage() {
  return <PricingContainer />;
}
