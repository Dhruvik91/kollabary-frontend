import { useQuery } from '@tanstack/react-query';
import { subscriptionService } from '@/services/subscription.service';

export const subscriptionKeys = {
    all: ['subscription'] as const,
    plans: () => [...subscriptionKeys.all, 'plans'] as const,
};

/**
 * Hook to fetch all available subscription plans
 */
export function useSubscriptionPlans() {
    return useQuery({
        queryKey: subscriptionKeys.plans(),
        queryFn: () => subscriptionService.getPlans(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
