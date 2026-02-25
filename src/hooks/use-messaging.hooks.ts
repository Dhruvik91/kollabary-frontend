import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingService } from '@/services/messaging.service';
import { toast } from 'sonner';

/**
 * Hook to fetch all conversations for the current user
 */
export const useConversations = () => {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: messagingService.getConversations,
        refetchInterval: 5000, // Poll every 5 seconds
    });
};

/**
 * Hook to fetch message history for a conversation
 */
export const useMessageHistory = (conversationId: string) => {
    return useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => messagingService.getMessageHistory(conversationId),
        enabled: !!conversationId,
        refetchInterval: 3000, // Poll every 3 seconds for active chat
    });
};

/**
 * Hook to start or resume a conversation
 */
export const useStartConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (recipientId: string) => messagingService.getOrCreateConversation(recipientId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            // Optionally invalidate specific conversation if we had that query
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to start conversation');
        },
    });
};

/**
 * Hook to send a message
 */
export function useSendMessage(conversationId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (message: string) => messagingService.sendMessage(conversationId, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to send message');
        },
    });
}

/**
 * Hook to update a message
 */
export function useUpdateMessage(conversationId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ messageId, message }: { messageId: string; message: string }) =>
            messagingService.updateMessage(messageId, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            toast.success('Message updated');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update message');
        },
    });
}

/**
 * Hook to delete a message
 */
export function useDeleteMessage(conversationId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (messageId: string) => messagingService.deleteMessage(messageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            toast.success('Message deleted');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete message');
        },
    });
}

/**
 * Hook to delete a conversation
 */
export const useDeleteConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conversationId: string) => messagingService.deleteConversation(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            toast.success('Conversation deleted');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete conversation');
        },
    });
};
