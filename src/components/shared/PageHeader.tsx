'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
    label: string;
    title: string;
    highlightedTitle?: string;
    subtitle?: string;
    icon?: LucideIcon;
    action?: React.ReactNode;
    className?: string;
}

export const PageHeader = ({
    label,
    title,
    highlightedTitle,
    subtitle,
    icon: Icon,
    action,
    className,
}: PageHeaderProps) => {
    return (
        <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between w-full", className)}>
            <div className="space-y-2 sm:space-y-3 max-w-3xl">
                {/* Label with Icon */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs"
                >
                    {Icon && <Icon size={12} className="sm:w-[14px] sm:h-[14px]" />}
                    <span>{label}</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]"
                >
                    {title}
                    {highlightedTitle && (
                        <>
                            <br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>
                            <span className="text-primary italic">{highlightedTitle}</span>
                        </>
                    )}
                </motion.h1>

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            {/* Optional Activity/Status/Action */}
            {action && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {action}
                </motion.div>
            )}
        </div>
    );
};
