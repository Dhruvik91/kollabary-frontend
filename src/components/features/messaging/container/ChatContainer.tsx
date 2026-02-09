import { useState } from 'react';
import { useMessages, useSendMessage, useUpdateMessage, useDeleteMessage, useDeleteConversation } from '@/hooks/useMessaging';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import { Loader2, Phone, Video, Info, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Conversation, Message } from '@/types/messaging';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface ChatContainerProps {
    conversation: Conversation;
    currentUserId: string;
}

export function ChatContainer({ conversation, currentUserId }: ChatContainerProps) {
    const { data: messages, isLoading } = useMessages(conversation.id);
    const sendMessageMutation = useSendMessage(conversation.id);
    const updateMessageMutation = useUpdateMessage(conversation.id);
    const deleteMessageMutation = useDeleteMessage(conversation.id);
    const deleteConversationMutation = useDeleteConversation();

    const [editingMessage, setEditingMessage] = useState<Message | null>(null);

    const otherUser = conversation.userOne.id === currentUserId ? conversation.userTwo : conversation.userOne;

    const handleSendMessage = async (message: string) => {
        try {
            if (editingMessage) {
                await updateMessageMutation.mutateAsync({
                    messageId: editingMessage.id,
                    data: { message }
                });
                setEditingMessage(null);
                toast.success('Message updated');
            } else {
                await sendMessageMutation.mutateAsync({ message });
            }
        } catch (error) {
            toast.error(editingMessage ? 'Failed to update message' : 'Failed to send message');
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        try {
            await deleteMessageMutation.mutateAsync(messageId);
            toast.success('Message deleted');
        } catch (error) {
            toast.error('Failed to delete message');
        }
    };

    const handleDeleteConversation = async () => {
        if (!window.confirm('Are you sure you want to delete this conversation? This action cannot be undone.')) return;
        try {
            await deleteConversationMutation.mutateAsync(conversation.id);
            toast.success('Conversation deleted');
        } catch (error) {
            toast.error('Failed to delete conversation');
        }
    };

    return (
        <div className="flex flex-col h-full bg-background/30">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-card/50 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser.name || otherUser.email}`} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-sm md:text-base leading-none mb-1">
                            {otherUser.name || otherUser.email.split('@')[0]}
                        </h3>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full hover:bg-primary/5 hover:text-primary">
                        <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full hover:bg-primary/5 hover:text-primary">
                        <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full hover:bg-primary/5 hover:text-primary">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass border-glass-border">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Info className="h-4 w-4" />
                                <span>Profile Info</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDeleteConversation}
                                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete Conversation</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-primary animate-spin opacity-50" />
                    </div>
                ) : (
                    <MessageList
                        messages={messages || []}
                        currentUserId={currentUserId}
                        onEdit={setEditingMessage}
                        onDelete={handleDeleteMessage}
                    />
                )}
            </div>

            {/* Input */}
            <div className="relative">
                {editingMessage && (
                    <div className="absolute top-0 left-0 right-0 -translate-y-full bg-primary/10 backdrop-blur-md px-4 py-2 flex items-center justify-between border-t border-primary/20 animate-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-2 text-primary font-medium text-xs">
                            <Pencil className="h-3 w-3" />
                            Editing message...
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingMessage(null)}
                            className="h-6 text-xs hover:bg-primary/20"
                        >
                            Cancel
                        </Button>
                    </div>
                )}
                <MessageInput
                    onSendMessage={handleSendMessage}
                    isLoading={sendMessageMutation.isPending || updateMessageMutation.isPending}
                    initialValue={editingMessage?.message}
                />
            </div>
        </div>
    );
}
