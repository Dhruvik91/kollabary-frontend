'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
    containerClassName?: string;
    index?: number;
    ariaLabel?: string;
}

/**
 * A premium card component with a persistent glowing background gradient.
 * Used for steps, features, and other focus elements.
 */
export const GlowCard = ({ 
    children, 
    color = "from-primary/10 to-secondary/10", 
    className,
    containerClassName,
    index = 0,
    ariaLabel
}: GlowCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn("relative group h-full transform-gpu", containerClassName)}
            role="listitem"
            aria-label={ariaLabel}
        >
            {/* The Glow Effect */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 rounded-[3rem]",
                color
            )} aria-hidden="true" />
            
            {/* Card Content Interior */}
            <div className={cn(
                "relative h-full glass-card p-10 rounded-[3rem] flex flex-col transition-all duration-500",
                className
            )}>
                {children}
            </div>
        </motion.div>
    );
};
