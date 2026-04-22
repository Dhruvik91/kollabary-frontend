'use client';

import React from 'react';
import { ErrorState } from '@/components/shared/ErrorState';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';

interface CollaborationErrorStateProps {
    message?: string;
}

export const CollaborationErrorState = ({ message }: CollaborationErrorStateProps) => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <ErrorState
                title="Collaboration Not Found"
                description={message || "The collaboration you are looking for does not exist or you do not have permission to view it."}
                onRetry={() => router.push(FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS)}
            />
        </div>
    );
};
