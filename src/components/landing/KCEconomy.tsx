'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COIN_URL, LANDING_PAGE_IMAGES_URL } from '@/constants';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, AreaChart, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const plans = [
    { name: 'Starter', coins: '1,000', price: '₹999', popular: false },
    { name: 'Growth', coins: '5,000', price: '₹4,499', popular: true },
    { name: 'Enterprise', coins: '10,000', price: '₹7,999', popular: false },
];

export const KCEconomy = () => {
    return (
        <section id="economy" className="py-24 lg:py-40 bg-background relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="w-24 h-24 mb-10 relative group"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500" />
                            <Image
                                src={COIN_URL}
                                alt=""
                                width={96}
                                height={96}
                                sizes="96px"
                                className="relative z-10 animate-pulse"
                            />
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            The KC <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary italic">Economy.</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-medium mb-12 max-w-xl leading-relaxed">
                            A robust, secure economic layer powered by K-Coins (KC). Seamlessly manage earnings, spendings, and top-ups through our integrated financial operations.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[
                                { icon: Wallet, title: 'KC Wallet', desc: 'Real-time balance monitoring for all platform participants.' },
                                { icon: CreditCard, title: 'Razorpay Integration', desc: 'Secure top-ups with multiple conversion plans.' },
                                { icon: AreaChart, title: 'Earning Analytics', desc: 'Detailed history of spendings and revenue projections.' },
                                { icon: ArrowUpRight, title: 'Instant Settlement', desc: 'Automated conversion from fiat to platform coin.' },
                            ].map((feature, idx) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    role="listitem"
                                    aria-label={`Feature: ${feature.title}. ${feature.desc}`}
                                    className="p-6 rounded-3xl glass-section border-transparent hover:border-primary/20 transition-all group"
                                >
                                    <feature.icon size={24} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-black mb-1">{feature.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-[4rem] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                            <Image 
                                src={LANDING_PAGE_IMAGES_URL.KCOINS} 
                                alt="Kollabary Financial Ecosystem" 
                                fill 
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
