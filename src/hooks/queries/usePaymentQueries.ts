import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '@/services/payment.service';
import { VerifyPaymentDto } from '@/types/payment.types';
import { toast } from 'sonner';

export const paymentKeys = {
    all: ['payment'] as const,
    plans: () => [...paymentKeys.all, 'plans'] as const,
};

export const usePaymentPlans = () => {
    return useQuery({
        queryKey: paymentKeys.plans(),
        queryFn: () => paymentService.getPublicPlans(),
    });
};

export const useInitiateTopUp = () => {
    return useMutation({
        mutationFn: (planId: string) => paymentService.initiateTopUp(planId),
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to initiate payment');
        },
    });
};

export const useVerifyPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: VerifyPaymentDto) => paymentService.verifyPayment(payload),
        onSuccess: (data) => {
            toast.success(`Payment verified! ${data.coinsCredited} KC added to your wallet.`);
            // Invalidate wallet queries to update balance
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Payment verification failed');
        },
    });
};
