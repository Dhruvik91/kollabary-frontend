export interface RankingMetric<T> {
    count?: number;
    value?: number;
    hours?: number;
    percentage?: number;
    isVerified?: boolean;
    score: number;
}

export interface RankingBreakdown {
    completedCollaborations: RankingMetric<number>;
    paidPromotions: RankingMetric<number>;
    averageRating: RankingMetric<number>;
    responseSpeed: RankingMetric<number>;
    completionRate: RankingMetric<number>;
    verificationBonus: RankingMetric<boolean>;
    penalties: RankingMetric<number>;
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
