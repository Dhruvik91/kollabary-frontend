import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants';
import { Review, CreateReviewDto, UpdateReviewDto } from '../types/review.types';

export const reviewService = {
    async createReview(data: CreateReviewDto): Promise<Review> {
        const response = await httpService.post<Review>(API_CONFIG.path.review.base, data);
        return response.data;
    },

    async getInfluencerReviews(influencerId: string): Promise<Review[]> {
        const response = await httpService.get<Review[]>(API_CONFIG.path.review.influencer(influencerId));
        return response.data;
    },

    async updateReview(id: string, data: UpdateReviewDto): Promise<Review> {
        const response = await httpService.post<Review>(API_CONFIG.path.review.update(id), data);
        return response.data;
    },

    async deleteReview(id: string): Promise<void> {
        await httpService.post(API_CONFIG.path.review.delete(id));
    },
};
