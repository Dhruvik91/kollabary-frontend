'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Globe, Users, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SolutionsPage() {
    const solutions = [
        {
            title: "For Direct-to-Consumer Brands",
            icon: <TrendingUp />,
            desc: "Scale your customer acquisition with human-first performance marketing that bypasses the noise of traditional ads."
        },
        {
            title: "For Global Enterprises",
            icon: <Globe />,
            desc: "Centralize your influencer strategy across regions with robust management tools and custom analytics."
        },
        {
            title: "For Creator Agencies",
            icon: <Users />,
            desc: "Manage multiple talent rosters seamlessly while providing transparent reporting to your clients."
        }
    ];

    return (
        <StaticPageLayout
            title="Strategic Solutions"
            subtitle="Tailored approaches for every stage of brand growth."
        >
            <div className="grid grid-cols-1 gap-8 mb-16">
                {solutions.map((sol, idx) => (
                    <StaticSection key={idx} title={sol.title} icon={<div className="text-primary">{sol.icon}</div>} index={idx}>
                        <p className="text-lg opacity-90 leading-relaxed mb-6">{sol.desc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-sm font-medium">
                                • Custom Attribution Models
                            </div>
                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-sm font-medium">
                                • Multi-Region Support
                            </div>
                        </div>
                    </StaticSection>
                ))}
            </div>

            <div className="bg-primary p-12 md:p-20 rounded-[4rem] text-primary-foreground text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready for a custom solution?</h2>
                <p className="max-w-xl mx-auto opacity-90 text-lg mb-10">Our enterprise team can build a strategy that fits your unique organizational needs.</p>
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-12 h-14 font-extrabold text-lg shadow-xl shadow-black/20">Talk to Strategy Expert</Button>
            </div>
        </StaticPageLayout>
    );
}
