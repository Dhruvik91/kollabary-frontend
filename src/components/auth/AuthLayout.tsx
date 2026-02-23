'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

/**
 * Auth Layout Component
 * Provides consistent glassmorphic layout for authentication pages
 */
export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background">
            {/* Animated gradient orbs */}
            <div
                className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] animate-pulse"
                style={{ animationDuration: '6s' }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px] animate-pulse"
                style={{ animationDuration: '8s', animationDelay: '2s' }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/8 blur-[100px] animate-pulse"
                style={{ animationDuration: '10s', animationDelay: '4s' }}
                aria-hidden="true"
            />

            {/* Subtle grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-size-[60px_60px]"
                aria-hidden="true"
            />

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="backdrop-blur-xl bg-card/60 border-border/40 shadow-2xl shadow-black/10 dark:shadow-black/30 ring-1 ring-white/10 dark:ring-white/5 rounded-3xl">
                    <CardHeader className="space-y-1 text-center pb-2">
                        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
                        {description && (
                            <CardDescription className="text-base text-muted-foreground/80">{description}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

