'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile, X, FileText, ImageIcon, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useUploadFile } from '@/hooks/queries/useUploadQueries';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per APIS.md
const ACCEPTED_TYPES = 'image/*,.pdf,.doc,.docx,.txt';

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
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: uploadFile, isPending: isUploading } = useUploadFile();

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error('File too large', {
                description: 'Maximum file size is 5MB.',
            });
            return;
        }

        setPendingFile(file);

        // Upload immediately
        uploadFile(file, {
            onSuccess: (data) => {
                onSendMessage(data.url);
                setPendingFile(null);
            },
            onError: () => {
                setPendingFile(null);
            },
        });

        // Reset input so the same file can be re-selected
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCancelUpload = () => {
        setPendingFile(null);
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) return <ImageIcon size={14} />;
        return <FileText size={14} />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes}B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    };

    // Auto-adjust textarea height
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [message]);

    return (
        <div className="relative">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                className="hidden"
                onChange={handleFileSelect}
            />

            {/* File preview strip */}
            {pendingFile && (
                <div className="mb-2 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card/60 dark:bg-white/[0.06] border border-border/40 dark:border-white/[0.10] text-sm animate-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            {getFileIcon(pendingFile)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold truncate text-foreground">
                                {pendingFile.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                                {formatFileSize(pendingFile.size)}
                                {isUploading && ' · Uploading...'}
                            </p>
                        </div>
                    </div>
                    {isUploading ? (
                        <Loader2 size={16} className="animate-spin text-primary shrink-0" />
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive shrink-0"
                            onClick={handleCancelUpload}
                        >
                            <X size={14} />
                        </Button>
                    )}
                </div>
            )}

            {/* Main input bar */}
            <div className="flex items-end gap-2 glass-card bg-card/80 rounded-2xl p-2 pl-3 border border-border/40 transition-colors focus-within:border-primary/50">
                {/* Attach file button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-10 w-10 text-muted-foreground hover:text-primary rounded-xl shrink-0 transition-colors hover:bg-primary/10",
                        isUploading && "text-primary animate-pulse"
                    )}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || disabled}
                >
                    {isUploading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Paperclip size={18} />
                    )}
                </Button>

                {/* Text input */}
                <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="min-h-[40px] max-h-[120px] resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 py-2.5 px-1 text-sm leading-relaxed scrollbar-hide placeholder:text-muted-foreground/60 font-medium"
                    disabled={disabled}
                />

                {/* Action buttons */}
                <div className="flex items-center gap-1 shrink-0 pb-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-muted-foreground hover:text-amber-500 rounded-xl transition-colors hover:bg-amber-500/10"
                    >
                        <Smile size={18} />
                    </Button>

                    <Button
                        onClick={handleSend}
                        disabled={!message.trim() || isLoading || disabled}
                        className={cn(
                            "h-10 px-4 rounded-xl font-bold transition-all gap-2",
                            message.trim()
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                                : "bg-muted text-muted-foreground opacity-50"
                        )}
                    >
                        {isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <>
                                <span className="hidden sm:inline text-sm">Send</span>
                                <Send size={16} />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
