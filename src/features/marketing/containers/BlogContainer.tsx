'use client';

import React, { useState } from 'react';
import { StaticPageLayout } from '@/components/marketing/StaticPageLayout';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ultimate-guide-influencer-marketing-roi',
    title: 'The Ultimate Guide to Measuring Influencer Marketing ROI in 2026',
    excerpt: 'Discover how top brands measure campaign return on investment beyond vanity metrics. Learn frameworks for tracking reach, conversions, customer acquisition cost (CAC), and lifetime value (LTV).',
    category: 'For Brands',
    readTime: '8 min read',
    publishedAt: 'September 5, 2026',
    author: {
      name: 'Alex Rivera',
      role: 'Head of Growth Marketing'
    }
  },
  {
    slug: 'how-creators-land-high-paying-brand-deals',
    title: 'How Creators Can Land High-Paying Brand Deals & Build Long-Term Partnerships',
    excerpt: 'Step-by-step blueprint for content creators to structure media kits, pitch high-converting campaign proposals, negotiate rate cards, and secure recurring monthly brand retainers.',
    category: 'For Creators',
    readTime: '10 min read',
    publishedAt: 'September 2, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Creator Relations Strategist'
    }
  },
  {
    slug: 'bid-driven-influencer-marketplaces-explained',
    title: 'Why Bid-Driven Marketplaces Are Replacing Traditional Influencer Agencies',
    excerpt: 'An in-depth analysis of how dynamic bidding, smart milestone agreements, and API-verified data are disrupting legacy 30% agency commissions and long contract cycles.',
    category: 'Market Insights',
    readTime: '7 min read',
    publishedAt: 'August 28, 2026',
    author: {
      name: 'Marcus Vance',
      role: 'Product Specialist'
    }
  }
];

export const BlogContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'For Brands', 'For Creators', 'Market Insights'];

  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

  return (
    <StaticPageLayout
      title="Creator Economy Insights"
      subtitle="Industry analysis, ROI strategies, and actionable guides for brands and digital creators."
      lastUpdated="September 2026"
      showReturnHome={false}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'glass-chip border-border/40 text-muted-foreground hover:text-foreground hover:bg-primary/5'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[2rem] glass-card border border-border/50 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between p-7 group hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-border/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-foreground">{post.author.name}</p>
                <p className="text-[10px] text-muted-foreground">{post.publishedAt}</p>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </StaticPageLayout>
  );
};
