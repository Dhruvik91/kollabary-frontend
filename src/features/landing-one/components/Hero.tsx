'use client';

import Link from 'next/link';
import { Sparkles, Building2, User, Play, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';

export function Hero() {
    // Pre-calculated animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 },
        },
    } as const;

    return (
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-background">
            {/* Background decorative glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Content Column */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-6 flex flex-col items-start text-left"
                >
                    {/* Brand Pill */}
                    <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 mb-6"
                    >
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">Introducing Kollabary 1.0</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-foreground"
                    >
                        Brand collaborations <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            made simple.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mb-8 leading-relaxed"
                    >
                        Kollabary helps brands discover the right creators in seconds, and empowers creators to land real brand collaboration opportunities. No clutter, just direct connections.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
                    >
                        <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=brand`} passHref className="w-full sm:w-auto">
                            <Button 
                                variant="default"
                                className="w-full sm:w-auto font-extrabold bg-gradient-to-r from-primary to-primary-hover hover:scale-[1.02] text-white rounded-xl shadow-lg shadow-primary/20 py-6 px-8 text-base flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                            >
                                <Building2 className="w-5 h-5" />
                                Start as Brand
                            </Button>
                        </Link>
                        <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=creator`} passHref className="w-full sm:w-auto">
                            <Button 
                                variant="outline"
                                className="w-full sm:w-auto font-extrabold border-2 border-border/80 hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.02] rounded-xl py-6 px-8 text-base flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                            >
                                <User className="w-5 h-5" />
                                Join as Creator
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Factor & Key Value Badges */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col gap-4 border-t border-border/60 pt-6 w-full"
                    >
                        <p className="text-sm font-bold text-muted-foreground/80 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            No complex marketing jargon. Just direct, verified creator-brand connections.
                        </p>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground/80">
                                <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                                100% Free to Join
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground/80">
                                <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                                Direct Dashboard Messaging
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Dashboard / Visual Mockup Column */}
                <div className="lg:col-span-6 relative w-full flex justify-center items-center">
                    {/* Simulated Decorative Frame/Orbs */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full max-w-[540px] rounded-3xl border border-border/60 bg-muted/20 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4"
                    >
                        {/* Glassmorphic card styling inside */}
                        {/* Card 1: Top Bar representing navigation of dashboard */}
                        <div className="flex items-center justify-between pb-3 border-b border-border/40">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="text-xs font-semibold text-muted-foreground bg-muted/60 px-3 py-1 rounded-full">
                                kollabary.com/dashboard
                            </div>
                            <span className="w-4 h-4 text-muted-foreground opacity-50" />
                        </div>

                        {/* Card 2: Simulated Brand Overview Panel */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Campaign</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-foreground">Summer Launch</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">LIVE</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
                                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-[70%]" />
                                </div>
                                <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mt-1">
                                    <span>7 Matches Selected</span>
                                    <span>70% Completed</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Campaign Value</span>
                                <span className="text-xl font-black text-foreground">$4,250.00</span>
                                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                                    <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                                    <span>+15% efficiency vs manual search</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Floating Creator Profile Card */}
                        <motion.div 
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="p-4 rounded-2xl bg-background border border-border/80 shadow-lg flex items-center justify-between gap-4 mt-2"
                        >
                            <div className="flex items-center gap-3">
                                {/* Simulated Avatar */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20 text-primary font-bold text-lg">
                                    SM
                                </div>
                                <div className="flex flex-col items-start text-left">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-foreground">Sarah Miller</span>
                                        <span className="text-[9px] px-1.5 py-0.2 bg-primary/10 text-primary font-bold rounded-full">PRO</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Lifestyle & Fashion • Tech</span>
                                    <span className="text-[10px] font-semibold text-muted-foreground mt-0.5">148.5K followers</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1.5">
                                <div className="text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                                    98% Match
                                </div>
                                <button className="text-xs font-bold bg-primary hover:bg-primary/95 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors">
                                    Invite
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Card 4: Action Feed Log */}
                        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 text-xs font-semibold text-muted-foreground flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Brand `Nordic Designs` posted a brief for `#minimalist`</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground opacity-60">Just now</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
