import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { Profile, SaveProfileDto, SearchProfilesDto, ProfileSearchResponse } from '@/types/profile';

class ProfileService {
    async getProfile() {
        return httpService.get<Profile>(API_CONFIG.path.profile.base);
    }

    async saveProfile(data: SaveProfileDto) {
        return httpService.post<Profile>(API_CONFIG.path.profile.base, data);
    }

    async updateProfile(data: Partial<SaveProfileDto>) {
        return httpService.patch<Profile>(API_CONFIG.path.profile.base, data);
    }

    async searchProfiles(params: SearchProfilesDto) {
        return httpService.get<ProfileSearchResponse>(API_CONFIG.path.profile.search, { params });
    }

    async getProfileById(id: string) {
        return httpService.get<Profile>(API_CONFIG.path.profile.detail(id));
    }
}

export const profileService = new ProfileService();
