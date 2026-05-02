import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { ChangePasswordData } from '@/types/auth.types';

export interface UserProfile {
    id: string;
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
    profileImage?: string;
    avatarUrl?: string;
    socialLinks?: Record<string, string>;
    createdAt: string;
    updatedAt: string;
    verified?: boolean;
    status?: string;
    stats?: {
        totalAuctions: number;
        activeAuctionsCount: number;
        completedCollaborations: number;
    };
    activeAuctions?: any[];
    auctions?: any[];
    user?: {
        id: string;
        email: string;
        role: string;
        status: string;
    };
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
    name?: string;
    username?: string;
    location?: string;
    role?: string;
    page?: number;
    limit?: number;
}

export interface SearchProfilesResponse {
    items: UserProfile[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
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
    searchProfiles: async (params: SearchProfilesParams): Promise<SearchProfilesResponse> => {
        const response = await httpService.get<SearchProfilesResponse>(API_CONFIG.path.profile.search, { params });
        return response.data;
    },

    /**
     * Get professional brand profile with stats
     */
    getBrandProfile: async (id: string): Promise<UserProfile> => {
        const response = await httpService.get<UserProfile>(API_CONFIG.path.profile.brand(id));
        return response.data;
    },

    /**
     * Update account password
     */
    changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
        const response = await httpService.patch<{ message: string }>(API_CONFIG.path.auth.changePassword, data);
        return response.data;
    },

    /**
     * Update account status (Activate/Deactivate)
     */
    updateStatus: async (status: string): Promise<{ success: boolean }> => {
        const response = await httpService.patch<{ success: boolean }>(API_CONFIG.path.profile.status, { status });
        return response.data;
    },

    /**
     * Delete account
     */
    deleteAccount: async (): Promise<{ success: boolean }> => {
        const response = await httpService.delete<{ success: boolean }>(API_CONFIG.path.profile.base);
        return response.data;
    },

    /**
     * Submit verification request
     */
    submitVerification: async (documents: any): Promise<any> => {
        const response = await httpService.post(API_CONFIG.path.verification.base, { documents });
        return response.data;
    },

    /**
     * Get user's verification requests
     */
    getVerificationRequests: async (): Promise<any[]> => {
        const response = await httpService.get<any[]>(API_CONFIG.path.verification.myRequests);
        return response.data;
    }
};

