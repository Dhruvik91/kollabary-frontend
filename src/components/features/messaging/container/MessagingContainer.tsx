'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/auth-provider';
import { useMyConversations } from '@/hooks/useMessaging';
import { ConversationList } from '../components/ConversationList';
import { ChatContainer } from './ChatContainer';
import { Loader2, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export function MessagingContainer() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: conversations, isLoading } = useMyConversations();

    const currentConversationId = searchParams.get('id');

    const activeConversation = conversations?.find(c => c.id === currentConversationId);

    const handleConversationSelect = (id: string) => {
        router.push(`/messages?id=${id}`);
    };

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container px-4 py-8 mx-auto max-w-7xl h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)]">
            <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden flex h-full shadow-2xl shadow-primary/5">
                {/* Sidebar */}
                <div className={cn(
                    "w-full md:w-80 lg:w-96 shrink-0 transition-all duration-300 md:block",
                    currentConversationId ? "hidden" : "block"
                )}>
                    <ConversationList
                        conversations={conversations || []}
                        currentUserId={user.id}
                        currentConversationId={currentConversationId || undefined}
                        onConversationSelect={handleConversationSelect}
                    />
                </div>

                {/* Chat Area */}
                <div className={cn(
                    "flex-1 flex flex-col transition-all duration-300",
                    !currentConversationId ? "hidden md:flex" : "flex"
                )}>
                    {activeConversation ? (
                        <>
                            {/* Mobile Back Button (only visible on mobile when chat is open) */}
                            <div className="md:hidden p-2 border-b bg-card/50 flex items-center">
                                <Button variant="ghost" size="sm" onClick={() => router.push('/messages')} className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </Button>
                            </div>
                            <ChatContainer
                                conversation={activeConversation}
                                currentUserId={user.id}
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 bg-gradient-to-br from-transparent to-primary/5">
                            <div className="w-24 h-24 mb-8 rounded-full bg-primary/10 flex items-center justify-center relative">
                                <MessageSquare className="h-10 w-10 text-primary opacity-50" />
                                <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Your Inbox</h2>
                            <p className="max-w-xs text-center text-sm md:text-base opacity-70 leading-relaxed">
                                Select a conversation from the sidebar to start messaging.
                                Maintain professional communication with your partners.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
