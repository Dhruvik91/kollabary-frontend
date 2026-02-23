import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { ChangePasswordData } from '@/types/auth.types';

export interface UserProfile {
    id: string;
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
    profileImage?: string; // Kept for backward compatibility if needed, but primary is avatarUrl
    avatarUrl?: string;
    socialLinks?: Record<string, string>;
    createdAt: string;
    updatedAt: string;
}

export interface SaveProfileDto {
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
    profileImage?: string; // Kept for backward compatibility
    avatarUrl?: string;
    socialLinks?: Record<string, string>;
}

export interface SearchProfilesParams {
    query?: string;
    page?: number;
    limit?: number;
}

export const profileService = {
    /**
     * Fetch current user's profile
     */
    getProfile: async (): Promise<UserProfile> => {
        const response = await httpService.get<UserProfile>(API_CONFIG.path.profile.me);
        return response.data;
    },

    /**
     * Create or update user profile (POST)
     */
    saveProfile: async (data: SaveProfileDto): Promise<UserProfile> => {
        // Map profileImage to avatarUrl if the latter is missing but former is present
        const payload = { ...data };
        if (payload.profileImage && !payload.avatarUrl) {
            payload.avatarUrl = payload.profileImage;
        }

        const response = await httpService.post<UserProfile>(API_CONFIG.path.profile.base, payload);
        return response.data;
    },

    /**
     * Update user profile (PATCH)
     */
    updateProfile: async (data: SaveProfileDto): Promise<UserProfile> => {
        const payload = { ...data };
        if (payload.profileImage && !payload.avatarUrl) {
            payload.avatarUrl = payload.profileImage;
        }

        const response = await httpService.patch<UserProfile>(API_CONFIG.path.profile.base, payload);
        return response.data;
    },

    /**
     * Search profiles
     */
    searchProfiles: async (params: SearchProfilesParams): Promise<UserProfile[]> => {
        const response = await httpService.get<UserProfile[]>(API_CONFIG.path.profile.search, { params });
        return response.data;
    },

    /**
     * Update account password
     */
    changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
        const response = await httpService.patch<{ message: string }>(API_CONFIG.path.auth.changePassword, data);
        return response.data;
    }
};

