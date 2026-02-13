import { User } from './auth.types';

export interface AdminStats {
    users: {
        totalUsers: number;
        regularUsers: number;
        influencers: number;
        admins: number;
        newUsersThisWeek: number;
        newUsersThisMonth: number;
    };
    collaborations: {
        totalCollaborations: number;
        activeCollaborations: number;
        completedCollaborations: number;
        pendingRequests: number;
        cancelledCollaborations: number;
        completionRate: number;
    };
    verifications: {
        totalRequests: number;
        pendingRequests: number;
        approvedRequests: number;
        rejectedRequests: number;
        approvalRate: number;
    };
    reviews: {
        totalReviews: number;
        averageRating: number;
        reviewsThisWeek: number;
        reviewsThisMonth: number;
    };
    growth: {
        week: string;
        newUsers: number;
        newCollaborations: number;
        newReviews: number;
    }[];
}

export enum VerificationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export interface VerificationRequest {
    id: string;
    user: User;
    documents: string[];
    status: VerificationStatus;
    submittedAt: string;
    reviewedAt?: string;
    notes?: string;
}

export interface UpdateReportStatusDto {
    status: string;
    adminNotes?: string;
}
