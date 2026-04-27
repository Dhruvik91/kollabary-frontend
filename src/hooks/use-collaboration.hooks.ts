import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collaborationService } from '@/services/collaboration.service';
import {
    CollaborationFilters,
    CreateCollaborationDto,
    UpdateCollaborationStatusDto,
    UpdateCollaborationDto
} from '@/types/collaboration.types';
import { WALLET_QUERY_KEYS, TRANSACTION_QUERY_KEYS } from '@/hooks/queries/useWalletQueries';
import { toast } from 'sonner';

/**
 * Hook to fetch collaborations with infinite scroll and optional filters
 */
export const useCollaborations = (filters?: Omit<CollaborationFilters, 'page'>, enabled = true) => {
    return useInfiniteQuery({
        queryKey: ['collaborations', filters],
        queryFn: ({ pageParam = 1 }) =>
            collaborationService.getCollaborations({ ...filters, page: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.page < lastPage.meta.totalPages) {
                return lastPage.meta.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        enabled,
    });
};

/**
 * Hook to fetch details of a specific collaboration
 */
export const useCollaborationDetail = (id: string) => {
    return useQuery({
        queryKey: ['collaborations', id],
        queryFn: () => collaborationService.getCollaborationDetail(id),
        enabled: !!id,
    });
};

/**
 * Hook to create a new collaboration request
 */
export const useCreateCollaboration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCollaborationDto) =>
            collaborationService.createCollaboration(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborations'] });
            queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: TRANSACTION_QUERY_KEYS.all });
            toast.success('Collaboration request sent successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to send collaboration request');
        },
    });
};

/**
 * Hook to update the status of a collaboration
 */
export const useUpdateCollaborationStatus = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateCollaborationStatusDto) =>
            collaborationService.updateCollaborationStatus(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['collaborations'] });
            queryClient.invalidateQueries({ queryKey: ['collaborations', id] });
            queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: TRANSACTION_QUERY_KEYS.all });
            toast.success(`Collaboration ${data.status.toLowerCase()} successfully`);
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update collaboration status');
        },
    });
};
/**
 * Hook to update collaboration details
 */
export const useUpdateCollaboration = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateCollaborationDto) =>
            collaborationService.updateCollaboration(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborations'] });
            queryClient.invalidateQueries({ queryKey: ['collaborations', id] });
            toast.success('Collaboration updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update collaboration');
        },
    });
};

/**
 * Hook to delete a collaboration
 */
export const useDeleteCollaboration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => collaborationService.deleteCollaboration(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborations'] });
            queryClient.invalidateQueries({ queryKey: ['my-influencers'] });
            queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: TRANSACTION_QUERY_KEYS.all });
            toast.success('Collaboration deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete collaboration');
        },
    });
};

/**
 * Hook to fetch influencers the user has collaborated with
 */
export const useMyInfluencers = (filters?: Omit<{ page?: number; limit?: number; search?: string; category?: string }, 'page'>) => {
    return useInfiniteQuery({
        queryKey: ['my-influencers', filters],
        queryFn: ({ pageParam = 1 }) =>
            collaborationService.getMyInfluencers({ ...filters, page: pageParam }),
        getNextPageParam: (lastPage: any) => {
            if (lastPage.meta.page < lastPage.meta.totalPages) {
                return lastPage.meta.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });
};
