'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Hero section with micro-animations and premium design
 */
export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-background">
            {/* Background Orbs with Brand Colors */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-border text-foreground text-xs md:text-sm font-bold mb-10 tracking-widest uppercase shadow-sm"
                    >
                        <Sparkles size={14} className="text-primary" />
                        <span>The Radiant Pulse of Collaboration</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.95] text-foreground"
                    >
                        Bridge the Gap Between <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary italic">Passion</span> & Partnership
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground/80 mb-14 max-w-3xl leading-relaxed font-medium"
                    >
                        Kollabary connects premium brands with authentic creators to build impactful human-centric campaigns that resonate across the digital horizon.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                    >
                        <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
                            <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold bg-primary text-white hover:opacity-90 shadow-2xl shadow-primary/30 w-full sm:w-auto border-none">
                                Get Started Now <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-bold glass border-border text-foreground hover:bg-muted/50 w-full sm:w-auto transition-all">
                            Book a Demo
                        </Button>
                    </motion.div>

                    {/* User Feedback/Stats Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-20 relative w-full aspect-[16/9] max-w-5xl mx-auto rounded-3xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-x-0 top-0 h-10 bg-muted/30 border-b border-border flex items-center px-4 gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="p-8 pt-16 grid grid-cols-12 gap-6 h-full">
                            <div className="col-span-3 space-y-4">
                                <div className="h-4 w-full bg-muted/60 rounded-md" />
                                <div className="h-4 w-5/6 bg-muted/60 rounded-md" />
                                <div className="h-4 w-4/6 bg-muted/60 rounded-md" />
                                <div className="mt-8 space-y-2">
                                    <div className="h-10 w-full bg-primary/10 rounded-xl" />
                                    <div className="h-10 w-full bg-muted/40 rounded-xl" />
                                </div>
                            </div>
                            <div className="col-span-9 space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-24 bg-primary/5 border border-primary/10 rounded-2xl" />
                                    <div className="h-24 bg-card border border-border rounded-2xl shadow-sm" />
                                    <div className="h-24 bg-card border border-border rounded-2xl shadow-sm" />
                                </div>
                                <div className="h-[300px] w-full bg-muted/20 border border-border rounded-3xl relative overflow-hidden">
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent" />
                                    {/* Fake Chart Lines */}
                                    <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 400 200" preserveAspectRatio="none">
                                        <path d="M0,180 Q50,160 100,140 T200,80 T300,40 T400,20" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary opacity-50" />
                                        <path d="M0,150 Q100,130 200,100 T400,40" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/30" strokeDasharray="5,5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
