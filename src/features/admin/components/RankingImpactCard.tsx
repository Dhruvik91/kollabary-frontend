'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Info, BarChart3, ArrowRight } from 'lucide-react';

export function RankingImpactCard() {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
            >
                <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                    <Info size={20} className="text-blue-500" />
                    How it works
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                        The ranking algorithm determines the "Kollabary Score" (0-100) for every influencer.
                        This score directly impacts their visibility in discovery and search results.
                    </p>

                    <div className="rounded-xl bg-muted/50 p-4 space-y-3 border border-border/30">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>Scores are updated daily at 00:00 UTC.</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>Manual recalculation bypasses the daily cycle.</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>Weights must equal 100% for balanced scoring.</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-border/50 bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-200"
            >
                <div className="flex items-center gap-3 mb-4">
                    <BarChart3 size={24} />
                    <h3 className="text-lg font-bold">Platform Impact</h3>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                    A 10% increase in "Engagement Rate" weight typically shifts the top-100 ranking by 12-15 positions.
                    Monitor the "Platform Analytics" after significant changes.
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer hover:translate-x-1 transition-transform">
                    <span>View Analytics</span>
                    <ArrowRight size={14} />
                </div>
            </motion.div>
        </div>
    );
}
