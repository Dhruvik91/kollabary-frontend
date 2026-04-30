'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    User, 
    Clock,
    Search,
    ChevronRight,
    ArrowLeft,
    MoreVertical,
    Send,
    Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminQueries } from '@/hooks/queries/useAdminQueries';
import { format } from 'date-fns';
import { Conversation, Message } from '@/types/messaging.types';

import { PageHeader } from '@/components/shared/PageHeader';

export const AdminConversationsContainer = () => {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const { useConversations, useConversationMessages } = useAdminQueries();
    
    const { data: conversations = [], isLoading: isLoadingConversations } = useConversations();
    const { data: messages = [], isLoading: isLoadingMessages } = useConversationMessages(selectedConversationId || '');

    const handleSelectConversation = (id: string) => {
        setSelectedConversationId(id);
    };

    const handleBack = () => {
        setSelectedConversationId(null);
    };

    return (
        <div className="space-y-8 pb-10">
            <PageHeader
                label="Communication Audit"
                title="System"
                highlightedTitle="Messages"
                subtitle="Audit platform communication and moderate conversations."
                icon={MessageSquare}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
                {/* Conversations List */}
                <Card className={`lg:col-span-4 rounded-[2rem] border-border/50 bg-card/40 backdrop-blur-xl border-2 shadow-2xl shadow-black/5 overflow-hidden flex flex-col ${selectedConversationId ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-5 border-b border-border/30 bg-muted/20">
                        <div className="relative group">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search conversations..."
                                className="pl-10 h-11 rounded-xl border-border/50 bg-background/50 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {isLoadingConversations ? (
                            Array(6).fill(0).map((_, i) => (
                                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                            ))
                        ) : conversations.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-4">
                                <MessageSquare size={40} className="text-muted-foreground" />
                                <p className="text-xs font-black uppercase tracking-widest px-8">No conversations found in the system</p>
                            </div>
                        ) : (
                            conversations.map((conv: Conversation) => (
                                <motion.div
                                    key={conv.id}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectConversation(conv.id)}
                                    className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                                        selectedConversationId === conv.id 
                                        ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/5' 
                                        : 'bg-muted/10 border-transparent hover:bg-muted/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-border/50">
                                                <User className="text-primary/60" size={18} />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-lg bg-background flex items-center justify-center ring-1 ring-border/30">
                                                <User className="text-muted-foreground" size={10} />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className="font-black text-xs uppercase tracking-tight text-foreground truncate">
                                                    {conv.userOne?.profile?.fullName || 'User'} & {conv.userTwo?.profile?.fullName || 'User'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <Clock size={12} className="text-muted-foreground/60" />
                                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                                                    {conv.lastMessageAt ? format(new Date(conv.lastMessageAt), 'MMM dd, HH:mm') : 'No messages'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Messages View */}
                <Card className={`lg:col-span-8 rounded-[2rem] border-border/50 bg-card/40 backdrop-blur-xl border-2 shadow-2xl shadow-black/5 overflow-hidden flex flex-col ${!selectedConversationId ? 'hidden lg:flex' : 'flex'}`}>
                    {!selectedConversationId ? (
                        <div className="flex flex-col items-center justify-center h-full text-center opacity-30 space-y-6">
                            <div className="h-24 w-24 rounded-full border-4 border-dashed border-muted-foreground flex items-center justify-center rotate-12">
                                <MessageSquare size={48} className="text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-lg font-black uppercase tracking-[0.2em] text-foreground mb-1">Select a Conversation</p>
                                <p className="text-sm font-bold text-muted-foreground italic">Select any chat from the left to audit private messages</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="p-5 border-b border-border/30 bg-muted/20 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="icon" onClick={handleBack} className="lg:hidden h-10 w-10 rounded-xl hover:bg-muted">
                                        <ArrowLeft size={18} />
                                    </Button>
                                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center ring-2 ring-primary/5">
                                        <MessageSquare className="text-primary" size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-sm uppercase tracking-tight">Audit Session</span>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">ID: {selectedConversationId}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="rounded-xl border-primary/20 text-primary px-3 py-1 bg-primary/5 font-black uppercase tracking-widest text-[9px]">Read Only Audit</Badge>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                                        <MoreVertical size={18} />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col custom-scrollbar bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.02)_100%)]">
                                {isLoadingMessages ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center opacity-30 mt-20">
                                        <p className="text-sm font-black uppercase tracking-widest">No messages in this chat yet</p>
                                    </div>
                                ) : (
                                    messages.map((msg: Message) => (
                                        <div 
                                            key={msg.id} 
                                            className={`flex flex-col ${msg.sender?.id === 'SYSTEM' ? 'items-center' : 'items-start'}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1.5 px-2">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">{msg.sender?.profile?.fullName || 'User'}</span>
                                                <span className="text-[9px] font-bold text-muted-foreground opacity-40">{format(new Date(msg.createdAt), 'HH:mm')}</span>
                                            </div>
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium ${
                                                msg.sender?.id === 'SYSTEM' 
                                                ? 'bg-muted/30 text-muted-foreground border border-border/30 italic text-center' 
                                                : 'bg-muted/10 border border-border/10 text-foreground'
                                            }`}>
                                                {msg.message}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};
