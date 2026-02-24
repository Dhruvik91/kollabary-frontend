'use client';

import React from 'react';
import { Conversation } from '@/types/messaging.types';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

interface ConversationListProps {
    conversations: Conversation[];
    activeConversationId?: string;
    onSelectConversation: (id: string) => void;
    className?: string;
}

import { motion, AnimatePresence } from 'framer-motion';

export const ConversationList = ({
    conversations,
    activeConversationId,
    onSelectConversation,
    className
}: ConversationListProps) => {
    const { user } = useAuth();

    if (conversations.length === 0) {
        return (
            <div className={cn("flex flex-col items-center justify-center h-full p-8 text-center space-y-6", className)}>
                <div className="w-16 h-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground rotate-3">
                    <span className="text-2xl">🏜️</span>
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-sm">No connections</h3>
                    <p className="text-[11px] text-muted-foreground max-w-[150px] leading-tight">
                        Start a conversation to see messages.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col h-full overflow-y-auto custom-scrollbar px-2 py-4 space-y-0.5", className)}>
            <div className="px-3 py-2 mb-1">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Recent Messages</span>
            </div>

            <AnimatePresence initial={false}>
                {conversations.map((conversation, idx) => {
                    const partner = conversation.userOne.id === user?.id
                        ? conversation.userTwo
                        : conversation.userOne;

                    const isActive = conversation.id === activeConversationId;
                    const initials = partner.profile?.fullName
                        ? partner.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                        : partner.email[0].toUpperCase();

                    return (
                        <motion.button
                            key={conversation.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            onClick={() => onSelectConversation(conversation.id)}
                            className={cn(
                                "flex items-center gap-3 p-2.5 text-left transition-all duration-200 rounded-xl group relative overflow-hidden mx-1 cursor-pointer",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted/50 text-foreground"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-sidebar-pill"
                                    className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div className="relative shrink-0 ml-1">
                                <Avatar className={cn(
                                    "h-10 w-10 border-2 transition-transform duration-200 group-hover:scale-105",
                                    isActive ? "border-primary/20" : "border-background shadow-sm"
                                )}>
                                    <AvatarImage src={partner.profile?.avatarUrl} />
                                    <AvatarFallback className={cn(
                                        "font-bold text-xs",
                                        isActive ? "bg-primary text-primary-foreground" : "bg-primary/5 text-primary"
                                    )}>
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <h4 className={cn(
                                        "font-bold truncate text-[13px] tracking-tight",
                                        isActive ? "text-primary" : "text-foreground"
                                    )}>
                                        {partner.profile?.fullName || partner.email.split('@')[0]}
                                    </h4>
                                    <span className={cn(
                                        "text-[9px] whitespace-nowrap ml-2 font-bold opacity-60",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {formatDistanceToNow(new Date(conversation.lastMessageAt || conversation.createdAt), { addSuffix: false })}
                                    </span>
                                </div>
                                <p className={cn(
                                    "text-[11px] truncate line-clamp-1 font-medium leading-none",
                                    isActive ? "text-primary/70" : "text-muted-foreground/80"
                                )}>
                                    {conversation.lastMessage || 'Sent a message'}
                                </p>
                            </div>
                        </motion.button>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};
