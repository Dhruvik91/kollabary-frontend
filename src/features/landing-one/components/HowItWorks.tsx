'use client';

import { useState } from 'react';
import { UserPlus, Sparkles, Megaphone, FileCheck, CheckCircle2, UserCheck, Settings, Eye, MessageSquareDot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HowItWorks() {
    const [activeTab, setActiveTab] = useState<'brands' | 'creators'>('brands');

    const brandSteps = [
        {
            icon: UserPlus,
            title: '1. Create brand profile',
            description: 'Set up your business identity, select your target audience metrics, and define your core brand niche.',
        },
        {
            icon: Megaphone,
            title: '2. Post opportunities',
            description: 'Detail your specific campaign requirements, target platform niches, budget terms, and content briefs.',
        },
        {
            icon: Eye,
            title: '3. Discover creators',
            description: 'Review custom applications from interested creators or actively search verified profiles via the filter panel.',
        },
        {
            icon: MessageSquareDot,
            title: '4. Connect & collaborate',
            description: 'Finalize negotiation terms, chat directly inside the platform messaging module, and successfully launch campaigns.',
        },
    ];

    const creatorSteps = [
        {
            icon: UserCheck,
            title: '1. Create creator profile',
            description: 'Set up your verified creator account, import your niche data, and link your best content portfolios.',
        },
        {
            icon: Settings,
            title: '2. Add niche & stats',
            description: 'Specify your core categories, audience location, follower counts, and engagement rate metrics.',
        },
        {
            icon: Sparkles,
            title: '3. Explore opportunities',
            description: 'Browse active campaigns, search briefs matching your audience style, and discover target brand deals.',
        },
        {
            icon: FileCheck,
            title: '4. Apply & collaborate',
            description: 'Submit your tailored pitch proposal, connect directly with brand managers, and start collaborations.',
        },
    ];

    const steps = activeTab === 'brands' ? brandSteps : creatorSteps;

    return (
        <section id="how-it-works" className="relative py-24 bg-background overflow-hidden border-t border-border/40">
            {/* Background elements */}
            <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
                        How Kollabary works
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground font-semibold">
                        A simplified, direct connection pipeline built to optimize productivity and eliminate middlemen agencies.
                    </p>

                    {/* Interactive Selector Switch */}
                    <div className="inline-flex p-1 rounded-2xl bg-muted border border-border/60 mt-10 relative">
                        <button
                            onClick={() => setActiveTab('brands')}
                            className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer focus:outline-none ${
                                activeTab === 'brands'
                                    ? 'text-primary bg-background shadow-sm border border-border/40 font-extrabold'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            For Brands
                        </button>
                        <button
                            onClick={() => setActiveTab('creators')}
                            className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer focus:outline-none ${
                                activeTab === 'creators'
                                    ? 'text-primary bg-background shadow-sm border border-border/40 font-extrabold'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            For Creators
                        </button>
                    </div>
                </div>

                {/* Steps Timeline Grid */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Horizontal Connector Line for Desktop */}
                    <div className="absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-border/40 hidden md:block z-0" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
                        >
                            {steps.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.title} className="flex flex-col items-center text-center group">
                                        {/* Icon Ring */}
                                        <div className="w-16 h-16 rounded-2xl bg-card border border-border hover:border-primary/50 flex items-center justify-center text-foreground group-hover:text-primary transition-all duration-300 shadow-sm mb-6 relative bg-background">
                                            <Icon className="w-6 h-6" />
                                            {/* Step counter bubble */}
                                            <span className="absolute -top-2 -right-2 w-5.5 h-5.5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary">
                                                {idx + 1}
                                            </span>
                                        </div>

                                        {/* Step Title & Description */}
                                        <h3 className="text-base font-bold text-foreground mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground font-semibold leading-relaxed px-2">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
