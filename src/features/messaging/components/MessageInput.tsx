'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    disabled?: boolean;
}

export const MessageInput = ({
    onSendMessage,
    isLoading,
    disabled
}: MessageInputProps) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (message.trim() && !isLoading && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-adjust height
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [message]);

    return (
        <div className="relative group transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />

            <div className="relative flex items-end gap-3 bg-muted/20 backdrop-blur-xl rounded-[1.75rem] p-2 pl-4 border border-border/20 transition-all focus-within:border-primary/40 focus-within:bg-muted/40 shadow-sm focus-within:shadow-xl focus-within:shadow-primary/5">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 text-muted-foreground hover:text-primary rounded-2xl shrink-0 transition-all hover:bg-primary/5"
                >
                    <Paperclip size={20} className="transition-transform group-hover:rotate-12" />
                </Button>

                <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="min-h-[44px] max-h-[120px] resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-0 text-[14px] leading-relaxed scrollbar-hide placeholder:text-muted-foreground/50 font-medium"
                    disabled={disabled}
                />

                <div className="flex items-center gap-1.5 shrink-0 pl-1 pr-1 pb-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 text-muted-foreground hover:text-amber-500 rounded-2xl transition-all hover:bg-amber-50/50 dark:hover:bg-amber-500/10"
                    >
                        <Smile size={20} />
                    </Button>

                    <Button
                        onClick={handleSend}
                        disabled={!message.trim() || isLoading || disabled}
                        className={cn(
                            "h-11 px-5 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 gap-2",
                            message.trim() ? "bg-primary text-primary-foreground translate-y-0" : "bg-muted text-muted-foreground translate-y-0 opacity-50"
                        )}
                    >
                        {isLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <>
                                <span className="hidden sm:inline">Send</span>
                                <Send size={18} className={cn(message.trim() && "animate-in fade-in slide-in-from-left-2")} />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
