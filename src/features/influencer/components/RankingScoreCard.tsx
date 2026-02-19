'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Trophy,
    CheckCircle2,
    Star,
    Zap,
    BarChart3,
    AlertTriangle,
    Check
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
        if (score >= 90) return 'text-purple-500';
        if (score >= 75) return 'text-violet-500';
        if (score >= 60) return 'text-amber-500';
        if (score >= 40) return 'text-indigo-500';
        if (score >= 20) return 'text-blue-500';
        return 'text-emerald-500';
    };

    const getScoreBg = (score: number) => {
        if (score >= 90) return 'from-purple-500/20 to-pink-500/5 border-purple-500/20';
        if (score >= 75) return 'from-violet-500/20 to-amber-500/5 border-violet-500/20';
        if (score >= 60) return 'from-amber-500/20 to-amber-500/5 border-amber-500/20';
        if (score >= 40) return 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20';
        if (score >= 20) return 'from-blue-500/20 to-blue-500/5 border-blue-500/20';
        return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20';
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
                        {breakdown.rankingTier}
                    </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Score Breakdown</h4>

                    <div className="grid grid-cols-1 gap-3">
                        {/* Completed Collaborations */}
                        <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Collaborations</p>
                                    <p className="text-[10px] text-muted-foreground">{completedCollaborations.count} completed • 1 pt each</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-blue-500">+{completedCollaborations.score}</p>
                            </div>
                        </div>

                        {/* Verification Bonus */}
                        <div className={cn(
                            "flex items-center justify-between p-3 rounded-2xl border",
                            verificationBonus.isVerified 
                                ? "bg-emerald-500/5 border-emerald-500/10" 
                                : "bg-zinc-50 dark:bg-zinc-800/30 border-border/30"
                        )}>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-xl flex items-center justify-center",
                                    verificationBonus.isVerified 
                                        ? "bg-emerald-500/10 text-emerald-500" 
                                        : "bg-zinc-500/10 text-zinc-500"
                                )}>
                                    <CheckCircle2 size={16} />
                                </div>
                                <div>
                                    <p className={cn(
                                        "text-sm font-bold",
                                        verificationBonus.isVerified && "text-emerald-500"
                                    )}>
                                        Verification Bonus
                                    </p>
                                    <p className={cn(
                                        "text-[10px]",
                                        verificationBonus.isVerified 
                                            ? "text-emerald-600/70" 
                                            : "text-muted-foreground"
                                    )}>
                                        {verificationBonus.isVerified ? 'Account verified' : 'Not verified'}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "text-sm font-bold",
                                    verificationBonus.isVerified ? "text-emerald-500" : "text-muted-foreground"
                                )}>
                                    {verificationBonus.isVerified ? '+' : ''}{verificationBonus.score}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requirements List (Mini) */}
                <div className="pt-4 border-t border-border/50">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Tier Requirements</h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                            {breakdown.requirementsMet?.completedCollabs ? <Check size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />}
                            <span className="text-[10px] font-medium">Completed Collabs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {breakdown.requirementsMet?.verified ? <Check size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />}
                            <span className="text-[10px] font-medium">Verified Account</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
