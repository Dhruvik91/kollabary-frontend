import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';

export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    features: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

class SubscriptionService {
    async getAllPlans() {
        return httpService.get<SubscriptionPlan[]>(API_CONFIG.path.subscription.plans);
    }
}

export const subscriptionService = new SubscriptionService();
