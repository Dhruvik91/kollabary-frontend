export interface RankingMetric<T> {
    count?: number;
    value?: number;
    hours?: number;
    percentage?: number;
    isVerified?: boolean;
    score: number;
    maxScore: number;
}

export interface PenaltyBreakdown {
    cancellations: number;
    rejections: number;
    reports: number;
}

export interface RankingPenalties extends RankingMetric<number> {
    breakdown: PenaltyBreakdown;
}

export interface TierRequirements {
    minScore: number;
    minCollabs: number;
    minRating: number;
    minCompletion: number;
    maxResponseHours: number;
    verified: boolean;
    maxPenalties: number;
}

export interface RankingBreakdown {
    completedCollaborations: RankingMetric<number>;
    paidPromotions: RankingMetric<number>;
    averageRating: RankingMetric<number>;
    responseSpeed: RankingMetric<number>;
    completionRate: RankingMetric<number>;
    verificationBonus: RankingMetric<boolean>;
    penalties: RankingPenalties;
    totalScore: number;
    rankingTier: string;
    nextTier: string | null;
    tierProgress: number;
    requirementsMet: Record<string, boolean>;
    tierRequirements: TierRequirements;
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
