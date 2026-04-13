'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, MessageCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RankTierBadge } from '@/components/shared/RankTierBadge';

interface PublicRankingCardProps {
    score: number;
    tier: string;
    stats: {
        completedCollaborations: number | any[];
        avgRating: number;
        totalReviews: number;
    };
    className?: string;
}

export const PublicRankingCard = ({ score, tier, stats, className }: PublicRankingCardProps) => {
    // Determine the color based on score
    const getScoreColor = (s: number) => {
        if (s >= 90) return 'text-purple-500';
        if (s >= 75) return 'text-violet-500';
        if (s >= 60) return 'text-amber-500';
        if (s >= 40) return 'text-indigo-500';
        return 'text-emerald-500';
    };

    const getScoreBg = (s: number) => {
        if (s >= 90) return 'from-purple-500/20 to-pink-500/5 border-purple-500/20';
        if (s >= 75) return 'from-violet-500/20 to-amber-500/5 border-violet-500/20';
        if (s >= 60) return 'from-amber-500/20 to-amber-500/5 border-amber-500/20';
        if (s >= 40) return 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20';
        return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20';
    };

    // Calculate collaboration count safely
    const collabCount = Array.isArray(stats.completedCollaborations) 
        ? stats.completedCollaborations.length 
        : Number(stats.completedCollaborations || 0);

    return (
        <Card className={cn(
            "rounded-[2.5rem] border-border/40 bg-card/30 backdrop-blur-2xl glass-card overflow-hidden shadow-2xl shadow-black/5",
            className
        )}>
            <CardHeader className="p-6 border-b border-border/50 glass-section bg-primary/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary">
                            <Trophy size={18} />
                        </div>
                        <h3 className="font-bold tracking-tight text-lg">Creator Ranking</h3>
                    </div>
                    <div className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm transition-colors",
                        getScoreBg(score)
                    )}>
                        {tier}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
                {/* Score Circle & Badge */}
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                        <svg viewBox="0 0 160 160" className="w-40 h-40 transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-zinc-100 dark:text-white/[0.05]"
                            />
                            <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeLinecap="round"
                                fill="transparent"
                                strokeDasharray={440}
                                initial={{ strokeDashoffset: 440 }}
                                animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                                transition={{ duration: 2, ease: "circOut" }}
                                className={cn(getScoreColor(score), "drop-shadow-[0_0_8px_currentColor]")}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={cn("text-6xl font-black tabular-nums tracking-tighter", getScoreColor(score))}
                            >
                                {score}
                            </motion.span>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] -mt-1">
                                KollabScore
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <RankTierBadge tier={tier} size="md" showDescription />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Platform Reputation</p>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-zinc-100 dark:bg-white/[0.06] p-4 rounded-2xl border border-border/30 text-center transition-all hover:bg-primary/5">
                        <div className="flex items-center justify-center text-primary mb-2">
                            <Award size={16} />
                        </div>
                        <p className="text-xl font-black tabular-nums tracking-tight">{collabCount}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Collabs</p>
                    </div>
                    
                    <div className="bg-zinc-100 dark:bg-white/[0.06] p-4 rounded-2xl border border-border/30 text-center transition-all hover:bg-amber-500/5">
                        <div className="flex items-center justify-center text-amber-500 mb-2">
                            <Star size={16} className="fill-amber-500" />
                        </div>
                        <p className="text-xl font-black tabular-nums tracking-tight">{Number(stats.avgRating || 0).toFixed(1)}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Rating</p>
                    </div>

                    <div className="bg-zinc-100 dark:bg-white/[0.06] p-4 rounded-2xl border border-border/30 text-center transition-all hover:bg-primary/5">
                        <div className="flex items-center justify-center text-primary mb-2">
                            <MessageCircle size={16} />
                        </div>
                        <p className="text-xl font-black tabular-nums tracking-tight">{stats.totalReviews}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Reviews</p>
                    </div>
                </div>

                {/* Legend/Info */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                    <p className="text-[11px] font-medium text-muted-foreground leading-snug">
                        Scores are calculated based on collaboration history, platform activity, and community feedback.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
