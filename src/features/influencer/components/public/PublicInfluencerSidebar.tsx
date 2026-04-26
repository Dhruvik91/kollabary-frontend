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
        <div className="space-y-10">
            {/* Ranking Card - Top Priority in Sidebar */}
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

            {/* Collaboration Offerings Card */}
            <Card className="rounded-[3rem] border-border/50 bg-card/30 glass-card p-10 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-xl shadow-black/5">
                {/* Subtle background flair */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-all" />
                
                <div className="space-y-8">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Tags size={24} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">Offerings</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-linear-to-br from-primary/5 to-transparent rounded-[2rem] border border-primary/10 relative group/price">
                            <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em] mb-2 px-1">Investment Range</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black tracking-tighter text-foreground">${minPrice?.toLocaleString()}</span>
                                <span className="text-muted-foreground/40 font-bold text-sm">per collaboration</span>
                            </div>
                            <div className="mt-4 h-1 w-12 bg-primary/20 rounded-full transition-all group-hover/price:w-20 group-hover/price:bg-primary" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">Service Specializations</p>
                            <div className="flex flex-wrap gap-2.5">
                                {collaborationTypes?.length ? (
                                    collaborationTypes.map((type) => (
                                        <Badge key={type} className="bg-background/80 text-foreground border-border/70 rounded-xl px-4 py-1.5 font-bold text-[10px] hover:bg-primary hover:text-white hover:border-primary transition-all">
                                            {type.replace(/_/g, ' ')}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">Custom collaborations available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <Link href={FRONTEND_ROUTES.AUTH.LOGIN} className="block group/btn">
                        <Button className="w-full rounded-[1.5rem] h-14 font-black uppercase tracking-widest text-xs gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                            <Zap size={16} className="group-hover/btn:rotate-12 transition-transform" />
                            Request Collaboration
                        </Button>
                    </Link>
                    
                    <p className="text-[10px] text-center font-black text-muted-foreground/40 uppercase tracking-widest">
                        Standard T&C Apply
                    </p>
                </div>
            </Card>
        </div>
    );
};
