'use client';

import Link from 'next/link';
import { Twitter, Instagram, Github, Mail } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

export function Footer() {
    const brandLinks = [
        { name: 'For Brands', href: '#for-brands' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Benefits', href: '#benefits' },
    ];

    const creatorLinks = [
        { name: 'For Creators', href: '#for-creators' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Benefits', href: '#benefits' },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ];

    return (
        <footer className="bg-background border-t border-border/40 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Branding Block */}
                <div className="md:col-span-5 flex flex-col items-start text-left gap-4">
                    <Link href="/" className="flex items-center group focus-visible:outline-none mb-2">
                        <Logo className="w-32 sm:w-40" />
                    </Link>
                    <p className="text-xs md:text-sm text-muted-foreground font-semibold max-w-sm leading-relaxed">
                        Kollabary is a streamlined creator-brand collaboration platform. We help brands discover authentic influencers and empower creators to find matching opportunities.
                    </p>
                    
                    {/* Social links */}
                    <div className="flex items-center gap-4 mt-2">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-[16px] bg-muted/40 hover:bg-primary/5 hover:text-primary border border-border/50 transition-colors text-muted-foreground" aria-label="Twitter">
                            <Twitter className="w-5 h-5 stroke-[1.5]" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-[16px] bg-muted/40 hover:bg-primary/5 hover:text-primary border border-border/50 transition-colors text-muted-foreground" aria-label="Instagram">
                            <Instagram className="w-5 h-5 stroke-[1.5]" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-[16px] bg-muted/40 hover:bg-primary/5 hover:text-primary border border-border/50 transition-colors text-muted-foreground" aria-label="Github">
                            <Github className="w-5 h-5 stroke-[1.5]" />
                        </a>
                        <a href="mailto:support@kollabary.com" className="w-12 h-12 flex items-center justify-center rounded-[16px] bg-muted/40 hover:bg-primary/5 hover:text-primary border border-border/50 transition-colors text-muted-foreground" aria-label="Email">
                            <Mail className="w-5 h-5 stroke-[1.5]" />
                        </a>
                    </div>
                </div>

                {/* Column: For Brands */}
                <div className="md:col-span-2 flex flex-col items-start text-left gap-3.5">
                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">For Brands</span>
                    <ul className="flex flex-col gap-2">
                        {brandLinks.map((link, idx) => (
                            <li key={`${link.name}-${idx}`}>
                                <a href={link.href} className="text-xs md:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column: For Creators */}
                <div className="md:col-span-2 flex flex-col items-start text-left gap-3.5">
                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">For Creators</span>
                    <ul className="flex flex-col gap-2">
                        {creatorLinks.map((link, idx) => (
                            <li key={`${link.name}-${idx}`}>
                                <a href={link.href} className="text-xs md:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column: Legal */}
                <div className="md:col-span-3 flex flex-col items-start text-left gap-3.5">
                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">Legal & Privacy</span>
                    <ul className="flex flex-col gap-2">
                        {legalLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-xs md:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Copyright Block */}
            <div className="max-w-7xl mx-auto px-6 border-t border-border/40 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted-foreground/80">
                <span>&copy; {new Date().getFullYear()} Kollabary Technologies Inc. All rights reserved.</span>
                <span>Designed with visual excellence in San Francisco.</span>
            </div>
        </footer>
    );
}
