import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';

export interface UserProfile {
    id: string;
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
    profileImage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SaveProfileDto {
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
    profileImage?: string;
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
     * Create or update user profile
     */
    saveProfile: async (data: SaveProfileDto): Promise<UserProfile> => {
        const response = await httpService.post<UserProfile>(API_CONFIG.path.profile.base, data);
        return response.data;
    },

    /**
     * Search profiles
     */
    searchProfiles: async (params: any): Promise<any> => {
        const response = await httpService.get<any>(API_CONFIG.path.profile.search, { params });
        return response.data;
    }
};
