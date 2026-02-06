import { useQuery } from '@tanstack/react-query';
import { subscriptionService } from '@/services/subscription.service';

export function useSubscriptionPlans() {
    return useQuery({
        queryKey: ['subscription', 'plans'],
        queryFn: async () => {
            const response = await subscriptionService.getAllPlans();
            return response.data;
        },
    });
}
