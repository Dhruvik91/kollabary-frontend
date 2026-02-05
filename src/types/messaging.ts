import { ROLES } from "@/constants/constants";

export interface MessageUser {
    id: string;
    email: string;
    role: ROLES;
    name?: string;
}

export interface Conversation {
    id: string;
    userOne: MessageUser;
    userTwo: MessageUser;
    lastMessageAt: string;
    createdAt: string;
    updatedAt: string;
    lastMessage?: string; // Optional helper field
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    sender: MessageUser;
    message: string;
    readAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface StartConversationDto {
    targetUserId: string;
}

export interface SendMessageDto {
    message: string;
}
