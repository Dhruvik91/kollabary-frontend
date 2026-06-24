'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, User, Star, Share2, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';

export function ForCreators() {
    const creatorBenefits = [
        'Create your unique creator profile in minutes',
        'Showcase your content niche and brand portfolios',
        'Discover live brand opportunities tailored to you',
        'Apply directly to collaboration briefs',
        'Grow your creator journey with transparent partnerships',
    ];

    return (
        <section id="for-creators" className="relative py-24 bg-background overflow-hidden border-t border-border/40">
            {/* Background elements */}
            <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Visual Creator Widget Left Side (Alternated) */}
                <div className="lg:col-span-6 order-2 lg:order-1 relative w-full flex justify-center items-center">
                    <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-[460px] bg-card border border-border/80 rounded-3xl p-6 shadow-xl relative overflow-hidden"
                    >
                        {/* Header Profile Section */}
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/40">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center border border-primary/20 text-white font-extrabold text-lg">
                                HK
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-bold text-foreground">Hannah Kim</span>
                                    <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold rounded-full">VERIFIED</span>
                                </div>
                                <span className="text-xs text-muted-foreground font-semibold">Tech & Gaming Reviewer</span>
                            </div>
                            <div className="ml-auto flex items-center gap-1 bg-muted px-2 py-1 rounded-lg">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold text-foreground">5.0</span>
                            </div>
                        </div>

                        {/* Creator Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="p-3 bg-muted/40 rounded-2xl border border-border/50 text-center">
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Followers</span>
                                <span className="text-sm font-black text-foreground">94K</span>
                            </div>
                            <div className="p-3 bg-muted/40 rounded-2xl border border-border/50 text-center">
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Engagement</span>
                                <span className="text-sm font-black text-foreground">4.8%</span>
                            </div>
                            <div className="p-3 bg-muted/40 rounded-2xl border border-border/50 text-center">
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Completed</span>
                                <span className="text-sm font-black text-foreground">18 Deals</span>
                            </div>
                        </div>

                        {/* Recent Pitch Application widget */}
                        <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 text-left flex flex-col gap-2.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Pitch</span>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                                    <Zap className="w-2.5 h-2.5 animate-pulse" />
                                    Reviewing
                                </span>
                            </div>
                            <div className="text-xs font-bold text-foreground">
                                Pitch: Tech Desk Setup Refresh
                            </div>
                            <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed">
                                &quot;I will create a high-quality reels integration matching my desk layout theme, highlighting the durability.&quot;
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Content Right Side Order 1 */}
                <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start text-left">
                    {/* Icon tag */}
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-6">
                        <User className="w-5 h-5" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
                        For creators who want <br />
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                            real brand deals.
                        </span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-muted-foreground font-semibold mb-8 max-w-xl">
                        Create a verified creator profile, showcase your exact niche and content value, and apply to campaigns launched directly by authentic brands.
                    </p>

                    {/* Benefit Checks */}
                    <ul className="space-y-4 mb-8">
                        {creatorBenefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-3.5 text-sm md:text-base font-semibold text-muted-foreground">
                                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=creator`} passHref prefetch={true}>
                        <Button
                            variant="default"
                            className="font-bold bg-primary hover:bg-primary/95 text-white rounded-xl shadow-lg shadow-primary/15 py-5 px-7 flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
                        >
                            Start as a Creator
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
