import { PaginatedResponse, User } from "../constants/interface";

export interface InfluencerProfile {
    id: string;
    user: User; // or any if User not fully match
    niche: string;
    platforms: string[]; // or JSON
    followersCount: number;
    engagementRate: number;
    collaborationTypes: string[];
    availability: boolean;
    avgRating: number;
    totalReviews: number;
    rankingScore: number;
    verified: boolean;
    bio?: string;
    location?: string;
    socialMediaLinks?: {
        instagram?: string;
        youtube?: string;
        twitter?: string;
        tiktok?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface SaveInfluencerProfileDto {
    niche?: string;
    platforms?: string[];
    collaborationTypes?: string[];
    availability?: boolean;
    bio?: string;
    location?: string;
    socialMediaLinks?: {
        instagram?: string;
        youtube?: string;
        twitter?: string;
        tiktok?: string;
    };
}

export interface CreateInfluencerPayload {
    bio?: string;
    location?: string;
    socialMediaLinks?: {
        instagram?: string;
        youtube?: string;
        twitter?: string;
        tiktok?: string;
    };
    niche?: string;
}

export interface SearchInfluencersDto {
    niche?: string;
    platform?: string;
    minFollowers?: number;
    search?: string;
    page?: number;
    limit?: number;
}

export type InfluencerSearchResponse = PaginatedResponse<InfluencerProfile>;
