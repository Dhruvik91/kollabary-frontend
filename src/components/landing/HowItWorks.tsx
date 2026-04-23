'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Gavel, BarChart4, ChevronRight } from 'lucide-react';

const steps = [
    {
        icon: UserPlus,
        title: 'Seamless Onboarding',
        desc: 'Quickly set up your profile as a Brand or Influencer with secure OAuth integration.',
        color: 'from-blue-500/20 to-cyan-500/20'
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
                            The <span className="text-primary italic">Kollabary</span> <br /> Blueprint.
                        </motion.h2>
                        <p className="text-xl text-muted-foreground font-medium max-w-lg">
                            We've simplified the complex world of creator marketing into a streamlined, automated workflow.
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
                             <ChevronRight className="text-primary" size={48} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group h-full"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]`} />
                            <div className="relative h-full bg-card/40 backdrop-blur-sm border border-white/5 p-10 rounded-[3rem] flex flex-col hover:border-primary/20 transition-all duration-500">
                                <div className="text-primary/20 font-black text-6xl italic mb-6">0{idx + 1}</div>
                                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                    <step.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-black mb-4 leading-tight">{step.title}</h3>
                                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-20 lg:mt-32 p-12 rounded-[3.5rem] bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-10 md:justify-between text-center md:text-left">
                    <div>
                        <h4 className="text-2xl font-black mb-2">Ready to start your journey?</h4>
                        <p className="text-muted-foreground font-medium">Join 500+ brands and creators already scaling on Kollabary.</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="bg-primary text-primary-foreground font-black px-10 py-5 rounded-full shadow-2xl shadow-primary/20 text-lg uppercase tracking-wider">
                            Get Started Now
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
