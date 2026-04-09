import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { Auction, Bid } from '@/types/auction.types';
import { Conversation, Message } from '@/types/messaging.types';
import { Report } from '@/types/report.types';

export const useAdminQueries = () => {
    const queryClient = useQueryClient();

    const useStats = () => useQuery({
        queryKey: ['admin', 'stats'],
        queryFn: () => adminService.getStats(),
    });

    const useAuctions = (params?: { search?: string; status?: string }) => useQuery<Auction[]>({
        queryKey: ['admin', 'auctions', params],
        queryFn: () => adminService.getAllAuctions(params),
    });

    const useBids = (params?: { search?: string }) => useQuery<Bid[]>({
        queryKey: ['admin', 'bids', params],
        queryFn: () => adminService.getAllBids(params),
    });

    const useConversations = () => useQuery<Conversation[]>({
        queryKey: ['admin', 'conversations'],
        queryFn: () => adminService.getAllConversations(),
    });

    const useConversationMessages = (id: string | null) => useQuery<Message[]>({
        queryKey: ['admin', 'conversations', id, 'messages'],
        queryFn: () => adminService.getConversationMessages(id!),
        enabled: !!id,
    });

    const useReports = (params?: { search?: string; status?: string }) => useQuery<Report[]>({
        queryKey: ['admin', 'reports', params],
        queryFn: () => adminService.getAllReports(params),
    });

    const useUpdateReportStatus = () => useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => 
            adminService.updateReportStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] });
        },
    });

    const useVerifications = () => useQuery({
        queryKey: ['admin', 'verifications'],
        queryFn: () => adminService.getAllVerifications(),
    });

    const useUpdateVerificationStatus = () => useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => 
            adminService.updateVerificationStatus(id, status),
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
    };
};
