import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';
import { toast } from 'sonner';

export function useMyProfile() {
    return useQuery({
        queryKey: ['profile', 'me'],
        queryFn: async () => {
            const response = await profileService.getProfile();
            return response.data;
        },
    });
}

export function useCreateProfile(options?: any) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await profileService.saveProfile(data);
            return response.data;
        },
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
            await queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
            if (options?.onSuccess) {
                await options.onSuccess(data, variables, context);
            }
        },
        ...options
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await profileService.updateProfile(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
            toast.success('Profile updated successfully');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to update profile');
        },
    });
}
