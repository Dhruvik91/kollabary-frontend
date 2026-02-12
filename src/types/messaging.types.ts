import { User } from './auth.types';

export interface Conversation {
    id: string;
    createdAt: string;
    updatedAt: string;
    lastMessageAt: string;
    userOne: User;
    userTwo: User;
    lastMessage?: string;
}

export interface Message {
    id: string;
    createdAt: string;
    updatedAt?: string;
    message: string;
    sender: User;
    conversation: Conversation;
}

export interface StartConversationDto {
    recipientId: string;
}

export interface SendMessageDto {
    message: string;
}
