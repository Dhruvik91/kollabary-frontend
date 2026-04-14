'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Global Not Found (404) page.
 * Uses the display font "Season Mix" for large headings and 
 * follows the glassmorphism aesthetic of the platform.
 */
export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full glass-card-elevated p-8 md:p-12 text-center relative z-10 rounded-[2.5rem] border border-white/10"
            >
                {/* 404 Badge */}
                <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 backdrop-blur-sm text-primary">
                    <span className="font-display text-5xl select-none leading-none">?</span>
                </div>

                <h1 className="text-8xl md:text-9xl font-display text-foreground mb-4 tracking-tighter mix-blend-plus-lighter">
                    404
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">Lost in the void</h2>
                <p className="text-muted-foreground mb-12 leading-relaxed text-pretty text-sm md:text-base px-2">
                    The requested page could not be found. It might have been moved, deleted, or never existed in this project's scope.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                        variant="outline" 
                        onClick={() => router.back()}
                        className="flex-1 h-14 rounded-2xl group border-primary/10 hover:bg-primary/5"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </Button>
                    <Button asChild className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                        <Link href="/">
                            <Home className="mr-2 w-4 h-4" />
                            Return Home
                        </Link>
                    </Button>
                </div>
            </motion.div>
            
            {/* Subtle Brand Watermark */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
                <span className="text-[10px] tracking-[0.5em] uppercase font-medium text-muted-foreground">
                    Kollabary Ecosystem
                </span>
            </div>

            {/* Noise Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] noise" />
        </div>
    );
}
