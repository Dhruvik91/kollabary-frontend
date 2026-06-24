'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, Building2, Search, Sliders, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';

export function ForBrands() {
    const brandBenefits = [
        'Find creators by niche and targeted category',
        'Review comprehensive, audited creator profiles',
        'Save hours spent on manual spreadsheet tracking',
        'Connect directly through in-platform chats',
        'Build better, high-yielding campaigns',
    ];

    const filterTags = ['#tech', '#travel', '#ugc', '#fashion', '#lifestyle', '#gaming'];

    return (
        <section id="for-brands" className="relative py-24 bg-background overflow-hidden border-t border-border/40">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Content Left Side */}
                <div className="lg:col-span-6 flex flex-col items-start text-left">
                    {/* Icon tag */}
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                        <Building2 className="w-5 h-5" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
                        For brands that want the <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            right creators.
                        </span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-muted-foreground font-semibold mb-8 max-w-xl">
                        Stop pitching blindly. Instantly search, discover, and build direct partnerships with creators who align with your brand metrics.
                    </p>

                    {/* Benefit Checks */}
                    <ul className="space-y-4 mb-8">
                        {brandBenefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-3.5 text-sm md:text-base font-semibold text-muted-foreground">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=brand`} passHref prefetch={true}>
                        <Button
                            variant="default"
                            className="font-bold bg-primary hover:bg-primary/95 text-white rounded-xl shadow-lg shadow-primary/15 py-5 px-7 flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
                        >
                            Start as a Brand
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Simulated Filters widget Right Side */}
                <div className="lg:col-span-6 relative w-full flex justify-center items-center">
                    <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full bg-secondary/5 blur-[80px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-[460px] bg-card border border-border/80 rounded-3xl p-6 shadow-xl relative overflow-hidden"
                    >
                        {/* Title Bar */}
                        <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-6">
                            <div className="flex items-center gap-2">
                                <Sliders className="w-4.5 h-4.5 text-primary" />
                                <span className="text-sm font-bold text-foreground">Discovery Filter Panel</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">ACTIVE</span>
                        </div>

                        {/* Search input mock */}
                        <div className="relative mb-5">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-60" />
                            <div className="w-full bg-muted/40 border border-border/50 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-muted-foreground/80 text-left">
                                Search creators by niche, location...
                            </div>
                        </div>

                        {/* Tag list */}
                        <div className="mb-6 flex flex-col gap-2.5">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-left">Selected Niches</span>
                            <div className="flex flex-wrap gap-2">
                                {filterTags.map((tag, idx) => (
                                    <span
                                        key={tag}
                                        className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${
                                            idx < 3
                                                ? 'bg-primary/10 border-primary/20 text-primary'
                                                : 'bg-muted border-border/50 text-muted-foreground'
                                        }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Matching Output Card Mock */}
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 text-left flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Recommended Match</span>
                                <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                                    <Target className="w-3.5 h-3.5" />
                                    <span>High Match Rate</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/15 to-secondary/15 flex items-center justify-center border border-primary/10 font-bold text-sm text-primary">
                                    AL
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-foreground">Alex L.</span>
                                    <span className="text-[10px] text-muted-foreground font-semibold">Travel Blogger • UGC specialist</span>
                                </div>
                                <div className="ml-auto flex items-center gap-1 text-xs font-bold text-foreground bg-background border border-border/60 px-2 py-1 rounded-lg">
                                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                                    <span>4.9</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
