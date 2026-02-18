import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import {
    InfluencerProfile,
    SearchInfluencersDto,
    SearchInfluencersResponse,
    CreateInfluencerProfileDto,
} from '@/types/influencer.types';

/**
 * Influencer service
 * Handles all influencer-related API calls
 */
export const influencerService = {
    /**
     * Search influencers with pagination and filters
     */
    async searchInfluencers(dto: SearchInfluencersDto): Promise<SearchInfluencersResponse> {
        const response = await httpService.get<SearchInfluencersResponse>(API_CONFIG.path.influencer.search, {
            params: dto,
        });
        return response.data;
    },

    /**
     * Get current user influencer profile
     */
    async getMyProfile(): Promise<InfluencerProfile> {
        const response = await httpService.get<InfluencerProfile>(API_CONFIG.path.influencer.myProfile);
        return response.data;
    },

    /**
     * Get influencer profile by ID
     */
    async getInfluencerById(id: string): Promise<InfluencerProfile> {
        const response = await httpService.get<InfluencerProfile>(API_CONFIG.path.influencer.profile(id));
        return response.data;
    },

    /**
     * Create or update current user's influencer profile
     */
    async createProfile(dto: CreateInfluencerProfileDto): Promise<InfluencerProfile> {
        const response = await httpService.post<InfluencerProfile>(API_CONFIG.path.influencer.myProfile, dto);
        return response.data;
    },

    /**
     * Update current user's influencer profile (POST/PATCH endpoint usually same for upsert)
     */
    async updateProfile(dto: Partial<CreateInfluencerProfileDto>): Promise<InfluencerProfile> {
        const response = await httpService.post<InfluencerProfile>(API_CONFIG.path.influencer.myProfile, dto);
        return response.data;
    }
};
