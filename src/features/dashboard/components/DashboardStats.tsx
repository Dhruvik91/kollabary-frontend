'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface Stat {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

interface DashboardStatsProps {
    stats: Stat[];
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border glass-card p-6 rounded-3xl group hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-2xl bg-muted/50 transition-colors", stat.color)}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                            <p className="text-lg font-bold capitalize">{stat.value}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
