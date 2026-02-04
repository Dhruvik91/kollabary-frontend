import { ROLES, CollaborationStatus } from "./constants";

export interface ApiResponse<T> {
    statusCode: number;
    message: string | string[];
    data: T;
    isError: boolean;
    error?: string;
}

export interface User {
    id: string;
    email: string;
    role: ROLES;
    name?: string;
    profileImage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface InfluencerProfile {
    id: string;
    userId: string;
    bio?: string;
    socialMediaLinks?: {
        instagram?: string;
        youtube?: string;
        twitter?: string;
        tiktok?: string;
    };
    categories?: string[];
    followerCount?: number;
    engagementRate?: number;
    averageLikes?: number;
    location?: string;
    languages?: string[];
    isVerified: boolean;
    user?: User;
}

export interface Collaboration {
    id: string;
    brandId: string;
    influencerId: string;
    title: string;
    description: string;
    budget: number;
    deadline?: string;
    status: CollaborationStatus;
    brand?: User;
    influencer?: InfluencerProfile;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
