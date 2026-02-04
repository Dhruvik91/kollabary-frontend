import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { InfluencerProfile, SaveInfluencerProfileDto, SearchInfluencersDto, InfluencerSearchResponse } from '@/types/influencer';

class InfluencerService {
    async getProfile() {
        return httpService.get<InfluencerProfile>(API_CONFIG.path.influencer.profile);
    }

    async saveProfile(data: SaveInfluencerProfileDto) {
        return httpService.post<InfluencerProfile>(API_CONFIG.path.influencer.profile, data);
    }

    async searchInfluencers(params: SearchInfluencersDto) {
        return httpService.get<InfluencerSearchResponse>(API_CONFIG.path.influencer.search, { params });
    }

    async getInfluencerById(id: string) {
        return httpService.get<InfluencerProfile>(API_CONFIG.path.influencer.detail(id));
    }
}

export const influencerService = new InfluencerService();
