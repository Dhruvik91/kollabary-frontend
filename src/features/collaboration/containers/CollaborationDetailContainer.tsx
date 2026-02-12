'use client';

import {
    useCollaborationDetail,
    useUpdateCollaborationStatus,
    useUpdateCollaboration
} from '@/hooks/use-collaboration.hooks';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { useAuth } from '@/contexts/auth-context';
import { CollaborationStatus } from '@/types/collaboration.types';
import { UserRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';

// Sub-components
import { CollaborationHeader } from '../components/CollaborationHeader';
import { CollaborationMainInfo } from '../components/CollaborationMainInfo';
import { CollaborationPartnerCard } from '../components/CollaborationPartnerCard';
import { CollaborationProgressTracker } from '../components/CollaborationProgressTracker';
import { CollaborationResponseActions } from '../components/CollaborationResponseActions';
import { CollaborationLoadingState } from '../components/CollaborationLoadingState';
import { CollaborationErrorState } from '../components/CollaborationErrorState';
import { CollaborationProgressActions } from '../components/CollaborationProgressActions';
import { ProofUploadDialog } from '../components/ProofUploadDialog';
import { useCreateReview } from '@/hooks/use-review.hooks';
import { ReviewSubmissionModal } from '@/features/review/components/ReviewSubmissionModal';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CollaborationDetailContainerProps {
    id: string;
}

/**
 * Smart Container for the Collaboration Detail Page
 * Orchestrates data fetching and sub-component rendering
 */
export const CollaborationDetailContainer = ({ id }: CollaborationDetailContainerProps) => {
    // Data Fetching
    const { data: collaboration, isLoading, isError, error } = useCollaborationDetail(id);
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateCollaborationStatus(id);
    const { mutate: updateCollaboration, isPending: isUpdatingDetails } = useUpdateCollaboration(id);
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();
    const { mutate: createReview, isPending: isCreatingReview } = useCreateReview();
    const { user } = useAuth();
    const router = useRouter();

    const [isProofDialogOpen, setIsProofDialogOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const handleMessagePartner = () => {
        if (!collaboration) return;

        const partner = user?.id === collaboration.requester.id
            ? collaboration.influencer
            : collaboration.requester;

        startConversation((partner as any).id, {
            onSuccess: (conversation) => {
                router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
            }
        });
    };

    // Loading State
    if (isLoading) {
        return <CollaborationLoadingState />;
    }

    // Error or Empty State
    if (isError || !collaboration) {
        return <CollaborationErrorState message={(error as any)?.message} />;
    }

    // Derived State
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const partner = isInfluencer ? collaboration.requester : collaboration.influencer;

    // Authorization check: Only requester or influencer can view
    const isAuthorized = user?.id === collaboration.requester.id || user?.id === collaboration.influencer.id || user?.role === UserRole.ADMIN;

    if (!isAuthorized) {
        return <CollaborationErrorState message="Unauthorized access" />;
    }

    // Action Handlers
    const canAccept = collaboration.status === CollaborationStatus.REQUESTED && isInfluencer;

    const handleUpdateStatus = (status: CollaborationStatus) => {
        updateStatus({ status });
    };

    const handleUploadProof = (urls: string[]) => {
        updateCollaboration({
            proofUrls: urls,
            proofSubmittedAt: new Date().toISOString()
        }, {
            onSuccess: () => setIsProofDialogOpen(false)
        });
    };

    const isRequester = user?.id === collaboration.requester.id;
    const canShowProgressActions = isInfluencer && [
        CollaborationStatus.ACCEPTED,
        CollaborationStatus.IN_PROGRESS
    ].includes(collaboration.status);

    const canSubmitProof = isRequester && [
        CollaborationStatus.IN_PROGRESS,
        CollaborationStatus.COMPLETED
    ].includes(collaboration.status);

    const canReview = isRequester && collaboration.status === CollaborationStatus.COMPLETED;

    const handleReviewSubmit = (data: { rating: number; comment: string }) => {
        createReview({
            influencerId: collaboration.influencer.id,
            collaborationId: collaboration.id,
            ...data
        }, {
            onSuccess: () => setIsReviewModalOpen(false)
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 max-w-5xl mx-auto"
        >
            {/* Header with Navigation */}
            <CollaborationHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Collaboration Info */}
                    <CollaborationMainInfo
                        collaboration={collaboration}
                        canSubmitProof={canSubmitProof}
                        onUpdateProof={() => setIsProofDialogOpen(true)}
                    />

                    {/* Pending Actions (Accept/Reject) */}
                    {canAccept && (
                        <CollaborationResponseActions
                            onAccept={() => handleUpdateStatus(CollaborationStatus.ACCEPTED)}
                            onReject={() => handleUpdateStatus(CollaborationStatus.REJECTED)}
                            isUpdating={isUpdating}
                        />
                    )}

                    {/* Progress Actions (Start/Complete) */}
                    {canShowProgressActions && (
                        <CollaborationProgressActions
                            status={collaboration.status}
                            onUpdateStatus={handleUpdateStatus}
                            isUpdating={isUpdating}
                        />
                    )}

                    {/* Review Action */}
                    {canReview && (
                        <Card className="rounded-[2.5rem] border-border/50 bg-primary/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-dashed border-primary/20">
                            <div className="space-y-1 text-center md:text-left">
                                <h3 className="text-xl font-black tracking-tight flex items-center gap-2 justify-center md:justify-start">
                                    <Star size={24} className="text-yellow-500 fill-yellow-500" />
                                    How was the collaboration?
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Your feedback helps maintaining platform quality and rewards top creators.
                                </p>
                            </div>
                            <Button
                                onClick={() => setIsReviewModalOpen(true)}
                                className="h-12 px-8 rounded-2xl font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
                            >
                                Leave a Review
                            </Button>
                        </Card>
                    )}
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    {/* Partner Information */}
                    <CollaborationPartnerCard
                        partner={partner}
                        isInfluencer={isInfluencer}
                        onMessage={handleMessagePartner}
                        isMessaging={isStartingChat}
                    />

                    {/* Status Progress Tracker */}
                    <CollaborationProgressTracker status={collaboration.status} />
                </div>
            </div>

            {/* Dialogs */}
            <ProofUploadDialog
                isOpen={isProofDialogOpen}
                onClose={() => setIsProofDialogOpen(false)}
                onUpload={handleUploadProof}
                isUpdating={isUpdatingDetails}
                existingUrls={collaboration.proofUrls}
            />

            <ReviewSubmissionModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                influencerName={collaboration.influencer.profile?.fullName || 'Creator'}
                onSubmit={handleReviewSubmit}
                isLoading={isCreatingReview}
            />
        </motion.div>
    );
};
