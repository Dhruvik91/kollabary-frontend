import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { toast } from 'sonner';

export interface VerificationRequest {
    id: string;
    userId: string;
    documentUrl: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        email: string;
        name: string;
        profileImage?: string;
    };
}

/**
 * Hook to fetch all verification requests
 * Admin only
 */
export const useVerificationRequests = () => {
    return useQuery({
        queryKey: ['admin', 'verifications'],
        queryFn: async () => {
            const response = await httpService.get<VerificationRequest[]>(
                API_CONFIG.path.admin.verifications
            );
            return response.data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * Hook to approve a verification request
 */
export const useApproveVerification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await httpService.patch(
                API_CONFIG.path.admin.verificationStatus(id),
                { status: 'APPROVED' }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'verifications'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
            toast.success('Verification approved successfully');
        },
        onError: () => {
            toast.error('Failed to approve verification');
        },
    });
};

/**
 * Hook to reject a verification request
 */
export const useRejectVerification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
            const response = await httpService.patch(
                API_CONFIG.path.admin.verificationStatus(id),
                { status: 'REJECTED', rejectionReason: reason }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'verifications'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
            toast.success('Verification rejected');
        },
        onError: () => {
            toast.error('Failed to reject verification');
        },
    });
};
