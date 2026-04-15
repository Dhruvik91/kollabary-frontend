'use client';

import React from 'react';
import { Briefcase, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { InfluencerProfile } from '@/types/influencer.types';
import { RankingBreakdown } from '@/types/ranking';
import { Review } from '@/types/review.types';

// Import Modular Components
import { PublicInfluencerHero } from './public/PublicInfluencerHero';
import { PublicInfluencerStats } from './public/PublicInfluencerStats';
import { PublicInfluencerTabs } from './public/PublicInfluencerTabs';
import { PublicInfluencerSidebar } from './public/PublicInfluencerSidebar';

interface PublicInfluencerProfileProps {
    influencer: InfluencerProfile;
    ranking?: RankingBreakdown;
    reviews: Review[];
    reviewsLoading: boolean;
}

export const PublicInfluencerProfile = ({
    influencer,
    ranking,
    reviews,
    reviewsLoading,
}: PublicInfluencerProfileProps) => {
    const { user, totalFollowers, avgEngagementRate, categories, platforms, availability, verified, minPrice, maxPrice, collaborationTypes } = influencer;

    // Destructure with safety and fallbacks
    const profile = user?.profile;
    const fullName = influencer.fullName || profile?.fullName || 'Creator';
    const username = profile?.username || 'user';
    const avatarUrl = influencer.avatarUrl || profile?.avatarUrl;
    const bio = influencer.bio || profile?.bio;
    const location = profile?.location || (influencer.locationCity ? `${influencer.locationCity}, ${influencer.locationCountry}` : influencer.locationCountry);

    // Use backend-provided aggregate statistics directly
    const completedCollabsArray = Array.isArray(influencer.completedCollaborations) ? influencer.completedCollaborations : [];
    const avgRating = influencer.avgRating || 0;
    const totalReach = influencer.totalFollowers || 0;

    return (
        <div className="space-y-8 pb-20">
            {/* Modular Hero Section */}
            <PublicInfluencerHero
                influencerId={influencer.id}
                fullName={fullName}
                username={username}
                avatarUrl={avatarUrl}
                verified={verified}
                rankingTier={influencer.rankingTier}
                location={location}
                categories={categories}
                languages={influencer.languages}
            />

            {/* Modular Statistics Grid */}
            <PublicInfluencerStats
                totalFollowers={Number(totalReach || 0)}
                avgEngagementRate={Number(avgEngagementRate || 0)}
                avgRating={Number(avgRating || 0)}
                rankingTier={influencer.rankingTier}
            />

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column Part 1: Bio (Always first in content) */}
                <div className="lg:col-span-2 order-1">
                    <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8 md:p-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-primary">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <Briefcase size={22} />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">Biography</h3>
                            </div>
                            <div className="relative">
                                <Quote className="absolute -top-4 -left-6 h-12 w-12 text-primary/5 -z-10" />
                                <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-medium italic">
                                    {bio || "This creator hasn't added a bio yet, but their work speaks for itself. They're likely focused on creating their next masterpiece!"}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Sidebar (Rankings/Status) - 2nd on mobile, 3rd on desktop */}
                <div className="lg:col-span-1 order-2 lg:order-3 lg:row-span-2">
                    <PublicInfluencerSidebar
                        influencer={influencer}
                        ranking={ranking}
                        minPrice={minPrice ?? 0}
                        maxPrice={maxPrice ?? 0}
                        collaborationTypes={collaborationTypes}
                        availability={availability}
                    />
                </div>

                {/* Left Column Part 2: Tabs - 3rd on mobile, 2nd on desktop */}
                <div className="lg:col-span-2 order-3 lg:order-2">
                    <PublicInfluencerTabs
                        influencerId={influencer.id}
                        platforms={platforms}
                        brandPartners={(influencer as any).brandPartners || []}
                        reviews={reviews}
                        reviewsLoading={reviewsLoading}
                        bio={bio}
                        genderRatio={influencer.audienceGenderRatio}
                        ageBrackets={influencer.audienceAgeBrackets}
                        topCountries={influencer.audienceTopCountries}
                    />
                </div>
            </div>
        </div>
    );
};
