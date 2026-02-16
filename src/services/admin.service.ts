import { API_CONFIG } from '@/constants';
import httpService from '@/lib/http-service';
import { AdminStats, VerificationRequest, UpdateReportStatusDto } from '@/types/admin.types';
import { Report } from '@/types/report.types';

export const adminService = {
    /**
     * Fetch global platform statistics
     */
    getStats: async (): Promise<AdminStats> => {
        const response = await httpService.get<AdminStats>(API_CONFIG.path.admin.stats);
        return response.data;
    },

    /**
     * Fetch all user reports
     */
    getReports: async (): Promise<Report[]> => {
        const response = await httpService.get<Report[]>(API_CONFIG.path.admin.reports);
        return response.data;
    },

    /**
     * Update a report's status
     */
    updateReportStatus: async (reportId: string, data: UpdateReportStatusDto): Promise<Report> => {
        const response = await httpService.patch<Report>(API_CONFIG.path.admin.reportUpdate(reportId), data);
        return response.data;
    },

    /**
     * Fetch all verification requests
     */
    getVerifications: async (): Promise<VerificationRequest[]> => {
        const response = await httpService.get<any[]>(API_CONFIG.path.admin.verifications);

        // Transform backend data to frontend type
        return (response.data || []).map(req => ({
            id: req.id,
            user: req.influencerProfile?.user,
            status: req.status,
            documents: req.documents ? Object.values(req.documents).filter(Boolean) as string[] : [],
            submittedAt: req.createdAt,
            notes: req.documents?.notes || req.notes
        }));
    },

    /**
     * Process a verification request
     */
    processVerification: async (id: string, status: 'APPROVED' | 'REJECTED', notes?: string): Promise<VerificationRequest> => {
        const response = await httpService.patch<VerificationRequest>(API_CONFIG.path.admin.verificationUpdate(id), { status, notes });
        return response.data;
    },

    /**
     * Manage subscription tiers
     */
    createSubscriptionPlan: async (data: any): Promise<any> => {
        const response = await httpService.post<any>(API_CONFIG.path.admin.subscription, data);
        return response.data;
    },

    deleteSubscriptionPlan: async (id: string): Promise<any> => {
        const response = await httpService.delete<any>(`${API_CONFIG.path.admin.subscription}/${id}`);
        return response.data;
    },

    /**
     * Ranking & Scoring Control
     */
    getRankingWeights: async (): Promise<any> => {
        const response = await httpService.get<any>(API_CONFIG.path.ranking.weights);
        return response.data;
    },

    updateRankingWeights: async (data: any): Promise<any> => {
        const response = await httpService.patch<any>(API_CONFIG.path.ranking.weights, data);
        return response.data;
    },

    recalculateAllScores: async (): Promise<any> => {
        const response = await httpService.post<any>(`${API_CONFIG.baseUrl}/ranking/recalculate-all`);
        return response.data;
    },

    /**
     * Admin: Create an influencer account
     */
    createInfluencer: async (data: any): Promise<any> => {
        const response = await httpService.post<any>(API_CONFIG.path.auth.createInfluencer, data);
        return response.data;
    },
};
