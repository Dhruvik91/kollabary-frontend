'use client';

import { useState } from 'react';
import { useCreateVerificationRequest } from '@/hooks/useVerification';
import { FileUpload } from '@/components/ui/FileUpload';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ShieldCheck } from 'lucide-react';

interface VerificationRequestDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const documentTypes = [
    { value: 'government_id', label: 'Government ID' },
    { value: 'business_license', label: 'Business License' },
    { value: 'social_media_proof', label: 'Social Media Verification' },
    { value: 'other', label: 'Other' },
];

export function VerificationRequestDialog({
    isOpen,
    onClose,
}: VerificationRequestDialogProps) {
    const [documentType, setDocumentType] = useState('');
    const [documentUrl, setDocumentUrl] = useState('');
    const createRequestMutation = useCreateVerificationRequest();

    const handleSubmit = () => {
        if (!documentType || !documentUrl) return;

        createRequestMutation.mutate(
            { documentType, documentUrl },
            {
                onSuccess: () => {
                    onClose();
                    setDocumentType('');
                    setDocumentUrl('');
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass border-glass-border max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">Request Verification</DialogTitle>
                            <DialogDescription>
                                Get your blue checkmark and stand out as a verified influencer
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label>Document Type</Label>
                        <Select value={documentType} onValueChange={setDocumentType}>
                            <SelectTrigger className="glass border-glass-border">
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent className="glass border-glass-border">
                                {documentTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Upload Document</Label>
                        <FileUpload
                            onUploadComplete={(url) => setDocumentUrl(url)}
                            accept="image/*,.pdf"
                            maxSize={5}
                        />
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            <strong>Note:</strong> Your verification request will be reviewed by our
                            team within 2-3 business days. Make sure your document is clear and
                            readable.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!documentType || !documentUrl || createRequestMutation.isPending}
                    >
                        {createRequestMutation.isPending ? 'Submitting...' : 'Submit Request'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
