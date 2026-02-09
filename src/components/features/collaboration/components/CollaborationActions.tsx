'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUpdateCollaborationStatus } from '@/hooks/useCollaborations';
import { CheckCircle, XCircle, Play, Ban, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Collaboration } from '@/types/collaboration';
import { CollaborationStatus } from '@/constants/constants';

interface CollaborationActionsProps {
    collaboration: Collaboration;
    isBrand: boolean;
    isInfluencer: boolean;
    isAdmin: boolean;
}

export function CollaborationActions({
    collaboration,
    isBrand,
    isInfluencer,
    isAdmin,
}: CollaborationActionsProps) {
    const updateStatus = useUpdateCollaborationStatus();

    const handleStatusChange = async (status: CollaborationStatus) => {
        try {
            await updateStatus.mutateAsync({
                id: collaboration.id,
                status,
            });
            toast.success(`Collaboration ${status.toLowerCase().replace('_', ' ')}`);
        } catch (error) {
            toast.error('Failed to update collaboration status');
        }
    };

    // Brand Actions
    const brandActions = () => {
        if (collaboration.status === 'REQUESTED') {
            return (
                <>
                    <Button
                        onClick={() => handleStatusChange(CollaborationStatus.ACCEPTED)}
                        disabled={updateStatus.isPending}
                        className="w-full gap-2"
                    >
                        {updateStatus.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <CheckCircle className="h-4 w-4" />
                        )}
                        Accept Request
                    </Button>
                    <Button
                        onClick={() => handleStatusChange(CollaborationStatus.REJECTED)}
                        disabled={updateStatus.isPending}
                        variant="destructive"
                        className="w-full gap-2"
                    >
                        {updateStatus.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <XCircle className="h-4 w-4" />
                        )}
                        Reject Request
                    </Button>
                </>
            );
        }

        if (collaboration.status === 'ACCEPTED') {
            return (
                <Button
                    onClick={() => handleStatusChange(CollaborationStatus.IN_PROGRESS)}
                    disabled={updateStatus.isPending}
                    className="w-full gap-2"
                >
                    {updateStatus.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Play className="h-4 w-4" />
                    )}
                    Start Collaboration
                </Button>
            );
        }

        if (collaboration.status === 'IN_PROGRESS') {
            return (
                <>
                    <Button
                        onClick={() => handleStatusChange(CollaborationStatus.COMPLETED)}
                        disabled={updateStatus.isPending}
                        className="w-full gap-2"
                    >
                        {updateStatus.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <CheckCircle className="h-4 w-4" />
                        )}
                        Mark as Complete
                    </Button>
                    <Button
                        onClick={() => handleStatusChange(CollaborationStatus.CANCELLED)}
                        disabled={updateStatus.isPending}
                        variant="outline"
                        className="w-full gap-2"
                    >
                        {updateStatus.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Ban className="h-4 w-4" />
                        )}
                        Cancel Collaboration
                    </Button>
                </>
            );
        }

        return null;
    };

    // Influencer Actions
    const influencerActions = () => {
        if (collaboration.status === 'REQUESTED') {
            return (
                <p className="text-sm text-muted-foreground text-center py-4">
                    Waiting for brand to accept your request
                </p>
            );
        }

        if (collaboration.status === 'ACCEPTED') {
            return (
                <p className="text-sm text-muted-foreground text-center py-4">
                    Waiting for brand to start the collaboration
                </p>
            );
        }

        if (collaboration.status === 'IN_PROGRESS') {
            return (
                <p className="text-sm text-muted-foreground text-center py-4">
                    Submit your proof of work above when ready
                </p>
            );
        }

        return null;
    };

    // Admin Actions
    const adminActions = () => {
        if (collaboration.status === 'IN_PROGRESS') {
            return (
                <>
                    <Button
                        onClick={() => handleStatusChange(CollaborationStatus.COMPLETED)}
                        disabled={updateStatus.isPending}
                        className="w-full gap-2"
                    >
                        {updateStatus.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <CheckCircle className="h-4 w-4" />
                        )}
                        Force Complete
                    </Button>
                    <Button
                        onClick={() => handleStatusChange(CollaborationStatus.CANCELLED)}
                        disabled={updateStatus.isPending}
                        variant="destructive"
                        className="w-full gap-2"
                    >
                        {updateStatus.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Ban className="h-4 w-4" />
                        )}
                        Force Cancel
                    </Button>
                </>
            );
        }

        return null;
    };

    const hasActions =
        (isBrand && brandActions()) ||
        (isInfluencer && influencerActions()) ||
        (isAdmin && adminActions());

    if (!hasActions) {
        return null;
    }

    return (
        <Card className="glass border-glass-border">
            <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                    {isBrand && 'Manage this collaboration'}
                    {isInfluencer && 'Collaboration status'}
                    {isAdmin && 'Admin controls'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {isBrand && brandActions()}
                {isInfluencer && influencerActions()}
                {isAdmin && adminActions()}
            </CardContent>
        </Card>
    );
}
