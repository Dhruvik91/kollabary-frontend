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
    ShieldCheck,
    Trophy,
    AlertTriangle,
    TrendingUp,
    Info,
    ChevronRight,
} from 'lucide-react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { BASE_IMAGE_URL } from '@/constants';

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
        // Using brand-aligned subtle colors
        if (tierName.includes('Icon')) return 'from-primary/20 via-primary/10 to-transparent border-primary/20 shadow-primary/5';
        if (tierName.includes('Elite')) return 'from-primary/15 via-primary/5 to-transparent border-primary/15 shadow-primary/5';
        if (tierName.includes('Pro')) return 'from-secondary/20 via-secondary/10 to-transparent border-secondary/20 shadow-secondary/5';
        if (tierName.includes('Trusted')) return 'from-secondary/15 via-secondary/5 to-transparent border-secondary/15 shadow-secondary/5';
        if (tierName.includes('Emerging')) return 'from-zinc-500/10 via-zinc-500/5 to-transparent border-zinc-500/10 shadow-black/5';
        return 'from-zinc-500/5 via-transparent to-transparent border-zinc-500/5 shadow-black/5';
    };

    const getTierBadge = (tierName: string): string => {
        if (tierName.includes('Icon')) return `${BASE_IMAGE_URL}/kollabary_icon.png`;
        if (tierName.includes('Elite')) return `${BASE_IMAGE_URL}/elite_creator.png`;
        if (tierName.includes('Pro')) return `${BASE_IMAGE_URL}/pro_influencer.png`;
        if (tierName.includes('Trusted')) return `${BASE_IMAGE_URL}/trusted_collaborator.png`;
        if (tierName.includes('Emerging')) return `${BASE_IMAGE_URL}/emerging_partner.png`;
        return `${BASE_IMAGE_URL}/rising_creator.png`;
    };

    const getMetricIcon = (key: string) => {
        const iconClass = "text-primary";
        switch (key) {
            case 'completedCollaborations':
                return <Award size={18} className={iconClass} />;
            case 'paidPromotions':
                return <Target size={18} className={iconClass} />;
            case 'averageRating':
                return <Star size={18} className={iconClass} />;
            case 'completionRate':
                return <BarChart3 size={18} className={iconClass} />;
            case 'responseSpeed':
                return <Zap size={18} className={iconClass} />;
            case 'verificationBonus':
                return <CheckCircle2 size={18} className={iconClass} />;
            case 'penalties':
                return <AlertTriangle size={18} className="text-destructive" />;
            default:
                return <Info size={18} className="text-muted-foreground" />;
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
        <Tabs defaultValue="tiers" className={cn("w-full h-full", className)}>
            <div className="flex flex-col gap-8 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Trophy size={18} className="text-primary" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">Ranking System</h3>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium pl-10">
                            Learn how to climb the ranks and unlock exclusive benefits
                        </p>
                    </div>

                    <TabsList variant="pill">
                        <TabsTrigger value="tiers">Tier Levels</TabsTrigger>
                        <TabsTrigger value="scoring">How to Earn</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="tiers" className="mt-0 outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                        {guideData.tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={cn(
                                    "group relative p-5 rounded-3xl border bg-linear-to-br transition-all duration-500",
                                    getTierColor(tier.name)
                                )}
                            >
                                <div className="flex items-start justify-between gap-4 mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <Image
                                                src={getTierBadge(tier.name)}
                                                alt={`${tier.name} badge`}
                                                width={48}
                                                height={48}
                                                className="relative shrink-0 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="space-y-0.5">
                                            <h4 className="font-black text-lg tracking-tight group-hover:text-primary transition-colors">
                                                {tier.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                                                {tier.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                        <ChevronRight size={16} className="text-primary/40" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider glass-chip rounded-xl px-3 py-2">
                                        <CheckCircle2 size={12} className="text-primary shrink-0" />
                                        <span>{tier.requirements.completedCollabs}+ collabs</span>
                                    </div>
                                    {tier.requirements.verified && (
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl px-3 py-2">
                                            <ShieldCheck size={12} className="shrink-0" />
                                            <span>Verified</span>
                                        </div>
                                    )}
                                </div>

                                {tier.benefits.length > 0 && (
                                    <div className="pt-4 border-t border-border/10 space-y-2">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Benefits</p>
                                        <div className="space-y-1.5">
                                            {tier.benefits.slice(0, 3).map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                                                    <span className="line-clamp-1">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="scoring" className="mt-0 outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                        {Object.entries(guideData.scoringGuide).map(([key, metric], index) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="group p-5 rounded-3xl border border-border/40 bg-zinc-50/30 dark:bg-white/2 hover:border-primary/20 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-all duration-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:border-primary/20 transition-all duration-500">
                                        {getMetricIcon(key)}
                                    </div>
                                    {metric.maxPoints && (
                                        <div className={cn(
                                            "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                            key === 'penalties' 
                                                ? "bg-destructive/10 text-destructive" 
                                                : "bg-primary/10 text-primary"
                                        )}>
                                            {key === 'penalties' ? 'Penalty' : `+${metric.maxPoints}`}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5 mb-4">
                                    <h4 className="font-black text-sm tracking-tight group-hover:text-primary transition-colors">
                                        {getMetricTitle(key)}
                                    </h4>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2">
                                        {metric.description}
                                    </p>
                                </div>

                                <div className="p-3 rounded-2xl bg-zinc-100/50 dark:bg-black/20 border border-border/20">
                                    <p className="text-[10px] font-medium text-foreground/70 leading-relaxed">
                                        <span className="font-black text-foreground uppercase tracking-widest mr-1 opacity-40">Impact:</span> 
                                        {metric.calculation || metric.impact}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
            </div>
        </Tabs>
    );
};
