import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { influencerService } from '@/services/influencer.service';
import { profileKeys } from './useProfileQueries';
import { authKeys } from '../use-auth.hooks';
import { CreateInfluencerProfileDto, SearchInfluencersDto } from '@/types/influencer.types';
import { toast } from 'sonner';

export const influencerKeys = {
    all: ['influencer'] as const,
    search: (filters: SearchInfluencersDto) => [...influencerKeys.all, 'search', filters] as const,
    detail: (id: string) => [...influencerKeys.all, 'detail', id] as const,
    me: () => [...influencerKeys.all, 'me'] as const,
};

/**
 * Hook for getting current user's influencer profile
 */
export function useMyInfluencerProfile(enabled = true) {
    return useQuery({
        queryKey: influencerKeys.me(),
        queryFn: () => influencerService.getMyProfile(),
        enabled: enabled,
        retry: false, // Don't retry on 404
        staleTime: 30000, // 30 seconds
    });
}

/**
 * Hook for creating/updating influencer profile
 */
export function useCreateInfluencerProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateInfluencerProfileDto) => influencerService.createProfile(data),
        onSuccess: () => {
            // Invalidate everything related to the current user's profile state
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            queryClient.invalidateQueries({ queryKey: influencerKeys.me() });
            queryClient.invalidateQueries({ queryKey: profileKeys.me() });
            toast.success('Influencer profile created successfully!');
        },
    });
}

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

/**
 * Hook for updating influencer profile (PATCH)
 */
export function useUpdateInfluencerProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<CreateInfluencerProfileDto>) => influencerService.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: influencerKeys.me() });
            toast.success('Influencer profile updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update profile', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}
