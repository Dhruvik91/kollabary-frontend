'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Loader2, ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { uploadService } from '@/services/upload.service';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    disabled?: boolean;
    maxSize?: number; // in MB
    className?: string;
    message?: string;
}

export const ImageUpload = ({
    value,
    onChange,
    onRemove,
    disabled = false,
    maxSize = 100,
    className,
    message = `Images or Videos up to ${maxSize}MB`
}: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(value || null);
    const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Detect file type from initial value
    React.useEffect(() => {
        if (value) {
            const isVideo = value.match(/\.(mp4|mov|avi|mkv|webm)$|video/i);
            setFileType(isVideo ? 'video' : 'image');
        }
    }, [value]);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) {
            setError('Please select an image or video file');
            return;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSize) {
            setError(`File size must be less than ${maxSize}MB`);
            return;
        }

        setError(null);
        setFileType(isImage ? 'image' : 'video');
        setIsUploading(true);

        try {
            if (isImage) {
                // Create preview for images
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                // For videos, we can't easily show a preview without a URL
                // We'll show a video icon/placeholder until upload is done
                setPreview('video-placeholder');
            }

            // Upload file using service
            const data = await uploadService.uploadFile(file);
            onChange(data.url);
            if (isVideo) {
                setPreview(data.url); // Use the actual video URL for preview
            }
        } catch (err) {
            setError('Failed to upload file. Please try again.');
            setPreview(null);
            console.error('Upload error:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onRemove) {
            onRemove();
        }
        onChange('');
    };

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={cn('space-y-4', className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                disabled={disabled || isUploading}
                className="hidden"
            />

            {preview ? (
                <div className="relative group">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-border bg-muted">
                        {preview === 'video-placeholder' ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-primary/5">
                                <Video size={48} className="text-primary animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Processing Video...</p>
                            </div>
                        ) : fileType === 'video' || preview.match(/\.(mp4|mov|avi|mkv|webm)$|video/i) ? (
                            <video
                                src={preview}
                                className="w-full h-full object-cover"
                                controls={false}
                                muted
                                playsInline
                            />
                        ) : (
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                        )}
                        {fileType === 'video' && preview !== 'video-placeholder' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                    <Video size={24} />
                                </div>
                            </div>
                        )}
                    </div>
                    {!disabled && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemove}
                            disabled={isUploading}
                            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                        >
                            <X size={16} />
                        </Button>
                    )}
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={disabled || isUploading}
                    className={cn(
                        'w-full h-48 rounded-2xl border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-3 group',
                        disabled && 'opacity-50 cursor-not-allowed',
                        isUploading && 'cursor-wait'
                    )}
                >
                    {isUploading ? (
                        <>
                            <Loader2 size={32} className="text-primary animate-spin" />
                            <p className="text-sm font-medium text-muted-foreground">Uploading...</p>
                        </>
                    ) : (
                        <>
                            <div className="space-y-1 text-center">
                                <p className="text-sm font-bold text-foreground">Click to Upload</p>
                                <p className="text-xs text-muted-foreground">
                                    {message}
                                </p>
                            </div>
                        </>
                    )}
                </button>
            )}

            {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                    <X size={16} className="text-destructive shrink-0" />
                    <p className="text-xs font-medium text-destructive">{error}</p>
                </div>
            )}
        </div>
    );
};
