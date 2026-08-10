import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionService, VerifySubscriptionDto } from '@/services/subscription.service';
import { authKeys } from '../use-auth.hooks';
import { toast } from 'sonner';

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

/**
 * Hook to initiate subscription
 */
export function useInitiateSubscription() {
    return useMutation({
        mutationFn: (planId: string) => subscriptionService.initiateSubscription(planId),
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to initiate subscription');
        },
    });
}

/**
 * Hook to verify subscription payment
 */
export function useVerifySubscription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: VerifySubscriptionDto) => subscriptionService.verifySubscription(payload),
        onSuccess: () => {
            toast.success('Subscription activated successfully!');
            // Invalidate me query to update subscription status
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Subscription verification failed');
        },
    });
}

/**
 * Hook to cancel subscription
 */
export function useCancelSubscription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => subscriptionService.cancelSubscription(),
        onSuccess: () => {
            toast.success('Subscription cancelled successfully');
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to cancel subscription');
        },
    });
}
