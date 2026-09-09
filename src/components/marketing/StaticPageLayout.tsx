'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { FRONTEND_ROUTES } from '@/constants';
import { cn } from '@/lib/utils';
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react';

interface StaticPageLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    lastUpdated?: string;
    badgeText?: string;
    showReturnHome?: boolean;
    className?: string;
}

export const StaticPageLayout = ({
    children,
    title,
    subtitle,
    lastUpdated,
    showReturnHome = true,
    className
}: StaticPageLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <Navbar />

            <main className="grow pt-32 pb-24">
                <div className={cn("container mx-auto px-6 max-w-4xl", className)}>
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 text-center md:text-left border-b border-border/50 pb-10"
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                {subtitle}
                            </p>
                        )}
                        {lastUpdated && (
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80 mt-6 pt-4 border-t border-border/30">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                <span>Last Updated: {lastUpdated}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Document Sections Content */}
                    <div className="divide-y divide-border/40">
                        {children}
                    </div>

                    {/* Return Home Button */}
                    {showReturnHome && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-16 pt-8 border-t border-border/40 flex justify-center md:justify-start"
                        >
                            <Link
                                href={FRONTEND_ROUTES.HOME}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm transition-all duration-200 shadow-md shadow-primary/20 group"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                <span>Return to Home</span>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

interface StaticSectionProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    index?: number;
    className?: string;
}

export const StaticSection = ({ title, icon, children, index = 0, className }: StaticSectionProps) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={cn("py-10 first:pt-2 last:pb-2", className)}
        >
            <div className="flex items-center gap-3.5 mb-5">
                {icon && (
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                        {icon}
                    </div>
                )}
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            </div>
            <div className="text-muted-foreground leading-relaxed text-base md:text-lg space-y-4 font-normal [&_strong]:text-foreground [&_strong]:font-semibold [&_ul]:space-y-2 [&_ul]:my-3 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:marker:text-primary">
                {children}
            </div>
        </motion.section>
    );
};

interface StaticCalloutProps {
    title?: string;
    children: React.ReactNode;
    variant?: 'warning' | 'info' | 'danger';
}

export const StaticCallout = ({ title, children, variant = 'warning' }: StaticCalloutProps) => {
    const variantStyles = {
        warning: 'border-amber-500/80 bg-amber-500/5 text-amber-950 dark:text-amber-200',
        danger: 'border-red-500/80 bg-red-500/5 text-red-950 dark:text-red-200',
        info: 'border-primary/80 bg-primary/5 text-foreground'
    };

    return (
        <div className={cn("my-8 p-6 rounded-r-2xl border-l-4", variantStyles[variant])}>
            {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
            <div className="text-sm md:text-base leading-relaxed opacity-90">
                {children}
            </div>
        </div>
    );
};

