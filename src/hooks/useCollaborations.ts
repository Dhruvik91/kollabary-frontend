import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collaborationService } from '@/services/collaboration.service';
import { CollaborationStatus } from '@/constants/constants';

export function useMyCollaborations() {
    return useQuery({
        queryKey: ['collaborations', 'mine'],
        queryFn: async () => {
            const response = await collaborationService.getCollaborations();
            return response.data;
        },
    });
}

export function useCollaborationDetail(id: string) {
    return useQuery({
        queryKey: ['collaborations', 'detail', id],
        queryFn: async () => {
            const response = await collaborationService.getCollaborationById(id);
            return response.data;
        },
        enabled: !!id,
    });
}

export function useCreateCollaboration() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await collaborationService.createCollaboration(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborations', 'mine'] });
        },
    });
}

export function useUpdateCollaborationStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: CollaborationStatus }) => {
            const response = await collaborationService.updateStatus(id, status);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['collaborations', 'mine'] });
            queryClient.invalidateQueries({ queryKey: ['collaborations', 'detail', variables.id] });
        },
    });
}
