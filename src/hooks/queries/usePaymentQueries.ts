import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
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

export const useMyOrders = (page = 1, limit = 20) => {
    return useQuery({
        queryKey: [...paymentKeys.all, 'history', page, limit],
        queryFn: () => paymentService.getMyOrders(page, limit),
    });
};

export const useInfiniteMyOrders = (limit = 10) => {
    return useInfiniteQuery({
        queryKey: [...paymentKeys.all, 'history', 'infinite', limit],
        queryFn: ({ pageParam = 1 }) => paymentService.getMyOrders(pageParam, limit),
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.meta;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
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
            queryClient.invalidateQueries({ queryKey: paymentKeys.all });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Payment verification failed');
        },
    });
};

export const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) => paymentService.cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: paymentKeys.all });
            toast.success('Order cancelled successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to cancel order');
        },
    });
};

export const useSyncOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) => paymentService.syncOrder(orderId),
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success('Payment synced successfully!');
                queryClient.invalidateQueries({ queryKey: ['wallet'] });
                queryClient.invalidateQueries({ queryKey: ['payment'] });
            } else {
                toast.info(`Payment status: ${data.status}`);
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to sync with gateway');
        },
    });
};
