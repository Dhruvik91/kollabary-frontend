import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants';
import {
    Conversation,
    Message,
    StartConversationDto,
    SendMessageDto
} from '@/types/messaging.types';

export const messagingService = {
    /**
     * Get or create a conversation with another user
     */
    getOrCreateConversation: async (recipientId: string) => {
        const response = await httpService.post<Conversation>(
            API_CONFIG.path.messaging.conversation,
            { recipientId }
        );
        return response.data;
    },

    /**
     * List all conversations for the current user
     */
    getConversations: async () => {
        const response = await httpService.get<Conversation[]>(
            API_CONFIG.path.messaging.conversation
        );
        return response.data;
    },

    /**
     * Send a message in a conversation
     */
    sendMessage: async (conversationId: string, message: string) => {
        const response = await httpService.post<Message>(
            API_CONFIG.path.messaging.sendMessage(conversationId),
            { message }
        );
        return response.data;
    },

    /**
     * Fetch message history for a conversation
     */
    getMessageHistory: async (conversationId: string) => {
        const response = await httpService.get<Message[]>(
            API_CONFIG.path.messaging.messages(conversationId)
        );
        return response.data;
    },

    /**
     * Update an existing message
     */
    updateMessage: async (messageId: string, message: string) => {
        const response = await httpService.post<Message>(
            API_CONFIG.path.messaging.message(messageId),
            { message }
        );
        return response.data;
    },

    /**
     * Delete a message
     */
    deleteMessage: async (messageId: string) => {
        const response = await httpService.post<void>(
            API_CONFIG.path.messaging.deleteMessage(messageId)
        );
        return response.data;
    },

    /**
     * Delete an entire conversation
     */
    deleteConversation: async (conversationId: string) => {
        const response = await httpService.post<void>(
            API_CONFIG.path.messaging.deleteConversation(conversationId)
        );
        return response.data;
    }
};
