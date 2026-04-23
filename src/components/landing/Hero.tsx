'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES, COMPANY_EMAIL } from '@/constants';
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';

/**
 * Premium Hero section with "Radiant Flux" aesthetic
 * Features: Editorial typography, extreme scale, tonal depth, and glassmorphism
 */
export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    
    // Parallax effect for background elements
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -150]);
    const y2 = useTransform(scrollY, [0, 500], [0, 100]);
    const rotate = useTransform(scrollY, [0, 500], [0, 15]);

    useEffect(() => {
        if (!titleRef.current) return;
        
        // GSAP entrance animation for the title characters (shatter/reveal effect)
        const ctx = gsap.context(() => {
            gsap.from(".hero-reveal", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.from(".hero-visual", {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                delay: 0.5
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background selection:bg-primary/30 selection:text-white"
        >
            {/* ─── Background Architectural Elements ─── */}
            <motion.div 
                style={{ y: y1 }}
                className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none" 
            />
            <motion.div 
                style={{ y: y2, rotate }}
                className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(var(--secondary-rgb),0.05)_0%,transparent_70%)] blur-[100px] pointer-events-none" 
            />
            
            {/* Abstract Floating Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ 
                        y: [0, -30, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-[15%] w-32 h-32 glass-card rounded-full border-primary/20 opacity-40 blur-sm"
                />
                <motion.div 
                    animate={{ 
                        y: [0, 40, 0],
                        x: [0, -20, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/3 left-[10%] w-48 h-48 glass-card rounded-[3rem] border-secondary/20 opacity-30 shadow-2xl"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
                    {/* Editorial Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full glass-chip border border-primary/10 text-foreground/80 text-[10px] md:text-xs font-bold mb-12 tracking-[0.2em] uppercase"
                    >
                        <Sparkles size={14} className="text-primary animate-pulse" />
                        <span>The Ethereal Pulse of Influence</span>
                    </motion.div>

                    {/* Massive Kinetic Headline */}
                    <div className="relative mb-12 overflow-hidden">
                        <h1 
                            ref={titleRef}
                            className="text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black tracking-[-0.04em] leading-[0.85] text-foreground inline-block px-4 pb-2"
                        >
                            <span className="hero-reveal block">Forge Elite</span>
                            <span className="hero-reveal block italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary pr-4">Connections.</span>
                        </h1>
                    </div>

                    {/* Editorial Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-2xl text-muted-foreground/90 mb-16 max-w-3xl leading-relaxed font-medium text-balance"
                    >
                        Kollabary transcending the transactional. We bridge the gap between premium brands and world-class creators through a secure, performance-driven ecosystem.
                    </motion.p>

                    {/* Ultra-Premium CTAs */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto"
                    >
                        <Link href={FRONTEND_ROUTES.AUTH.SIGNUP} className="group relative w-full sm:w-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <Button size="lg" className="relative rounded-full px-12 h-16 text-lg font-black bg-primary text-white hover:opacity-90 shadow-2xl w-full sm:w-auto border-none transition-all hover:scale-105 active:scale-95 overflow-hidden">
                                <span className="relative z-10 flex items-center gap-3">
                                    Join the Network <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </span>
                            </Button>
                        </Link>
                        
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="rounded-full px-12 h-16 text-lg font-bold glass-card-elevated border-primary/10 text-foreground hover:bg-muted/50 w-full sm:w-auto transition-all hover:scale-105 active:scale-95"
                            asChild
                        >
                            <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-3">
                                <Play size={18} fill="currentColor" />
                                Book a Demo
                            </a>
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-24 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
                            <ShieldCheck size={20} className="text-primary" />
                            <span>ISO CERTIFIED</span>
                        </div>
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
                            <Zap size={20} className="text-amber-500" />
                            <span>LIGHTNING SETTLEMENT</span>
                        </div>
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
                            <Sparkles size={20} className="text-secondary" />
                            <span>PREMIUM CREATORS</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};
