import httpService from '@/lib/http-service';
import { 
    TopUpPlan, 
    CreateTopUpPlanDto, 
    UpdateTopUpPlanDto 
} from '@/types/payment.types';
import { API_CONFIG } from '@/constants';
import { Auction, Bid } from '@/types/auction.types';
import { Conversation, Message } from '@/types/messaging.types';
import { Report } from '@/types/report.types';

export const adminService = {
    /**
     * Get platform statistics
     */
    getStats: async (params?: { range?: string; startDate?: string; endDate?: string }): Promise<any> => {
        const response = await httpService.get(API_CONFIG.path.admin.stats, { params });
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
    getReports: async (params?: { search?: string; status?: string }): Promise<Report[]> => {
        const response = await httpService.get<Report[]>(API_CONFIG.path.admin.reports, { params });
        return response.data;
    },

    /**
     * Update report status
     */
    updateReportStatus: async (reportId: string, data: { status: string }): Promise<Report> => {
        const response = await httpService.patch<Report>(API_CONFIG.path.admin.reportUpdate(reportId), data);
        return response.data;
    },

    /**
     * List all verification requests
     */
    getVerifications: async (): Promise<any[]> => {
        const response = await httpService.get<any[]>(API_CONFIG.path.admin.verifications);
        return response.data;
    },

    /**
     * Update verification status
     */
    processVerification: async (id: string, status: string, notes?: string): Promise<any> => {
        const response = await httpService.patch(API_CONFIG.path.admin.verificationUpdate(id), { status, notes });
        return response.data;
    },

    async updateKCSetting(key: string, value: any) {
        const response = await httpService.patch(API_CONFIG.path.admin.kcSettingUpdate(key), { value });
        return response.data;
    },

    // Top-up Plans Management
    async getAllTopUpPlans(): Promise<TopUpPlan[]> {
        const response = await httpService.get<TopUpPlan[]>(API_CONFIG.path.adminTopUp.plans);
        return response.data;
    },

    async createTopUpPlan(dto: CreateTopUpPlanDto): Promise<TopUpPlan> {
        const response = await httpService.post<TopUpPlan>(API_CONFIG.path.adminTopUp.plans, dto);
        return response.data;
    },

    async updateTopUpPlan(id: string, dto: UpdateTopUpPlanDto): Promise<TopUpPlan> {
        const response = await httpService.patch<TopUpPlan>(API_CONFIG.path.adminTopUp.planUpdate(id), dto);
        return response.data;
    },

    async deleteTopUpPlan(id: string): Promise<void> {
        await httpService.delete(API_CONFIG.path.adminTopUp.planUpdate(id));
    },

    /**
     * Get ranking weights
     */
    getRankingWeights: async (): Promise<any> => {
        const response = await httpService.get(API_CONFIG.path.ranking.weights);
        return response.data;
    },

    /**
     * Update ranking weights
     */
    updateRankingWeights: async (data: any): Promise<any> => {
        const response = await httpService.patch(API_CONFIG.path.ranking.weights, data);
        return response.data;
    },

    /**
     * Recalculate all scores
     */
    recalculateAllScores: async (): Promise<any> => {
        const response = await httpService.post(API_CONFIG.path.ranking.recalculateAll);
        return response.data;
    },

    /**
     * Recalculate single influencer score
     */
    recalculateInfluencerScore: async (influencerId: string): Promise<any> => {
        const response = await httpService.post(API_CONFIG.path.ranking.recalculate(influencerId));
        return response.data;
    },

    /**
     * Get financial statistics with filters
     */
    getFinanceStats: async (params?: any): Promise<any> => {
        const response = await httpService.get(API_CONFIG.path.admin.finance, { params });
        return response.data;
    },

    /**
     * List all platform orders
     */
    getAllOrders: async (params?: any): Promise<any> => {
        const response = await httpService.get(API_CONFIG.path.admin.orders, { params });
        return response.data;
    },

    /**
     * List all platform users
     */
    getAllUsers: async (params?: any): Promise<any> => {
        const response = await httpService.get(API_CONFIG.path.admin.users, { params });
        return response.data;
    },

    /**
     * Bulk update user status
     */
    bulkUpdateUserStatus: async (userIds: string[], status: string): Promise<any> => {
        const response = await httpService.patch(API_CONFIG.path.admin.userBulkStatus, { userIds, status });
        return response.data;
    },

    /**
     * Update individual user status
     */
    updateUserStatus: async (userId: string, status: string): Promise<any> => {
        const response = await httpService.patch(API_CONFIG.path.admin.userStatusUpdate(userId), { status });
        return response.data;
    },

    /**
     * Directly verify influencer
     */
    verifyInfluencer: async (userId: string, isVerified: boolean): Promise<any> => {
        const response = await httpService.patch(API_CONFIG.path.admin.userVerify(userId), { isVerified });
        return response.data;
    },

    /**
     * Create influencer account
     */
    createInfluencer: async (data: any): Promise<any> => {
        const response = await httpService.post(API_CONFIG.path.auth.createInfluencer, data);
        return response.data;
    },

    /**
     * Create subscription plan
     */
    createSubscriptionPlan: async (data: any): Promise<any> => {
        const response = await httpService.post(API_CONFIG.path.admin.subscription, data);
        return response.data;
    },

    /**
     * Delete subscription plan
     */
    deleteSubscriptionPlan: async (id: string): Promise<any> => {
        const response = await httpService.delete(`${API_CONFIG.path.admin.subscription}/${id}`);
        return response.data;
    }
};
