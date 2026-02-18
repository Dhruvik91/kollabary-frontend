'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Award,
    Target,
    Star,
    BarChart3,
    Zap,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    Info,
    ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TierInfo {
    name: string;
    description: string;
    minScore: number;
    requirements: {
        completedCollabs: number;
        rating: number;
        completion: number;
        responseTime: string;
        verified: boolean;
        maxPenalties: string | number;
    };
    benefits: string[];
}

interface ScoringMetric {
    description: string;
    maxPoints?: number;
    calculation?: string;
    impact?: string;
    tips?: string[];
}

interface RankingGuideData {
    tiers: TierInfo[];
    scoringGuide: Record<string, ScoringMetric>;
}

interface RankingGuideCardProps {
    guideData?: RankingGuideData;
    className?: string;
}

export const RankingGuideCard = ({ guideData, className }: RankingGuideCardProps) => {
    const [activeTab, setActiveTab] = React.useState<'tiers' | 'scoring'>('tiers');

    if (!guideData) {
        return null;
    }

    const getTierColor = (tierName: string) => {
        if (tierName.includes('Icon')) return 'from-purple-500/20 to-pink-500/10 border-purple-500/30';
        if (tierName.includes('Elite')) return 'from-violet-500/20 to-purple-500/10 border-violet-500/30';
        if (tierName.includes('Pro')) return 'from-amber-500/20 to-orange-500/10 border-amber-500/30';
        if (tierName.includes('Trusted')) return 'from-indigo-500/20 to-blue-500/10 border-indigo-500/30';
        if (tierName.includes('Emerging')) return 'from-blue-500/20 to-cyan-500/10 border-blue-500/30';
        return 'from-emerald-500/20 to-green-500/10 border-emerald-500/30';
    };

    const getTierIcon = (tierName: string) => {
        if (tierName.includes('Icon')) return '👑';
        if (tierName.includes('Elite')) return '⭐';
        if (tierName.includes('Pro')) return '💎';
        if (tierName.includes('Trusted')) return '🏆';
        if (tierName.includes('Emerging')) return '🌟';
        return '🚀';
    };

    const getMetricIcon = (key: string) => {
        switch (key) {
            case 'completedCollaborations':
                return <Award size={18} className="text-blue-500" />;
            case 'paidPromotions':
                return <Target size={18} className="text-green-500" />;
            case 'averageRating':
                return <Star size={18} className="text-yellow-500" />;
            case 'completionRate':
                return <BarChart3 size={18} className="text-indigo-500" />;
            case 'responseSpeed':
                return <Zap size={18} className="text-purple-500" />;
            case 'verificationBonus':
                return <CheckCircle2 size={18} className="text-emerald-500" />;
            case 'penalties':
                return <AlertTriangle size={18} className="text-red-500" />;
            default:
                return <Info size={18} className="text-gray-500" />;
        }
    };

    const getMetricTitle = (key: string) => {
        const titles: Record<string, string> = {
            completedCollaborations: 'Completed Collaborations',
            paidPromotions: 'Paid Promotions',
            averageRating: 'Average Rating',
            completionRate: 'Completion Rate',
            responseSpeed: 'Response Speed',
            verificationBonus: 'Verification Bonus',
            penalties: 'Penalties',
        };
        return titles[key] || key;
    };

    return (
        <Card className={cn("rounded-[2.5rem] border-border/50 backdrop-blur-md overflow-hidden", className)}>
            <CardHeader className="p-6 border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-primary" />
                        <h3 className="font-bold tracking-tight">Ranking System Guide</h3>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setActiveTab('tiers')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                            activeTab === 'tiers'
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        Tier Levels
                    </button>
                    <button
                        onClick={() => setActiveTab('scoring')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                            activeTab === 'scoring'
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        How to Earn Points
                    </button>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                {activeTab === 'tiers' ? (
                    <div className="space-y-4">
                        {guideData.tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "p-5 rounded-2xl border bg-gradient-to-br",
                                    getTierColor(tier.name)
                                )}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{getTierIcon(tier.name)}</span>
                                        <div>
                                            <h4 className="font-bold text-base">{tier.name}</h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {tier.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-background/50 border border-border/50">
                                        <span className="text-xs font-bold">{tier.minScore}+ pts</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="font-bold text-muted-foreground">Requirements:</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <ChevronRight size={12} className="text-primary" />
                                            <span>{tier.requirements.completedCollabs}+ collaborations</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <ChevronRight size={12} className="text-primary" />
                                            <span>{tier.requirements.rating}+ rating</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <ChevronRight size={12} className="text-primary" />
                                            <span>{tier.requirements.completion}% completion</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <ChevronRight size={12} className="text-primary" />
                                            <span>{tier.requirements.responseTime} response</span>
                                        </div>
                                        {tier.requirements.verified && (
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <ChevronRight size={12} className="text-primary" />
                                                <span>Verified account</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <ChevronRight size={12} className="text-primary" />
                                            <span>≤ {tier.requirements.maxPenalties} penalties</span>
                                        </div>
                                    </div>

                                    {tier.benefits.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-border/30">
                                            <span className="text-xs font-bold text-muted-foreground">Benefits:</span>
                                            <div className="mt-2 space-y-1">
                                                {tier.benefits.slice(0, 3).map((benefit, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 text-xs">
                                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                                        <span>{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-5">
                        {Object.entries(guideData.scoringGuide).map(([key, metric], index) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-5 rounded-2xl border border-border/50 bg-muted/20"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                                        {getMetricIcon(key)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-sm">{getMetricTitle(key)}</h4>
                                            {metric.maxPoints && (
                                                <span className="text-xs font-bold text-primary">
                                                    {key === 'penalties' ? metric.impact : `Max: ${metric.maxPoints} pts`}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-3">{metric.description}</p>

                                        <div className="space-y-2">
                                            <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    <span className="font-bold">Calculation:</span> {metric.calculation || metric.impact}
                                                </p>
                                            </div>

                                            {metric.tips && metric.tips.length > 0 && (
                                                <div className="space-y-1.5">
                                                    <p className="text-xs font-bold text-muted-foreground">Tips:</p>
                                                    {metric.tips.map((tip, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-xs">
                                                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                                            <span>{tip}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
