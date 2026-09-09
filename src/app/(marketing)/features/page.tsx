import React from 'react';
import { Metadata } from 'next';
import { FeaturesContainer } from '@/features/marketing/containers/FeaturesContainer';

export const metadata: Metadata = {
  title: 'Platform Features — Bidding, Milestone Settlements & Prestige Analytics',
  description: 'Explore Kollabary platform features: Real-Time Bidding Marketplace, Secure Milestone Settlements, Prestige Ranking Engine, In-App Direct Messaging, and Live Campaign Analytics.',
};

export default function FeaturesPage() {
  return <FeaturesContainer />;
}
