'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Zap,
    Shield,
    Layers
} from 'lucide-react';

const brandFeatures = [
    {
        title: 'Dynamic Auction Library',
        description: 'Launch high-impact campaigns and receive competitive proposals from elite creators in real-time.',
        icon: Layers,
        color: 'bg-[#f05166]/10 text-[#f05166]',
    },
    {
        title: 'Context-Aware Synergy',
        description: 'Manage conversations and campaign milestones through a unified, moderated messaging hub.',
        icon: Zap,
        color: 'bg-amber-500/10 text-amber-600',
    },
    {
        title: 'Elite Ranking Engine',
        description: 'Identify top-tier partners through our proprietary influence and trust scoring system.',
        icon: Shield,
        color: 'bg-blue-500/10 text-blue-600',
    },
];

const influencerFeatures = [
    {
        title: 'Direct Bidding Power',
        description: 'Navigate the auction floor and place strategic bids on exclusive brand opportunities.',
        icon: Zap,
        color: 'bg-[#52368c]/10 text-[#52368c]',
    },
    {
        title: 'Verified Sovereignty',
        description: 'Build authority with verified badges and tier-based reputation and rewards.',
        icon: Shield,
        color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
        title: 'Growth Synergy Hub',
        description: 'Scale your professional footprint with deep engagement analytics and direct brand access.',
        icon: BarChart3,
        color: 'bg-rose-500/10 text-rose-600',
    },
];

const steps = [
    { number: '01', title: 'Professional Onboarding', description: 'Create a high-fidelity profile and verify your social footprint to join the elite network.' },
    { number: '02', title: 'Dynamic Discovery', description: 'Explore the auction library or discover perfect partners through our AI-driven matching engine.' },
    { number: '03', title: 'Strategic Bidding', description: 'Submit custom proposals or review diverse bids to find the perfect collaborative fit.' },
    { number: '04', title: 'Omni-Channel Success', description: 'Communicate securely and track impact through your centralized collaboration dashboard.' },
];

/**
 * Features section with partitioned Brand/Influencer sections and How It Works
 */
export const Features = () => {
    return (
        <>
            {/* For Brands Section */}
            <section id="brands" className="py-24 lg:py-32 bg-background relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-foreground">
                                Empowering <span className="text-primary">Brands</span> <br className="hidden md:block" />
                                to Scale Authenticity.
                            </h2>
                            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                We provide the enterprise-grade tools necessary to discover, manage, and optimize your influencer marketing at any scale.
                            </p>
                            <div className="space-y-4 lg:space-y-6">
                                {brandFeatures.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-6 p-6 rounded-3xl hover:bg-muted/50 transition-colors text-left"
                                    >
                                        <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${feature.color} glass`}>
                                            <feature.icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                            <p className="text-muted-foreground font-medium">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                                <div className="relative glass border border-border/50 rounded-[3rem] p-12 aspect-square flex items-center justify-center shadow-2xl">
                                    <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                                        <Layers size={120} className="text-primary/20" />
                                    </div>
                                    {/* Floating elements */}
                                    <motion.div
                                        animate={{ y: [0, -20, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -top-10 -right-10 w-24 h-24 glass rounded-2xl border border-white/10 flex items-center justify-center text-primary shadow-xl"
                                    >
                                        <Zap size={40} />
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, 20, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                                        className="absolute -bottom-10 -left-10 w-32 h-32 glass rounded-3xl border border-white/10 flex items-center justify-center text-blue-500 shadow-xl"
                                    >
                                        <Shield size={50} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* For Influencers Section */}
            <section id="influencers" className="py-24 lg:py-32 bg-background text-secondary-foreground relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.1)_0%,transparent_70%)]" />
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
                        <div className="hidden lg:block relative order-1">
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                                <div className="relative glass border border-white/10 rounded-[3rem] p-12 aspect-square flex items-center justify-center shadow-2xl">
                                    <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                                        <BarChart3 size={120} className="text-white/10" />
                                    </div>
                                    {/* Floating elements */}
                                    <motion.div
                                        animate={{ y: [0, 20, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -top-10 -left-10 w-24 h-24 glass rounded-2xl border border-white/10 flex items-center justify-center text-primary shadow-xl"
                                    >
                                        <Zap size={40} />
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, -20, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                                        className="absolute -bottom-10 -right-10 w-32 h-32 glass rounded-3xl border border-white/10 flex items-center justify-center text-emerald-500 shadow-xl"
                                    >
                                        <Shield size={50} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center lg:text-left order-2">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                                Built for <span className="text-primary">Creators</span> <br className="hidden md:block" />
                                to Thrive Professionally.
                            </h2>
                            <p className="text-lg text-secondary-foreground/70 mb-12 max-w-xl mx-auto lg:ml-auto lg:mr-0 leading-relaxed font-medium">
                                Turn your creative passion into a sustainable career with direct access to top-tier brand partnerships and professional growth tools.
                            </p>
                            <div className="space-y-4 lg:space-y-6">
                                {influencerFeatures.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors text-left"
                                    >
                                        <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${feature.color} border border-white/10 glass`}>
                                            <feature.icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                            <p className="text-secondary-foreground/60 font-medium">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 lg:py-32 bg-muted/30">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">How Kollabary Works</h2>
                        <p className="text-lg text-muted-foreground font-medium">Simple steps to build lasting, impactful partnerships.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-10 bg-card rounded-[3rem] shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-shadow group overflow-hidden border border-border/50"
                            >
                                <div className="absolute top-0 right-0 p-8 text-6xl font-black text-primary/5 group-hover:text-primary/10 transition-colors uppercase italic">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-black mb-4 text-primary">{step.title}</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {/* <section className="py-20 border-y border-border bg-background">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                        {[
                            { label: 'Verified Brands', value: '5,000+' },
                            { label: 'Active Creators', value: '50,000+' },
                            { label: 'Campaigns Ran', value: '1M+' },
                            { label: 'In Payouts', value: '$100M+' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group">
                                <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
        </>
    );
};
