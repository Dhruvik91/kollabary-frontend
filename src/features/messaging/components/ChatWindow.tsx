'use client';

import React, { useEffect, useRef } from 'react';
import { Conversation, Message } from '@/types/messaging.types';
import { MessageBubble } from './MessageBubble';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, MoreVertical, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
    conversation: Conversation;
    messages: Message[];
    isLoading: boolean;
    onDeleteConversation?: () => void;
    onViewProfile?: () => void;
    onBack?: () => void;
    children: React.ReactNode; // For Input
}

export const ChatWindow = ({
    conversation,
    messages,
    isLoading,
    onDeleteConversation,
    onViewProfile,
    onBack,
    children
}: ChatWindowProps) => {
    const { user } = useAuth();
    const scrollRef = useRef<HTMLDivElement>(null);

    const partner = conversation.userOne.id === user?.id
        ? conversation.userTwo
        : conversation.userOne;

    const partnerInitials = partner.profile?.fullName
        ? partner.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
        : partner.email[0].toUpperCase();

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="flex flex-col h-full bg-background relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/30 glass-card bg-card/60 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onBack}
                            className="lg:hidden rounded-xl hover:bg-muted/50"
                        >
                            <ArrowLeft size={20} />
                        </Button>
                    )}
                    <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarImage src={partner.profile?.avatarUrl} />
                            <AvatarFallback className="bg-primary/5 text-primary font-bold text-xs">{partnerInitials}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[14px] leading-tight mb-0.5 tracking-tight">
                            {partner.profile?.fullName || partner.email.split('@')[0]}
                        </h3>
                        <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest">
                            Online
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground/60 rounded-xl hover:text-foreground transition-colors h-9 w-9">
                                <MoreVertical size={18} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-border/50 shadow-2xl min-w-[200px] p-2">
                            <DropdownMenuItem className="gap-3 rounded-xl p-3 text-destructive focus:text-destructive focus:bg-destructive/10" onClick={onDeleteConversation}>
                                <Trash2 size={16} />
                                <span className="font-bold">Delete Conversation</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 rounded-xl p-3" onClick={onViewProfile}>
                                <Settings size={16} />
                                <span className="font-bold">View Profile</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Messages Area - Edge to Edge */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 scroll-smooth relative bg-muted/5 min-h-0"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.03),transparent_40%)] pointer-events-none" />

                <div className="max-w-4xl mx-auto w-full flex flex-col gap-1">
                    {isLoading ? (
                        <div className="space-y-8 pt-4">
                            <ChatSkeleton isOwn={false} />
                            <ChatSkeleton isOwn={true} />
                            <ChatSkeleton isOwn={false} />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-20 animate-in fade-in zoom-in-95 duration-700">
                            <div className="w-20 h-20 rounded-[2rem] bg-primary/5 flex items-center justify-center border border-primary/10 rotate-6">
                                <span className="text-3xl">✨</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-xl tracking-tight">No messages yet</h3>
                                <p className="text-muted-foreground text-sm max-w-[240px] mx-auto leading-relaxed">
                                    Send a message to start the conversation with {partner.profile?.firstName || 'this partner'}.
                                </p>
                            </div>
                        </div>
                    ) : (
                        messages.map((msg, idx) => {
                            const prevMsg = messages[idx - 1];
                            const showAvatar = !prevMsg || prevMsg.sender.id !== msg.sender.id;
                            return (
                                <MessageBubble
                                    key={msg.id}
                                    message={msg}
                                    isOwn={msg.sender.id === user?.id}
                                    showAvatar={showAvatar}
                                />
                            );
                        })
                    )}
                </div>
            </div>

            {/* Input Wrapper - Pinned to bottom */}
            <div className="px-4 sm:px-6 py-3 pb-4 bg-background/80 backdrop-blur-xl border-t border-border/30 shrink-0">
                <div className="max-w-4xl mx-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ChatSkeleton = ({ isOwn }: { isOwn: boolean }) => (
    <div className={cn("flex gap-4 items-end", isOwn ? "flex-row-reverse" : "flex-row")}>
        {!isOwn && <Skeleton className="h-9 w-9 rounded-full shrink-0" />}
        <div className={cn("space-y-2 w-full", isOwn ? "items-end flex flex-col" : "items-start")}>
            <Skeleton className={cn(
                "h-12 w-[60%] md:w-[40%] rounded-2xl",
                isOwn ? "rounded-br-none bg-primary/20" : "rounded-bl-none bg-muted/40"
            )} />
            <Skeleton className="h-3 w-16 opacity-50" />
        </div>
    </div>
);
