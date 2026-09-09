'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Gavel, ShieldCheck, TrendingUp, MessageSquareText, Coins, Award, BarChart3, Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

export const FeaturesContainer = () => {
  const featureList = [
    {
      icon: Gavel,
      title: 'Dynamic Bidding Marketplace',
      description: 'Brands set campaign guidelines and initial budgets while qualified creators submit competitive bids and pitch proposals. Achieve true market rate valuation for every campaign.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Milestone Protection',
      description: 'Zero financial risk. Campaign payouts are verified upfront and automatically released upon successful deliverable verification and brand approval.'
    },
    {
      icon: Award,
      title: 'Prestige Ranking Engine',
      description: 'Creators earn rank scores (Bronze to Diamond Prestige) based on verified campaign completion rate, audience engagement authenticity, and prompt deliverable submissions.'
    },
    {
      icon: Coins,
      title: 'KC Token Settlement Economy',
      description: 'Instant zero-fee wallet top-ups, micro-rewards, and international transactions powered by our seamless KC credit system.'
    },
    {
      icon: MessageSquareText,
      title: 'Real-Time Workspace Chat',
      description: 'Direct end-to-end workspace messaging for brands and creators to negotiate deliverables, share draft media previews, and refine campaign scripts.'
    },
    {
      icon: BarChart3,
      title: 'Verified Audience Analytics',
      description: 'Real-time integration with YouTube, Instagram, and TikTok APIs to inspect authentic audience demographics, reach metrics, and engagement history.'
    },
    {
      icon: Video,
      title: 'Video Showcase & Portfolio',
      description: 'Creators showcase high-performing short video reels and past brand collaboration clips directly on their shareable public profiles.'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Campaign Tracking',
      description: 'Brands monitor live deliverable progress, review pitch submissions, track clicks, and receive automated email/push notifications at every project phase.'
    }
  ];

  return (
    <StaticPageLayout
      title="Platform Features"
      subtitle="Engineered for maximum velocity, performance transparency, and trusted brand collaborations."
      lastUpdated="September 2026"
      showReturnHome={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {featureList.map((feat, idx) => (
          <div
            key={idx}
            className="p-8 rounded-[2rem] glass-card border border-border/50 hover:border-primary/30 transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{feat.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {feat.description}
            </p>
          </div>
        ))}
      </div>

      <StaticSection title="Built for Modern Marketing Teams & Creators" icon={<ShieldCheck className="w-6 h-6 text-primary" />} index={1}>
        <p>
          Whether you are launching your first influencer campaign or scaling multi-channel influencer budgets across hundreds of creators, Kollabary provides enterprise control with self-serve ease.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
            <Button className="rounded-full px-8 py-6 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-lg shadow-primary/20">
              Launch Campaign Now
            </Button>
          </Link>
        </div>
      </StaticSection>
    </StaticPageLayout>
  );
};
