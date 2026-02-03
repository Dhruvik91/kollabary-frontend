import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { InfluencerProfile, PaginatedResponse } from '@/constants/interface';

class InfluencerService {
    async search(params: any): Promise<PaginatedResponse<InfluencerProfile>> {
        const response = await httpService.get<PaginatedResponse<InfluencerProfile>>(
            API_CONFIG.path.influencer.search,
            { params }
        );
        return response.data;
    }

    async getById(id: string): Promise<InfluencerProfile> {
        const response = await httpService.get<InfluencerProfile>(
            API_CONFIG.path.influencer.detail(id)
        );
        return response.data;
    }

    async getMyProfile(): Promise<InfluencerProfile> {
        const response = await httpService.get<InfluencerProfile>(
            API_CONFIG.path.influencer.profile
        );
        return response.data;
    }

    async saveProfile(data: any): Promise<InfluencerProfile> {
        const response = await httpService.post<InfluencerProfile>(
            API_CONFIG.path.influencer.profile,
            data
        );
        return response.data;
    }
}

export default new InfluencerService();
