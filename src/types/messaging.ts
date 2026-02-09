import { User } from '@/constants/interface';

export interface Conversation {
    id: string;
    userOne: User;
    userTwo: User;
    lastMessageAt: Date | null;
    messages?: Message[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    id: string;
    conversation?: Conversation;
    sender: User;
    message: string;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface SendMessageDto {
    message: string;
}

export interface StartConversationDto {
    recipientId: string;
}

// Helper type for conversation with computed fields
export interface ConversationWithUser extends Conversation {
    otherUser: User;
    unreadCount: number;
    lastMessage?: Message;
}
