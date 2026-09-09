'use client';

import React, { useState } from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { HelpCircle, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Brands' | 'Creators' | 'Payments & Tokens';
}

const FAQS: FAQItem[] = [
  {
    category: 'General',
    question: 'What is Kollabary and how does it work?',
    answer: 'Kollabary is a bid-driven influencer marketing marketplace connecting verified creators with brands. Brands post campaign requirements, and creators submit bids with pitch proposals. Payouts are processed when approved deliverables are submitted.'
  },
  {
    category: 'General',
    question: 'Is Kollabary free to join for creators and brands?',
    answer: 'Yes! Account creation, browsing creators, and browsing campaign listings are 100% free. We charge a minimal platform transaction fee only when a campaign is successfully completed.'
  },
  {
    category: 'Brands',
    question: 'How do brands ensure creator metrics and reach are real?',
    answer: 'Kollabary integrates social platform APIs to verify authentic channel statistics, subscriber activity, and engagement rates. Our Prestige Ranking System continuously scores creators based on verified past campaign completions.'
  },
  {
    category: 'Brands',
    question: 'What happens if a creator fails to submit campaign deliverables?',
    answer: 'All campaign commitments are protected. If a creator fails to meet agreed specifications or deadlines, our Dispute Resolution team investigates and ensures brand refunds.'
  },
  {
    category: 'Creators',
    question: 'How do creators pitch and bid on brand campaigns?',
    answer: 'Creators can navigate to the active Auctions marketplace, filter by niche or compensation target, and submit a custom pitch along with their desired bid amount in KC Tokens or fiat value.'
  },
  {
    category: 'Creators',
    question: 'When and how do creators get paid?',
    answer: 'As soon as a brand approves the submitted deliverable link (or after the automated review window expires), funds are released immediately to the creator’s Kollabary wallet for withdrawal.'
  },
  {
    category: 'Payments & Tokens',
    question: 'What are KC Tokens and how do they work?',
    answer: 'KC Tokens serve as the internal credit system within Kollabary. They facilitate instant, zero-fee platform settlements, campaign top-ups, prestige boosts, and international payouts.'
  },
  {
    category: 'Payments & Tokens',
    question: 'What payment gateways are supported for wallet top-ups?',
    answer: 'We support major global payment methods including credit/debit cards, Razorpay, UPI, net banking, and wire transfers for enterprise brand accounts.'
  }
];

export const FAQContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'General', 'Brands', 'Creators', 'Payments & Tokens'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeTab === 'All' || faq.category === activeTab;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <StaticPageLayout
      title="Help & FAQ Center"
      subtitle="Everything you need to know about Kollabary marketplace, campaigns, milestones, and payments."
      lastUpdated="September 2026"
    >
      <div className="relative max-w-xl mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search questions (e.g. milestones, payouts, bidding)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 bg-background/50 border-border/60 rounded-full text-base shadow-inner text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveTab(cat); setOpenIndex(0); }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === cat
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'glass-chip border-border/40 text-muted-foreground hover:text-foreground hover:bg-primary/5'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <StaticSection title="Frequently Asked Questions" icon={<HelpCircle className="w-6 h-6 text-primary" />} index={0}>
        <div className="space-y-4 mt-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No matching questions found for "{searchTerm}".
            </p>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-border/50 rounded-2xl overflow-hidden glass-card transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-base md:text-lg text-foreground flex items-center gap-3">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-border/30 text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </StaticSection>
    </StaticPageLayout>
  );
};
