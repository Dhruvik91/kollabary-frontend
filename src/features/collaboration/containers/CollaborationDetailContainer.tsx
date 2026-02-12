'use client';

import React from 'react';
import {
    useCollaborationDetail,
    useUpdateCollaborationStatus
} from '@/hooks/use-collaboration.hooks';
import { useAuth } from '@/contexts/auth-context';
import { CollaborationStatus } from '@/types/collaboration.types';
import { UserRole } from '@/types/auth.types';

// Sub-components
import { CollaborationHeader } from '../components/CollaborationHeader';
import { CollaborationMainInfo } from '../components/CollaborationMainInfo';
import { CollaborationPartnerCard } from '../components/CollaborationPartnerCard';
import { CollaborationProgressTracker } from '../components/CollaborationProgressTracker';
import { CollaborationResponseActions } from '../components/CollaborationResponseActions';
import { CollaborationLoadingState } from '../components/CollaborationLoadingState';
import { CollaborationErrorState } from '../components/CollaborationErrorState';

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
    const { user } = useAuth();

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

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header with Navigation */}
            <CollaborationHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Collaboration Info */}
                    <CollaborationMainInfo collaboration={collaboration} />

                    {/* Pending Actions (Accept/Reject) */}
                    {canAccept && (
                        <CollaborationResponseActions
                            onAccept={() => handleUpdateStatus(CollaborationStatus.ACCEPTED)}
                            onReject={() => handleUpdateStatus(CollaborationStatus.REJECTED)}
                            isUpdating={isUpdating}
                        />
                    )}
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    {/* Partner Information */}
                    <CollaborationPartnerCard partner={partner} isInfluencer={isInfluencer} />

                    {/* Status Progress Tracker */}
                    <CollaborationProgressTracker status={collaboration.status} />
                </div>
            </div>
        </div>
    );
};
