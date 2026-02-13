import { User } from './auth.types';

export interface AdminStats {
    totalUsers: number;
    totalInfluencers: number;
    totalBrands: number;
    totalCollaborations: number;
    activeCollaborations: number;
    pendingVerifications: number;
    totalReports: number;
    revenue?: {
        daily: number[];
        weekly: number[];
        monthly: number[];
        total: number;
    };
    growth?: {
        userGrowth: number;
        influencerGrowth: number;
        revenueGrowth: number;
    };
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
