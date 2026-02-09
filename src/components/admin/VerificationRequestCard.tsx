'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    CheckCircle2,
    XCircle,
    ExternalLink,
    User,
    Calendar,
    Mail
} from 'lucide-react';
import { VerificationRequest } from '@/hooks/admin/useVerificationRequests';
import { formatDistanceToNow } from 'date-fns';

interface VerificationRequestCardProps {
    request: VerificationRequest;
    onApprove: (id: string) => void;
    onReject: (id: string, reason: string) => void;
    isApproving?: boolean;
    isRejecting?: boolean;
}

export function VerificationRequestCard({
    request,
    onApprove,
    onReject,
    isApproving,
    isRejecting
}: VerificationRequestCardProps) {
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showDocumentPreview, setShowDocumentPreview] = useState(false);

    const handleReject = () => {
        if (rejectionReason.trim()) {
            onReject(request.id, rejectionReason);
            setShowRejectDialog(false);
            setRejectionReason('');
        }
    };

    return (
        <>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={request.user.profileImage} />
                                <AvatarFallback>
                                    <User className="h-6 w-6" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">{request.user.name}</CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <Mail className="h-3 w-3" />
                                    {request.user.email}
                                </div>
                            </div>
                        </div>
                        <Badge variant={
                            request.status === 'APPROVED' ? 'default' :
                                request.status === 'REJECTED' ? 'destructive' :
                                    'secondary'
                        }>
                            {request.status}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                            Submitted {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                        </span>
                    </div>

                    {/* Document Preview */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Verification Document</p>
                        <Button
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => setShowDocumentPreview(true)}
                        >
                            <span>View Document</span>
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Rejection Reason (if rejected) */}
                    {request.status === 'REJECTED' && request.rejectionReason && (
                        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                                Rejection Reason
                            </p>
                            <p className="text-sm text-red-800 dark:text-red-200">
                                {request.rejectionReason}
                            </p>
                        </div>
                    )}

                    {/* Actions (only for pending) */}
                    {request.status === 'PENDING' && (
                        <div className="flex gap-2 pt-2">
                            <Button
                                onClick={() => onApprove(request.id)}
                                disabled={isApproving || isRejecting}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                {isApproving ? 'Approving...' : 'Approve'}
                            </Button>
                            <Button
                                onClick={() => setShowRejectDialog(true)}
                                disabled={isApproving || isRejecting}
                                variant="destructive"
                                className="flex-1"
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Verification Request</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this verification request. The user will be notified.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Textarea
                            placeholder="e.g., Document is not clear, ID verification failed, etc."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={!rejectionReason.trim() || isRejecting}
                        >
                            {isRejecting ? 'Rejecting...' : 'Reject Request'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Document Preview Dialog */}
            <Dialog open={showDocumentPreview} onOpenChange={setShowDocumentPreview}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Verification Document</DialogTitle>
                        <DialogDescription>
                            Review the submitted verification document
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative w-full h-[600px] bg-secondary rounded-lg overflow-hidden">
                        {request.documentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                            <img
                                src={request.documentUrl}
                                alt="Verification Document"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <iframe
                                src={request.documentUrl}
                                className="w-full h-full"
                                title="Verification Document"
                            />
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDocumentPreview(false)}>
                            Close
                        </Button>
                        <Button asChild>
                            <a href={request.documentUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open in New Tab
                            </a>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
