'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Link as LinkIcon, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProofUploadSectionProps {
    collaborationId: string;
}

export function ProofUploadSection({ collaborationId }: ProofUploadSectionProps) {
    const [proofUrl, setProofUrl] = useState('');
    const [proofDescription, setProofDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!proofUrl.trim()) {
            toast.error('Please provide a proof URL');
            return;
        }

        setIsSubmitting(true);

        try {
            // TODO: Implement proof upload API
            // await collaborationService.submitProof(collaborationId, { url: proofUrl, description: proofDescription });

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success('Proof submitted successfully');
            setProofUrl('');
            setProofDescription('');
        } catch (error) {
            toast.error('Failed to submit proof');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="glass border-glass-border border-primary/20">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <CardTitle>Submit Proof of Work</CardTitle>
                </div>
                <CardDescription>Upload proof of your completed deliverables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Proof URL */}
                <div className="space-y-2">
                    <Label htmlFor="proof-url">
                        Proof URL <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="proof-url"
                            type="url"
                            placeholder="https://example.com/your-work"
                            value={proofUrl}
                            onChange={(e) => setProofUrl(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Link to your Instagram post, YouTube video, or other deliverable
                    </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="proof-description">Description (Optional)</Label>
                    <Textarea
                        id="proof-description"
                        placeholder="Add any notes or context about your deliverable..."
                        value={proofDescription}
                        onChange={(e) => setProofDescription(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !proofUrl.trim()}
                    className="w-full gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="h-4 w-4" />
                            Submit Proof
                        </>
                    )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                    Once submitted, the brand will review your work
                </p>
            </CardContent>
        </Card>
    );
}
