'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, ShieldCheck, Target, Zap } from 'lucide-react';

const tiers = [
    { name: 'Bronze', color: 'text-[#CD7F32]', border: 'border-[#CD7F32]/20', bg: 'bg-[#CD7F32]/5', min: '0 - 500 Score' },
    { name: 'Silver', color: 'text-[#C0C0C0]', border: 'border-[#C0C0C0]/20', bg: 'bg-[#C0C0C0]/5', min: '501 - 2000 Score' },
    { name: 'Gold', color: 'text-[#FFD700]', border: 'border-[#FFD700]/20', bg: 'bg-[#FFD700]/5', min: '2001+ Score' },
];

const metrics = [
    { icon: Target, label: 'Performance', desc: 'Completed collaborations & promotions.' },
    { icon: Zap, label: 'Reliability', desc: 'Response speed & completion rate.' },
    { icon: Star, label: 'Quality', desc: 'Average ratings from premium brands.' },
    { icon: ShieldCheck, label: 'Trust', desc: 'Verification status & longevity.' },
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
                        <span>Quantifying Creator Excellence</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">
                        Data-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Prestige.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                        Our proprietary ranking engine ensures that the most reliable and high-performing creators rise to the top.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Tiers Visualization */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                            {tiers.map((tier, idx) => (
                                <motion.div
                                    key={tier.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative p-10 rounded-[3rem] border ${tier.border} ${tier.bg} flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-500 overflow-hidden`}
                                >
                                    <div className="absolute -top-10 -right-10 text-9xl font-black opacity-[0.03] italic pointer-events-none">
                                        {tier.name[0]}
                                    </div>
                                    <div className={`mb-8 p-6 rounded-3xl glass-card flex items-center justify-center ${tier.color} shadow-2xl`}>
                                        <Trophy size={48} />
                                    </div>
                                    <h3 className={`text-4xl font-black mb-2 ${tier.color}`}>{tier.name}</h3>
                                    <p className="text-sm font-bold text-muted-foreground mb-8">Tier Level {idx + 1}</p>
                                    <div className="mt-auto px-6 py-2 rounded-full glass-chip text-xs font-black">
                                        {tier.min}
                                    </div>

                                    {/* Abstract Pulse */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Metrics Sidebar */}
                    <div className="lg:col-span-12 xl:col-span-4">
                        <div className="h-full glass-card-elevated rounded-[3rem] p-10 lg:p-12 border-white/5">
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                                <TrendingUp className="text-primary" />
                                Scoring Metrics
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
                            
                            <div className="mt-12 p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
                                <h4 className="text-xs font-black text-destructive uppercase tracking-widest mb-2">Penalty Logic</h4>
                                <p className="text-[10px] text-destructive/70 font-bold leading-relaxed uppercase">
                                    Cancellations, rejections, or high report counts negatively impact ranking and visibility levels.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
