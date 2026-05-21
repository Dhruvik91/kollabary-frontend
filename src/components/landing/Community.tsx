'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Share2, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { LANDING_PAGE_IMAGES_URL } from '@/constants';
import { Button } from '@/components/ui/button';

export const Community = () => {
    return (
        <section id="community" className="py-24 lg:py-40 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative group">
                            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" aria-hidden="true" />
                            <div className="relative aspect-4/3 rounded-[3rem] overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                                <Image 
                                    src={LANDING_PAGE_IMAGES_URL.REVIEWS} 
                                    alt="Kollabary Community Reviews showing platform feedback and user ratings" 
                                    fill 
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-6 block"
                        >
                            Work Together
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            Work with <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-secondary italic">Confidence.</span>
                        </h2>

                        <div className="space-y-10 mb-12" role="list">
                            {[
                                {
                                    icon: MessageSquare,
                                    title: 'Easy Chat',
                                    desc: 'Talk directly with your partners to make sure every project goes perfectly.'
                                },
                                {
                                    icon: Star,
                                    title: 'Reviews & Ratings',
                                    desc: 'Share your experience and see what others say to build trust in the network.'
                                },
                                {
                                    icon: Share2,
                                    title: 'Invite Friends',
                                    desc: 'Grow the community and earn rewards by inviting brands and creators you know.'
                                },
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    role="listitem"
                                    aria-label={`Community Benefit: ${item.title}`}
                                    className="flex gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl glass-chip flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500" aria-hidden="true">
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
                            <div className="absolute top-0 right-0 p-8 text-6xl font-black text-secondary/5 pointer-events-none group-hover:scale-110 transition-transform" aria-hidden="true">
                                <Users />
                            </div>
                            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                                <CheckCircle className="text-secondary" size={20} aria-hidden="true" />
                                Referral Program
                            </h4>
                            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                                Invite people you know and earn KC rewards when they join and verify their account.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
