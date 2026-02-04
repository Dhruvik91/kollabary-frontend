import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { influencerService } from '@/services/influencer.service';

export function useInfluencerSearch(params: any) {
    return useQuery({
        queryKey: ['influencers', 'search', params],
        queryFn: async () => {
            const response = await influencerService.searchInfluencers(params);
            return response.data;
        },
    });
}

export function useInfluencerDetail(id: string) {
    return useQuery({
        queryKey: ['influencers', 'detail', id],
        queryFn: async () => {
            const response = await influencerService.getInfluencerById(id);
            return response.data;
        },
        enabled: !!id,
    });
}

export function useMyInfluencerProfile() {
    return useQuery({
        queryKey: ['influencers', 'me'],
        queryFn: async () => {
            const response = await influencerService.getProfile();
            return response.data;
        },
    });
}

export function useSaveInfluencerProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await influencerService.saveProfile(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['influencers', 'me'] });
        },
    });
}
