'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, ShieldCheck, Target, Zap, Handshake } from 'lucide-react';
import { TIER_IMAGES } from '@/constants';
import Image from 'next/image';

const tiers = [
    { name: 'Rising Creator', image: TIER_IMAGES.RISING_CREATOR, min: '0 - 10 Projects', border: 'border-emerald-500/10', bg: 'bg-emerald-500/5', color: 'text-emerald-500', desc: 'Starting out and getting your profile verified.' },
    { name: 'Emerging Partner', image: TIER_IMAGES.EMERGING_PARTNER, min: '11 - 30 Projects', border: 'border-blue-500/10', bg: 'bg-blue-500/5', color: 'text-blue-500', desc: 'Regularly working on projects and delivering on time.' },
    { name: 'Trusted Collaborator', image: TIER_IMAGES.TRUSTED_COLLABORATOR, min: '31 - 75 Projects', border: 'border-teal-500/10', bg: 'bg-teal-500/5', color: 'text-teal-500', desc: 'Creators with a perfect history of finishing their work.' },
    { name: 'Pro Influencer', image: TIER_IMAGES.PRO_INFLUENCER, min: '76 - 150 Projects', border: 'border-purple-500/10', bg: 'bg-purple-500/5', color: 'text-purple-500', desc: 'Expert creators who bring great results for brands.' },
    { name: 'Elite Creator', image: TIER_IMAGES.ELITE_CREATOR, min: '151 - 300 Projects', border: 'border-amber-500/10', bg: 'bg-amber-500/5', color: 'text-amber-500', desc: 'Our best creators with access to high-budget projects.' },
    { name: 'Kollabary Icon', image: TIER_IMAGES.KOLLABARY_ICON, min: '300+ Projects', border: 'border-primary/20', bg: 'bg-primary/5', color: 'text-primary', desc: 'The most trusted creators on the platform.' },
];

const metrics = [
    { icon: Handshake, label: 'Finished Projects', desc: 'The more you work, the faster you level up.' },
    { icon: Target, label: 'Project Success', desc: 'Delivering high-quality work for every brand you work with.' },
    { icon: Star, label: 'Repeat Work', desc: 'How often brands choose to work with you again.' },
    { icon: ShieldCheck, label: 'Checked Work', desc: 'Sending and getting approval for every project you finish.' },
];

export const RankingSystem = () => {
    return (
        <section id="ranking" className="py-24 lg:py-40 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-chip border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
                    >
                        <Trophy size={14} />
                        <span>Levels and Rewards</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">
                        Earn Your <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-secondary italic">Status.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                        Our ranking system makes sure that the most reliable and hardworking creators rise to the top.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Tiers Visualization */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tiers.map((tier, idx) => (
                                <motion.div
                                    key={tier.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    aria-label={`Ranking Tier: ${tier.name}. Requires ${tier.min}.`}
                                    className={`relative p-8 rounded-[2.5rem] border ${tier.border} ${tier.bg} flex flex-col items-center text-center group hover:scale-[1.03] transition-all duration-500 overflow-hidden active:scale-95 cursor-pointer backdrop-blur-sm`}
                                >
                                    {/* Level Badge Overlay */}
                                    <div className="absolute top-6 left-6 px-3 py-1 rounded-full glass-chip text-[9px] font-black tracking-widest opacity-40 uppercase">
                                        LVL 0{idx + 1}
                                    </div>

                                    {/* Visual Tier Image */}
                                    <div className="mb-8 w-32 h-32 relative flex items-center justify-center filter group-hover:drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-700">
                                        <Image 
                                            src={tier.image} 
                                            alt={`Kollabary Ranking Tier: ${tier.name}`} 
                                            fill 
                                            sizes="(max-width: 768px) 128px, 160px"
                                            className="object-contain"
                                        />
                                    </div>

                                    <h3 className={`text-xl md:text-2xl font-black mb-2 ${tier.color} tracking-tight`}>{tier.name}</h3>
                                    <p className="text-[10px] md:text-xs font-bold text-muted-foreground/70 mb-4 max-w-[200px] leading-relaxed">
                                        {tier.desc}
                                    </p>

                                    <div className="mt-auto w-full pt-4 border-t border-white/5">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter opacity-60 mb-2">
                                            <span>Required Path</span>
                                            <span className={tier.color}>{tier.min}</span>
                                        </div>
                                        {/* Progress Simulation Bar */}
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 1.5, delay: idx * 0.2 }}
                                                className={`h-full bg-current ${tier.color} opacity-40`}
                                            />
                                        </div>
                                    </div>

                                    {/* Gamified Background Effect */}
                                    <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Metrics Sidebar */}
                    <div className="lg:col-span-12 xl:col-span-4">
                        <div className="h-full p-8 lg:p-12">
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                                <TrendingUp className="text-primary" />
                                How you level up
                            </h3>
                            <div className="space-y-8">
                                {metrics.map((metric, idx) => (
                                    <div key={metric.label} className="group cursor-default">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-10 h-10 rounded-2xl glass-chip flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <metric.icon size={20} />
                                            </div>
                                            <h4 className="font-black text-lg">{metric.label}</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed pl-14">
                                            {metric.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
