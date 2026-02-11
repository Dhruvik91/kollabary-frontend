import { User } from './auth.types';

export enum AvailabilityStatus {
    OPEN = 'OPEN',
    BUSY = 'BUSY',
    CLOSED = 'CLOSED',
}

export enum CollaborationType {
    PAID_SHOUTOUT = 'Paid Shoutout',
    AFFILIATE = 'Affiliate',
    GIFTING = 'GIFTING',
    LONG_TERM = 'LONG_TERM',
}

export interface InfluencerProfile {
    id: string;
    userId: string;
    niche: string;
    platforms: Record<string, { handle: string; followers: number }>;
    followersCount: number;
    engagementRate: number;
    collaborationTypes: string[];
    availability: AvailabilityStatus;
    avgRating: number;
    totalReviews: number;
    rankingScore: number;
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
