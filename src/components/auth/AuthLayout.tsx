'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FRONTEND_ROUTES } from '@/constants';
import { Logo } from '../shared/Logo';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

/**
 * Auth Layout Component
 * Provides a premium split-screen layout for authentication pages
 */
export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && resolvedTheme === 'dark'
        ? '/logo/dark_mode_logo.png'
        : '/logo/light_mode_logo.png';

    return (
        <div className="relative min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-background overflow-hidden font-sans">
            {/* Left Side: Branding Content (Desktop Only) */}
            <div className="hidden lg:relative lg:flex flex-col items-center justify-start pt-[20vh] p-16 overflow-hidden border-r border-border/40 bg-muted/5">
                {/* Subtle Background Effects (Orbs) */}
                <div
                    className="pointer-events-none absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse z-0"
                    style={{ animationDuration: '10s' }}
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px] animate-pulse z-0"
                    style={{ animationDuration: '12s', animationDelay: '2s' }}
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-size-[40px_40px] z-10"
                    aria-hidden="true"
                />

                {/* Logo (Top Left) */}
                <div className="absolute top-16 left-16 z-30">
                    <Link href={FRONTEND_ROUTES.HOME} className="group transition-all duration-300 hover:opacity-80">
                        {mounted && (
                            <Logo className="w-32 sm:w-40 md:w-44" />
                        )}
                    </Link>
                </div>

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-20 max-w-xl text-center lg:text-left"
                >

                    <h1 className="text-6xl xl:text-7xl font-black tracking-tighter mb-8 leading-[1.05] text-foreground">
                        Redefining the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary italic pr-2">Future</span> of Influence
                    </h1>

                    <p className="text-xl xl:text-2xl text-muted-foreground/80 font-medium leading-relaxed max-w-lg mb-12">
                        The all-in-one ecosystem for creators and brands to forge powerful, data-driven partnerships that resonate.
                    </p>

                    {/* Social Proof Items */}
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/40">
                        <div>
                            <p className="text-3xl font-black text-foreground">2,000+</p>
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Active Creators</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-foreground">500+</p>
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Global Brands</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Authentication Form */}
            <div className="relative flex flex-col items-center justify-center p-6 lg:p-12 min-h-screen lg:min-h-0 bg-background">

                {/* Mobile Background Effects */}
                <div className="lg:hidden">
                    <div
                        className="pointer-events-none absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px] animate-pulse"
                        style={{ animationDuration: '8s' }}
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[140px] animate-pulse"
                        style={{ animationDuration: '10s', animationDelay: '2s' }}
                        aria-hidden="true"
                    />
                </div>

                {/* Form Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-md relative z-10"
                >
                    <Card className="backdrop-blur-3xl bg-card/60 lg:bg-card/40 border-border/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] ring-1 ring-white/10 dark:ring-white/5 rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="space-y-3 text-center pb-6 pt-10 px-8">
                            <CardTitle className="text-4xl font-black tracking-tight text-foreground leading-tight">{title}</CardTitle>
                            {description && (
                                <CardDescription className="text-lg text-muted-foreground/90 font-medium">{description}</CardDescription>
                            )}
                        </CardHeader>
                        <CardContent className="pb-10 px-8 md:px-10">{children}</CardContent>
                    </Card>

                    {/* Footnote */}
                    <div className="mt-10 flex flex-col items-center gap-4">
                        <p className="text-xs text-muted-foreground/50 font-semibold uppercase tracking-widest">
                            © {new Date().getFullYear()} Kollabary Platform
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

