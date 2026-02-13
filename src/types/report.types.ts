import { User } from './auth.types';

export enum ReportStatus {
    OPEN = 'OPEN',
    UNDER_REVIEW = 'UNDER_REVIEW',
    RESOLVED = 'RESOLVED',
}

export interface Report {
    id: string;
    reporter: User;
    targetUser: User;
    targetType: string;
    reason: string;
    description: string;
    status: ReportStatus;
    createdAt: string;
    resolvedAt?: string;
}

export interface CreateReportDto {
    targetUserId?: string;
    targetId: string;
    targetType: string;
    reason: string;
    description?: string;
    details?: string;
}
