'use client';

import React from 'react';
import { ShieldCheck, Clock, Flag, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitVerification, useMyVerificationRequests } from '@/hooks/queries/useProfileQueries';
import { UserProfile } from '@/services/profile.service';

interface VerificationSectionProps {
    profile: UserProfile;
}

enum VerificationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export const VerificationSection = ({ profile }: VerificationSectionProps) => {
    const { data: requests, isLoading: isLoadingRequests } = useMyVerificationRequests();
    const submitMutation = useSubmitVerification();
    
    const [isOpen, setIsOpen] = React.useState(false);
    const [docUrl, setDocUrl] = React.useState('');
    const [notes, setNotes] = React.useState('');

    const currentRequest = requests?.[0];
    const isVerified = profile.verified;

    const handleSubmit = () => {
        submitMutation.mutate({
            idProof: docUrl,
            notes
        }, {
            onSuccess: () => {
                setIsOpen(false);
                setDocUrl('');
                setNotes('');
            }
        });
    };

    return (
        <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8 md:p-10 border-none shadow-none ring-1 ring-border/50">
            <div className="space-y-8">
                <div className="flex items-center gap-3 text-blue-500">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">Trust & Verification</h3>
                </div>

                <div className="p-6 rounded-[2rem] bg-background/40 border border-border/50">
                    {isVerified ? (
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h4 className="text-emerald-500 font-black text-lg">Verified Account</h4>
                                <p className="text-sm text-muted-foreground font-medium">Your profile is verified. You have access to exclusive features and higher trust.</p>
                            </div>
                        </div>
                    ) : currentRequest?.status === VerificationStatus.PENDING ? (
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                                    <Clock size={28} />
                                </div>
                                <div>
                                    <h4 className="text-amber-600 dark:text-amber-400 font-black text-lg">Verification Pending</h4>
                                    <p className="text-sm text-muted-foreground font-medium">Our team is currently reviewing your application. This usually takes 24-48 hours.</p>
                                </div>
                            </div>
                            <Button variant="outline" disabled className="rounded-xl font-bold border-amber-500/20 text-amber-500">
                                In Review
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2">
                                <h4 className="font-bold text-lg">Identity Verification</h4>
                                <p className="text-sm text-muted-foreground max-w-md">
                                    {currentRequest?.status === VerificationStatus.REJECTED 
                                        ? "Your previous verification was declined. Please provide better proof and try again." 
                                        : "Get verified to unlock the blue badge and build trust within the Kollabary ecosystem."}
                                </p>
                                {currentRequest?.status === VerificationStatus.REJECTED && currentRequest.adminNotes && (
                                    <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-red-500 font-medium">
                                        Feedback: {currentRequest.adminNotes}
                                    </div>
                                )}
                            </div>
                            <Button 
                                onClick={() => setIsOpen(true)}
                                className="w-full md:w-auto px-8 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                            >
                                {currentRequest?.status === VerificationStatus.REJECTED ? "Try Again" : "Request Verification"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <AnimatedModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Verify Your Identity"
                description="To ensure safety and trust, we manually verify accounts. Provide a link to your identity proof or professional profile."
                size="md"
            >
                <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                        <AlertCircle className="text-primary shrink-0" size={20} />
                        <p className="text-xs font-semibold text-muted-foreground leading-relaxed">
                            Influencers: Link to your main social profile. <br />
                            Brands/Users: Provide a link to your Website, LinkedIn, or Government ID (hosted securely on Drive/Dropbox).
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Document/Profile URL</Label>
                            <Input 
                                placeholder="https://..."
                                className="h-14 rounded-2xl border-border/50 bg-background/50 glass-input font-medium"
                                value={docUrl}
                                onChange={(e) => setDocUrl(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Submission Notes (Optional)</Label>
                            <Textarea 
                                placeholder="Tell us more about your business or reach..."
                                className="min-h-[120px] rounded-2xl border-border/50 bg-background/50 glass-input font-medium resize-none"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        <Button 
                            className="h-14 rounded-2xl font-black text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20 transition-all"
                            onClick={handleSubmit}
                            disabled={!docUrl || submitMutation.isPending}
                        >
                            {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                        <Button 
                            variant="ghost" 
                            className="h-12 rounded-2xl font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </AnimatedModal>
        </Card>
    );
};
