'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { AdminStats } from '@/types/admin.types';

interface AdminGrowthChartProps {
    stats: AdminStats | undefined;
}

export function AdminGrowthChart({ stats }: AdminGrowthChartProps) {
    const growthData = stats?.growth || [];

    // Find the max value to scale the bars correctly
    const maxVal = Math.max(...growthData.flatMap(g => [g.newUsers, g.newCollaborations, g.newReviews]), 10);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border/50 bg-card/50 glass-card p-6 shadow-sm"
        >
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp size={20} className="text-primary" />
                    Platform Growth (Weekly)
                </h3>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                        <div className="h-2 w-2 rounded-full bg-blue-500" /> Users
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                        <div className="h-2 w-2 rounded-full bg-indigo-500" /> Collabs
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" /> Reviews
                    </div>
                </div>
            </div>

            {/* Trend Visualization - Custom CSS Bars */}
            <div className="flex h-52 items-end justify-between gap-1.5 px-2">
                {growthData.map((data, i) => (
                    <div key={i} className="group relative flex-1 flex flex-col justify-end gap-0.5">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.newUsers / maxVal) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + (i * 0.05) }}
                            className="w-full rounded-t-sm bg-blue-500/80 transition-all hover:bg-blue-600"
                        />
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.newCollaborations / maxVal) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.6 + (i * 0.05) }}
                            className="w-full rounded-t-sm bg-indigo-500/60 transition-all hover:bg-indigo-600"
                        />
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.newReviews / maxVal) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.7 + (i * 0.05) }}
                            className="w-full rounded-t-sm bg-emerald-500/60 transition-all hover:bg-emerald-600"
                        />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {data.week}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-8 border-t border-border/50 pt-4">
                <p className="text-xs text-muted-foreground text-center">Weekly growth metrics for user acquisition and activity.</p>
            </div>
        </motion.div>
    );
}
