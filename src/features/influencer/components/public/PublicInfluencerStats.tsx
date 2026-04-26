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
        { 
            label: 'Total Reach', 
            value: formatNumber(totalFollowers), 
            icon: Users, 
            color: 'text-primary', 
            bg: 'bg-primary/5',
            sub: 'Active Followers'
        },
        { 
            label: 'Engagement', 
            value: `${Number(avgEngagementRate).toFixed(1)}%`, 
            icon: TrendingUp, 
            color: 'text-indigo-500', 
            bg: 'bg-indigo-500/5',
            sub: 'Avg Rate'
        },
        { 
            label: 'Platform Rating', 
            value: Number(avgRating).toFixed(1), 
            icon: Star, 
            color: 'text-amber-500', 
            bg: 'bg-amber-500/5',
            sub: 'Reviews Score'
        },
        { 
            label: 'Ranking Tier', 
            value: rankingTier || 'Silver', 
            icon: Zap, 
            color: 'text-rose-500', 
            bg: 'bg-rose-500/5',
            sub: 'Network Status'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <Card key={i} className="group relative overflow-hidden rounded-[2.5rem] border-border/50 bg-card/30 glass-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm", stat.bg, stat.color)}>
                                <stat.icon size={26} className={stat.color === 'text-amber-500' ? 'fill-amber-500' : ''} />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">{stat.label}</p>
                                <p className="text-xs font-bold text-muted-foreground/30">{stat.sub}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                                {stat.value}
                            </h4>
                        </div>
                        
                        {/* Decorative background element */}
                        <div className={cn("absolute -bottom-6 -right-6 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full", stat.bg)} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
