import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';

export function useMyProfile() {
    return useQuery({
        queryKey: ['profile', 'me'],
        queryFn: async () => {
            const response = await profileService.getProfile();
            return response.data;
        },
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
        },
    });
}
