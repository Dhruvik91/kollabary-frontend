export interface ReferralStats {
    totalReferrals: number;
    successfulReferrals: number;
    totalEarned: number;
    referralCode: string;
}

export interface ReferralConfig {
    referrerReward: number;
    referredReward: number;
}
