'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COIN_URL } from '@/constants';
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
                                alt="K-Coin" 
                                width={96} 
                                height={96} 
                                className="relative z-10 animate-pulse"
                            />
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            The <span className="text-primary italic">KC</span> Economy.
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
                                    className="p-6 rounded-3xl glass-section border-transparent hover:border-primary/20 transition-all group"
                                >
                                    <feature.icon size={24} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-black mb-1">{feature.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 blur-2xl rounded-[4rem] opacity-50" />
                        <div className="relative bg-card border border-border/50 rounded-[3rem] p-10 lg:p-16 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 text-7xl font-black text-primary/5 italic uppercase pointer-events-none">
                                Wallet
                            </div>
                            
                            <h3 className="text-2xl font-black mb-10">Premium Top-Up Plans</h3>
                            
                            <div className="space-y-4">
                                {plans.map((plan) => (
                                    <div 
                                        key={plan.name}
                                        className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${plan.popular ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.02]' : 'border-border/50 hover:border-primary/30'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                                                <Image src={COIN_URL} alt="coin" width={20} height={20} />
                                            </div>
                                            <div>
                                                <div className="font-black text-sm">{plan.name}</div>
                                                <div className="text-xl font-black text-primary">{plan.coins} KC</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-bold text-muted-foreground mb-1">ONLY AT</div>
                                            <div className="text-xl font-black">{plan.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full h-16 rounded-full mt-10 font-black text-lg group bg-primary hover:opacity-90">
                                Purchase K-Coins <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
