'use client';

import React from 'react';
import Image from 'next/image';
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
    requirements: {
        completedCollabs: number;
        verified: boolean;
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

    const getTierBadge = (tierName: string): string => {
        if (tierName.includes('Icon')) return '/badges/kollabary_icon.png';
        if (tierName.includes('Elite')) return '/badges/elite_creator.png';
        if (tierName.includes('Pro')) return '/badges/pro_influencer.png';
        if (tierName.includes('Trusted')) return '/badges/trusted_collaborator.png';
        if (tierName.includes('Emerging')) return '/badges/emerging_partner.png';
        return '/badges/rising_creator.png';
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {guideData.tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                className={cn(
                                    "p-4 rounded-2xl border bg-gradient-to-br hover:shadow-lg transition-all duration-300",
                                    getTierColor(tier.name)
                                )}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Image
                                        src={getTierBadge(tier.name)}
                                        alt={`${tier.name} badge`}
                                        width={44}
                                        height={44}
                                        className="shrink-0 drop-shadow-md"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{tier.name}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                            {tier.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 text-xs bg-background/50 rounded-lg px-2 py-1.5">
                                        <CheckCircle2 size={12} className="text-primary shrink-0" />
                                        <span className="font-medium">{tier.requirements.completedCollabs}+ collaborations</span>
                                    </div>
                                    {tier.requirements.verified && (
                                        <div className="flex items-center gap-1.5 text-xs bg-emerald-500/10 rounded-lg px-2 py-1.5">
                                            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                            <span className="font-medium text-emerald-700 dark:text-emerald-400">Verified required</span>
                                        </div>
                                    )}
                                </div>

                                {tier.benefits.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-border/30">
                                        <p className="text-xs font-bold text-muted-foreground mb-1.5">Top Benefits:</p>
                                        <div className="space-y-1">
                                            {tier.benefits.slice(0, 2).map((benefit, i) => (
                                                <div key={i} className="flex items-start gap-1.5 text-xs">
                                                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                                    <span className="line-clamp-1">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(guideData.scoringGuide).map(([key, metric], index) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                className="p-4 rounded-2xl border border-border/50 bg-muted/20 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shrink-0">
                                        {getMetricIcon(key)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm truncate">{getMetricTitle(key)}</h4>
                                        {metric.maxPoints && (
                                            <span className="text-xs font-bold text-primary">
                                                {key === 'penalties' ? metric.impact : `${metric.maxPoints} pts`}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{metric.description}</p>

                                <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                                    <p className="text-xs font-medium text-muted-foreground line-clamp-2">
                                        <span className="font-bold">How:</span> {metric.calculation || metric.impact}
                                    </p>
                                </div>

                                {metric.tips && metric.tips.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-border/30">
                                        <p className="text-xs font-bold text-muted-foreground mb-1.5">Quick Tip:</p>
                                        <div className="flex items-start gap-2 text-xs">
                                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                            <span className="line-clamp-2">{metric.tips[0]}</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
