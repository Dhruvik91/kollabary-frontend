import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { verificationService, CreateVerificationRequestDto } from '@/services/verification.service';
import { toast } from 'sonner';

export function useMyVerificationRequests() {
    return useQuery({
        queryKey: ['verification', 'my-requests'],
        queryFn: async () => {
            const response = await verificationService.getMyRequests();
            return response.data;
        },
    });
}

export function useCreateVerificationRequest() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateVerificationRequestDto) => {
            const response = await verificationService.createRequest(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['verification', 'my-requests'] });
            toast.success('Verification request submitted successfully');
        },
        onError: () => {
            toast.error('Failed to submit verification request');
        },
    });
}
