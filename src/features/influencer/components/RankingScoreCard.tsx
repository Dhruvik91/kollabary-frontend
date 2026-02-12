'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Trophy,
    CheckCircle2,
    Star,
    Zap,
    BarChart3,
    AlertTriangle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RankingBreakdown } from '@/types/ranking';
import { cn } from '@/lib/utils';

interface RankingScoreCardProps {
    breakdown: RankingBreakdown;
    className?: string;
}

export const RankingScoreCard = ({ breakdown, className }: RankingScoreCardProps) => {
    const { totalScore, completedCollaborations, averageRating, responseSpeed, completionRate, verificationBonus, penalties } = breakdown;

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-500';
        if (score >= 50) return 'text-blue-500';
        if (score >= 30) return 'text-amber-500';
        return 'text-red-500';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20';
        if (score >= 50) return 'from-blue-500/20 to-blue-500/5 border-blue-500/20';
        if (score >= 30) return 'from-amber-500/20 to-amber-500/5 border-amber-500/20';
        return 'from-red-500/20 to-red-500/5 border-red-500/20';
    };

    return (
        <Card className={cn("rounded-[2.5rem] border-border/50 backdrop-blur-md overflow-hidden", className)}>
            <div className="p-6 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-primary" />
                    <h3 className="font-bold tracking-tight">Creator Influence Score</h3>
                </div>
            </div>
            <CardContent className="p-8 space-y-8">
                {/* Main Score Display */}
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                    <div className="relative">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-zinc-100 dark:text-zinc-800"
                            />
                            <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={440}
                                initial={{ strokeDashoffset: 440 }}
                                animate={{ strokeDashoffset: 440 - (440 * totalScore) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={cn(getScoreColor(totalScore))}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn("text-5xl font-black tabular-nums", getScoreColor(totalScore))}
                            >
                                {totalScore}
                            </motion.span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Score</span>
                        </div>
                    </div>
                    <div className={cn("px-4 py-1.5 rounded-full text-xs font-bold border text-center transition-all duration-500", getScoreBg(totalScore))}>
                        {totalScore >= 80 ? 'Exceptional Performance' : totalScore >= 50 ? 'Strong Contributor' : 'Promising Talent'}
                    </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Metric Breakdown</h4>

                    <div className="grid grid-cols-1 gap-3">
                        {/* Reliability */}
                        <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <BarChart3 size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Reliability</p>
                                    <p className="text-[10px] text-muted-foreground">{completionRate.percentage}% Completion Rate</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold">+{Math.round(completionRate.score)}</p>
                            </div>
                        </div>

                        {/* Communication */}
                        <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <Zap size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Responsiveness</p>
                                    <p className="text-[10px] text-muted-foreground">Avg. {responseSpeed.hours}h response time</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold">+{Math.round(responseSpeed.score)}</p>
                            </div>
                        </div>

                        {/* Verification Bonus */}
                        {verificationBonus.isVerified && (
                            <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-emerald-500">Verified Bonus</p>
                                        <p className="text-[10px] text-emerald-600/70">Verified Identity</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-500">+{Math.round(verificationBonus.score)}</p>
                                </div>
                            </div>
                        )}

                        {/* Adjustments / Penalties */}
                        <div className={cn(
                            "flex items-center justify-between p-3 rounded-2xl border transition-all duration-300",
                            (penalties.count || 0) > 0
                                ? "bg-red-500/5 border-red-500/10"
                                : "bg-zinc-50 dark:bg-zinc-800/30 border-border/30"
                        )}>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-xl flex items-center justify-center",
                                    (penalties.count || 0) > 0 ? "bg-red-500/10 text-red-500" : "bg-zinc-500/10 text-zinc-500"
                                )}>
                                    <AlertTriangle size={16} />
                                </div>
                                <div>
                                    <p className={cn("text-sm font-bold", (penalties.count || 0) > 0 ? "text-red-500" : "text-foreground")}>Adjustments</p>
                                    <p className="text-[10px] text-muted-foreground">{(penalties.count || 0)} cancellations/penalties</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn("text-sm font-bold", (penalties.count || 0) > 0 ? "text-red-500" : "text-muted-foreground")}>
                                    {Math.round(penalties.score) || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
