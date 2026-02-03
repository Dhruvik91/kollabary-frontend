import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import influencerService from '@/services/influencer-service';

export function useInfluencerSearch(params: any) {
    return useQuery({
        queryKey: ['influencers', 'search', params],
        queryFn: () => influencerService.search(params),
    });
}

export function useInfluencerDetail(id: string) {
    return useQuery({
        queryKey: ['influencers', 'detail', id],
        queryFn: () => influencerService.getById(id),
        enabled: !!id,
    });
}

export function useMyInfluencerProfile() {
    return useQuery({
        queryKey: ['influencers', 'me'],
        queryFn: () => influencerService.getMyProfile(),
    });
}

export function useSaveInfluencerProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => influencerService.saveProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['influencers', 'me'] });
        },
    });
}
