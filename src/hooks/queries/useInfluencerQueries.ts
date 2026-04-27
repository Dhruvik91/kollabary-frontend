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
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create influencer profile');
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
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            queryClient.invalidateQueries({ queryKey: influencerKeys.all });
            queryClient.invalidateQueries({ queryKey: profileKeys.me() });
            toast.success('Influencer profile updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update profile', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}

/**
 * Hook for updating user status (Active/Inactive)
 */
export function useUpdateUserStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (status: string) => influencerService.updateStatus(status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            queryClient.invalidateQueries({ queryKey: influencerKeys.me() });
            queryClient.invalidateQueries({ queryKey: influencerKeys.all });
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
            toast.success('Account status updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update status', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}

/**
 * Hook for soft deleting account
 */
export function useDeleteAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => influencerService.deleteAccount(),
        onSuccess: () => {
            // After deletion, we should clear all queries and will likely be redirected by a top-level effect
            queryClient.clear();
            toast.success('Account deleted successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to delete account', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}
