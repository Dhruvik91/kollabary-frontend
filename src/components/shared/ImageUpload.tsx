'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Loader2, ImageIcon } from 'lucide-react';
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
}

export const ImageUpload = ({
    value,
    onChange,
    onRemove,
    disabled = false,
    maxSize = 5,
    className
}: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSize) {
            setError(`File size must be less than ${maxSize}MB`);
            return;
        }

        setError(null);
        setIsUploading(true);

        try {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Upload file using service
            const data = await uploadService.uploadFile(file);
            onChange(data.url);
        } catch (err) {
            setError('Failed to upload image. Please try again.');
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
                accept="image/*"
                onChange={handleFileSelect}
                disabled={disabled || isUploading}
                className="hidden"
            />

            {preview ? (
                <div className="relative group">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-border bg-muted">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {!disabled && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemove}
                            disabled={isUploading}
                            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
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
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <ImageIcon size={32} />
                            </div>
                            <div className="space-y-1 text-center">
                                <p className="text-sm font-bold text-foreground">Click to upload image</p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, GIF up to {maxSize}MB
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
