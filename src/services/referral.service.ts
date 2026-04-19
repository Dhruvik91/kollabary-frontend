import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { ReferralStats } from '@/types/referral.types';

export const referralService = {
    /**
     * Get current user's referral statistics
     */
    async getMyStats(): Promise<ReferralStats> {
        const response = await httpService.get<ReferralStats>(API_CONFIG.path.referral.stats);
        return response.data;
    },
};
