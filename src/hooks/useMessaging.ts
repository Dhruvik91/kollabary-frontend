import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingService } from '@/services/messaging.service';
import { StartConversationDto, SendMessageDto } from '@/types/messaging';
import { useRouter } from 'next/navigation';

export function useMyConversations() {
    return useQuery({
        queryKey: ['messaging', 'conversations'],
        queryFn: async () => {
            const response = await messagingService.getMyConversations();
            return response.data;
        },
        refetchInterval: 10000, // Refetch every 10 seconds for basic real-time feel
    });
}

export function useMessages(conversationId: string) {
    return useQuery({
        queryKey: ['messaging', 'messages', conversationId],
        queryFn: async () => {
            const response = await messagingService.getMessages(conversationId);
            return response.data;
        },
        enabled: !!conversationId,
        refetchInterval: 5000, // Faster refetch for messages
    });
}

export function useStartConversation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: StartConversationDto) => {
            const response = await messagingService.getOrCreateConversation(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messaging', 'conversations'] });
        },
    });
}

export function useSendMessage(conversationId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: SendMessageDto) => {
            const response = await messagingService.sendMessage(conversationId, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messaging', 'messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['messaging', 'conversations'] });
        },
    });
}

export function useUpdateMessage(conversationId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ messageId, data }: { messageId: string, data: SendMessageDto }) => {
            const response = await messagingService.updateMessage(messageId, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messaging', 'messages', conversationId] });
        },
    });
}

export function useDeleteMessage(conversationId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (messageId: string) => {
            await messagingService.deleteMessage(messageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messaging', 'messages', conversationId] });
        },
    });
}

export function useDeleteConversation() {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: async (conversationId: string) => {
            await messagingService.deleteConversation(conversationId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messaging', 'conversations'] });
            router.push('/messages');
        },
    });
}
