export enum ReportReason {
    SPAM = 'SPAM',
    HARASSMENT = 'HARASSMENT',
    INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
    DISHONEST_BEHAVIOR = 'DISHONEST_BEHAVIOR',
    FRAUD = 'FRAUD',
    FAKE_ENGAGEMENT = 'FAKE_ENGAGEMENT',
    SCAM = 'SCAM',
    IMPERSONATION = 'IMPERSONATION',
    MISLEADING = 'MISLEADING',
    OTHER = 'OTHER',
}

export interface CreateReportDto {
    targetId: string;
    targetType: 'influencer' | 'review' | 'user';
    reason: ReportReason;
    details: string;
}

export interface Report {
    id: string;
    reporterId: string;
    targetId: string;
    targetType: 'influencer' | 'review' | 'user';
    reason: ReportReason;
    details: string;
    status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
    createdAt: string;
}
