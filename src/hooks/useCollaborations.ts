import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import collaborationService from '@/services/collaboration-service';

export function useMyCollaborations() {
    return useQuery({
        queryKey: ['collaborations', 'mine'],
        queryFn: () => collaborationService.getMyCollaborations(),
    });
}

export function useCollaborationDetail(id: string) {
    return useQuery({
        queryKey: ['collaborations', 'detail', id],
        queryFn: () => collaborationService.getById(id),
        enabled: !!id,
    });
}

export function useCreateCollaboration() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => collaborationService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborations', 'mine'] });
        },
    });
}

export function useUpdateCollaborationStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            collaborationService.updateStatus(id, status),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['collaborations', 'mine'] });
            queryClient.invalidateQueries({ queryKey: ['collaborations', 'detail', variables.id] });
        },
    });
}
