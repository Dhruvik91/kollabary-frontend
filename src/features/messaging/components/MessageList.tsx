import { Message } from '@/types/messaging';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { User, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface MessageListProps {
    messages: Message[];
    currentUserId: string;
    onEdit: (message: Message) => void;
    onDelete: (messageId: string) => void;
}

export function MessageList({ messages, currentUserId, onEdit, onDelete }: MessageListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
            {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3 opacity-50">
                    <div className="p-4 rounded-full bg-accent/30">
                        <User className="h-8 w-8" />
                    </div>
                    <p>No messages yet. Say hi!</p>
                </div>
            ) : (
                messages.map((msg, index) => {
                    const isMe = msg.sender.id === currentUserId;

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            className={cn(
                                "flex items-end gap-2 max-w-[85%] md:max-w-[70%] group transition-all",
                                isMe ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className={cn("flex flex-col relative", isMe ? "items-end" : "items-start")}>
                                <div className="flex items-center gap-1">
                                    {isMe && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                                                >
                                                    <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="glass border-glass-border">
                                                <DropdownMenuItem onClick={() => onEdit(msg)} className="gap-2 cursor-pointer">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(msg.id)}
                                                    className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                    <div
                                        className={cn(
                                            "px-4 py-2.5 rounded-2xl text-sm md:text-base shadow-sm",
                                            isMe
                                                ? "bg-primary text-primary-foreground rounded-br-none bg-gradient-to-tr from-primary to-primary/90"
                                                : "bg-muted text-foreground rounded-bl-none border border-border/50"
                                        )}
                                    >
                                        {msg.message}
                                    </div>
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-1.5 px-1 flex gap-2">
                                    {format(new Date(msg.createdAt), 'p')}
                                    {msg.createdAt !== msg.updatedAt && (
                                        <span className="italic opacity-70">(edited)</span>
                                    )}
                                </span>
                            </div>
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}
