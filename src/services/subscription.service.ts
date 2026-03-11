import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: string[];
    popular?: boolean;
    createdAt: string;
    updatedAt: string;
}

export const subscriptionService = {
    /**
     * Fetch all available subscription plans (public endpoint)
     */
    getPlans: async (): Promise<SubscriptionPlan[]> => {
        const response = await httpService.get<SubscriptionPlan[]>(API_CONFIG.path.subscription.plans);
        return response.data;
    },
};
