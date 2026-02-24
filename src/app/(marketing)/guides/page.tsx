'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Compass, Lightbulb, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuidesPage() {
    const guides = [
        { title: 'Choosing the Right Influencer', description: 'Metrics that matter more than follower count.' },
        { title: 'Campaign Budgeting 101', description: 'How to allocate your spend for maximum ROI.' },
        { title: 'The Art of the Brief', description: 'Writing instructions that inspire great content.' }
    ];

    return (
        <StaticPageLayout
            title="Success Guides"
            subtitle="Deep dives into the strategies that drive results."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {guides.map((guide, idx) => (
                    <motion.div
                        key={idx}
                        className="glass-card p-6 rounded-3xl border border-border/50 text-center flex flex-col items-center"
                        whileHover={{ y: -5 }}
                    >
                        <Compass className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                    </motion.div>
                ))}
            </div>

            <StaticSection title="Featured Guide: 2026 Strategy" icon={<Lightbulb className="w-6 h-6 text-primary" />} index={0}>
                <p>Our comprehensive 50-page guide on the state of influencer marketing. Updated quarterly with fresh data from over 10,000 successful campaigns.</p>
                <div className="mt-4 p-6 bg-primary/5 rounded-[2rem] border border-primary/20">
                    <h4 className="font-bold mb-2 flex items-center gap-2 italic">
                        <CheckCircle className="w-4 h-4 text-primary" /> What you'll learn:
                    </h4>
                    <ul className="text-sm space-y-2 opacity-80">
                        <li>• Why human-first marketing is winning in the AI age.</li>
                        <li>• How to spot fake engagement in 30 seconds.</li>
                        <li>• Negotiation tactics for long-term partnerships.</li>
                    </ul>
                </div>
            </StaticSection>
        </StaticPageLayout>
    );
}
