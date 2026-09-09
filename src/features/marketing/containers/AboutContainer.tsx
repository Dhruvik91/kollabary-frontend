'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { ShieldCheck, Target, Zap, Users, Award, Globe, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

export const AboutContainer = () => {
  return (
    <StaticPageLayout
      title="About Kollabary"
      subtitle="Reinventing the creator economy with transparency, real-time bidding, and zero-compromise security."
      lastUpdated="September 2026"
      showReturnHome={false}
    >
      <StaticSection title="1. Our Mission" icon={<Target className="w-6 h-6 text-primary" />} index={0}>
        <p>
          At Kollabary, our mission is simple yet transformative: to build the most transparent, efficient, and reliable marketplace connecting visionary brands with world-class digital creators.
        </p>
        <p className="mt-3">
          Traditional influencer marketing has long been plagued by obscure agency markups, unverified follower metrics, delayed payments, and opaque campaign management. Kollabary eliminates these friction points by introducing a dynamic, bid-driven ecosystem powered by verified performance data and milestone settlement protection.
        </p>
      </StaticSection>

      <StaticSection title="2. Why We Built Kollabary" icon={<Zap className="w-6 h-6 text-primary" />} index={1}>
        <p>
          The creator economy is expanding at an unprecedented rate, yet millions of high-performing creators struggle with consistent monetization, while brands squander budgets on unverified campaign reach.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-5 rounded-2xl glass-card border border-border/50">
            <h3 className="font-bold text-lg text-primary mb-2">For Brands</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Launch targeted campaigns with clear budget guardrails, receive competitive bids from verified influencers, review authentic engagement metrics, and only disburse funds upon successful content delivery.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-border/50">
            <h3 className="font-bold text-lg text-primary mb-2">For Creators</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gain direct access to active brand budgets, pitch your creative ideas, bid fairly based on your reach, and enjoy guaranteed, prompt payouts upon verified deliverable approval.
            </p>
          </div>
        </div>
      </StaticSection>

      <StaticSection title="3. Core Values & Principles" icon={<Award className="w-6 h-6 text-primary" />} index={2}>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <strong className="text-foreground">Total Transparency:</strong> Every bid, metrics report, and financial transaction is logged clearly with complete audit trails.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <strong className="text-foreground">Prestige & Meritocracy:</strong> Our proprietary prestige ranking system elevates authentic, top-delivering creators based on past performance rather than vanity follower counts.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <strong className="text-foreground">Milestone Protection:</strong> Financial peace of mind for both parties. Brand payments are verified prior to project launch and released immediately when milestones are satisfied.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <strong className="text-foreground">Global Scale:</strong> Supporting creators and multi-national brands across YouTube, Instagram, TikTok, and emerging social platforms worldwide.
            </div>
          </li>
        </ul>
      </StaticSection>

      <StaticSection title="4. Join the Ecosystem" icon={<Users className="w-6 h-6 text-primary" />} index={3}>
        <p>
          Whether you are a startup scaling your product reach or a top-tier creator seeking long-term brand partnerships, Kollabary provides the tools, intelligence, and marketplace to accelerate your growth.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
            <Button className="rounded-full px-8 py-6 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-lg shadow-primary/20">
              Get Started Today
            </Button>
          </Link>
          <Link href={FRONTEND_ROUTES.HOW_IT_WORKS}>
            <Button variant="outline" className="rounded-full px-8 py-6 border-border/60 hover:bg-primary/5">
              See How It Works
            </Button>
          </Link>
        </div>
      </StaticSection>
    </StaticPageLayout>
  );
};
