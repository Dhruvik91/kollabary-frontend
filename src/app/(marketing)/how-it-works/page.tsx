import React from 'react';
import { Metadata } from 'next';
import { HowItWorksContainer } from '@/features/marketing/containers/HowItWorksContainer';

export const metadata: Metadata = {
  title: 'How It Works — Step-by-Step Guide for Brands & Creators',
  description: 'Understand how Kollabary works for Brands and Creators: from posting campaign auctions and pitching to campaign funding, deliverable review, and instant payouts.',
};

export default function HowItWorksPage() {
  return <HowItWorksContainer />;
}
