import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { 
    TopUpPlan, 
    InitiateTopUpResponse, 
    VerifyPaymentDto 
} from '@/types/payment.types';

export const paymentService = {
    /**
     * Get active top-up plans for users
     */
    async getPublicPlans(): Promise<TopUpPlan[]> {
        const response = await httpService.get<TopUpPlan[]>(API_CONFIG.path.topUp.plans);
        return response.data;
    },

    /**
     * Initiate a top-up order with Razorpay
     */
    async initiateTopUp(planId: string): Promise<InitiateTopUpResponse> {
        const response = await httpService.post<InitiateTopUpResponse>(API_CONFIG.path.topUp.initiate, { planId });
        return response.data;
    },

    /**
     * Verify the Razorpay payment signature
     */
    async verifyPayment(payload: VerifyPaymentDto): Promise<{ success: boolean; coinsCredited: number }> {
        const response = await httpService.post<{ success: boolean; coinsCredited: number }>(API_CONFIG.path.topUp.verify, payload);
        return response.data;
    },
};
