import { UserProfile } from "@/services/profile.service";

export enum PitchStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export interface Pitch {
    id: string;
    influencer: any; // User object
    target: any; // User object
    message: string;
    status: PitchStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePitchDto {
    targetId: string;
    message: string;
}

export interface UpdatePitchStatusDto {
    status: PitchStatus;
}

export interface PaginatedResponse<T> {
    items: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
