'use client';

import { useState, useEffect } from 'react';
import { useConversations, useMessageHistory, useSendMessage, useDeleteConversation } from '@/hooks/use-messaging.hooks';
import { ConversationList } from '../components/ConversationList';
import { ChatWindow } from '../components/ChatWindow';
import { MessageInput } from '../components/MessageInput';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';

export const MessagingCenter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryId = searchParams.get('id');
    const { user: currentUser } = useAuth();
    const { data: conversations = [], isLoading: isLoadingConversations } = useConversations();
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

    // Sync active conversation with query param
    useEffect(() => {
        if (queryId && conversations.length > 0) {
            const conversation = conversations.find(c => c.id === queryId);
            if (conversation) {
                setActiveConversationId(queryId);
            }
        }
    }, [queryId, conversations]);

    const {
        data: messages = [],
        isLoading: isLoadingMessages
    } = useMessageHistory(activeConversationId || '');

    const { mutate: sendMessage, isPending: isSending } = useSendMessage(activeConversationId || '');
    const { mutate: deleteConversation } = useDeleteConversation();

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const handleSendMessage = (message: string) => {
        if (activeConversationId) {
            sendMessage(message);
        }
    };

    const handleDeleteConversation = () => {
        if (activeConversationId) {
            deleteConversation(activeConversationId, {
                onSuccess: () => setActiveConversationId(null)
            });
        }
    };

    const handleViewProfile = () => {
        if (activeConversation) {
            const partner = activeConversation.userOne.id === currentUser?.id
                ? activeConversation.userTwo
                : activeConversation.userOne;

            if (partner.role === UserRole.INFLUENCER) {
                const influencerId = partner.influencerProfile?.id || partner.id;
                router.push(`/influencers/${influencerId}`);
            }
            // For brands (UserRole.USER), add redirection when specific brand profile route is ready
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div className="flex bg-background h-full overflow-hidden">
            {/* Conversations Sidebar (Left) */}
            <div className={cn(
                "w-full lg:w-[320px] xl:w-[380px] border-r border-border/50 flex flex-col bg-muted/10 shrink-0 min-h-0",
                activeConversationId ? "hidden lg:flex" : "flex"
            )}>
                {/* Conversation Scroller */}
                <div className="flex-1 overflow-hidden min-h-0 flex flex-col">
                    {isLoadingConversations ? (
                        <div className="space-y-4 p-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-24 bg-muted animate-pulse" />
                                        <div className="h-3 w-32 bg-muted animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ConversationList
                            conversations={conversations}
                            activeConversationId={activeConversationId || undefined}
                            onSelectConversation={setActiveConversationId}
                        />
                    )}
                </div>
            </div>

            {/* Main Chat Area (Right) */}
            <div className={cn(
                "flex-1 flex flex-col relative min-h-0",
                !activeConversationId ? "hidden lg:flex" : "flex"
            )}>
                <AnimatePresence mode="wait">
                    {activeConversation ? (
                        <motion.div
                            key={activeConversation.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex-1 flex flex-col h-full bg-background min-h-0"
                        >
                            <ChatWindow
                                conversation={activeConversation}
                                messages={messages}
                                isLoading={isLoadingMessages}
                                onDeleteConversation={handleDeleteConversation}
                                onViewProfile={handleViewProfile}
                                onBack={() => setActiveConversationId(null)}
                            >
                                <MessageInput
                                    onSendMessage={handleSendMessage}
                                    isLoading={isSending}
                                />
                            </ChatWindow>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8 animate-in fade-in zoom-in-95 duration-700 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from),transparent_70%)] from-primary/5">
                            <div className="relative">
                                <div className="absolute -inset-12 bg-primary/10 rounded-[5rem] blur-3xl animate-pulse" />
                                <div className="relative w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary shadow-2xl rotate-6 group hover:rotate-0 transition-all duration-500 border border-primary/10">
                                    <Plus size={40} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="space-y-4 max-w-md">
                                <h3 className="text-4xl font-black tracking-tight text-foreground">
                                    Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Conversation</span>
                                </h3>
                                <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                                    Select a person from the sidebar or start a new chat to begin coordinating your next big collaboration. 👋
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Secure Messaging</span>
                                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
