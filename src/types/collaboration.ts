import { User } from "../constants/interface";
import { CollaborationStatus } from "@/constants/constants";
import { Profile } from "@/types/profile";

interface UserWithProfile extends User {
    profile?: Profile;
}

export interface Collaboration {
    id: string;
    requester: UserWithProfile;
    influencer: UserWithProfile;
    brand?: UserWithProfile; // Brand user (same as requester typically)
    title: string;
    description?: string;
    requirements?: string;
    budget?: number;
    status: CollaborationStatus;
    proposedTerms?: any;
    agreedTerms?: any;
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
    acceptedAt?: string;
    rejectedAt?: string;
    startedAt?: string;
    completedAt?: string;
    cancelledAt?: string;
}

export interface CreateCollaborationDto {
    influencerId: string;
    title: string;
    description?: string;
    proposedTerms?: any;
    startDate?: string;
    endDate?: string;
}

export interface UpdateCollaborationStatusDto {
    status: CollaborationStatus;
}
