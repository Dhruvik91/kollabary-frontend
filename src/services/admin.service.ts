import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';

export interface Report {
    id: string;
    reporterId: string;
    targetType: 'INFLUENCER' | 'REVIEW';
    targetId: string;
    reason: string;
    details?: string;
    status: 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
    createdAt: string;
    updatedAt: string;
}

export interface VerificationRequest {
    id: string;
    userId: string;
    documentType: string;
    documentUrl: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    features: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateReportStatusDto {
    status: 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
}

export interface UpdateVerificationStatusDto {
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    rejectionReason?: string;
}

export interface SaveSubscriptionPlanDto {
    name: string;
    description: string;
    price: number;
    duration: number;
    features: string[];
    isActive?: boolean;
}

class AdminService {
    // Reports
    async getAllReports() {
        return httpService.get<Report[]>(API_CONFIG.path.admin.reports);
    }

    async updateReportStatus(id: string, status: UpdateReportStatusDto['status']) {
        return httpService.patch<Report>(API_CONFIG.path.admin.reportStatus(id), { status });
    }

    // Verifications
    async getAllVerifications() {
        return httpService.get<VerificationRequest[]>(API_CONFIG.path.admin.verifications);
    }

    async updateVerificationStatus(id: string, data: UpdateVerificationStatusDto) {
        return httpService.patch<VerificationRequest>(API_CONFIG.path.admin.verificationStatus(id), data);
    }

    // Subscription Plans
    async createOrUpdatePlan(data: SaveSubscriptionPlanDto) {
        return httpService.post<SubscriptionPlan>(API_CONFIG.path.admin.subscriptionPlan, data);
    }

    async deletePlan(id: string) {
        return httpService.delete(API_CONFIG.path.admin.deletePlan(id));
    }
}

export const adminService = new AdminService();
