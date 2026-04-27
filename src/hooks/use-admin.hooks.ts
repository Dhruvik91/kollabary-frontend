import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { subscriptionService } from '@/services/subscription.service';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';

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
    users: () => [...adminKeys.all, 'users'] as const,
    finance: (params: any) => [...adminKeys.all, 'finance', params] as const,
    orders: (params: any) => [...adminKeys.all, 'orders', params] as const,
};

/**
 * Hook to fetch platform users with pagination and filters
 */
export function useAdminUsers(filters?: any) {
    const { user } = useAuth();
    return useQuery({
        queryKey: [...adminKeys.users(), filters],
        queryFn: () => adminService.getAllUsers(filters),
        enabled: user?.role === UserRole.ADMIN,
    });
}

/**
 * Hook for bulk updating user status
 */
export function useBulkUpdateUserStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userIds, status }: { userIds: string[]; status: string }) =>
            adminService.bulkUpdateUserStatus(userIds, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.users() });
            toast.success('User status updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update users', {
                description: error.message,
            });
        },
    });
}

/**
 * Hook for individual user moderation (ban/unban/verify)
 */
export function useModerateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, status, verified }: { userId: string; status?: string; verified?: boolean }) => {
            if (status) return adminService.updateUserStatus(userId, status);
            if (verified !== undefined) return adminService.verifyUser(userId, verified);
            return Promise.reject(new Error('No action provided'));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.users() });
            toast.success('User updated successfully');
        },
        onError: (error: any) => {
            toast.error('Moderation failed', {
                description: error.message,
            });
        },
    });
}

/**
 * Hook for adding coins to a user wallet
 */
export function useAdminAddCoins() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, amount }: { userId: string; amount: number }) =>
            adminService.addCoinsToUser(userId, amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.users() });
            toast.success('K Coins added successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to add K coins';
            toast.error(message);
        },
    });
}

/**
 * Hook to fetch platform statistics
 */
export function useAdminStats(range: string = 'TODAY') {
    const { user } = useAuth();
    return useQuery({
        queryKey: [...adminKeys.stats(), range],
        queryFn: () => adminService.getStats({ range }),
        staleTime: 2 * 60 * 1000, // 2 minutes
        enabled: user?.role === UserRole.ADMIN,
    });
}

/**
 * Hook to fetch all user reports with optional filters
 */
export function useAdminReports(filters?: { search?: string; status?: string }) {
    const { user } = useAuth();
    return useQuery({
        queryKey: [...adminKeys.reports(), filters],
        queryFn: () => adminService.getReports(filters),
        enabled: user?.role === UserRole.ADMIN,
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
    const { user } = useAuth();
    return useQuery({
        queryKey: adminKeys.verifications(),
        queryFn: adminService.getVerifications,
        enabled: user?.role === UserRole.ADMIN,
    });
}

/**
 * Hook to process verification request
 */
export function useProcessVerification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status, adminNotes }: { id: string; status: 'APPROVED' | 'REJECTED'; adminNotes?: string }) =>
            adminService.processVerification(id, status, adminNotes),
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
    const { user } = useAuth();
    return useQuery({
        queryKey: adminKeys.ranking(),
        queryFn: adminService.getRankingWeights,
        enabled: user?.role === UserRole.ADMIN,
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
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminService.recalculateAllScores,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
            queryClient.invalidateQueries({ queryKey: ['influencer'] });
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
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => adminService.createInfluencer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.users() });
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
    const { user } = useAuth();
    return useQuery({
        queryKey: adminKeys.subscriptions(),
        queryFn: () => subscriptionService.getPlans(),
        staleTime: 5 * 60 * 1000,
        enabled: user?.role === UserRole.ADMIN,
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
            queryClient.invalidateQueries({ queryKey: ['subscription'] });
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
            queryClient.invalidateQueries({ queryKey: ['subscription'] });
            toast.success('Subscription plan deleted');
        },
        onError: (error: any) => {
            toast.error('Failed to delete plan', {
                description: error.response?.data?.message || error.message,
            });
        },
    });
}

/**
 * Hook to fetch financial statistics
 */
export function useFinanceStats(params: { range: string; startDate?: string; endDate?: string }) {
    const { user } = useAuth();
    return useQuery({
        queryKey: adminKeys.finance(params),
        queryFn: () => adminService.getFinanceStats(params),
        enabled: user?.role === UserRole.ADMIN,
    });
}

/**
 * Hook to fetch all orders with pagination and filters
 */
export function useAdminOrders(params: { page: number; limit: number; status?: string; userId?: string; search?: string }) {
    const { user } = useAuth();
    return useQuery({
        queryKey: adminKeys.orders(params),
        queryFn: () => adminService.getAllOrders(params),
        enabled: user?.role === UserRole.ADMIN,
    });
}
