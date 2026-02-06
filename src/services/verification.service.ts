import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';

export interface VerificationRequest {
    id: string;
    userId: string;
    documentType: string;
    documentUrl: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateVerificationRequestDto {
    documentType: string;
    documentUrl: string;
}

class VerificationService {
    async createRequest(data: CreateVerificationRequestDto) {
        return httpService.post<VerificationRequest>(API_CONFIG.path.verification.request, data);
    }

    async getMyRequests() {
        return httpService.get<VerificationRequest[]>(API_CONFIG.path.verification.myRequests);
    }
}

export const verificationService = new VerificationService();
