'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FRONTEND_ROUTES } from '@/constants';
import { Logo } from '../shared/Logo';

/**
 * Navbar component with glassmorphism and sticky behavior
 */
export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'For Brands', href: '#brands' },
        { name: 'For Influencers', href: '#influencers' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: FRONTEND_ROUTES.PRICING },
    ];

    return (
        <nav
            className={cn(
                'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[95%] max-w-7xl rounded-full border',
                isScrolled
                    ? [
                          'py-3',
                          'border-white/10 dark:border-white/8',
                          /* dense frosted glass */
                          'backdrop-blur-2xl backdrop-saturate-150',
                          'bg-white/60 dark:bg-zinc-950/70',
                          /* layered glow + depth */
                          'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14),0_1px_0_0_rgba(255,255,255,0.5)_inset]',
                          'dark:shadow-[0_4px_32px_-4px_rgba(0,0,0,0.6),0_1px_0_0_rgba(255,255,255,0.06)_inset,0_0_0_1px_rgba(255,255,255,0.04)_inset]',
                      ].join(' ')
                    : 'bg-transparent py-5 border-transparent'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="active:scale-95 transition-transform">
                        <Logo className="w-32 sm:w-40 md:w-44" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all hover:scale-110"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Link href={FRONTEND_ROUTES.AUTH.LOGIN}>
                        <Button variant="ghost" size="sm" className="font-semibold hover:bg-primary/10 rounded-full px-5 text-foreground">
                            Log in
                        </Button>
                    </Link>
                    <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
                        <Button size="sm" className="rounded-full px-6 font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 border-none h-10 transition-transform active:scale-95">
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-foreground h-10 w-10 p-2 rounded-full hover:bg-primary/10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden backdrop-blur-2xl backdrop-saturate-150 bg-white/70 dark:bg-zinc-950/80 border-t border-white/20 dark:border-white/10 overflow-hidden rounded-b-3xl"
                    >
                        <div className="flex flex-col gap-4 p-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-border" />
                            <div className="flex flex-col gap-3 pt-2">
                                <Link href={FRONTEND_ROUTES.AUTH.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href={FRONTEND_ROUTES.AUTH.SIGNUP} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
