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
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
                    >
                        <Sparkles size={14} />
                        <span>Empowering Influencer-Brand Partnerships</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
                    >
                        The Next Generation <br />
                        <span className="text-primary italic">Collaboration</span> Platform
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
                    >
                        Streamline your campaign workflow, find high-quality partners, and track meaningful results with our enterprise-grade management system.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
                            <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-xl shadow-primary/20 w-full sm:w-auto">
                                Start Your Journey <ArrowRight className="ml-2" size={18} />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base w-full sm:w-auto border-border">
                            Contact Sales
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
