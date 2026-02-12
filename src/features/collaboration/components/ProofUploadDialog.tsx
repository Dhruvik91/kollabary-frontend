'use client';

import React, { useState } from 'react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Link as LinkIcon, Upload, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProofUploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (urls: string[]) => void;
    isUpdating: boolean;
    existingUrls?: string[];
}

export const ProofUploadDialog = ({
    isOpen,
    onClose,
    onUpload,
    isUpdating,
    existingUrls = []
}: ProofUploadDialogProps) => {
    const [urls, setUrls] = useState<string[]>((existingUrls && existingUrls.length > 0) ? existingUrls : ['']);

    const addField = () => setUrls([...urls, '']);

    const removeField = (index: number) => {
        const newUrls = [...urls];
        newUrls.splice(index, 1);
        setUrls(newUrls.length > 0 ? newUrls : ['']);
    };

    const updateUrl = (index: number, value: string) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validUrls = urls.filter(url => url.trim() !== '');
        if (validUrls.length === 0) {
            toast.error('Please provide at least one proof URL');
            return;
        }
        onUpload(validUrls);
    };

    return (
        <AnimatedModal
            isOpen={isOpen}
            onClose={onClose}
            title="Submit Proof of Completion"
            description="Provide links to the published content or deliverables as proof of successful collaboration."
            size="md"
        >
            <form onSubmit={handleSubmit} className="space-y-6 pt-4 pb-2">
                <div className="space-y-4">
                    {urls.map((url, index) => (
                        <div key={index} className="flex gap-2">
                            <div className="relative flex-1">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <Input
                                    value={url}
                                    onChange={(e) => updateUrl(index, e.target.value)}
                                    placeholder="https://instagram.com/reel/..."
                                    className="pl-10 h-12 rounded-xl focus-visible:ring-primary"
                                />
                            </div>
                            {urls.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeField(index)}
                                    className="h-12 w-12 rounded-xl text-destructive hover:bg-destructive/10"
                                >
                                    <X size={18} />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={addField}
                    className="w-full h-10 border-dashed border-2 border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all gap-2"
                >
                    <Plus size={16} />
                    Add Another Link
                </Button>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-14 rounded-2xl font-bold"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isUpdating}
                        className="flex-1 h-14 rounded-2xl font-bold bg-primary shadow-xl shadow-primary/20 gap-2"
                    >
                        {isUpdating ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <Upload size={20} />
                                Submit Proof
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </AnimatedModal>
    );
};
