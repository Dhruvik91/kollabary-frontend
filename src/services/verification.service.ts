import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';

export interface VerificationDto {
    documents: {
        idProof: string;
        socialScreenshot?: string;
        notes?: string;
    };
}

export const verificationService = {
    /**
     * Submit a verification request
     */
    submitVerification: (data: VerificationDto) =>
        httpService.post<any>(API_CONFIG.path.verification.base, data),

    /**
     * Get current user's verification status
     */
    getMyVerificationStatus: async () => {
        const response = await httpService.get<any[]>(API_CONFIG.path.verification.myRequests);
        return response.data;
    }
};
