import { User } from './auth.types';
import { InfluencerProfile } from './influencer.types';

export enum CollaborationStatus {
    REQUESTED = 'REQUESTED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface Collaboration {
    id: string;
    requester: User;
    influencer: InfluencerProfile;
    title: string;
    description: string;
    status: CollaborationStatus;
    proposedTerms: Record<string, unknown>;
    agreedTerms: Record<string, unknown>;
    startDate: string;
    endDate: string;
    proofUrls?: string[];
    proofSubmittedAt?: string;
    proofVerifiedAt?: string;
    proofVerifiedBy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCollaborationDto {
    influencerId: string;
    title: string;
    description?: string;
    proposedTerms?: Record<string, unknown>;
    startDate?: string;
    endDate?: string;
}

export interface UpdateCollaborationStatusDto {
    status: CollaborationStatus;
}

export interface UpdateCollaborationDto {
    title?: string;
    description?: string;
    proposedTerms?: Record<string, unknown>;
    startDate?: string;
    endDate?: string;
    proofUrls?: string[];
    proofSubmittedAt?: string;
}

export interface CollaborationFilters {
    status?: CollaborationStatus;
    search?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedCollaborationsResponse {
    items: Collaboration[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
