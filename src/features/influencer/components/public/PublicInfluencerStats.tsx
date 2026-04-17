'use client';

import React from 'react';
import { Users, TrendingUp, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PublicInfluencerStatsProps {
    totalFollowers: number;
    avgEngagementRate: number;
    avgRating: number;
    rankingTier?: string;
}

export const PublicInfluencerStats = ({
    totalFollowers,
    avgEngagementRate,
    avgRating,
    rankingTier,
}: PublicInfluencerStatsProps) => {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const stats = [
        { label: 'Total Reach', value: formatNumber(totalFollowers), icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Avg Engagement', value: `${Number(avgEngagementRate).toFixed(1)}%`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Platform Rating', value: Number(avgRating).toFixed(1), icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Tier Status', value: rankingTier || 'Silver', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
                <Card key={i} className="rounded-[2rem] border-border/50 bg-card/30 glass-card overflow-hidden transition-all hover:scale-105 duration-500 group">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12", stat.bg, stat.color)}>
                            <stat.icon size={22} className={stat.color === 'text-amber-500' ? 'fill-amber-500' : ''} />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
