'use client';

import Link from 'next/link';
import { Rocket, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import { COMPANY_EMAIL, FRONTEND_ROUTES } from '@/constants';
import { Logo } from '../shared/Logo';

/**
 * Premium Footer component with glassmorphism and modern branding
 */
export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const legalLinks = [
        { name: 'Privacy Policy', href: FRONTEND_ROUTES.PRIVACY },
        { name: 'Terms of Service', href: FRONTEND_ROUTES.TERMS },
        // { name: 'Cookie Policy', href: FRONTEND_ROUTES.COOKIES },
    ];

    const contactDetails = [
        { icon: Mail, value: COMPANY_EMAIL, label: 'Email Support' },
        // { icon: MapPin, value: 'Silicon Valley, CA', label: 'Main Office' },
        // { icon: PhoneCall, value: '+1 (555) 000-0000', label: 'Business Inquiries' },
    ];

    return (
        <footer className="bg-card text-card-foreground pt-32 pb-12 border-t border-border relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center">
                            <Link href="/" className="active:scale-95 transition-transform">
                                <Logo className="w-32 sm:w-40 md:w-44" />
                            </Link>
                        </div>
                        <p className="text-muted-foreground max-w-sm leading-relaxed text-sm font-medium">
                            The premium destination for authentic collaborations between visionary brands and creative minds.
                        </p>
                        {/* <div className="flex items-center gap-5">
                            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 glass border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-all">
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div> */}
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-primary/80">Support & Outreach</h4>
                        <div className="space-y-6">
                            {contactDetails.map((detail) => (
                                <div key={detail.value} className="flex items-center gap-4 group cursor-default">
                                    <div className="w-11 h-11 rounded-2xl glass-section border-primary/5 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                                        <detail.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-0.5">{detail.label}</p>
                                        <p className="font-black text-sm tracking-tight group-hover:text-primary transition-colors">{detail.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-primary/80">Legal Framework</h4>
                        <ul className="grid grid-cols-1 gap-3">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="flex items-center justify-between px-5 py-4 rounded-2xl glass-chip border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all group">
                                        <span className="font-bold text-xs tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">{link.name}</span>
                                        <div className="w-6 h-6 rounded-lg bg-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                            <Rocket size={12} className="text-primary" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-sm font-bold text-muted-foreground/40">
                        © {currentYear} Kollabary. Crafted with Passion.
                    </p>
                    <div className="flex items-center gap-6">
                        <p className="text-sm font-bold text-muted-foreground/40 flex items-center gap-2">
                            Status <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                        </p>
                        <div className="h-4 w-px bg-border" />
                        <p className="text-sm font-bold text-muted-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                            English (US)
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
