import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { ReferralConfig, ReferralStats } from '@/types/referral.types';

export const referralService = {
    /**
     * Get current user's referral statistics
     */
    async getMyStats(): Promise<ReferralStats> {
        const response = await httpService.get<ReferralStats>(API_CONFIG.path.referral.stats);
        return response.data;
    },

    /**
     * Get referral configuration
     */
    async getReferralConfig(): Promise<ReferralConfig> {
        const response = await httpService.get<ReferralConfig>(API_CONFIG.path.referral.config);
        return response.data;
    },
};
