'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Gavel, BarChart4, ChevronRight } from 'lucide-react';
import { GlowCard } from '../shared/GlowCard';

import Link from 'next/link';
import Image from 'next/image';
import { FRONTEND_ROUTES, COIN_URL } from '@/constants';

const steps = [
    {
        icon: UserPlus,
        title: 'Seamless Onboarding',
        desc: 'Quickly set up your profile as a Brand or Influencer with secure OAuth integration.',
        color: 'from-sky-500/20 to-blue-500/20'
    },
    {
        icon: Search,
        title: 'Ecosystem Discovery',
        desc: 'Explore the live auction dashboard or showcase your portfolio to attract premium partnerships.',
        color: 'from-purple-500/20 to-pink-500/20'
    },
    {
        icon: Gavel,
        title: 'Live Auction Bidding',
        desc: 'Brands create auctions; influencers place strategic bids. Real-time negotiations made simple.',
        color: 'from-orange-500/20 to-amber-500/20'
    },
    {
        icon: BarChart4,
        title: 'Performance & Settlement',
        desc: 'Execute campaigns, submit proof of work, and receive instant KC settlements.',
        color: 'from-emerald-500/20 to-teal-500/20'
    }
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 lg:py-40 bg-background relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-20 items-center justify-between mb-20 lg:mb-32">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-10"
                        >
                            The Kollabary <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary italic pr-2">Blueprint</span>
                        </motion.h2>
                        <p className="text-xl text-muted-foreground font-medium max-w-lg">
                            We've simplified the complex world of creator marketing into a streamlined, automated workflow.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
                    {steps.map((step, idx) => (
                        <GlowCard
                            key={step.title}
                            index={idx}
                            color={step.color}
                            ariaLabel={`Step 0${idx + 1}: ${step.title}. ${step.desc}`}
                        >
                            <div className="text-primary font-black text-6xl italic mb-6">0{idx + 1}</div>
                            <h3 className="text-2xl font-black mb-4 leading-tight">{step.title}</h3>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                {step.desc}
                            </p>
                        </GlowCard>
                    ))}
                </div>

                <div className="mt-20 lg:mt-32 p-12 lg:p-20 rounded-[3.5rem] bg-primary/5 border border-primary/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 md:justify-between text-center md:text-left group">
                    {/* Background Decorative Coins */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -left-10 w-40 h-40 opacity-[0.09] group-hover:opacity-[0.08] transition-opacity duration-700"
                        >
                            <Image src={COIN_URL} alt="" fill sizes="160px" className="object-contain" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 20, 0], rotate: [0, -45, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 right-[10%] w-32 h-32 opacity-[0.09] group-hover:opacity-[0.06] transition-opacity duration-700"
                        >
                            <Image src={COIN_URL} alt="" fill sizes="128px" className="object-contain" />
                        </motion.div>
                    </div>

                    <div className="relative z-10">
                        <h4 className="text-3xl md:text-4xl font-black mb-4">Ready to start your journey?</h4>
                        <p className="text-lg text-muted-foreground font-medium max-w-md">Join 500+ brands and creators already scaling on Kollabary.</p>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10"
                    >
                        <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
                            <button className="bg-primary text-primary-foreground font-black px-12 py-6 rounded-full shadow-2xl shadow-primary/20 text-lg uppercase tracking-widest hover:brightness-110 transition-all">
                                Get Started Now
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
