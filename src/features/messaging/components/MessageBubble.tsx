'use client';

import React, { useState } from 'react';
import { Message } from '@/types/messaging.types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, MoreVertical, Pencil, Trash2, X, Check } from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
    showAvatar?: boolean;
    onDelete?: (messageId: string) => void;
    onUpdate?: (messageId: string, newMessage: string) => void;
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
    showAvatar = true,
    onDelete,
    onUpdate
}: MessageBubbleProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(message.message);

    const initials = message.sender.profile?.fullName
        ? message.sender.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
        : message.sender.email[0].toUpperCase();

    const messageType = getMessageType(message.message);

    const handleUpdate = () => {
        if (editValue.trim() && editValue !== message.message) {
            onUpdate?.(message.id, editValue);
        }
        setIsEditing(false);
    };

    const renderContent = () => {
        if (isEditing) {
            return (
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white/10 border-white/20 text-white focus-visible:ring-white/20 h-9"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleUpdate();
                            if (e.key === 'Escape') setIsEditing(false);
                        }}
                    />
                    <div className="flex justify-end gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-lg hover:bg-white/10 text-white"
                            onClick={() => setIsEditing(false)}
                        >
                            <X size={14} />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                            onClick={handleUpdate}
                        >
                            <Check size={14} />
                        </Button>
                    </div>
                </div>
            );
        }

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
                "flex flex-col max-w-[85%] sm:max-w-[75%] md:max-w-[70%] gap-1.5 min-w-0",
                isOwn ? "items-end" : "items-start"
            )}>
                <div className={cn(
                    "flex items-center gap-2 group/bubble",
                    isOwn && "flex-row"
                )}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="sm:pointer-events-none">
                            <div className={cn(
                                "relative rounded-[1.25rem] text-[14px] leading-relaxed transition-all shadow-sm break-words min-w-0 cursor-pointer sm:cursor-default pointer-events-auto",
                                messageType === 'image' ? "p-1.5" : "px-4 py-3",
                                isOwn
                                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-none shadow-primary/10"
                                    : "bg-muted/40 text-foreground rounded-bl-none border border-border/20 backdrop-blur-md"
                            )}>
                                {renderContent()}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={isOwn ? "end" : "start"} className="rounded-xl border-border/50 shadow-xl p-1 min-w-[120px]">
                            {messageType === 'text' && (
                                <DropdownMenuItem
                                    className="gap-2 rounded-lg py-2 cursor-pointer"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Pencil size={14} />
                                    <span className="text-xs font-bold">Edit</span>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                className="gap-2 rounded-lg py-2 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                                onClick={() => onDelete?.(message.id)}
                            >
                                <Trash2 size={14} />
                                <span className="text-xs font-bold">Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {isOwn && (
                        <div className={cn(
                            "transition-all duration-200 shrink-0 hidden sm:block",
                            "opacity-0 group-hover/bubble:opacity-100"
                        )}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-muted/20 hover:bg-muted/40 text-muted-foreground transition-all">
                                        <MoreVertical size={14} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl border-border/50 shadow-xl p-1 min-w-[120px]">
                                    {messageType === 'text' && (
                                        <DropdownMenuItem
                                            className="gap-2 rounded-lg py-2 cursor-pointer"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <Pencil size={14} />
                                            <span className="text-xs font-bold">Edit</span>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                        className="gap-2 rounded-lg py-2 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                                        onClick={() => onDelete?.(message.id)}
                                    >
                                        <Trash2 size={14} />
                                        <span className="text-xs font-bold">Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 px-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        {format(new Date(message.createdAt), 'h:mm a')}
                    </span>
                    {message.updatedAt && message.updatedAt !== message.createdAt && (
                        <span className="text-[10px] text-muted-foreground italic tracking-tight opacity-70">(edited)</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
