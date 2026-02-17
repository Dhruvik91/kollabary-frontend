import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';
import { toast } from 'sonner';

export const profileKeys = {
    all: ['profile'] as const,
    me: () => [...profileKeys.all, 'me'] as const,
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
            toast.success('Profile saved successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to save profile', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        },
    });
}
