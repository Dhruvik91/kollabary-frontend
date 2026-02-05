import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { Conversation, Message, StartConversationDto, SendMessageDto } from '@/types/messaging';

class MessagingService {
    async getOrCreateConversation(data: StartConversationDto) {
        return httpService.post<Conversation>(API_CONFIG.path.messaging.conversation, data);
    }

    async getMyConversations() {
        return httpService.get<Conversation[]>(API_CONFIG.path.messaging.conversation);
    }

    async getMessages(conversationId: string) {
        return httpService.get<Message[]>(API_CONFIG.path.messaging.messages(conversationId));
    }

    async sendMessage(conversationId: string, data: SendMessageDto) {
        return httpService.post<Message>(API_CONFIG.path.messaging.sendMessage(conversationId), data);
    }

    async updateMessage(messageId: string, data: SendMessageDto) {
        return httpService.post<Message>(API_CONFIG.path.messaging.updateMessage(messageId), data);
    }

    async deleteMessage(messageId: string) {
        return httpService.post<void>(API_CONFIG.path.messaging.deleteMessage(messageId), {});
    }

    async deleteConversation(conversationId: string) {
        return httpService.post<void>(API_CONFIG.path.messaging.deleteConversation(conversationId), {});
    }
}

export const messagingService = new MessagingService();
