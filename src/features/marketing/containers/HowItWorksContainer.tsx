'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { FilePlus2, Search, CheckCircle2, Wallet, Sparkles, Send, PlayCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

export const HowItWorksContainer = () => {
  const brandSteps = [
    {
      step: '01',
      title: 'Post Campaign Auction',
      desc: 'Define campaign objectives, required platforms (YouTube, Instagram, TikTok), deliverables, budget range, and timeline.',
      icon: FilePlus2
    },
    {
      step: '02',
      title: 'Review Creator Bids & Pitches',
      desc: 'Receive competitive proposals from verified creators. Evaluate authentic audience stats, prestige rankings, and portfolio reels.',
      icon: Search
    },
    {
      step: '03',
      title: 'Accept Bid & Confirm Campaign',
      desc: 'Confirm the agreed budget safely on Kollabary. Work begins immediately upon payment confirmation.',
      icon: Wallet
    },
    {
      step: '04',
      title: 'Approve & Release Payment',
      desc: 'Review submitted content draft. Once satisfied with the posted link, approve the milestone to trigger instant payout release.',
      icon: CheckCircle2
    }
  ];

  const creatorSteps = [
    {
      step: '01',
      title: 'Build Verified Profile',
      desc: 'Connect social accounts, list content niches, add past campaign highlights, and earn your initial Prestige Rank.',
      icon: Sparkles
    },
    {
      step: '02',
      title: 'Discover & Pitch Campaigns',
      desc: 'Explore open auctions matching your category. Craft compelling pitches and submit custom bids matching your rates.',
      icon: Send
    },
    {
      step: '03',
      title: 'Create & Submit Content',
      desc: 'Collaborate with the brand via live workspace chat, craft original media, and submit proof of posting.',
      icon: PlayCircle
    },
    {
      step: '04',
      title: 'Get Paid Instantly',
      desc: 'Receive funds directly into your Kollabary wallet as soon as deliverables are approved, with zero delay or payment chasing.',
      icon: ShieldCheck
    }
  ];

  return (
    <StaticPageLayout
      title="How Kollabary Works"
      subtitle="A seamless, transparent workflow connecting brands with creators from pitch to payout."
      lastUpdated="September 2026"
    >
      <StaticSection title="For Brands: 4 Steps to Campaign Success" icon={<FilePlus2 className="w-6 h-6 text-primary" />} index={0}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {brandSteps.map((b) => (
            <div key={b.step} className="p-6 rounded-2xl glass-card border border-border/50 relative overflow-hidden">
              <span className="text-4xl font-black text-primary/20 absolute right-4 top-4 font-mono">{b.step}</span>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </StaticSection>

      <StaticSection title="For Creators: 4 Steps to Consistent Income" icon={<Sparkles className="w-6 h-6 text-primary" />} index={1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {creatorSteps.map((c) => (
            <div key={c.step} className="p-6 rounded-2xl glass-card border border-border/50 relative overflow-hidden">
              <span className="text-4xl font-black text-primary/20 absolute right-4 top-4 font-mono">{c.step}</span>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </StaticSection>

      <StaticSection title="Ready to Get Started?" icon={<CheckCircle2 className="w-6 h-6 text-primary" />} index={2}>
        <p>Join thousands of brands and creators scaling their marketing operations on Kollabary.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
            <Button className="rounded-full px-8 py-6 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-lg shadow-primary/20">
              Create Account
            </Button>
          </Link>
        </div>
      </StaticSection>
    </StaticPageLayout>
  );
};
