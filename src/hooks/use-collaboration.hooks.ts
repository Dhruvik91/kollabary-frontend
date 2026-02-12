import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collaborationService } from '@/services/collaboration.service';
import {
    CreateCollaborationDto,
    UpdateCollaborationStatusDto,
    UpdateCollaborationDto
} from '@/types/collaboration.types';
import { toast } from 'sonner';

/**
 * Hook to fetch all collaborations for the current user
 */
export const useCollaborations = () => {
    return useQuery({
        queryKey: ['collaborations'],
        queryFn: collaborationService.getCollaborations,
        staleTime: 5 * 60 * 1000, // 5 minutes
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
            toast.success('Collaboration deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete collaboration');
        },
    });
};
