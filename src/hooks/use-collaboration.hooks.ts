import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants';
import {
    Collaboration,
    CreateCollaborationDto,
    UpdateCollaborationStatusDto
} from '@/types/collaboration.types';
import { toast } from 'sonner';

/**
 * Hook to fetch all collaborations for the current user
 */
export const useCollaborations = () => {
    return useQuery({
        queryKey: ['collaborations'],
        queryFn: async () => {
            const response = await httpService.get<Collaboration[]>(
                API_CONFIG.path.collaboration.base
            );
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch details of a specific collaboration
 */
export const useCollaborationDetail = (id: string) => {
    return useQuery({
        queryKey: ['collaborations', id],
        queryFn: async () => {
            const response = await httpService.get<Collaboration>(
                API_CONFIG.path.collaboration.detail(id)
            );
            return response.data;
        },
        enabled: !!id,
    });
};

/**
 * Hook to create a new collaboration request
 */
export const useCreateCollaboration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateCollaborationDto) => {
            const response = await httpService.post<Collaboration>(
                API_CONFIG.path.collaboration.base,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborations'] });
            toast.success('Collaboration request sent successfully');
        },
        onError: (error: Error) => {
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
        mutationFn: async (data: UpdateCollaborationStatusDto) => {
            const response = await httpService.patch<Collaboration>(
                API_CONFIG.path.collaboration.status(id),
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['collaborations'] });
            queryClient.invalidateQueries({ queryKey: ['collaborations', id] });
            toast.success(`Collaboration ${data.status.toLowerCase()} successfully`);
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update collaboration status');
        },
    });
};
