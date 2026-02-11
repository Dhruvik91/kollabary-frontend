'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiscoverNetworkStatsProps {
    total?: number;
    className?: string;
    isMobile?: boolean;
}

export const DiscoverNetworkStats = ({ total = 0, className, isMobile = false }: DiscoverNetworkStatsProps) => {
    if (isMobile) {
        return (
            <div className={cn("h-14 px-5 rounded-3xl bg-zinc-100 dark:bg-zinc-800/50 border border-border/50 flex items-center gap-3", className)}>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-bold text-sm">{total}</span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={cn("bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-3xl border border-border/50 flex items-center gap-4", className)}
        >
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                <Rocket size={24} />
            </div>
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase">Network Status</p>
                <p className="font-bold">{total} Influencers Active</p>
            </div>
        </motion.div>
    );
};
