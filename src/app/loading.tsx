'use client';

import { motion } from 'framer-motion';
import { BrandIcon } from '@/assets/logo';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Global loading state for the application.
 * Features a premium animated BrandIcon with a subtle breathing effect
 * and a tailored gradient glow.
 */
export default function Loading() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by waiting until mounted to show theme-aware logo
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
                <div className="w-16 h-16 animate-pulse bg-muted rounded-full" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut"
                }}
                className="relative"
            >
                {/* Breathing Effect Wrapper */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [1, 0.8, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative"
                >
                    {/* Glowing ring behind the icon */}
                    <div className="absolute inset-0 blur-xl bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full scale-125 " />
                    
                    <BrandIcon 
                        width={120} 
                        height={120} 
                        theme={resolvedTheme} 
                        className="relative z-10 w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl" 
                    />
                </motion.div>
                
                {/* Rotating accent border */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 -m-4 border border-primary/10 rounded-full border-dashed"
                />
            </motion.div>
            
            {/* Minimalist Progress Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-12 group"
            >
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-chip border border-primary/10">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                        Loading Experience
                    </span>
                    <div className="flex gap-1 ml-1">
                        <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-duration:1.2s] [animation-delay:-0.3s]" />
                        <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-duration:1.2s] [animation-delay:-0.15s]" />
                        <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-duration:1.2s]" />
                    </div>
                </div>
            </motion.div>
            
            {/* Subtle Noise Texture overlay consistent with brand */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] noise" />
        </div>
    );
}
