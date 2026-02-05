import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { Review, CreateReviewDto } from '@/types/review';

class ReviewService {
    async createReview(data: CreateReviewDto) {
        return httpService.post<Review>(API_CONFIG.path.review.base, data);
    }

    async getInfluencerReviews(influencerId: string) {
        return httpService.get<Review[]>(API_CONFIG.path.review.influencer(influencerId));
    }

    async updateReview(id: string, data: Partial<CreateReviewDto>) {
        return httpService.post<Review>(API_CONFIG.path.review.update(id), data);
    }

    async deleteReview(id: string) {
        return httpService.post<void>(API_CONFIG.path.review.delete(id), {});
    }
}

export const reviewService = new ReviewService();
