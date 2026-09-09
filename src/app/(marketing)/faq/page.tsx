import React from 'react';
import { Metadata } from 'next';
import { FAQContainer } from '@/features/marketing/containers/FAQContainer';

export const metadata: Metadata = {
  title: 'Help & FAQ Center — Kollabary',
  description: 'Everything you need to know about Kollabary marketplace, campaign auctions, milestone payments, and KC tokens.',
};

export default function FAQPage() {
  return <FAQContainer />;
}
