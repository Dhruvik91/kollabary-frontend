import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, UpdateReportStatusDto, UpdateVerificationStatusDto, SaveSubscriptionPlanDto } from '@/services/admin.service';
import { toast } from 'sonner';

// Reports
export function useAllReports() {
    return useQuery({
        queryKey: ['admin', 'reports'],
        queryFn: async () => {
            const response = await adminService.getAllReports();
            return response.data;
        },
    });
}

export function useUpdateReportStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: UpdateReportStatusDto['status'] }) => {
            const response = await adminService.updateReportStatus(id, status);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] });
            toast.success('Report status updated successfully');
        },
        onError: () => {
            toast.error('Failed to update report status');
        },
    });
}

// Verifications
export function useAllVerifications() {
    return useQuery({
        queryKey: ['admin', 'verifications'],
        queryFn: async () => {
            const response = await adminService.getAllVerifications();
            return response.data;
        },
    });
}

export function useUpdateVerificationStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateVerificationStatusDto }) => {
            const response = await adminService.updateVerificationStatus(id, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'verifications'] });
            toast.success('Verification status updated successfully');
        },
        onError: () => {
            toast.error('Failed to update verification status');
        },
    });
}

// Subscription Plans
export function useCreateSubscriptionPlan() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: SaveSubscriptionPlanDto) => {
            const response = await adminService.createOrUpdatePlan(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription', 'plans'] });
            toast.success('Subscription plan saved successfully');
        },
        onError: () => {
            toast.error('Failed to save subscription plan');
        },
    });
}

export function useDeleteSubscriptionPlan() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await adminService.deletePlan(id);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription', 'plans'] });
            toast.success('Subscription plan deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete subscription plan');
        },
    });
}
