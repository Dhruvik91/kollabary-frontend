import { User } from './auth.types';

export enum AvailabilityStatus {
    OPEN = 'OPEN',
    BUSY = 'BUSY',
    CLOSED = 'CLOSED',
}

export enum CollaborationType {
    SPONSORED_POST = 'SPONSORED_POST',
    SPONSORED_VIDEO = 'SPONSORED_VIDEO',
    UGC_CONTENT = 'UGC_CONTENT',
    GIVEAWAY = 'GIVEAWAY',
    BRAND_AMBASSADOR = 'BRAND_AMBASSADOR',
    AFFILIATE_PARTNERSHIP = 'AFFILIATE_PARTNERSHIP',
    PRODUCT_PLACEMENT = 'PRODUCT_PLACEMENT',
    LIVE_SESSION = 'LIVE_SESSION',
    EVENT_COVERAGE = 'EVENT_COVERAGE',
    REVENUE_SHARE = 'REVENUE_SHARE',
}

export interface InfluencerProfile {
    id: string;
    userId: string;
    fullName?: string;
    niche: string;
    avatarUrl?: string;
    bio?: string;
    address?: string;
    platforms: Record<string, { handle: string; followers: number; engagementRate?: number }>;
    collaborationTypes: string[];
    availability: AvailabilityStatus;
    avgRating: number;
    totalReviews: number;
    rankingScore: number;
    rankingTier?: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
    user: User & { profile: { fullName: string; username: string; avatarUrl: string; bio: string; location: string } };
}

export interface SearchInfluencersDto {
    niche?: string;
    search?: string;
    platform?: string;
    minFollowers?: number;
    page?: number;
    limit?: number;
}

export interface SearchInfluencersResponse {
    items: InfluencerProfile[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface CreateInfluencerProfileDto {
    niche: string;
    avatarUrl?: string;
    bio?: string;
    address?: string;
    platforms: Record<string, { handle: string; followers: number; engagementRate?: number }>;
    collaborationTypes: CollaborationType[];
    availability?: AvailabilityStatus;
}
