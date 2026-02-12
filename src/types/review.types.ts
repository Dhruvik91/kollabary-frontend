import { User } from './auth.types';
import { InfluencerProfile } from './influencer.types';

export enum ReviewStatus {
    VISIBLE = 'VISIBLE',
    HIDDEN = 'HIDDEN',
    REMOVED = 'REMOVED',
}

export interface Review {
    id: string;
    reviewer: User;
    influencer: User;
    collaboration?: {
        id: string;
        title: string;
    };
    rating: number;
    comment: string;
    status: ReviewStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateReviewDto {
    influencerId: string;
    rating: number;
    comment?: string;
    collaborationId?: string;
}

export interface UpdateReviewDto {
    rating: number;
    comment?: string;
}
