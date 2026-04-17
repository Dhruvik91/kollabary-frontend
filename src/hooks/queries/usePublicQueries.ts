import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';

export const publicKeys = {
    all: ['public'] as const,
    influencer: (id: string) => [...publicKeys.all, 'influencer', id] as const,
    brand: (id: string) => [...publicKeys.all, 'brand', id] as const,
};

/**
 * Hook for getting public influencer profile data (aggregated)
 */
export function usePublicInfluencer(id: string, initialData?: any) {
    return useQuery({
        queryKey: publicKeys.influencer(id),
        queryFn: () => publicService.getInfluencerPublicData(id),
        enabled: !!id,
        initialData: initialData,
        staleTime: 60000, // 1 minute
    });
}

/**
 * Hook for getting public brand profile data (aggregated)
 */
export function usePublicBrand(id: string, initialData?: any) {
    return useQuery({
        queryKey: publicKeys.brand(id),
        queryFn: () => publicService.getBrandPublicData(id),
        enabled: !!id,
        initialData: initialData,
        staleTime: 60000, // 1 minute
    });
}
