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
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    const { user } = useAuth();
    const router = useRouter();

    const [isProofDialogOpen, setIsProofDialogOpen] = useState(false);

    const handleMessagePartner = () => {
        if (!collaboration) return;

        const partner = user?.id === collaboration.requester.id
            ? collaboration.influencer
            : collaboration.requester;

        startConversation(partner.id, {
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
        </motion.div>
    );
};
