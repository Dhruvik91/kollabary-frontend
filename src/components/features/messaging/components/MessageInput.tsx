import { useState, KeyboardEvent, useEffect } from 'react';
import { Send, Plus, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
    initialValue?: string;
}

export function MessageInput({ onSendMessage, isLoading, initialValue }: MessageInputProps) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (initialValue) {
            setMessage(initialValue);
        }
    }, [initialValue]);

    const handleSend = () => {
        if (message.trim() && !isLoading) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="p-4 border-t bg-card/30 backdrop-blur-md">
            <div className="flex items-center gap-2 max-w-5xl mx-auto">
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
                    <Plus className="h-5 w-5" />
                </Button>
                <div className="relative flex-1">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-1 rounded-full px-6 py-6 bg-background/50 border-border/50 focus-visible:ring-primary/20 pr-12"
                        disabled={isLoading}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    >
                        <Smile className="h-5 w-5" />
                    </Button>
                </div>
                <Button
                    onClick={handleSend}
                    disabled={!message.trim() || isLoading}
                    size="icon"
                    className="rounded-full h-12 w-12 shrink-0 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
