'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { cn } from '@/lib/utils';

interface StaticPageLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    lastUpdated?: string;
    className?: string;
}

export const StaticPageLayout = ({
    children,
    title,
    subtitle,
    lastUpdated,
    className
}: StaticPageLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className={cn("container mx-auto px-6 max-w-4xl", className)}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xl text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                        {lastUpdated && (
                            <p className="text-sm text-muted-foreground mt-4">
                                Last Updated: {lastUpdated}
                            </p>
                        )}
                    </motion.div>

                    <div className="space-y-8">
                        {children}
                    </div>
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
}

export const StaticSection = ({ title, icon, children, index = 0 }: StaticSectionProps) => {
    return (
        <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-8 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-colors"
        >
            <div className="flex items-center gap-4 mb-4">
                {icon && (
                    <div className="p-3 bg-primary/10 rounded-2xl">
                        {icon}
                    </div>
                )}
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="text-muted-foreground leading-relaxed text-lg space-y-4">
                {children}
            </div>
        </motion.section>
    );
};
