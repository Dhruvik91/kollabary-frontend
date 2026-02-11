import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { influencerService } from '@/services/influencer.service';
import { SearchInfluencersDto } from '@/types/influencer.types';

export const influencerKeys = {
    all: ['influencer'] as const,
    search: (filters: SearchInfluencersDto) => [...influencerKeys.all, 'search', filters] as const,
    detail: (id: string) => [...influencerKeys.all, 'detail', id] as const,
};

/**
 * Hook for searching influencers with infinite scroll support
 */
export function useInfluencerSearch(filters: SearchInfluencersDto) {
    return useInfiniteQuery({
        queryKey: influencerKeys.search(filters),
        queryFn: ({ pageParam = 1 }) =>
            influencerService.searchInfluencers({ ...filters, page: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.page < lastPage.meta.totalPages) {
                return lastPage.meta.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });
}

/**
 * Hook for getting specific influencer profile
 */
export function useInfluencerDetail(id: string) {
    return useQuery({
        queryKey: influencerKeys.detail(id),
        queryFn: () => influencerService.getInfluencerById(id),
        enabled: !!id,
    });
}
