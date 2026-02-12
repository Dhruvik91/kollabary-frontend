'use client';

import React from 'react';
import { Message } from '@/types/messaging.types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
    showAvatar?: boolean;
}

export const MessageBubble = ({
    message,
    isOwn,
    showAvatar = true
}: MessageBubbleProps) => {
    const initials = message.sender.profile?.fullName
        ? message.sender.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
        : message.sender.email[0].toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
                "flex w-full mb-2 gap-3 items-end group",
                isOwn ? "flex-row-reverse" : "flex-row"
            )}
        >
            {showAvatar && !isOwn && (
                <Avatar className="h-9 w-9 shrink-0 mb-1 border-2 border-background shadow-md">
                    <AvatarImage src={message.sender.profile?.avatarUrl} />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
                </Avatar>
            )}

            {!showAvatar && !isOwn && <div className="w-9" />}

            <div className={cn(
                "flex flex-col max-w-[80%] md:max-w-[70%] gap-1.5",
                isOwn ? "items-end" : "items-start"
            )}>
                <div className={cn(
                    "relative px-4 py-3 rounded-[1.25rem] text-[14px] leading-relaxed transition-all shadow-sm",
                    isOwn
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-none shadow-primary/10"
                        : "bg-muted/40 text-foreground rounded-bl-none border border-border/20 backdrop-blur-md"
                )}>
                    <p className="whitespace-pre-wrap">{message.message}</p>
                </div>

                <div className="flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        {format(new Date(message.createdAt), 'h:mm a')}
                    </span>
                    {message.updatedAt && message.updatedAt !== message.createdAt && (
                        <span className="text-[10px] text-muted-foreground italic tracking-tight">(edited)</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
