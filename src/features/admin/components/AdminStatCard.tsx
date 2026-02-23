'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminStatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: 'up' | 'down';
    trendValue?: string;
    colorClass: string;
}

export function AdminStatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    colorClass
}: AdminStatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl backdrop-saturate-150 p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:border-primary/20 will-change-transform"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>

                    {trend && (
                        <div className="mt-2 flex items-center gap-1">
                            <span className={cn(
                                "flex items-center text-xs font-semibold",
                                trend === 'up' ? "text-emerald-500" : "text-rose-500"
                            )}>
                                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {trendValue}
                            </span>
                            <span className="text-[10px] text-muted-foreground">vs average</span>
                        </div>
                    )}
                </div>

                <div className={cn("rounded-xl p-3 text-white shadow-lg", colorClass)}>
                    <Icon size={24} />
                </div>
            </div>

            {/* Background Accent */}
            <div className={cn(
                "absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-5 blur-3xl",
                colorClass
            )} />
        </motion.div>
    );
}
