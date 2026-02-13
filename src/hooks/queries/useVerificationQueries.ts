import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { verificationService, VerificationDto } from '@/services/verification.service';
import { toast } from 'sonner';

export const verificationKeys = {
    all: ['verification'] as const,
    status: () => [...verificationKeys.all, 'status'] as const,
};

/**
 * Hook to submit a verification request
 */
export function useSubmitVerification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: VerificationDto) => verificationService.submitVerification(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: verificationKeys.status() });
            toast.success('Verification request submitted successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to submit verification');
        },
    });
}

/**
 * Hook to get current verification status
 */
export function useMyVerificationStatus() {
    return useQuery({
        queryKey: verificationKeys.status(),
        queryFn: () => verificationService.getMyVerificationStatus(),
    });
}
