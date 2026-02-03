import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { User } from '@/constants/interface';

export function useMyProfile() {
    return useQuery({
        queryKey: ['profile', 'me'],
        queryFn: async () => {
            const response = await httpService.get<User>(API_CONFIG.path.profile.base);
            return response.data;
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await httpService.patch<User>(API_CONFIG.path.profile.base, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
        },
    });
}
