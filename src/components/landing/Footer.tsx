'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { FRONTEND_ROUTES } from '@/constants';

/**
 * Premium Footer component with glassmorphism and modern branding
 */
export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'Solutions',
            links: [
                { name: 'For Brands', href: '#brands' },
                { name: 'For Creators', href: '#influencers' },
                { name: 'Campaigns', href: FRONTEND_ROUTES.DASHBOARD.CAMPAIGNS },
                { name: 'Analytics', href: FRONTEND_ROUTES.DASHBOARD.ANALYTICS },
            ],
        },
        {
            title: 'Company',
            links: [
                { name: 'About', href: FRONTEND_ROUTES.ABOUT },
                { name: 'Careers', href: FRONTEND_ROUTES.CAREERS },
                { name: 'Press', href: FRONTEND_ROUTES.PRESS },
                { name: 'Contact', href: FRONTEND_ROUTES.CONTACT },
            ],
        },
        {
            title: 'Resources',
            links: [
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'Pricing', href: FRONTEND_ROUTES.PRICING },
                { name: 'Blog', href: FRONTEND_ROUTES.BLOG },
                { name: 'Help Center', href: FRONTEND_ROUTES.HELP_CENTER },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy', href: FRONTEND_ROUTES.PRIVACY },
                { name: 'Terms', href: FRONTEND_ROUTES.TERMS },
                { name: 'Cookies', href: FRONTEND_ROUTES.COOKIES },
            ],
        },
    ];

    return (
        <footer className="bg-[#1f1a1e] text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary/20">
                                <Rocket size={24} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">Kollabary</span>
                        </Link>
                        <p className="text-white/50 max-w-sm leading-relaxed text-lg font-medium">
                            The premium destination for authentic collaborations between visionary brands and creative minds.
                        </p>
                        <div className="flex items-center gap-5">
                            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-primary hover:bg-white/10 transition-all">
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title} className="space-y-6">
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/30">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-white/60 hover:text-primary font-bold transition-colors block py-0.5">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-sm font-bold text-white/30">
                        © {currentYear} Kollabary. Crafted with Passion.
                    </p>
                    <div className="flex items-center gap-6">
                        <p className="text-sm font-bold text-white/30 flex items-center gap-2">
                            Status <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                        </p>
                        <div className="h-4 w-px bg-white/5" />
                        <p className="text-sm font-bold text-white/30 hover:text-white/50 transition-colors cursor-pointer">
                            English (US)
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
