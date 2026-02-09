export interface UserStats {
    totalUsers: number;
    regularUsers: number;
    influencers: number;
    admins: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
}

export interface CollaborationStats {
    totalCollaborations: number;
    activeCollaborations: number;
    completedCollaborations: number;
    pendingRequests: number;
    cancelledCollaborations: number;
    completionRate: number;
}

export interface VerificationStats {
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    approvalRate: number;
}

export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    reviewsThisWeek: number;
    reviewsThisMonth: number;
}

export interface PlatformGrowth {
    week: string;
    newUsers: number;
    newCollaborations: number;
    newReviews: number;
}

export interface AdminStats {
    users: UserStats;
    collaborations: CollaborationStats;
    verifications: VerificationStats;
    reviews: ReviewStats;
    growth: PlatformGrowth[];
}
