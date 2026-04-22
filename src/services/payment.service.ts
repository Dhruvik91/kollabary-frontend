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

    /**
     * Get user's top-up order history
     */
    async getMyOrders(page = 1, limit = 20): Promise<{ items: PaymentOrder[]; meta: any }> {
        const response = await httpService.get<{ items: PaymentOrder[]; meta: any }>(API_CONFIG.path.topUp.myOrders, { params: { page, limit } });
        return response.data;
    },

    /**
     * Mark an order as cancelled
     */
    async cancelOrder(orderId: string): Promise<{ status: string }> {
        const response = await httpService.post<{ status: string }>(API_CONFIG.path.topUp.cancel(orderId));
        return response.data;
    },

    /**
     * Proactively sync order status with the gateway
     */
    async syncOrder(orderId: string): Promise<{ status: string; coinsCredited?: number }> {
        const response = await httpService.post<{ status: string; coinsCredited?: number }>(API_CONFIG.path.topUp.sync(orderId));
        return response.data;
    },
};
