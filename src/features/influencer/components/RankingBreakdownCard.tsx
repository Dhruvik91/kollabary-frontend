'use client';

import { motion } from 'framer-motion';
import {
    Trophy,
    CheckCircle2,
    Check,
    TrendingUp,
    Award,
    XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RankingBreakdown } from '@/types/ranking';
import { cn } from '@/lib/utils';

interface RankingBreakdownCardProps {
    breakdown: RankingBreakdown;
    className?: string;
}

export const RankingBreakdownCard = ({ breakdown, className }: RankingBreakdownCardProps) => {
    const {
        totalScore,
        completedCollaborations,
        verificationBonus,
        rankingTier,
        nextTier,
        tierProgress,
        requirementsMet,
        tierRequirements,
    } = breakdown;

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

    const getRequirementStatus = (met: boolean) => {
        return met ? (
            <Check size={14} className="text-green-500" />
        ) : (
            <XCircle size={14} className="text-red-500" />
        );
    };

    return (
        <Card className={cn("rounded-[2rem] md:rounded-[2.5rem] border-border/40 bg-card/40 glass-card overflow-hidden", className)}>
            <CardHeader className="p-4 sm:p-5 md:p-6 border-b border-border/50 glass-section bg-muted/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                        <h3 className="font-bold tracking-tight text-sm sm:text-base">Ranking Breakdown</h3>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-xs font-bold border", getScoreBg(totalScore))}>
                        {rankingTier}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Main Score Display */}
                <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 py-3 sm:py-4">
                    <div className="relative">
                        <svg className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-zinc-100 dark:text-white/[0.10]"
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
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                / 100
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tier Progress */}
                {nextTier && (
                    <div className="space-y-3 p-4 glass-section bg-muted/30 rounded-2xl border border-border/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-primary" />
                                <span className="text-sm font-bold">Progress to {nextTier}</span>
                            </div>
                            <span className="text-sm font-bold text-primary">{tierProgress}%</span>
                        </div>
                        <div className="w-full bg-zinc-200 glass-chip rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${tierProgress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                )}

                {/* Detailed Metrics */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Score Breakdown
                    </h4>

                    <div className="grid grid-cols-1 gap-3">
                        {/* Completed Collaborations */}
                        <div className="flex items-center justify-between p-4 bg-zinc-50 glass-section rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                    <Award size={18} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold truncate">Completed Collaborations</p>
                                    <p className="text-xs text-muted-foreground">
                                        {completedCollaborations.count} completed • 1 point each
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                                <p className="text-sm font-bold text-blue-500 whitespace-nowrap">
                                    {completedCollaborations.score}
                                </p>
                                <p className="text-xs text-muted-foreground">points</p>
                            </div>
                        </div>

                        {/* Verification Bonus */}
                        <div className={cn(
                            "flex items-center justify-between p-4 rounded-2xl border",
                            verificationBonus.isVerified
                                ? "bg-emerald-500/5 border-emerald-500/10"
                                : "bg-zinc-50 dark:bg-white/[0.06] border-border/30 dark:border-white/[0.08]"
                        )}>
                            <div className="flex items-center gap-3 min-w-0">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                    verificationBonus.isVerified
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-zinc-200 glass-chip text-muted-foreground"
                                )}>
                                    <CheckCircle2 size={18} />
                                </div>
                                <div className="min-w-0">
                                    <p className={cn(
                                        "text-sm font-bold truncate",
                                        verificationBonus.isVerified && "text-emerald-500"
                                    )}>
                                        Verification Bonus
                                    </p>
                                    <p className={cn(
                                        "text-xs",
                                        verificationBonus.isVerified
                                            ? "text-emerald-600/70"
                                            : "text-muted-foreground"
                                    )}>
                                        {verificationBonus.isVerified ? 'Account verified' : 'Not verified'}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                                <p className={cn(
                                    "text-sm font-bold whitespace-nowrap",
                                    verificationBonus.isVerified ? "text-emerald-500" : "text-muted-foreground"
                                )}>
                                    {verificationBonus.isVerified ? '+' : ''}{verificationBonus.score}/{verificationBonus.maxScore}
                                </p>
                                <p className={cn(
                                    "text-xs",
                                    verificationBonus.isVerified
                                        ? "text-emerald-600/70"
                                        : "text-muted-foreground"
                                )}>
                                    bonus
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tier Requirements */}
                <div className="pt-4 border-t border-border/50">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        Current Tier Requirements
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.completedCollabs)}
                            <span className="text-xs font-medium">
                                {tierRequirements.minCollabs}+ Collaborations
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.verified)}
                            <span className="text-xs font-medium">
                                {tierRequirements.verified ? 'Verified Account' : 'No Verification Required'}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
