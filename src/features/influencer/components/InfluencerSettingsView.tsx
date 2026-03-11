'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Settings,
    Radio,
    Lock,
    Calendar,
    ShieldCheck,
    Clock,
    Flag,
    Plus,
    X,
    ArrowLeft,
} from 'lucide-react';
import { useSubmitVerification } from '@/hooks/queries/useVerificationQueries';
import { VerificationStatus } from '@/types/admin.types';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InfluencerProfile, AvailabilityStatus, CollaborationType } from '@/types/influencer.types';
import { cn } from '@/lib/utils';
import { formatCollaborationType } from '@/lib/format-collaboration-type';
import { useUpdateInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { FRONTEND_ROUTES } from '@/constants';
import { PasswordUpdateForm } from '@/features/profile/components/PasswordUpdateForm';
import { useChangePasswordMutation } from '@/hooks/queries/useProfileQueries';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface InfluencerSettingsViewProps {
    influencer: InfluencerProfile;
    verificationRequests?: any[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export const InfluencerSettingsView = ({
    influencer,
    verificationRequests,
}: InfluencerSettingsViewProps) => {
    const updateInfluencer = useUpdateInfluencerProfile();
    const verificationMutation = useSubmitVerification();
    const changePasswordMutation = useChangePasswordMutation();

    const currentVerification = (verificationRequests as any[])?.[0];
    const { availability, verified } = influencer;
    const collaborationTypes = influencer.collaborationTypes || [];

    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [docUrl, setDocUrl] = useState('');
    const [notes, setNotes] = useState('');

    const handleUpdateAvailability = (status: AvailabilityStatus) => {
        updateInfluencer.mutate({ availability: status });
    };

    const handleAddCollabType = (type: CollaborationType) => {
        if (!collaborationTypes.includes(type as any)) {
            updateInfluencer.mutate({
                collaborationTypes: [...collaborationTypes, type] as any
            });
        }
    };

    const handleRemoveCollabType = (type: string) => {
        updateInfluencer.mutate({
            collaborationTypes: collaborationTypes.filter(t => t !== type) as any
        });
    };

    const getAvailabilityColor = (status: AvailabilityStatus) => {
        switch (status) {
            case AvailabilityStatus.OPEN: return 'bg-green-500';
            case AvailabilityStatus.BUSY: return 'bg-yellow-500';
            case AvailabilityStatus.CLOSED: return 'bg-red-500';
            default: return 'bg-zinc-500';
        }
    };

    const getAvailabilityLabel = (status: AvailabilityStatus) => {
        switch (status) {
            case AvailabilityStatus.OPEN: return 'You are currently accepting new collaborations';
            case AvailabilityStatus.BUSY: return 'You are busy but may accept selective offers';
            case AvailabilityStatus.CLOSED: return 'You are not accepting collaborations right now';
            default: return '';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <Link
                href={FRONTEND_ROUTES.DASHBOARD.INFLUENCER_PROFILE}
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Profile
            </Link>

            {/* Page Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Settings size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Settings</h1>
                        <p className="text-muted-foreground font-medium">Manage your account and preferences</p>
                    </div>
                </div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                {/* 1. Availability */}
                <motion.div variants={item}>
                    <Card className="rounded-[2rem] border-border/50 bg-card/50 glass-card overflow-hidden">
                        <div className="p-6 border-b border-border/50 glass-section bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                                    <Radio size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold tracking-tight">Availability Status</h3>
                                    <p className="text-sm text-muted-foreground">Control whether you appear available for collaborations</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className={cn("w-3 h-3 rounded-full ring-4 ring-offset-2 ring-offset-background", getAvailabilityColor(availability), {
                                        'ring-green-500/20': availability === AvailabilityStatus.OPEN,
                                        'ring-yellow-500/20': availability === AvailabilityStatus.BUSY,
                                        'ring-red-500/20': availability === AvailabilityStatus.CLOSED,
                                    })} />
                                    <span className="text-sm text-muted-foreground">{getAvailabilityLabel(availability)}</span>
                                </div>
                                <Select
                                    value={availability}
                                    onValueChange={handleUpdateAvailability}
                                    disabled={updateInfluencer.isPending}
                                >
                                    <SelectTrigger className="w-[160px] h-10 rounded-xl font-bold text-sm">
                                        <SelectValue placeholder={availability} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={AvailabilityStatus.OPEN}>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                                Open
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={AvailabilityStatus.BUSY}>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                                Busy
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={AvailabilityStatus.CLOSED}>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                                Closed
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 2. Collaboration Types */}
                <motion.div variants={item}>
                    <Card className="rounded-[2rem] border-border/50 bg-card/50 glass-card overflow-hidden">
                        <div className="p-6 border-b border-border/50 glass-section bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold tracking-tight">Collaboration Types</h3>
                                    <p className="text-sm text-muted-foreground">Define what types of collaborations you&apos;re open to</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex flex-wrap gap-2">
                                {collaborationTypes.length > 0 ? (
                                    collaborationTypes.map((type) => (
                                        <Badge
                                            key={type}
                                            className="px-4 py-2 bg-primary/5 border border-primary/10 text-primary rounded-xl text-sm font-bold flex items-center gap-2 shadow-none hover:bg-primary/10 transition-colors"
                                        >
                                            {formatCollaborationType(type)}
                                            <button
                                                onClick={() => handleRemoveCollabType(type)}
                                                className="hover:text-destructive transition-colors"
                                                disabled={updateInfluencer.isPending}
                                                aria-label={`Remove ${formatCollaborationType(type)}`}
                                            >
                                                <X size={14} />
                                            </button>
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No collaboration types configured yet.</p>
                                )}

                                <Select
                                    key={`collab-type-${collaborationTypes.length}`}
                                    onValueChange={(val) => handleAddCollabType(val as CollaborationType)}
                                    disabled={updateInfluencer.isPending}
                                >
                                    <SelectTrigger className="w-fit h-9 rounded-xl border-dashed border-2 px-3 text-xs font-bold">
                                        <div className="flex items-center gap-2">
                                            <Plus size={14} />
                                            <SelectValue placeholder="Add Type" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(CollaborationType)
                                            .filter(t => !collaborationTypes.includes(t as any))
                                            .map(t => (
                                                <SelectItem key={t} value={t}>
                                                    {formatCollaborationType(t)}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 3. Account Verification */}
                <motion.div variants={item}>
                    <Card className="rounded-[2rem] border-border/50 bg-card/50 glass-card overflow-hidden">
                        <div className="p-6 border-b border-border/50 glass-section bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold tracking-tight">Account Verification</h3>
                                    <p className="text-sm text-muted-foreground">Get the verified badge on your profile</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            {verified ? (
                                <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-blue-600 dark:text-blue-400">Verified Creator</p>
                                        <p className="text-sm text-muted-foreground">Your account has been verified successfully.</p>
                                    </div>
                                </div>
                            ) : currentVerification?.status === VerificationStatus.PENDING ? (
                                <div className="flex items-center gap-3 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                                    <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-600">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-yellow-600 dark:text-yellow-400">Verification Pending</p>
                                        <p className="text-sm text-muted-foreground">Your verification request is being reviewed by our team.</p>
                                    </div>
                                </div>
                            ) : currentVerification?.status === VerificationStatus.REJECTED ? (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex-1">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                                            <Flag size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-red-600 dark:text-red-400">Verification Rejected</p>
                                            <p className="text-sm text-muted-foreground">Your previous request was not approved. You can submit a new one.</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setIsVerificationModalOpen(true)}
                                        className="rounded-xl font-bold shrink-0"
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="font-medium">Request profile verification to build trust with brands.</p>
                                        <p className="text-sm text-muted-foreground mt-1">You&apos;ll need to provide proof of identity or social media influence.</p>
                                    </div>
                                    <Button
                                        onClick={() => setIsVerificationModalOpen(true)}
                                        className="rounded-xl font-bold shrink-0 gap-2"
                                    >
                                        <ShieldCheck size={16} />
                                        Get Verified
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 4. Password & Security */}
                <motion.div variants={item}>
                    <Card className="rounded-[2rem] border-border/50 bg-card/50 glass-card overflow-hidden">
                        <div className="p-6 border-b border-border/50 glass-section bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold tracking-tight">Password & Security</h3>
                                    <p className="text-sm text-muted-foreground">Update your password to keep your account secure</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="max-w-lg">
                                <PasswordUpdateForm
                                    onSubmit={(data) => changePasswordMutation.mutate(data)}
                                    isLoading={changePasswordMutation.isPending}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Verification Modal */}
            <AnimatedModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
                title="Request Profile Verification"
                description="Submit proof of your identity or social media influence to get the verified badge."
                size="md"
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="docUrl" className="font-bold">Identity/Influence Proof (URL)</Label>
                        <Input
                            id="docUrl"
                            placeholder="e.g. Google Drive or Dropbox link to your documents"
                            value={docUrl}
                            onChange={(e) => setDocUrl(e.target.value)}
                            className="h-12 rounded-xl"
                        />
                        <p className="text-[10px] text-muted-foreground">Provide a link to a document or screenshot that proves your identity or reach.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="v-notes" className="font-bold">Additional Notes (Optional)</Label>
                        <Textarea
                            id="v-notes"
                            placeholder="Tell us why your profile should be verified..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="min-h-[100px] rounded-xl resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setIsVerificationModalOpen(false)}
                            className="flex-1 h-12 rounded-xl font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-[2] h-12 rounded-xl font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                            onClick={() => {
                                verificationMutation.mutate({
                                    documents: {
                                        idProof: docUrl,
                                        notes
                                    }
                                }, {
                                    onSuccess: () => setIsVerificationModalOpen(false)
                                });
                            }}
                            disabled={!docUrl || verificationMutation.isPending}
                        >
                            {verificationMutation.isPending ? "Submitting..." : "Submit Request"}
                        </Button>
                    </div>
                </div>
            </AnimatedModal>
        </div>
    );
};
