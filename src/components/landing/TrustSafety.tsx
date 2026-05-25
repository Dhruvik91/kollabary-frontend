'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Fingerprint, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';

export const TrustSafety = () => {
    return (
        <section id="trust" className="py-24 lg:py-40 bg-muted/40 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-chip border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        <Shield size={14} />
                        <span>Your Safety is Our Priority</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                        Working with <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-secondary italic">Confidence.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                        Safety is built into everything we do, from the moment you sign up until you get paid.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {[
                        { 
                            icon: Fingerprint, 
                            title: 'Safe Accounts', 
                            desc: 'Separate and secure areas for Brands, Creators, and Admins to work safely.',
                            points: ['Easy Sign-in', 'Private Access', 'Session Safety']
                        },
                        { 
                            icon: Lock, 
                            title: 'Data Protection', 
                            desc: 'We keep your private information safe and follow all the rules to protect you.',
                            points: ['Strong Encryption', 'Privacy First', 'Data Safety Rules']
                        },
                        { 
                            icon: ShieldAlert, 
                            title: 'No Bots or Scams', 
                            desc: 'We use smart tools to find and remove fake accounts and scammers.',
                            points: ['Bot Removal', 'Always Watching', 'Safety Alerts']
                        },
                    ].map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-background/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 lg:p-12 hover:border-primary/20 transition-all duration-500 group shadow-lg shadow-black/5"
                        >
                            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">
                                {feature.desc}
                            </p>
                            <ul className="space-y-3 pt-6 border-t border-border/50">
                                {feature.points.map(point => (
                                    <li key={point} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-foreground/40 group-hover:text-foreground/80 transition-colors">
                                        <CheckCircle2 size={12} className="text-primary/50" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Secure Onboarding Banner */}
                <div className="relative rounded-[3rem] overflow-hidden glass-card-elevated border-white/5 p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
                    <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-12 scale-150">
                        <Lock size={200} />
                    </div>
                    <div className="max-w-xl relative x-10">
                        <div className="inline-flex items-center gap-2 mb-6 text-primary">
                            <Eye size={20} />
                            <span className="font-black text-xs uppercase tracking-widest">Easy Setup</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black mb-6">Simple Setup. Secure Start.</h3>
                        <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                            Follow our simple steps for brands and creators to make sure your account is ready and safe to use.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            {['Google Sign-in', 'Verified Email', 'Account Shield'].map(tag => (
                                <span key={tag} className="glass-chip px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="relative group lg:ml-auto">
                         <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-linear-to-br from-primary via-secondary to-primary/50 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-700">
                             <Shield size={100} className="text-white" />
                             <div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
