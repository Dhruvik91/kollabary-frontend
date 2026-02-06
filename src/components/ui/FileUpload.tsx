'use client';

import { useCallback, useState } from 'react';
import { useFileUpload } from '@/hooks/useUpload';
import { Upload, X, FileIcon, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
    onUploadComplete?: (url: string) => void;
    accept?: string;
    maxSize?: number; // in MB
    className?: string;
}

export function FileUpload({
    onUploadComplete,
    accept = 'image/*,.pdf,.doc,.docx',
    maxSize = 5,
    className,
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const uploadMutation = useFileUpload();

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    }, []);

    const handleFile = (selectedFile: File) => {
        // Validate file size
        if (selectedFile.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB`);
            return;
        }

        setFile(selectedFile);

        // Create preview for images
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        uploadMutation.mutate(file, {
            onSuccess: (data) => {
                onUploadComplete?.(data.url);
            },
        });
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <div className={cn('space-y-4', className)}>
            <div
                className={cn(
                    'relative border-2 border-dashed rounded-2xl p-8 transition-all',
                    dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-glass-border hover:border-primary/50',
                    file && 'border-solid border-primary/30 bg-primary/5'
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept={accept}
                    onChange={handleChange}
                    disabled={uploadMutation.isPending}
                />

                {!file ? (
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-lg font-semibold mb-1">
                            Drop your file here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Maximum file size: {maxSize}MB
                        </p>
                    </label>
                ) : (
                    <div className="space-y-4">
                        {preview ? (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/20">
                                <FileIcon className="w-8 h-8 text-primary" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button
                                onClick={handleUpload}
                                disabled={uploadMutation.isPending}
                                className="flex-1"
                            >
                                {uploadMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : uploadMutation.isSuccess ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Uploaded
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload File
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleRemove}
                                disabled={uploadMutation.isPending}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
