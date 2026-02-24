'use client';

import React from 'react';
import { Message } from '@/types/messaging.types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
    showAvatar?: boolean;
}

const S3_PATTERN = /^https?:\/\/.*\.s3[.\-].*\.amazonaws\.com\/.+/i;
const IMAGE_EXTENSIONS = /\.(png|jpg|jpeg|gif|webp|avif|svg)(\?.*)?$/i;
const DOC_EXTENSIONS = /\.(pdf|doc|docx|txt|csv|xls|xlsx)(\?.*)?$/i;

/**
 * Detect if a message is an S3 file URL and determine its type.
 */
function getMessageType(text: string): 'image' | 'document' | 'text' {
    const trimmed = text.trim();
    if (!S3_PATTERN.test(trimmed)) return 'text';
    if (IMAGE_EXTENSIONS.test(trimmed)) return 'image';
    if (DOC_EXTENSIONS.test(trimmed)) return 'document';
    // Default S3 links without known extension — assume image (most common upload)
    return 'image';
}

/**
 * Extract a readable filename from an S3 URL.
 */
function getFilenameFromUrl(url: string): string {
    try {
        const pathname = new URL(url).pathname;
        const rawName = decodeURIComponent(pathname.split('/').pop() || 'file');
        // Strip leading UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx pattern)
        const withoutUuid = rawName.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[._-]?/i, '');
        return withoutUuid || rawName;
    } catch {
        return 'Attachment';
    }
}

export const MessageBubble = ({
    message,
    isOwn,
    showAvatar = true
}: MessageBubbleProps) => {
    const initials = message.sender.profile?.fullName
        ? message.sender.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
        : message.sender.email[0].toUpperCase();

    const messageType = getMessageType(message.message);

    const renderContent = () => {
        const url = message.message.trim();

        if (messageType === 'image') {
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="block max-w-[220px] sm:max-w-[300px]">
                    <div className="relative rounded-xl overflow-hidden group/img">
                        <Image
                            src={url}
                            alt="Shared image"
                            width={340}
                            height={240}
                            className="object-cover rounded-xl w-full h-auto max-h-[300px] transition-transform duration-300 group-hover/img:scale-[1.02]"
                            unoptimized
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                            <ExternalLink
                                size={24}
                                className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                            />
                        </div>
                    </div>
                </a>
            );
        }

        if (messageType === 'document') {
            const filename = getFilenameFromUrl(url);
            const ext = filename.split('.').pop()?.toUpperCase() || 'FILE';
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "max-w-[220px] sm:max-w-[280px]",
                        "flex items-center gap-3 p-3 rounded-xl transition-colors",
                        isOwn
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-muted/30 hover:bg-muted/50 border border-border/20"
                    )}
                >
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        isOwn ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                    )}>
                        <FileText size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">{filename}</p>
                        <p className={cn(
                            "text-[10px] font-medium uppercase tracking-wider",
                            isOwn ? "text-white/60" : "text-muted-foreground"
                        )}>
                            {ext} Document
                        </p>
                    </div>
                    <Download size={16} className={cn(
                        "shrink-0",
                        isOwn ? "text-white/50" : "text-muted-foreground/50"
                    )} />
                </a>
            );
        }

        // Plain text
        return <p className="whitespace-pre-wrap">{message.message}</p>;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
                "flex w-full mb-2 gap-2 sm:gap-3 items-end group",
                isOwn ? "flex-row-reverse" : "flex-row"
            )}
        >
            {showAvatar && !isOwn && (
                <Avatar className="h-9 w-9 shrink-0 mb-1 border-2 border-background shadow-md">
                    <AvatarImage src={message.sender.profile?.avatarUrl} />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
                </Avatar>
            )}

            {!showAvatar && !isOwn && <div className="w-9" />}

            <div className={cn(
                "flex flex-col max-w-[75%] md:max-w-[70%] gap-1.5",
                isOwn ? "items-end" : "items-start"
            )}>
                <div className={cn(
                    "relative rounded-[1.25rem] text-[14px] leading-relaxed transition-all shadow-sm",
                    messageType === 'image' ? "p-1.5" : "px-4 py-3",
                    isOwn
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-none shadow-primary/10"
                        : "bg-muted/40 text-foreground rounded-bl-none border border-border/20 backdrop-blur-md"
                )}>
                    {renderContent()}
                </div>

                <div className="flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        {format(new Date(message.createdAt), 'h:mm a')}
                    </span>
                    {message.updatedAt && message.updatedAt !== message.createdAt && (
                        <span className="text-[10px] text-muted-foreground italic tracking-tight">(edited)</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
