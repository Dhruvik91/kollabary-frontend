'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Zap,
    Shield,
    Layers,
    Search,
    Gavel,
    Users,
    ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';

const brandEcosystem = [
    {
        title: 'Live Auction Dashboard',
        description: 'Launch tailored campaigns and watch elite creators compete for your vision in real-time.',
        icon: Gavel,
        color: 'text-[#f05166]',
    },
    {
        title: 'Authenticity Discovery',
        description: 'Find partners based on verified performance metrics, not just vanity follower counts.',
        icon: Search,
        color: 'text-amber-600',
    },
    {
        title: 'Synergy Hub',
        description: 'Manage complex multi-tier campaigns with zero friction using our automated workflows.',
        icon: Users,
        color: 'text-blue-600',
    },
];

const creatorEcosystem = [
    {
        title: 'Bid Strategy Engine',
        description: 'Navigate the auction floor and pitch your unique value proposition directly to global brands.',
        icon: Zap,
        color: 'text-[#52368c]',
    },
    {
        title: 'Proof-of-Value Workflow',
        description: 'Submit proof of work and secure your revenue with our evidence-based collaboration tools.',
        icon: Shield,
        color: 'text-emerald-600',
    },
    {
        title: 'Visibility Multiplier',
        description: 'Higher-ranked influencers get priority exposure in the discovery library.',
        icon: BarChart3,
        color: 'text-rose-600',
    },
];

/**
 * Ecosystem section showcasing the core engine (Auctions, Discovery, Collaborations)
 */
export const Features = () => {
    return (
        <div className="flex flex-col">
            {/* ─── Premium Ecosystem Intro ─── */}
            <section className="py-24 lg:py-40 bg-background relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-6 block"
                        >
                            The Core Engine
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
                            A Performance-Driven <br />
                            <span className="italic opacity-50">Ecosystem.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                            Kollabary simplifies the complexity of creator partnerships through a transparent, bid-driven marketplace.
                        </p>
                    </div>

                    {/* Brands Focus */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-32 lg:mb-56">
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <h3 className="text-3xl md:text-4xl font-black mb-8">
                                For <span className="text-primary italic">Brands.</span>
                            </h3>
                            <div className="space-y-10">
                                {brandEcosystem.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex gap-6 group cursor-default"
                                    >
                                        <div className={`mt-1 h-px w-8 bg-current transition-all group-hover:w-12 ${feature.color}`} />
                                        <div>
                                            <h4 className="text-xl font-black mb-2 flex items-center gap-2">
                                                <feature.icon size={20} className={feature.color} />
                                                {feature.title}
                                            </h4>
                                            <p className="text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <Button variant="link" className="mt-12 p-0 text-primary font-black uppercase tracking-widest text-xs h-auto group">
                                Explore Brand Solutions <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        <div className="lg:col-span-7 order-1 lg:order-2">
                            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden glass-card-elevated border-primary/10">
                                {/* Visual Mockup Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                                <div className="absolute inset-12 border border-dashed border-primary/20 rounded-[2rem] flex items-center justify-center">
                                    <Gavel size={120} className="text-primary opacity-10" />
                                </div>
                                {/* Floating Label */}
                                <div className="absolute top-8 left-8 glass-chip px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border-white/10">
                                    Live Auction Floor
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Influencers Focus */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-7">
                            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden glass-card border-secondary/10">
                                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-primary/5" />
                                <div className="absolute inset-12 border border-dashed border-secondary/20 rounded-[2rem] flex items-center justify-center">
                                    <Zap size={120} className="text-secondary opacity-10" />
                                </div>
                                <div className="absolute bottom-8 right-8 glass-chip px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border-white/10">
                                    Creator Synergy Hub
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <h3 className="text-3xl md:text-4xl font-black mb-8">
                                For <span className="text-secondary italic">Creators.</span>
                            </h3>
                            <div className="space-y-10">
                                {creatorEcosystem.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex gap-6 group cursor-default"
                                    >
                                        <div className={`mt-1 h-px w-8 bg-current transition-all group-hover:w-12 ${feature.color}`} />
                                        <div>
                                            <h4 className="text-xl font-black mb-2 flex items-center gap-2">
                                                <feature.icon size={20} className={feature.color} />
                                                {feature.title}
                                            </h4>
                                            <p className="text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <Button variant="link" className="mt-12 p-0 text-secondary font-black uppercase tracking-widest text-xs h-auto group">
                                Join the Creator Elite <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── How It Works ─── */}
            <section className="py-24 lg:py-40 bg-muted/20 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">The Path to Partnership.</h2>
                            <p className="text-lg text-muted-foreground font-medium">A structured workflow designed for mutual success.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center opacity-30">
                                <ChevronRight className="rotate-180" />
                            </div>
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                                <ChevronRight />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { step: '01', title: 'Onboarding', desc: 'Secure, multi-role setup with Google OAuth integration.' },
                            { step: '02', title: 'Discovery', desc: 'Explore campaigns or partners via our AI ranking engine.' },
                            { step: '03', title: 'Bidding', desc: 'Engage in transparent auction-style pitch and acceptance.' },
                            { step: '04', title: 'Execution', desc: 'Real-time status tracking and evidence-based completion.' },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-12 bg-background border border-border/50 rounded-[3rem] hover:border-primary/30 transition-all duration-500 group"
                            >
                                <span className="text-5xl font-black text-muted/20 group-hover:text-primary/10 transition-colors mb-8 block">
                                    {item.step}
                                </span>
                                <h4 className="text-2xl font-black mb-4">{item.title}</h4>
                                <p className="text-muted-foreground font-medium text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
