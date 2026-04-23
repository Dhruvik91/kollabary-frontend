'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Share2, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Community = () => {
    return (
        <section id="community" className="py-24 lg:py-40 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl opacity-50" />
                            <div className="relative space-y-6">
                                {/* Chat Interface Mockup */}
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="glass-card rounded-3xl p-6 max-w-sm ml-auto border-primary/10 shadow-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 animate-pulse" />
                                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 w-full bg-muted/50 rounded" />
                                        <div className="h-3 w-4/5 bg-muted/50 rounded" />
                                    </div>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card-elevated rounded-3xl p-6 max-w-sm mr-auto bg-card border-secondary/10 shadow-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-secondary/20 animate-pulse" />
                                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 w-full bg-muted/50 rounded" />
                                        <div className="h-3 w-1/2 bg-primary rounded" />
                                    </div>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="glass-card rounded-3xl p-8 border-white/5 shadow-2xl"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="font-black">Campaign Review</div>
                                        <div className="flex text-amber-500 gap-1">
                                            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground italic mb-6">
                                        "The collaboration was seamless. Performance exceeded our KPIs and the content quality was world-class."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary" />
                                        <div className="text-xs font-black">Elite Brand Partner</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-secondary font-black tracking-[0.3em] uppercase text-[10px] mb-6 block"
                        >
                            Social Synergy
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            Build <span className="text-secondary italic">Trust</span> Through <br /> Transparency.
                        </h2>
                        
                        <div className="space-y-10 mb-12">
                            {[
                                { 
                                    icon: MessageSquare, 
                                    title: 'Integrated Messaging', 
                                    desc: 'Direct communication channels for real-time collaboration and campaign refinement.' 
                                },
                                { 
                                    icon: Star, 
                                    title: 'Multi-Directional Feedback', 
                                    desc: 'Review and rating system that builds mutual authority and trust within the network.' 
                                },
                                { 
                                    icon: Share2, 
                                    title: 'Influential Referrals', 
                                    desc: 'Incentivized growth through unique sharing links for brands and creators.' 
                                },
                            ].map((item, idx) => (
                                <motion.div 
                                    key={item.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl glass-chip flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black mb-2">{item.title}</h4>
                                        <p className="text-muted-foreground font-medium text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-secondary/5 border border-secondary/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-6xl font-black text-secondary/5 pointer-events-none group-hover:scale-110 transition-transform">
                                <Users />
                            </div>
                            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                                <CheckCircle className="text-secondary" size={20} />
                                Verified Growth Program
                            </h4>
                            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                                Invite your network and earn KC rewards for every successful verified onboarding.
                            </p>
                            <Button className="rounded-full px-8 h-12 font-black bg-secondary hover:opacity-90">
                                Get Referral Link <ArrowRight className="ml-2" size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
