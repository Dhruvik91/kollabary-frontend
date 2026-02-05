import { Conversation } from '@/types/messaging';
import { ROLES } from '@/constants/constants';
import { formatDistanceToNow } from 'date-fns';
import { User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ConversationListProps {
    conversations: Conversation[];
    currentConversationId?: string;
    onConversationSelect: (id: string) => void;
    currentUserId: string;
}

export function ConversationList({
    conversations,
    currentConversationId,
    onConversationSelect,
    currentUserId
}: ConversationListProps) {
    return (
        <div className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-r">
            <div className="p-4 border-b flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-lg">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        <p>No conversations yet.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border/50">
                        {conversations.map((conv) => {
                            const otherUser = conv.userOne.id === currentUserId ? conv.userTwo : conv.userOne;
                            const isActive = currentConversationId === conv.id;

                            return (
                                <button
                                    key={conv.id}
                                    onClick={() => onConversationSelect(conv.id)}
                                    className={cn(
                                        "w-full text-left p-4 hover:bg-accent/50 transition-colors flex items-center gap-3 relative",
                                        isActive && "bg-accent"
                                    )}
                                >
                                    <Avatar className="h-12 w-12 border-2 border-background">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser.name || otherUser.email}`} />
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-medium truncate text-sm md:text-base">
                                                {otherUser.name || otherUser.email.split('@')[0]}
                                            </h3>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                {formatDistanceToNow(new Date(conv.lastMessageAt || conv.updatedAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate italic">
                                            {otherUser.role === ROLES.INFLUENCER ? 'Influencer' : 'Brand'}
                                        </p>
                                    </div>
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
