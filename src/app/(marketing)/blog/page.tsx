'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { BookOpen, TrendingUp, Star, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
    const posts = [
        {
            title: "5 Trends Shaping Influencer Marketing in 2026",
            excerpt: "From AI-human hybrids to micro-community focus, here's what to watch.",
            tag: "Trends",
            date: "Feb 22, 2026"
        },
        {
            title: "Building Trust: A Guide for Emerging Brands",
            excerpt: "Authenticity is the currency of the future. Learn how to spend it wisely.",
            tag: "Strategy",
            date: "Feb 18, 2026"
        },
        {
            title: "How to Measure ROI on Brand Partnerships",
            excerpt: "Moving beyond likes and comments to real business impact metrics.",
            tag: "Analytics",
            date: "Feb 14, 2026"
        }
    ];

    return (
        <StaticPageLayout
            title="Kollabary Blog"
            subtitle="Insights, trends, and strategies from the leading edge of influencer marketing."
        >
            <div className="relative mb-8">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input className="w-full bg-card/50 border border-border rounded-full pl-14 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search articles..." />
            </div>

            <div className="grid grid-cols-1 gap-8">
                {posts.map((post, idx) => (
                    <motion.article
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="glass-card p-8 rounded-[2.5rem] border border-border/50 hover:border-primary/20 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">{post.tag}</span>
                            <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{post.excerpt}</p>
                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary">
                            Read Article <TrendingUp className="w-4 h-4" />
                        </div>
                    </motion.article>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="text-muted-foreground mb-4">Want insights delivered to your inbox?</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input className="flex-grow bg-background border border-border rounded-full px-6 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="your@email.com" />
                    <Button className="rounded-full px-8">Subscribe</Button>
                </div>
            </div>
        </StaticPageLayout>
    );
}
