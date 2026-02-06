'use client';

import { useState } from 'react';
import { useAllVerifications, useUpdateVerificationStatus } from '@/hooks/useAdmin';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/states/LoadingState';
import { ErrorState } from '@/components/ui/states/ErrorState';
import { CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const statusConfig = {
    PENDING: { label: 'Pending', icon: Clock, color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    APPROVED: { label: 'Approved', icon: CheckCircle, color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    REJECTED: { label: 'Rejected', icon: XCircle, color: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

export default function AdminVerificationsPage() {
    const { data: verifications, isLoading, isError } = useAllVerifications();
    const updateStatusMutation = useUpdateVerificationStatus();
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [selectedVerification, setSelectedVerification] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const handleApprove = (id: string) => {
        updateStatusMutation.mutate({ id, data: { status: 'APPROVED' } });
    };

    const handleReject = () => {
        if (selectedVerification && rejectionReason) {
            updateStatusMutation.mutate({
                id: selectedVerification,
                data: { status: 'REJECTED', rejectionReason },
            });
            setRejectDialogOpen(false);
            setRejectionReason('');
            setSelectedVerification(null);
        }
    };

    if (isLoading) return <LoadingState message="Loading verification requests..." />;
    if (isError) return <ErrorState message="Failed to load verification requests" />;

    return (
        <PageContainer>
            <PageHeader
                title="Verification Requests"
                description="Review and approve influencer verification requests."
            />

            <div className="space-y-6">
                {verifications && verifications.length === 0 ? (
                    <GlassCard className="p-12 text-center">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">No Pending Requests</h3>
                        <p className="text-muted-foreground">There are no verification requests to review.</p>
                    </GlassCard>
                ) : (
                    verifications?.map((verification) => {
                        const StatusIcon = statusConfig[verification.status].icon;
                        return (
                            <GlassCard key={verification.id} className="p-6 border-glass-border">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className={statusConfig[verification.status].color}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {statusConfig[verification.status].label}
                                            </Badge>
                                            <Badge variant="secondary">
                                                {verification.documentType}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span>User ID: {verification.userId}</span>
                                            <span>Submitted: {format(new Date(verification.createdAt), 'MMM dd, yyyy')}</span>
                                        </div>

                                        <div>
                                            <a
                                                href={verification.documentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-primary hover:underline"
                                            >
                                                View Document <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>

                                        {verification.rejectionReason && (
                                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                                <p className="text-sm font-medium text-destructive">Rejection Reason:</p>
                                                <p className="text-sm text-muted-foreground mt-1">{verification.rejectionReason}</p>
                                            </div>
                                        )}
                                    </div>

                                    {verification.status === 'PENDING' && (
                                        <div className="flex flex-col gap-3 min-w-[200px]">
                                            <Button
                                                onClick={() => handleApprove(verification.id)}
                                                className="w-full bg-green-500 hover:bg-green-600 text-white"
                                                disabled={updateStatusMutation.isPending}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Approve
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setSelectedVerification(verification.id);
                                                    setRejectDialogOpen(true);
                                                }}
                                                variant="outline"
                                                className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10"
                                                disabled={updateStatusMutation.isPending}
                                            >
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        );
                    })
                )}
            </div>

            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent className="glass border-glass-border">
                    <DialogHeader>
                        <DialogTitle>Reject Verification Request</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Please provide a reason for rejecting this verification request.
                        </p>
                        <Textarea
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="glass border-glass-border min-h-[100px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleReject}
                            disabled={!rejectionReason || updateStatusMutation.isPending}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Reject Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PageContainer>
    );
}
