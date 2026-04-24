'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES, COMPANY_EMAIL, COIN_URL, TIER_IMAGES } from '@/constants';
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';

/**
 * Premium Hero section with "Radiant Flux" aesthetic
 * Features: Editorial typography, extreme scale, tonal depth, and glassmorphism
 */
export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Parallax effect for background elements
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -150]);
    const y2 = useTransform(scrollY, [0, 500], [0, 100]);
    const rotate = useTransform(scrollY, [0, 500], [0, 15]);

    useEffect(() => {
        if (!mounted || !titleRef.current) return;

        // GSAP entrance animation for the title characters
        const ctx = gsap.context(() => {
            // Animate title reveals
            const reveals = gsap.utils.toArray(".hero-reveal");
            if (reveals.length > 0) {
                gsap.from(reveals, {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out",
                    delay: 0.2
                });
            }

            // Animate CTAs
            const ctas = gsap.utils.toArray(".hero-cta");
            if (ctas.length > 0) {
                gsap.from(ctas, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.8
                });
            }
        });

        return () => ctx.revert();
    }, [mounted]);

    return (
        <section
            id="hero"
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

            {/* Abstract Floating Elements — Ranks and Coins */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {/* Large Background Ranks */}
                <motion.div
                    animate={{ y: [0, -40, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] right-[10%] w-24 h-24 md:w-40 md:h-40 opacity-20 md:opacity-30"
                >
                    <Image src={TIER_IMAGES.ELITE_CREATOR} alt="" fill sizes="(max-width: 768px) 100px, 160px" priority loading="eager" className="object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 40, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[10%] left-[5%] w-32 h-32 md:w-56 md:h-56 opacity-15 md:opacity-25"
                >
                    <Image src={TIER_IMAGES.KOLLABARY_ICON} alt="" fill sizes="(max-width: 768px) 128px, 224px" priority loading="eager" className="object-contain" />
                </motion.div>

                {/* Medium Floating Badges */}
                <motion.div
                    animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-[25%] left-[12%] w-16 h-16 md:w-24 md:h-24 opacity-40 md:opacity-60"
                >
                    <Image src={TIER_IMAGES.EMERGING_PARTNER} alt="" fill sizes="(max-width: 768px) 64px, 96px" className="object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 25, 0], x: [0, -15, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[25%] right-[15%] w-14 h-14 md:w-20 md:h-20 opacity-30 md:opacity-50"
                >
                    <Image src={TIER_IMAGES.RISING_CREATOR} alt="" fill sizes="(max-width: 768px) 56px, 80px" className="object-contain" />
                </motion.div>

                {/* Small Floating Coins */}
                <motion.div
                    animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 360, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[45%] left-[20%] w-8 h-8 md:w-12 md:h-12 opacity-50"
                >
                    <Image src={COIN_URL} alt="" fill sizes="(max-width: 768px) 32px, 48px" className="object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [360, 0, 360] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 1.5 }}
                    className="absolute top-[35%] right-[25%] w-6 h-6 md:w-10 md:h-10 opacity-40"
                >
                    <Image src={COIN_URL} alt="" fill sizes="(max-width: 768px) 24px, 40px" className="object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, -25, 0], x: [0, 20, 0], rotate: [0, 180, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "linear", delay: 3 }}
                    className="absolute bottom-[40%] left-[15%] w-10 h-10 md:w-14 md:h-14 opacity-45"
                >
                    <Image src={COIN_URL} alt="" fill sizes="(max-width: 768px) 40px, 56px" className="object-contain" />
                </motion.div>
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
                        <Sparkles size={14} className="text-primary animate-pulse" aria-hidden="true" />
                        <span>The Ethereal Pulse of Influence</span>
                    </motion.div>

                    {/* Massive Kinetic Headline */}
                    <div className="relative mb-12 overflow-hidden">
                        <h1
                            ref={titleRef}
                            aria-label="Forge Elite Connections"
                            className="text-[14vw] sm:text-[10vw] lg:text-[8.5vw] font-black tracking-[-0.04em] leading-[0.85] text-foreground inline-block px-4 pb-2"
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
                        <Link href={FRONTEND_ROUTES.AUTH.SIGNUP} className="hero-cta group relative w-full sm:w-auto" aria-label="Join the Network">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" aria-hidden="true"></div>
                            <Button size="lg" className="relative rounded-full px-12 h-16 text-lg font-black bg-primary text-white hover:opacity-90 shadow-2xl w-full sm:w-auto border-none transition-all hover:scale-105 active:scale-95 overflow-hidden">
                                <span className="relative z-10 flex items-center gap-3">
                                    Join the Network <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
                                </span>
                            </Button>
                        </Link>
                        
                        <div className="hero-cta w-full sm:w-auto">
                            <Button 
                                size="lg" 
                                variant="outline" 
                                aria-label="Book a Demo"
                                className="rounded-full px-12 h-16 text-lg font-bold glass-card-elevated border-primary/10 text-foreground hover:bg-muted/50 w-full sm:w-auto transition-all hover:scale-105 active:scale-95"
                                asChild
                            >
                                <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-3">
                                    <Play size={18} fill="currentColor" aria-hidden="true" />
                                    Book a Demo
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};
