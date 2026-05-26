'use client';

import { motion } from 'framer-motion';
import {
    BarChart3,
    Zap,
    Shield,
    Search,
    Gavel,
    Users,
} from 'lucide-react';
import Image from 'next/image';
import { LANDING_PAGE_IMAGES_URL } from '@/constants';

const brandEcosystem = [
    {
        title: 'Live Bidding',
        description: 'Start campaigns and let creators bid for your work in real-time.',
        icon: Gavel,
        color: 'text-[#f05166]',
    },
    {
        title: 'Find Real Creators',
        description: 'Find partners based on their actual work and history, not just follower counts.',
        icon: Search,
        color: 'text-amber-600',
    },
    {
        title: 'Collaboration Tool',
        description: 'Manage all your partnerships in one place with simple steps.',
        icon: Users,
        color: 'text-sky-500',
    },
];

const creatorEcosystem = [
    {
        title: 'Smart Bidding',
        description: 'Talk directly to brands and show them why you are the best fit for their project.',
        icon: Zap,
        color: 'text-secondary',
    },
    {
        title: 'Work Verification',
        description: 'Submit your work and get paid safely using our built-in tools.',
        icon: Shield,
        color: 'text-emerald-600',
    },
    {
        title: 'Get Noticed More',
        description: 'Creators who do great work get shown to more brands automatically.',
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
                            How it works
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9] transform-gpu">
                            Collaborate <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-secondary italic pr-2">Simpler.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed text-balance">
                            Kollabary makes working together easy. We use an automated bidding system so you can focus on the work, not the paperwork.
                        </p>
                    </div>

                    {/* Brands Focus */}
                    <div id="brands" className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-32 lg:mb-56">
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
                        </div>

                        <div className="lg:col-span-7 order-1 lg:order-2 relative group">
                            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" aria-hidden="true" />
                            <div className="relative aspect-16/10 sm:aspect-4/3 rounded-[3rem] overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                                <Image 
                                    src={LANDING_PAGE_IMAGES_URL.BRAND} 
                                    alt="Kollabary Brand Dashboard showing influencer campaign management and live auctions" 
                                    fill 
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent pointer-events-none" />
                                <div className="absolute top-8 left-8 glass-chip px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border-white/10 z-10">
                                    Brand Marketplace
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Influencers Focus */}
                    <div id="influencers" className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute -inset-10 bg-secondary/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" aria-hidden="true" />
                            <div className="relative aspect-16/10 sm:aspect-4/3 rounded-[3rem] overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                                <Image 
                                    src={LANDING_PAGE_IMAGES_URL.INFLUENCER} 
                                    alt="Kollabary Creator Workspace showing active collaborations and performance metrics" 
                                    fill 
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-tr from-secondary/10 to-transparent pointer-events-none" />
                                <div className="absolute bottom-8 right-8 glass-chip px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border-white/10 z-10">
                                    Creator Workspace
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5" role="contentinfo" aria-label="Creator Focused Features">
                            <h3 className="text-3xl md:text-4xl font-black mb-8">
                                For <span className="text-secondary dark:text-primary italic">Creators.</span>
                            </h3>
                            <div className="space-y-10">
                                {creatorEcosystem.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        aria-label={`Creator Feature: ${feature.title}`}
                                        className="flex gap-6 group cursor-default"
                                    >
                                        <div className={`mt-1 h-px w-8 bg-current transition-all group-hover:w-12 ${feature.color} dark:text-primary`} aria-hidden="true" />
                                        <div>
                                            <h4 className="text-xl font-black mb-2 flex items-center gap-2">
                                                <feature.icon size={20} className={`${feature.color} dark:text-primary`} aria-hidden="true" />
                                                {feature.title}
                                            </h4>
                                            <p className="text-muted-foreground dark:text-muted-foreground/80 font-medium leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
