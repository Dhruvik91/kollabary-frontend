'use client';

import React, { useState } from 'react';
import {
    CheckCircle,
    XCircle,
    FileText,
    MoreVertical,
    Clock,
    User as UserIcon,
    AlertCircle,
    Eye,
    MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminVerifications, useProcessVerification } from '@/hooks/use-admin.hooks';
import { VerificationStatus } from '@/types/admin.types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

function VerifiedStatusBadge({ status }: { status: VerificationStatus }) {
    const config = {
        [VerificationStatus.PENDING]: {
            icon: Clock,
            className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
            label: "Pending"
        },
        [VerificationStatus.APPROVED]: {
            icon: CheckCircle,
            className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
            label: "Approved"
        },
        [VerificationStatus.REJECTED]: {
            icon: XCircle,
            className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
            label: "Rejected"
        }
    };

    const { icon: Icon, className, label } = config[status];

    return (
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", className)}>
            <Icon size={12} />
            {label}
        </div>
    );
}

export default function AdminVerificationsPage() {
    const { data: requests, isLoading, isError } = useAdminVerifications();
    const processVerification = useProcessVerification();
    const [notes, setNotes] = useState('');
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

    const handleProcess = (id: string, status: 'APPROVED' | 'REJECTED') => {
        processVerification.mutate({ id, status, notes });
        setNotes('');
        setSelectedRequest(null);
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Verification Requests</h1>
                <p className="text-muted-foreground">Review and process identity verification for influencers.</p>
            </div>

            {/* Requests List */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {requests?.length ? (
                        requests.map((request, idx) => (
                            <motion.div
                                key={request.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {request.user.email[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold truncate max-w-[150px]">{request.user.email}</h3>
                                                <p className="text-[10px] text-muted-foreground">ID: {request.id.slice(0, 8)}...</p>
                                            </div>
                                        </div>
                                        <VerifiedStatusBadge status={request.status} />
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar size={14} />
                                            Submitted: {format(new Date(request.submittedAt), 'MMMM d, yyyy')}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <FileText size={14} />
                                            Documents: {request.documents.length} attached
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" className="flex-1 rounded-xl h-9 text-xs gap-2">
                                            <Eye size={14} /> View Docs
                                        </Button>

                                        {request.status === VerificationStatus.PENDING && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="flex-1 rounded-xl h-9 text-xs gap-2"
                                                        onClick={() => setSelectedRequest(request.id)}
                                                    >
                                                        Process
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="rounded-2xl sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Process Verification</DialogTitle>
                                                        <DialogDescription>
                                                            Provide feedback and decide on this verification request for {request.user.email}.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4 space-y-4">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium">Internal Notes</label>
                                                            <Textarea
                                                                placeholder="Add feedback for the influencer or reason for rejection..."
                                                                value={notes}
                                                                onChange={(e) => setNotes(e.target.value)}
                                                                className="rounded-xl min-h-[100px]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="gap-2 sm:gap-0">
                                                        <Button
                                                            variant="outline"
                                                            className="rounded-xl border-rose-500/20 text-rose-600 hover:bg-rose-50"
                                                            onClick={() => handleProcess(request.id, 'REJECTED')}
                                                        >
                                                            Reject Request
                                                        </Button>
                                                        <Button
                                                            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                                                            onClick={() => handleProcess(request.id, 'APPROVED')}
                                                        >
                                                            Approve Verification
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                            <Clock size={48} className="text-muted-foreground/30" />
                            <p className="mt-4 text-lg font-medium text-muted-foreground">No verification requests found.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Calendar({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    );
}
