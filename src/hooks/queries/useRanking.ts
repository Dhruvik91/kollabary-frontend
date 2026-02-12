import { useQuery } from '@tanstack/react-query';
import { rankingService } from '@/services/ranking.service';

export const rankingKeys = {
    all: ['ranking'] as const,
    breakdown: (id: string) => [...rankingKeys.all, 'breakdown', id] as const,
    weights: () => [...rankingKeys.all, 'weights'] as const,
};

/**
 * Hook for getting ranking breakdown for an influencer
 */
export function useRankingBreakdown(influencerId: string, enabled = true) {
    return useQuery({
        queryKey: rankingKeys.breakdown(influencerId),
        queryFn: () => rankingService.getRankingBreakdown(influencerId),
        enabled: enabled && !!influencerId,
    });
}

/**
 * Hook for getting current ranking weights (Admin)
 */
export function useRankingWeights() {
    return useQuery({
        queryKey: rankingKeys.weights(),
        queryFn: () => rankingService.getWeights(),
    });
}
