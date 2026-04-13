import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';

export const publicService = {
    /**
     * Get aggregate public data for an influencer
     */
    async getInfluencerPublicData(id: string): Promise<any> {
        const response = await httpService.get(API_CONFIG.path.public.influencer(id));
        return response.data;
    },

    /**
     * Get aggregate public data for a brand
     */
    async getBrandPublicData(id: string): Promise<any> {
        const response = await httpService.get(API_CONFIG.path.public.brand(id));
        return response.data;
    }
};
