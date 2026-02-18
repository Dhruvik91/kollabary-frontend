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
    Check,
    TrendingUp,
    Award,
    Clock,
    Target,
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
        paidPromotions,
        averageRating,
        responseSpeed,
        completionRate,
        verificationBonus,
        penalties,
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
        <Card className={cn("rounded-[2.5rem] border-border/50 backdrop-blur-md overflow-hidden", className)}>
            <CardHeader className="p-6 border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Trophy size={18} className="text-primary" />
                        <h3 className="font-bold tracking-tight">Ranking Breakdown</h3>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-xs font-bold border", getScoreBg(totalScore))}>
                        {rankingTier}
                    </div>
                </div>
            </CardHeader>

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
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                / 100
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tier Progress */}
                {nextTier && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-2xl border border-border/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-primary" />
                                <span className="text-sm font-bold">Progress to {nextTier}</span>
                            </div>
                            <span className="text-sm font-bold text-primary">{tierProgress}%</span>
                        </div>
                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
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
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Award size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Completed Collaborations</p>
                                    <p className="text-xs text-muted-foreground">
                                        {completedCollaborations.count} completed
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-blue-500">
                                    {completedCollaborations.score}/{completedCollaborations.maxScore}
                                </p>
                                <p className="text-xs text-muted-foreground">points</p>
                            </div>
                        </div>

                        {/* Paid Promotions */}
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                    <Target size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Paid Promotions</p>
                                    <p className="text-xs text-muted-foreground">
                                        {paidPromotions.count} paid collabs
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-green-500">
                                    {paidPromotions.score}/{paidPromotions.maxScore}
                                </p>
                                <p className="text-xs text-muted-foreground">points</p>
                            </div>
                        </div>

                        {/* Average Rating */}
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                    <Star size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Average Rating</p>
                                    <p className="text-xs text-muted-foreground">
                                        {averageRating.value?.toFixed(1) || '0.0'} stars
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-yellow-500">
                                    {averageRating.score}/{averageRating.maxScore}
                                </p>
                                <p className="text-xs text-muted-foreground">points</p>
                            </div>
                        </div>

                        {/* Completion Rate */}
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                    <BarChart3 size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Completion Rate</p>
                                    <p className="text-xs text-muted-foreground">
                                        {completionRate.percentage?.toFixed(1) || '0.0'}% completed
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-indigo-500">
                                    {completionRate.score}/{completionRate.maxScore}
                                </p>
                                <p className="text-xs text-muted-foreground">points</p>
                            </div>
                        </div>

                        {/* Response Speed */}
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Response Speed</p>
                                    <p className="text-xs text-muted-foreground">
                                        Avg. {responseSpeed.hours?.toFixed(1) || '0.0'}h
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-purple-500">
                                    {responseSpeed.score}/{responseSpeed.maxScore}
                                </p>
                                <p className="text-xs text-muted-foreground">points</p>
                            </div>
                        </div>

                        {/* Verification Bonus */}
                        {verificationBonus.isVerified && (
                            <div className="flex items-center justify-between p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-emerald-500">Verified Bonus</p>
                                        <p className="text-xs text-emerald-600/70">Account verified</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-500">
                                        +{verificationBonus.score}/{verificationBonus.maxScore}
                                    </p>
                                    <p className="text-xs text-emerald-600/70">bonus</p>
                                </div>
                            </div>
                        )}

                        {/* Penalties */}
                        {(penalties?.count ?? 0) > 0 && (
                            <div className="flex items-col justify-between p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                        <AlertTriangle size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-red-500">Penalties</p>
                                        <div className="text-xs text-muted-foreground space-y-1 mt-1">
                                            {penalties.breakdown.cancellations > 0 && (
                                                <p>• {penalties.breakdown.cancellations} cancellations</p>
                                            )}
                                            {penalties.breakdown.rejections > 0 && (
                                                <p>• {penalties.breakdown.rejections} rejections</p>
                                            )}
                                            {penalties.breakdown.reports > 0 && (
                                                <p>• {penalties.breakdown.reports} reports</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-red-500">{penalties.score}</p>
                                    <p className="text-xs text-red-600/70">penalty</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tier Requirements */}
                <div className="pt-4 border-t border-border/50">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        Current Tier Requirements
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.score)}
                            <span className="text-xs font-medium">
                                Score ≥ {tierRequirements.minScore}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.completedCollabs)}
                            <span className="text-xs font-medium">
                                {tierRequirements.minCollabs}+ Collabs
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.rating)}
                            <span className="text-xs font-medium">
                                Rating ≥ {tierRequirements.minRating}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.completion)}
                            <span className="text-xs font-medium">
                                {tierRequirements.minCompletion}% Complete
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.responseTime)}
                            <span className="text-xs font-medium">
                                ≤ {tierRequirements.maxResponseHours}h Response
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.verified)}
                            <span className="text-xs font-medium">
                                {tierRequirements.verified ? 'Verified' : 'No Verification'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getRequirementStatus(requirementsMet.penalties)}
                            <span className="text-xs font-medium">
                                ≤ {tierRequirements.maxPenalties} Penalties
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
