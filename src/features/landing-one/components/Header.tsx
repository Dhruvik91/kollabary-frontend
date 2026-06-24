'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Building2, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { FRONTEND_ROUTES } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'For Brands', href: '#for-brands' },
        { name: 'For Creators', href: '#for-creators' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Benefits', href: '#benefits' },
    ];

    return (
        <header
            style={{
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
            }}
            className={cn(
                'fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full border will-change-[transform,padding,background-color,border-color]',
                'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isScrolled
                    ? [
                        'py-3',
                        'border-white/10 dark:border-white/8',
                        'backdrop-blur-2xl bg-white/60 dark:bg-zinc-950/70',
                        'shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1),0_1px_0_0_rgba(255,255,255,0.5)_inset]',
                        'dark:shadow-[0_12px_44px_-8px_rgba(0,0,0,0.5),0_1px_0_0_rgba(255,255,255,0.05)_inset]',
                        'scale-[0.98]'
                    ].join(' ')
                    : 'bg-transparent py-5 border-transparent scale-100'
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Desktop Brand Logo */}
                <Link
                    href="/"
                    prefetch={true}
                    className="active:scale-95 transition-transform hover:opacity-80"
                >
                    <Logo className="w-32 sm:w-40 md:w-44" />
                </Link>

                {/* Desktop Navigation matching Navbar.tsx styling */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative group px-4 py-2"
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 text-foreground group-hover:text-primary/80">
                                {link.name}
                            </span>
                            <span className="absolute bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-out origin-center" />
                        </a>
                    ))}
                </nav>

                {/* Desktop CTAs & Theme Toggle (Login / Signup) */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Link href={FRONTEND_ROUTES.AUTH.LOGIN} passHref prefetch={true}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="font-black uppercase tracking-widest text-[10px] hover:bg-primary/5 rounded-full px-6 text-foreground/80 hover:text-primary transition-colors"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href={FRONTEND_ROUTES.AUTH.SIGNUP} passHref prefetch={true}>
                        <Button
                            size="sm"
                            className="rounded-full px-8 font-black uppercase tracking-[0.15em] text-[10px] bg-primary text-primary-foreground hover:brightness-110 shadow-xl shadow-primary/20 border-none h-11 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Action Controls (Unchanged) */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-10 h-10 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-muted/50 transition-colors focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Overlay (Unchanged) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%+8px)] left-0 right-0 z-40 p-6 bg-background/95 backdrop-blur-2xl border border-border shadow-xl rounded-3xl flex flex-col gap-6 md:hidden"
                    >
                        {/* Nav Links */}
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-border/50 w-full" />

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-3">
                            <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=brand`} passHref prefetch={true} className="w-full">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full font-bold border border-border hover:bg-primary/5 hover:text-primary rounded-xl py-3 justify-center flex items-center gap-2"
                                >
                                    <Building2 className="w-4 h-4" />
                                    Join as Brand
                                </Button>
                            </Link>
                            <Link href={`${FRONTEND_ROUTES.AUTH.SIGNUP}?role=creator`} passHref prefetch={true} className="w-full">
                                <Button
                                    variant="default"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full font-bold bg-primary hover:bg-primary/95 text-white rounded-xl py-3 justify-center flex items-center gap-2 cursor-pointer"
                                >
                                    <User className="w-4 h-4" />
                                    Join as Creator
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
