import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { subscriptionService } from '@/services/subscription.service';
import { toast } from 'sonner';

/**
 * Query key factory for admin data
 */
export const adminKeys = {
    all: ['admin'] as const,
    stats: () => [...adminKeys.all, 'stats'] as const,
    reports: () => [...adminKeys.all, 'reports'] as const,
    verifications: () => [...adminKeys.all, 'verifications'] as const,
    ranking: () => [...adminKeys.all, 'ranking'] as const,
    subscriptions: () => [...adminKeys.all, 'subscriptions'] as const,
};

/**
 * Hook to fetch platform statistics
 */
export function useAdminStats() {
    return useQuery({
        queryKey: adminKeys.stats(),
        queryFn: adminService.getStats,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

/**
 * Hook to fetch all user reports with optional filters
 */
export function useAdminReports(filters?: { search?: string; status?: string }) {
    return useQuery({
        queryKey: [...adminKeys.reports(), filters],
        queryFn: () => adminService.getReports(filters),
    });
}

/**
 * Hook to update report status
 */
export function useUpdateReportStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reportId, data }: { reportId: string; data: any }) =>
            adminService.updateReportStatus(reportId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.reports() });
            toast.success('Report updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update report', {
                description: error.message,
            });
        },
    });
}

/**
 * Hook to fetch verification requests
 */
export function useAdminVerifications() {
    return useQuery({
        queryKey: adminKeys.verifications(),
        queryFn: adminService.getVerifications,
    });
}

/**
 * Hook to process verification request
 */
export function useProcessVerification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status, notes }: { id: string; status: 'APPROVED' | 'REJECTED'; notes?: string }) =>
            adminService.processVerification(id, status, notes),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.verifications() });
            queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
            toast.success('Verification processed');
        },
        onError: (error: any) => {
            toast.error('Failed to process verification', {
                description: error.message,
            });
        },
    });
}

/**
 * Hook to fetch ranking weights
 */
export function useRankingWeights() {
    return useQuery({
        queryKey: adminKeys.ranking(),
        queryFn: adminService.getRankingWeights,
    });
}

/**
 * Hook to update ranking weights
 */
export function useUpdateRankingWeights() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => adminService.updateRankingWeights(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.ranking() });
            toast.success('Ranking weights updated');
        },
        onError: (error: any) => {
            toast.error('Failed to update weights', {
                description: error.message,
            });
        },
    });
}

/**
 * Hook to recalculate all scores
 */
export function useRecalculateScores() {
    return useMutation({
        mutationFn: adminService.recalculateAllScores,
        onSuccess: () => {
            toast.success('Recalculation triggered successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to trigger recalculation', {
                description: error.message,
            });
        },
    });
}

/**
 * Hook to recalculate a single influencer's score
 */
export function useRecalculateInfluencerScore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (influencerId: string) => adminService.recalculateInfluencerScore(influencerId),
        onSuccess: (data, influencerId) => {
            queryClient.invalidateQueries({ queryKey: ['ranking', 'breakdown', influencerId] });
            queryClient.invalidateQueries({ queryKey: ['influencer', 'detail', influencerId] });
            toast.success('Influencer score recalculated', {
                description: `New score: ${data.newScore}`,
            });
        },
        onError: (error: any) => {
            toast.error('Failed to recalculate score', {
                description: error.message,
            });
        },
    });
}

/**
 * Hook to create a new influencer account
 */
export function useCreateInfluencer() {
    return useMutation({
        mutationFn: (data: any) => adminService.createInfluencer(data),
        onSuccess: () => {
            toast.success('Influencer account created successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to create influencer', {
                description: error.response?.data?.message || error.message,
            });
        },
    });
}

/**
 * Hook to fetch subscription plans
 */
export function useAdminSubscriptionPlans() {
    return useQuery({
        queryKey: adminKeys.subscriptions(),
        queryFn: () => subscriptionService.getPlans(),
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook to create a subscription plan
 */
export function useCreateSubscriptionPlan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => adminService.createSubscriptionPlan(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.subscriptions() });
            toast.success('Subscription plan created');
        },
        onError: (error: any) => {
            toast.error('Failed to create plan', {
                description: error.response?.data?.message || error.message,
            });
        },
    });
}

/**
 * Hook to delete a subscription plan
 */
export function useDeleteSubscriptionPlan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => adminService.deleteSubscriptionPlan(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.subscriptions() });
            toast.success('Subscription plan deleted');
        },
        onError: (error: any) => {
            toast.error('Failed to delete plan', {
                description: error.response?.data?.message || error.message,
            });
        },
    });
}
