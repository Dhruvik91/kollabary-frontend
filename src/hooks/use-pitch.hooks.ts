import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { pitchService } from '@/services/pitch.service';
import { CreatePitchDto, UpdatePitchStatusDto, PaginatedResponse, Pitch } from '@/types/pitch.types';
import { WALLET_QUERY_KEYS, TRANSACTION_QUERY_KEYS } from '@/hooks/queries/useWalletQueries';
import { toast } from 'sonner';

export const pitchKeys = {
    all: ['pitches'] as const,
    sent: () => [...pitchKeys.all, 'sent'] as const,
    received: () => [...pitchKeys.all, 'received'] as const,
    admin: () => [...pitchKeys.all, 'admin'] as const,
    detail: (id: string) => [...pitchKeys.all, 'detail', id] as const,
};

export const useSentPitches = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: [...pitchKeys.sent(), params],
        queryFn: () => pitchService.getSentPitches(params),
    });
};

export const useInfiniteSentPitches = (limit = 10, options?: any) => {
    return useInfiniteQuery<PaginatedResponse<Pitch>, Error>({
        queryKey: [...pitchKeys.sent(), { limit }],
        queryFn: ({ pageParam }) => pitchService.getSentPitches({ page: pageParam as number, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => 
            lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined,
        ...options
    });
};

export const useReceivedPitches = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: [...pitchKeys.received(), params],
        queryFn: () => pitchService.getReceivedPitches(params),
    });
};

export const useInfiniteReceivedPitches = (limit = 10, options?: any) => {
    return useInfiniteQuery<PaginatedResponse<Pitch>, Error>({
        queryKey: [...pitchKeys.received(), { limit }],
        queryFn: ({ pageParam }) => pitchService.getReceivedPitches({ page: pageParam as number, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => 
            lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined,
        ...options
    });
};

export const useInfiniteAllPitches = (limit = 10, options?: any) => {
    return useInfiniteQuery<PaginatedResponse<Pitch>, Error>({
        queryKey: [...pitchKeys.admin(), { limit }],
        queryFn: ({ pageParam }) => pitchService.getAllPitches({ page: pageParam as number, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => 
            lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined,
        ...options
    });
};

export const usePitchDetail = (id: string) => {
    return useQuery({
        queryKey: pitchKeys.detail(id),
        queryFn: () => pitchService.getPitchDetail(id),
        enabled: !!id,
    });
};

export const useCreatePitch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreatePitchDto) => pitchService.createPitch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pitchKeys.all });
            queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: TRANSACTION_QUERY_KEYS.all });
            toast.success('Pitch sent successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to send pitch');
        },
    });
};

export const useUpdatePitchStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdatePitchStatusDto }) => 
            pitchService.updatePitchStatus(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: pitchKeys.all });
            toast.success('Pitch status updated!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update pitch status');
        },
    });
};
