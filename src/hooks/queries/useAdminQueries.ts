import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { Auction, Bid } from '@/types/auction.types';
import { Conversation, Message } from '@/types/messaging.types';
import { toast } from 'sonner';
import { Report } from '@/types/report.types';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';

export const useAdminQueries = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const isAdmin = user?.role === UserRole.ADMIN;

    const useStats = () => useQuery({
        queryKey: ['admin', 'stats'],
        queryFn: () => adminService.getStats(),
        enabled: isAdmin,
    });

    const useAuctions = (params?: { search?: string; status?: string }) => useQuery<Auction[]>({
        queryKey: ['admin', 'auctions', params],
        queryFn: () => adminService.getAllAuctions(params),
        enabled: isAdmin,
    });

    const useBids = (params?: { search?: string }) => useQuery<Bid[]>({
        queryKey: ['admin', 'bids', params],
        queryFn: () => adminService.getAllBids(params),
        enabled: isAdmin,
    });

    const useConversations = () => useQuery<Conversation[]>({
        queryKey: ['admin', 'conversations'],
        queryFn: () => adminService.getAllConversations(),
        enabled: isAdmin,
    });

    const useConversationMessages = (id: string | null) => useQuery<Message[]>({
        queryKey: ['admin', 'conversations', id, 'messages'],
        queryFn: () => adminService.getConversationMessages(id!),
        enabled: isAdmin && !!id,
    });

    const useReports = (params?: { search?: string; status?: string }) => useQuery<Report[]>({
        queryKey: ['admin', 'reports', params],
        queryFn: () => adminService.getReports(params),
        enabled: isAdmin,
    });

    const useUpdateReportStatus = () => useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => 
            adminService.updateReportStatus(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] });
        },
    });

    const useVerifications = () => useQuery({
        queryKey: ['admin', 'verifications'],
        queryFn: () => adminService.getVerifications(),
        enabled: isAdmin,
    });

    const useUpdateVerificationStatus = () => useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => 
            adminService.processVerification(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'verifications'] });
        },
    });

    return {
        useStats,
        useAuctions,
        useBids,
        useConversations,
        useConversationMessages,
        useReports,
        useUpdateReportStatus,
        useVerifications,
        useUpdateVerificationStatus,
        useAdminTopUpPlans,
        useCreateTopUpPlan,
        useUpdateTopUpPlan,
        useDeleteTopUpPlan,
    };
};

// Top-up Plans
export const useAdminTopUpPlans = () => {
    return useQuery({
        queryKey: ['admin', 'top-up-plans'],
        queryFn: () => adminService.getAllTopUpPlans(),
    });
};

export const useCreateTopUpPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: any) => adminService.createTopUpPlan(dto),
        onSuccess: () => {
            toast.success('Top-up plan created successfully');
            queryClient.invalidateQueries({ queryKey: ['admin', 'top-up-plans'] });
            queryClient.invalidateQueries({ queryKey: ['payment', 'plans'] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to create plan');
        },
    });
};

export const useUpdateTopUpPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, dto }: { id: string; dto: any }) => adminService.updateTopUpPlan(id, dto),
        onSuccess: () => {
            toast.success('Top-up plan updated successfully');
            queryClient.invalidateQueries({ queryKey: ['admin', 'top-up-plans'] });
            queryClient.invalidateQueries({ queryKey: ['payment', 'plans'] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to update plan');
        },
    });
};

export const useDeleteTopUpPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => adminService.deleteTopUpPlan(id),
        onSuccess: () => {
            toast.success('Top-up plan deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['admin', 'top-up-plans'] });
            queryClient.invalidateQueries({ queryKey: ['payment', 'plans'] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to delete plan');
        },
    });
};
