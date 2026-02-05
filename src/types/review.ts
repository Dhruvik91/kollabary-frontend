export interface Review {
    id: string;
    reviewerId: string;
    influencerId: string;
    rating: number;
    comment: string;
    createdAt: string;
    reviewer?: {
        id: string;
        name: string;
        profileImage?: string;
    };
    // UI helper fields
    author?: string;
    text?: string;
    date?: string;
    helpful?: number;
    verified?: boolean;
    categories?: {
        communication: number;
        quality: number;
        professionalism: number;
        timeliness: number;
    };
}

export interface CreateReviewDto {
    influencerId: string;
    rating: number;
    comment: string;
}
