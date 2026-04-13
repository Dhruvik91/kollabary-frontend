'use client';

import React from 'react';
import { Tags, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PublicRankingCard } from './PublicRankingCard';
import { cn } from '@/lib/utils';
import { FRONTEND_ROUTES } from '@/constants';
import Link from 'next/link';

interface PublicInfluencerSidebarProps {
    influencer: any;
    ranking?: any;
    minPrice?: number;
    maxPrice?: number;
    collaborationTypes?: string[];
    availability: string;
}

export const PublicInfluencerSidebar = ({
    influencer,
    ranking,
    minPrice,
    maxPrice,
    collaborationTypes,
    availability,
}: PublicInfluencerSidebarProps) => {
    return (
        <div className="space-y-8">
            {/* Ranking Card */}
            {ranking && (
                <PublicRankingCard
                    score={influencer.rankingScore || 0}
                    tier={influencer.rankingTier || 'Rising Creator'}
                    stats={{
                        completedCollaborations: influencer.completedCollabCount || 0,
                        avgRating: influencer.avgRating,
                        totalReviews: influencer.totalReviews,
                    }}
                />
            )}

            {/* Collaboration Offerings */}
            <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Tags size={20} />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">Offerings</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-muted/20 rounded-2xl border border-border/50">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Price Range</p>
                            <p className="text-2xl font-black tracking-tight text-primary">
                                ${minPrice?.toLocaleString()} - ${maxPrice?.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground/60 font-medium">Starting rates per collaboration</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Service Types</p>
                            <div className="flex flex-wrap gap-2">
                                {collaborationTypes?.map((type) => (
                                    <Badge key={type} className="bg-background/80 text-foreground border-border/50 rounded-xl px-3 py-1 font-bold text-[10px] lowercase tracking-wide">
                                        #{type.replace(/_/g, ' ')}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href={FRONTEND_ROUTES.AUTH.LOGIN} className="block">
                        <Button className="w-full rounded-2xl h-12 font-black uppercase tracking-widest text-xs gap-2">
                            Request Collaboration
                        </Button>
                    </Link>
                </div>
            </Card>

            {/* Availability Card */}
            <Card className={cn(
                "rounded-[2.5rem] border p-8 transition-all hover:bg-opacity-20",
                availability === 'OPEN' ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" : "bg-amber-500/5 border-amber-500/20 text-amber-500"
            )}>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em]">Availability</h4>
                        <p className="text-2xl font-black tracking-tighter">
                            {availability === 'OPEN' ? 'Ready to Work' : 'Currently Busy'}
                        </p>
                    </div>
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center border",
                        availability === 'OPEN' ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"
                    )}>
                        <Zap size={24} fill="currentColor" />
                    </div>
                </div>
            </Card>
        </div>
    );
};
