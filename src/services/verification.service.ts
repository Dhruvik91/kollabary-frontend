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
        httpService.post<any>('/verification/request', data),

    /**
     * Get current user's verification status
     */
    getMyVerificationStatus: async () => {
        const response = await httpService.get<any[]>('/verification/my-requests');
        return response.data;
    }
};
