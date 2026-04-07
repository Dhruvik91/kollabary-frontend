import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants';
import { Auction, Bid } from '@/types/auction.types';
import { Conversation, Message } from '@/types/messaging.types';
import { Report } from '@/types/report.types';

export const adminService = {
    /**
     * Get platform statistics
     */
    getStats: async (): Promise<any> => {
        const response = await httpService.get(API_CONFIG.path.admin.stats);
        return response.data;
    },

    /**
     * List all auctions
     */
    getAllAuctions: async (params?: { search?: string; status?: string }): Promise<Auction[]> => {
        const response = await httpService.get<Auction[]>(API_CONFIG.path.admin.auctions, { params });
        return response.data;
    },

    /**
     * List all bids
     */
    getAllBids: async (params?: { search?: string }): Promise<Bid[]> => {
        const response = await httpService.get<Bid[]>(API_CONFIG.path.admin.bids, { params });
        return response.data;
    },

    /**
     * List all conversations
     */
    getAllConversations: async (): Promise<Conversation[]> => {
        const response = await httpService.get<Conversation[]>(API_CONFIG.path.admin.conversations);
        return response.data;
    },

    /**
     * Get conversation messages
     */
    getConversationMessages: async (id: string): Promise<Message[]> => {
        const response = await httpService.get<Message[]>(API_CONFIG.path.admin.conversationMessages(id));
        return response.data;
    },

    /**
     * List all reports
     */
    getAllReports: async (params?: { search?: string; status?: string }): Promise<Report[]> => {
        const response = await httpService.get<Report[]>(API_CONFIG.path.admin.reports, { params });
        return response.data;
    },

    /**
     * Update report status
     */
    updateReportStatus: async (id: string, status: string): Promise<Report> => {
        const response = await httpService.patch<Report>(API_CONFIG.path.admin.reportUpdate(id), { status });
        return response.data;
    },

    /**
     * List all verification requests
     */
    getAllVerifications: async (): Promise<any[]> => {
        const response = await httpService.get<any[]>(API_CONFIG.path.admin.verifications);
        return response.data;
    },

    /**
     * Update verification status
     */
    updateVerificationStatus: async (id: string, status: string): Promise<any> => {
        const response = await httpService.patch(API_CONFIG.path.admin.verificationUpdate(id), { status });
        return response.data;
    }
};
