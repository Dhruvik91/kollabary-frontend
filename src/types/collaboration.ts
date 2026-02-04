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
    title: string;
    description?: string;
    status: CollaborationStatus;
    proposedTerms?: any;
    agreedTerms?: any;
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
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
