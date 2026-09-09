'use client';

import React, { useState } from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Coins, Check, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

export const PricingContainer = () => {
  const [tokenAmount, setTokenAmount] = useState<number>(1000);

  return (
    <StaticPageLayout
      title="Transparent Pricing & KC Economy"
      subtitle="Zero hidden agency fees, zero setup costs. Pay only when successful collaborations are completed."
      lastUpdated="September 2026"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Creators Plan */}
        <div className="p-8 rounded-[2rem] glass-card border border-border/50 flex flex-col justify-between space-y-6 relative">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono mb-4">
              FOR CREATORS
            </div>
            <h3 className="text-3xl font-extrabold text-foreground mb-2">100% Free Access</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Browse campaigns, pitch to top brands, and build your prestige profile with zero upfront costs or subscription fees.
            </p>
            <div className="space-y-3">
              {[
                'Unlimited campaign pitch submissions',
                'Guaranteed milestone payment protection',
                'Instant wallet payouts upon content approval',
                'Verified audience analytics profile',
                'Prestige ranking progress & badge rewards',
                'Direct workspace messaging with brand managers'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=creator`}>
            <Button className="w-full rounded-full py-6 bg-primary text-primary-foreground font-bold hover:brightness-110">
              Join as a Creator
            </Button>
          </Link>
        </div>

        {/* Brands Plan */}
        <div className="p-8 rounded-[2rem] glass-card border border-primary/40 flex flex-col justify-between space-y-6 relative bg-primary/5">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold font-mono mb-4">
              FOR BRANDS
            </div>
            <h3 className="text-3xl font-extrabold text-foreground mb-2">Pay Per Campaign</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              No monthly retainer fees. Post campaign auctions, receive bids from verified influencers, and pay standard flat platform fee.
            </p>
            <div className="space-y-3">
              {[
                'Post unlimited campaign requirement auctions',
                'Compare competitive bids from verified creators',
                'Protected milestone payments with money-back guarantee',
                'Detailed engagement & ROI analytics tracking',
                'Dedicated Account Manager support for enterprise plans',
                'Zero hidden markups or agency commissions'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=brand`}>
            <Button className="w-full rounded-full py-6 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-lg shadow-primary/20">
              Launch Brand Campaign
            </Button>
          </Link>
        </div>
      </div>

      <StaticSection title="KC Token Settlement Economy" icon={<Coins className="w-6 h-6 text-primary" />} index={1}>
        <p>
          KC Tokens serve as the utility engine for seamless marketplace transactions. By maintaining wallet balances in KC Tokens, users unlock:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-5 rounded-2xl glass-card border border-border/50">
            <Zap className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-bold text-base mb-1 text-foreground">Instant Payouts</h4>
            <p className="text-xs text-muted-foreground">Zero waiting periods or bank clearing delays when settling via KC wallet balance.</p>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-border/50">
            <Sparkles className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-bold text-base mb-1 text-foreground">Prestige Boosts</h4>
            <p className="text-xs text-muted-foreground">Stake tokens or earn bonus tokens to highlight campaign pitches and boost creator ranking.</p>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-border/50">
            <ShieldCheck className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-bold text-base mb-1 text-foreground">Fee Discounts</h4>
            <p className="text-xs text-muted-foreground">Brands and creators using KC Token settlements enjoy discounted transaction fees.</p>
          </div>
        </div>
      </StaticSection>
    </StaticPageLayout>
  );
};
