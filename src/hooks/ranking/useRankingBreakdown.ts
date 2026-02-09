import { useQuery } from '@tanstack/react-query';
import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { RankingBreakdown } from '@/types/ranking';

/**
 * Hook to fetch ranking breakdown for an influencer
 * @param influencerId - User ID of the influencer
 * @returns Query result with ranking breakdown
 */
export const useRankingBreakdown = (influencerId: string | undefined) => {
    return useQuery({
        queryKey: ['ranking', 'breakdown', influencerId],
        queryFn: async () => {
            if (!influencerId) {
                throw new Error('Influencer ID is required');
            }

            const response = await httpService.get<RankingBreakdown>(
                API_CONFIG.path.ranking.breakdown(influencerId)
            );
            return response.data;
        },
        enabled: !!influencerId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
};
