'use client';

import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Loader2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUploadFile } from '@/hooks/queries/useUploadQueries';

interface ProfileImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export const ProfileImageUpload = ({
    value,
    onChange,
    disabled,
}: ProfileImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
    const { mutate: uploadFile, isPending } = useUploadFile();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation (Max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File is too large. Max size is 5MB.');
            return;
        }

        // Preview local image
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);

        // Upload to server
        uploadFile(file, {
            onSuccess: (data) => {
                onChange(data.url);
                setPreviewUrl(data.url); // Use server URL for final preview
            },
            onError: () => {
                setPreviewUrl(value || null); // Reset preview on error
            },
        });
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreviewUrl(null);
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !disabled && !isPending && fileInputRef.current?.click()}
                    className={cn(
                        "w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden cursor-pointer relative",
                        "bg-zinc-100 dark:bg-zinc-800/50 border-4 border-background shadow-2xl",
                        "flex items-center justify-center transition-all group-hover:ring-4 group-hover:ring-primary/20",
                        disabled || isPending ? "opacity-70 cursor-not-allowed" : ""
                    )}
                >
                    <AnimatePresence mode="wait">
                        {previewUrl ? (
                            <motion.img
                                key="preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src={previewUrl}
                                alt="Profile Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-zinc-300 dark:text-zinc-600 flex flex-col items-center"
                            >
                                <User size={48} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={24} className="text-white" />
                    </div>

                    {/* Loading State */}
                    {isPending && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="text-primary"
                            >
                                <Loader2 size={32} />
                            </motion.div>
                        </div>
                    )}
                </motion.div>

                {/* Remove button */}
                {previewUrl && !disabled && !isPending && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 active:scale-95 transition-all z-30"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            <div className="text-center">
                <p className="text-sm font-bold tracking-tight">Profile Photo</p>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">
                    Up to 5MB • PNG, JPG, WebP
                </p>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                disabled={disabled || isPending}
            />
        </div>
    );
};
