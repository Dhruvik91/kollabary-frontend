export interface RankingBreakdown {
    completedCollaborations: {
        count: number;
        score: number;
    };
    paidPromotions: {
        count: number;
        score: number;
    };
    averageRating: {
        value: number;
        score: number;
    };
    responseSpeed: {
        hours: number;
        score: number;
    };
    completionRate: {
        percentage: number;
        score: number;
    };
    verificationBonus: {
        isVerified: boolean;
        score: number;
    };
    penalties: {
        count: number;
        score: number;
    };
    totalScore: number;
}

export interface RankingWeights {
    completedCollaborations: number;
    paidPromotions: number;
    averageRating: number;
    responseSpeed: number;
    completionRate: number;
    verificationBonus: number;
    cancellationPenalty: number;
    rejectionPenalty: number;
    lowRatingPenalty: number;
}
