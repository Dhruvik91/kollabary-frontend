import { PaginatedResponse } from "../constants/interface";

export interface Profile {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    socialLinks?: {
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
    user?: any;
    createdAt: string;
    updatedAt: string;
}

export interface SaveProfileDto {
    fullName: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    socialLinks?: {
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
}

export interface SearchProfilesDto {
    name?: string;
    username?: string;
    location?: string;
    page?: number;
    limit?: number;
}

export type ProfileSearchResponse = PaginatedResponse<Profile>;
