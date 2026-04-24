'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FRONTEND_ROUTES } from '@/constants';
import { Logo } from '../shared/Logo';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

/**
 * Navbar component with glassmorphism and sticky behavior
 */
export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        if (typeof window === 'undefined') return;

        const sections = ['hero', 'brands', 'influencers', 'how-it-works', 'economy', 'ranking', 'community', 'trust'];
        const scrollTriggers = sections.map((id) => {
            const element = document.getElementById(id);
            if (!element) return null;

            return ScrollTrigger.create({
                trigger: element,
                start: 'top 30%',
                end: 'bottom 30%',
                onToggle: (self) => self.isActive && setActiveSection(id),
                fastScrollEnd: true,
                preventOverlaps: true,
            });
        });

        return () => {
            scrollTriggers.forEach(t => t?.kill());
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Ecosystem', href: '#brands', id: 'brands' },
        { name: 'Blueprint', href: '#how-it-works', id: 'how-it-works' },
        { name: 'Economy', href: '#economy', id: 'economy' },
        { name: 'Ranking', href: '#ranking', id: 'ranking' },
        { name: 'Community', href: '#community', id: 'community' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#') || href.startsWith('/#')) {
            e.preventDefault();
            const targetId = href.replace('/#', '').replace('#', '');
            const target = document.getElementById(targetId);

            if (target) {
                document.documentElement.style.scrollBehavior = 'auto';
                const navHeight = navbarRef.current?.offsetHeight || 80;

                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: target,
                        offsetY: navHeight + 20,
                        autoKill: false
                    },
                    ease: "power2.inOut",
                    overwrite: 'auto'
                });

                window.history.pushState(null, '', `/#${targetId}`);
                setActiveSection(targetId);
            } else {
                window.location.href = `/${href.replace('#', '')}`;
            }
        }
    };

    return (
        <nav
            ref={navbarRef}
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
                    : 'bg-transparent py-5 border-transparent'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="active:scale-95 transition-transform hover:opacity-80"
                        onClick={(e) => scrollToSection(e, '/#hero')}
                    >
                        <Logo className="w-32 sm:w-40 md:w-44" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id || (link.id === 'brands' && activeSection === 'influencers');
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                scroll={false}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="relative group px-4 py-2"
                            >
                                <span className={cn(
                                    "text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                                    isActive ? "text-primary" : "text-foreground group-hover:text-primary/80"
                                )}>
                                    {link.name}
                                </span>
                                <span className={cn(
                                    "absolute bottom-1 left-4 right-4 h-px bg-primary transition-all duration-500 ease-out origin-center",
                                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )} />
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href={FRONTEND_ROUTES.AUTH.LOGIN}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="font-black uppercase tracking-widest text-[10px] hover:bg-primary/5 rounded-full px-6 text-foreground/80 hover:text-primary transition-colors"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
                        <Button
                            size="sm"
                            className="rounded-full px-8 font-black uppercase tracking-[0.15em] text-[10px] bg-primary text-primary-foreground hover:brightness-110 shadow-xl shadow-primary/20 border-none h-11 transition-all hover:scale-105 active:scale-95"
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-4">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-foreground h-11 w-11 p-2 glass-chip border-white/10 transition-all hover:bg-primary/10 active:scale-90"
                                aria-label="Toggle menu"
                            >
                                <Menu size={22} className="text-foreground/80" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85%] sm:max-w-md glass-card-elevated border-l border-white/10 p-0 overflow-hidden flex flex-col">
                            <div className="flex flex-col h-full bg-background/50 backdrop-blur-3xl">
                                <SheetHeader className="p-8 pb-4 border-b border-white/5">
                                    <SheetTitle className="text-left">
                                        <Logo className="w-32" />
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex-grow p-4 py-8 space-y-0.5">
                                    <nav className="flex flex-col">
                                        {navLinks.map((link, idx) => {
                                            const isActive = activeSection === link.id || (link.id === 'brands' && activeSection === 'influencers');
                                            return (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    scroll={false}
                                                    className="group flex flex-col px-6 py-3.5 rounded-2xl hover:bg-primary/5 transition-all relative overflow-hidden"
                                                    onClick={(e) => {
                                                        scrollToSection(e, link.href);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between relative z-10">
                                                        <span className={cn(
                                                            "text-base font-black tracking-tight transition-colors duration-500",
                                                            isActive ? "text-primary" : "text-foreground/70 group-hover:text-primary"
                                                        )}>
                                                            {link.name}
                                                        </span>
                                                        <div className={cn(
                                                            "h-1.5 w-1.5 rounded-full bg-primary transition-all duration-500",
                                                            isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                                                        )} />
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>

                                <div className="p-8 pt-4 border-t border-white/5 space-y-4">
                                    <Link href={FRONTEND_ROUTES.AUTH.LOGIN} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button
                                            variant="ghost"
                                            className="w-full h-14 rounded-[2rem] font-black uppercase tracking-widest text-[10px] border-primary/10 hover:bg-primary/5 hover:text-primary"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href={FRONTEND_ROUTES.AUTH.SIGNUP} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button
                                            className="w-full h-14 rounded-[2rem] font-black uppercase tracking-widest text-[10px] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-[0.98]"
                                        >
                                            Join Kollabary
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};
