'use client';

import React from 'react';
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
        <div className="space-y-12 pb-20">
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
                slug={influencer.slug}
            />

            {/* Modular Statistics Grid */}
            <PublicInfluencerStats
                totalFollowers={Number(totalReach || 0)}
                avgEngagementRate={Number(avgEngagementRate || 0)}
                avgRating={Number(avgRating || 0)}
                rankingTier={influencer.rankingTier}
            />

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Tabs Content (Now includes Biography) */}
                <div className="lg:col-span-2 space-y-12">
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
                        collaborationTypes={collaborationTypes}
                    />
                </div>

                {/* Right Column: Sidebar (Offerings/Pricing/Rankings) */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="sticky top-24">
                        <PublicInfluencerSidebar
                            influencer={influencer}
                            ranking={ranking}
                            minPrice={minPrice ?? 0}
                            maxPrice={maxPrice ?? 0}
                            collaborationTypes={collaborationTypes}
                            availability={availability}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
