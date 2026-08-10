import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: string[] | any;
    description?: string;
    imageUrl?: string;
    isPopular: boolean;
    isActive: boolean;
    razorpayPlanId?: string;
    billingPeriod: string;
    createdAt: string;
    updatedAt: string;
}

export interface VerifySubscriptionDto {
    razorpayPaymentId: string;
    razorpaySubscriptionId: string;
    razorpaySignature: string;
}

export interface InitiateSubscriptionResponse {
    subscriptionId: string | null;
    razorpayKeyId?: string;
    activated?: boolean;
}

export const subscriptionService = {
    /**
     * Fetch all available subscription plans (public endpoint)
     */
    getPlans: async (): Promise<SubscriptionPlan[]> => {
        const response = await httpService.get<SubscriptionPlan[]>(API_CONFIG.path.subscription.plans);
        return response.data;
    },

    /**
     * Initiate subscription (Paid plan returns Razorpay sub details, Free plan activates directly)
     */
    initiateSubscription: async (planId: string): Promise<InitiateSubscriptionResponse> => {
        const response = await httpService.post<InitiateSubscriptionResponse>(
            API_CONFIG.path.subscription.initiate,
            { planId }
        );
        return response.data;
    },

    /**
     * Verify subscription payment and activate
     */
    verifySubscription: async (payload: VerifySubscriptionDto): Promise<any> => {
        const response = await httpService.post<any>(
            API_CONFIG.path.subscription.verify,
            payload
        );
        return response.data;
    },

    /**
     * Cancel active subscription
     */
    cancelSubscription: async (): Promise<any> => {
        const response = await httpService.post<any>(
            API_CONFIG.path.subscription.cancel
        );
        return response.data;
    },
};
