import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/services/review.service';
import { CreateReviewDto } from '@/types/review';

export function useInfluencerReviews(influencerId: string) {
    return useQuery({
        queryKey: ['reviews', 'influencer', influencerId],
        queryFn: async () => {
            const response = await reviewService.getInfluencerReviews(influencerId);
            return response.data;
        },
        enabled: !!influencerId,
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateReviewDto) => {
            const response = await reviewService.createReview(data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', 'influencer', variables.influencerId] });
            queryClient.invalidateQueries({ queryKey: ['influencer', 'detail', variables.influencerId] });
        },
    });
}

export function useUpdateReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data, influencerId }: { id: string, data: Partial<CreateReviewDto>, influencerId: string }) => {
            const response = await reviewService.updateReview(id, data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', 'influencer', variables.influencerId] });
            queryClient.invalidateQueries({ queryKey: ['influencer', 'detail', variables.influencerId] });
        },
    });
}

export function useDeleteReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, influencerId }: { id: string, influencerId: string }) => {
            await reviewService.deleteReview(id);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', 'influencer', variables.influencerId] });
            queryClient.invalidateQueries({ queryKey: ['influencer', 'detail', variables.influencerId] });
        },
    });
}
