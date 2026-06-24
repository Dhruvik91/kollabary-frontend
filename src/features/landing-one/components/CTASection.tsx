'use client';

import Link from 'next/link';
import { ArrowRight, Building2, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';

export function CTASection() {
    return (
        <section className="relative py-24 bg-background overflow-hidden border-t border-border/40">
            {/* Visual background glows */}
            <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-r from-muted/60 to-muted/20 backdrop-blur-md px-8 py-16 md:p-20 text-center shadow-2xl flex flex-col items-center"
                >
                    {/* Glowing effect inside card */}
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

                    {/* Icon badge */}
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white mb-6 shadow-md shadow-primary/15 animate-bounce-slow">
                        <Sparkles className="w-5.5 h-5.5" />
                    </div>

                    {/* Typography */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-foreground leading-tight">
                        Ready to start your next <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            collaboration?
                        </span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-muted-foreground font-semibold max-w-xl mb-10 leading-relaxed">
                        Join Kollabary today. Get pre-filled onboarding paths whether you want to hire top creators or land real brand deals.
                    </p>

                    {/* Twin CTA Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=brand`} passHref prefetch={true} className="w-full sm:w-auto">
                            <Button
                                variant="default"
                                className="w-full sm:w-auto font-extrabold bg-gradient-to-r from-primary to-primary-hover hover:scale-[1.02] text-white rounded-xl shadow-lg shadow-primary/20 py-6 px-8 text-base flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                            >
                                <Building2 className="w-5 h-5" />
                                Join as Brand
                            </Button>
                        </Link>
                        
                        <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=creator`} passHref prefetch={true} className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto font-extrabold border-2 border-border/80 hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.02] rounded-xl py-6 px-8 text-base flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                            >
                                <User className="w-5 h-5" />
                                Join as Creator
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
