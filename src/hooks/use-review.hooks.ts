import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/services/review.service';
import { CreateReviewDto, UpdateReviewDto } from '@/types/review.types';
import { toast } from 'sonner';

export const useInfluencerReviews = (influencerId: string) => {
    return useQuery({
        queryKey: ['reviews', influencerId],
        queryFn: () => reviewService.getInfluencerReviews(influencerId),
        enabled: !!influencerId,
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewDto) => reviewService.createReview(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.influencerId] });
            queryClient.invalidateQueries({ queryKey: ['influencer', variables.influencerId] });
            toast.success('Review submitted successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        },
    });
};

export const useUpdateReview = (influencerId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateReviewDto }) =>
            reviewService.updateReview(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', influencerId] });
            queryClient.invalidateQueries({ queryKey: ['influencer', influencerId] });
            toast.success('Review updated successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update review');
        },
    });
};

export const useDeleteReview = (influencerId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => reviewService.deleteReview(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', influencerId] });
            queryClient.invalidateQueries({ queryKey: ['influencer', influencerId] });
            toast.success('Review deleted successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete review');
        },
    });
};
