import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';
import { toast } from 'sonner';

export const profileKeys = {
    all: ['profile'] as const,
    me: () => [...profileKeys.all, 'me'] as const,
    brand: (id: string) => [...profileKeys.all, 'brand', id] as const,
    search: (params: Record<string, any>) => [...profileKeys.all, 'search', params] as const,
};

/**
 * Hook to fetch current user's profile
 */
export function useMyProfile(enabled: boolean = true) {
    return useQuery({
        queryKey: profileKeys.me(),
        queryFn: profileService.getProfile,
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error: any) => {
            // Don't retry on 404 - profile doesn't exist yet (new user)
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
    });
}

/**
 * Hook to create or update profile
 */
export function useSaveProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileService.saveProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.me() });
            queryClient.invalidateQueries({ queryKey: ['influencer'] });
            toast.success('Profile saved successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to save profile', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}

/**
 * Hook to update profile (PATCH)
 */
export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileService.updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.me() });
            queryClient.invalidateQueries({ queryKey: ['influencer'] });
            toast.success('Profile updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update profile', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}

/**
 * Hook to update account password
 */
export function useChangePasswordMutation() {
    return useMutation({
        mutationFn: profileService.changePassword,
        onSuccess: (data) => {
            toast.success(data.message || 'Password updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update password', {
                description: error.response?.data?.message || 'Current password might be incorrect or something went wrong',
            });
        },
    });
}

/**
 * Hook to fetch a brand's professional profile with stats
 */
export function useBrandProfile(id: string, enabled: boolean = true) {
    return useQuery({
        queryKey: profileKeys.brand(id),
        queryFn: () => profileService.getBrandProfile(id),
        enabled: !!id && enabled,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook to search for brands (profiles with role USER)
 */
export function useBrandSearch(params: { name?: string, location?: string, page?: number, limit?: number }) {
    return useQuery({
        queryKey: profileKeys.search({ ...params, role: 'USER' }),
        queryFn: () => profileService.searchProfiles({ ...params, role: 'USER' }),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

/**
 * Hook to search for brands with infinite scrolling support
 */
export function useInfiniteBrandSearch(params: { name?: string, location?: string, limit?: number }) {
    return useInfiniteQuery({
        queryKey: profileKeys.search({ ...params, role: 'USER', type: 'infinite' }),
        queryFn: ({ pageParam = 1 }) => 
            profileService.searchProfiles({ ...params, role: 'USER', page: pageParam, limit: params.limit || 12 }),
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.meta;
            return page < totalPages ? page + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: 2 * 60 * 1000,
    });
}

/**
 * Hook to update account status
 */
export function useUpdateStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: profileService.updateStatus,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: profileKeys.me() });
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
            queryClient.invalidateQueries({ queryKey: ['influencer'] });
            toast.success(data.message || 'Status updated');
        },
        onError: (error: any) => {
            toast.error('Failed to update status', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}

/**
 * Hook to delete account
 */
export function useDeleteAccount() {
    return useMutation({
        mutationFn: profileService.deleteAccount,
        onSuccess: () => {
            toast.success('Account deleted successfully');
            window.location.href = '/'; // Simple redirect for now
        },
        onError: (error: any) => {
            toast.error('Failed to delete account', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}

/**
 * Hook to submit verification request
 */
export function useSubmitVerification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: profileService.submitVerification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['verification', 'me'] });
            toast.success('Verification request submitted successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to submit verification', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}

/**
 * Hook to fetch user's verification requests
 */
export function useMyVerificationRequests() {
    return useQuery({
        queryKey: ['verification', 'me'],
        queryFn: profileService.getVerificationRequests,
        staleTime: 10 * 60 * 1000,
    });
}
