import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { RankingBreakdown, RankingWeights } from '@/types/ranking';

/**
 * Ranking service
 * Handles all ranking-related API calls
 */
export const rankingService = {
    /**
     * Get ranking breakdown for an influencer
     */
    async getRankingBreakdown(influencerId: string): Promise<RankingBreakdown> {
        const response = await httpService.get<RankingBreakdown>(
            API_CONFIG.path.ranking.breakdown(influencerId)
        );
        return response.data;
    },

    /**
     * Get current ranking weights (Admin only)
     */
    async getWeights(): Promise<RankingWeights> {
        const response = await httpService.get<RankingWeights>(
            API_CONFIG.path.ranking.weights
        );
        return response.data;
    },

    /**
     * Get tier requirements guide
     */
    async getTierGuide(): Promise<any> {
        const response = await httpService.get<any>(
            API_CONFIG.path.ranking.tierGuide
        );
        return response.data;
    },
};
