'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * Global Error Boundary page.
 * Provides a graceful way to handle runtime errors with a premium
 * and non-technical interface, keeping consistency with the brand.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service or console
        console.error('Global Error Boundary Captured:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
            {/* Decorative Background Glow (Destructive palette) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-destructive/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] [animation-delay:1.5s]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md w-full glass-card-elevated p-10 md:p-14 text-center relative z-10 rounded-[3rem] border border-destructive/10"
            >
                {/* Caution Icon */}
                <div className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-destructive/10 border border-destructive/20 text-destructive shadow-inner">
                    <AlertCircle className="w-10 h-10" />
                </div>

                <h1 className="text-4xl md:text-5xl font-display text-foreground mb-6 leading-[1.1] tracking-tight">
                    Something went <br /><span className="text-destructive">unexpected</span>
                </h1>

                <p className="text-muted-foreground mb-12 leading-relaxed text-pretty text-sm md:text-base opacity-80">
                    We encountered an unexpected error. Our team has been notified and we're looking into it. In the meantime, you can try refreshing the page.
                </p>

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={() => reset()}
                        size="lg"
                        className="w-full h-15 rounded-2xl hover:bg-foreground/90 transition-all font-semibold shadow-xl"
                    >
                        <RotateCcw className="mr-2 w-5 h-5" />
                        Try Again
                    </Button>

                    <Button asChild variant="ghost" className="w-full h-15 rounded-2xl hover:bg-muted transition-all">
                        <Link href="/">
                            <Home className="mr-2 w-5 h-5" />
                            Back to Safety
                        </Link>
                    </Button>
                </div>

                {error.digest && (
                    <div className="mt-8 pt-6 border-t border-border/50">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-none">
                            Error Instance ID: <span className="text-foreground/60">{error.digest}</span>
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Noise Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] noise" />
        </div>
    );
}
