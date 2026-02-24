'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { FileCode, Terminal, Layers, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function DocsPage() {
    const docLinks = [
        { title: 'Getting Started', items: ['Quick start guide', 'Setting up your profile', 'Brand verification'] },
        { title: 'Influencer Guide', items: ['Optimal bio strategies', 'Ranking factors', 'Portfolio tips'] },
        { title: 'API Reference', items: ['Authentication', 'Search endpoints', 'Webhooks'] },
        { title: 'Enterprise', items: ['SAML/SSO', 'Custom analytics', 'Dedicated support'] }
    ];

    return (
        <StaticPageLayout
            title="Documentation"
            subtitle="Everything you need to integrate and succeed with Kollabary."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <StaticSection title="For Developers" icon={<Terminal className="w-6 h-6 text-primary" />} index={0}>
                    <p>Integrate Kollabary features into your own applications with our robust API and SDKs.</p>
                </StaticSection>

                <StaticSection title="For Marketers" icon={<Layers className="w-6 h-6 text-primary" />} index={1}>
                    <p>Learn how to use our advanced discovery and analytics tools to find your perfect partners.</p>
                </StaticSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {docLinks.map((section, idx) => (
                    <motion.div
                        key={idx}
                        className="p-8 rounded-[2rem] border border-border/50 bg-card/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                        <ul className="space-y-3">
                            {section.items.map((item, idy) => (
                                <li key={idy} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                    <FileCode className="w-4 h-4 opacity-50" /> {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-16 bg-primary/5 p-12 rounded-[3rem] border border-primary/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
                <p className="text-muted-foreground mb-8">Our support team is available 24/7 to help with technical and integration questions.</p>
                <Button className="rounded-full px-12">Visit Help Center</Button>
            </motion.div>
        </StaticPageLayout>
    );
}
