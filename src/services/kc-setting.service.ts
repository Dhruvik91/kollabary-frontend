import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants';

export enum KCSettingKey {
    AUCTION_CREATION_PRICE = 'AUCTION_CREATION_PRICE',
    COLLABORATION_CREATION_PRICE = 'COLLABORATION_CREATION_PRICE',
    BID_PLACEMENT_PRICE = 'BID_PLACEMENT_PRICE',
    DAILY_ALLOWANCE_BRAND = 'DAILY_ALLOWANCE_BRAND',
    DAILY_ALLOWANCE_INFLUENCER = 'DAILY_ALLOWANCE_INFLUENCER',
    REFERRAL_REWARD_REFERRER = 'REFERRAL_REWARD_REFERRER',
    REFERRAL_REWARD_REFERRED = 'REFERRAL_REWARD_REFERRED',
}

export interface KCSetting {
    id: string;
    key: KCSettingKey;
    value: number;
    createdAt: string;
    updatedAt: string;
}

export const kcSettingService = {
    /**
     * Get all KC settings
     */
    getAllSettings: async (): Promise<KCSetting[]> => {
        const response = await httpService.get<KCSetting[]>(API_CONFIG.path.admin.kcSettings);
        return response.data;
    },

    /**
     * Update a specific KC setting
     */
    updateSetting: async (key: string, value: number): Promise<KCSetting> => {
        const response = await httpService.patch<KCSetting>(
            API_CONFIG.path.admin.kcSettingUpdate(key),
            { value }
        );
        return response.data;
    }
};
