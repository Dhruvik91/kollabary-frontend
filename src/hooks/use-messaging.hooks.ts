import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingService } from '@/services/messaging.service';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSocket } from '@/contexts/socket-context';

/**
 * Hook to fetch all conversations for the current user
 */
export const useConversations = () => {
    const queryClient = useQueryClient();
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        const handleConversationDeleted = () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        };

        const handleNewMessage = () => {
            // Update conversation list order/preview
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        };

        socket.on('conversation_deleted', handleConversationDeleted);
        socket.on('new_message', handleNewMessage);
        socket.on('message_updated', handleNewMessage);
        socket.on('new_conversation', handleNewMessage);

        return () => {
            socket.off('conversation_deleted', handleConversationDeleted);
            socket.off('new_message', handleNewMessage);
            socket.off('message_updated', handleNewMessage);
            socket.off('new_conversation', handleNewMessage);
        };
    }, [socket, queryClient]);

    return useQuery({
        queryKey: ['conversations'],
        queryFn: messagingService.getConversations,
    });
};

/**
 * Hook to fetch message history for a conversation
 */
export const useMessageHistory = (conversationId: string) => {
    const queryClient = useQueryClient();
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket || !conversationId) return;

        // Join the conversation room
        socket.emit('join_conversation', conversationId);

        const handleNewMessage = (newMessage: any) => {
            queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
                if (!oldData) return [newMessage];
                // Check if message already exists to avoid duplicates
                if (oldData.some((m: any) => m.id === newMessage.id)) return oldData;
                return [...oldData, newMessage];
            });
        };

        const handleMessageUpdated = (updatedMessage: any) => {
            queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
                if (!oldData) return oldData;
                return oldData.map((m: any) => m.id === updatedMessage.id ? updatedMessage : m);
            });
        };

        const handleMessageDeleted = ({ messageId }: { messageId: string }) => {
            queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
                if (!oldData) return oldData;
                return oldData.filter((m: any) => m.id !== messageId);
            });
        };

        socket.on('new_message', handleNewMessage);
        socket.on('message_updated', handleMessageUpdated);
        socket.on('message_deleted', handleMessageDeleted);

        return () => {
            socket.emit('leave_conversation', conversationId);
            socket.off('new_message', handleNewMessage);
            socket.off('message_updated', handleMessageUpdated);
            socket.off('message_deleted', handleMessageDeleted);
        };
    }, [socket, conversationId, queryClient]);

    return useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => messagingService.getMessageHistory(conversationId),
        enabled: !!conversationId,
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
