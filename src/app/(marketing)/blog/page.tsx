import React from 'react';
import { Metadata } from 'next';
import { BlogContainer } from '@/features/marketing/containers/BlogContainer';

export const metadata: Metadata = {
  title: 'Blog & Insights — Creator Economy & Influencer Marketing',
  description: 'Expert articles, industry guides, and monetization strategies for creators and brands on Kollabary.',
};

export default function BlogIndexPage() {
  return <BlogContainer />;
}
