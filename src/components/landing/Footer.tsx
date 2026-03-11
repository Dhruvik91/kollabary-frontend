'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { FRONTEND_ROUTES } from '@/constants';

/**
 * Premium Footer component
 */
export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'Platform',
            links: [
                { name: 'Discover', href: FRONTEND_ROUTES.DASHBOARD.INFLUENCERS },
                { name: 'Campaigns', href: FRONTEND_ROUTES.DASHBOARD.CAMPAIGNS },
                { name: 'Analytics', href: FRONTEND_ROUTES.DASHBOARD.ANALYTICS },
                { name: 'Pricing', href: FRONTEND_ROUTES.PRICING },
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
                { name: 'Blog', href: FRONTEND_ROUTES.BLOG },
                { name: 'Docs', href: FRONTEND_ROUTES.DOCS },
                { name: 'Guides', href: FRONTEND_ROUTES.GUIDES },
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
        <footer className="bg-card border-t border-border pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                                <Rocket size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Kollabary</span>
                        </Link>
                        <p className="text-muted-foreground max-w-xs leading-relaxed">
                            The premium destination for authentic collaborations between visionary brands and creative minds.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                                <Github size={18} />
                            </Link>
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground/80">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors block py-0.5">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Kollabary. All rights reserved. Made for the creators.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Status: <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" /> All systems operational
                    </p>
                </div>
            </div>
        </footer>
    );
};
