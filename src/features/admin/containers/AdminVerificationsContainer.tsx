'use client';

import React from 'react';
import { useAdminVerifications, useProcessVerification } from '@/hooks/use-admin.hooks';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { format, isValid } from 'date-fns';
import { FileText, Eye, Clock, Calendar as CalendarIcon, User as UserIcon, MoreHorizontal } from 'lucide-react';
import { VerificationRequest, VerificationStatus } from '@/types/admin.types';
import { VerifiedStatusBadge } from '../components/VerifiedStatusBadge';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AdminVerificationsContainer() {
    const { data: requests = [], isLoading } = useAdminVerifications();
    const processVerification = useProcessVerification();
    const [notes, setNotes] = useState('');
    const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

    const handleProcess = (id: string, status: 'APPROVED' | 'REJECTED') => {
        processVerification.mutate({ id, status, notes });
        setNotes('');
        setActiveRequestId(null);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date';
    };

    const columns: ColumnDef<VerificationRequest>[] = [
        {
            id: 'influencer',
            header: 'Influencer',
            accessorKey: 'influencerProfile.user.email',
            cell: ({ row }) => {
                const profile = row.original.influencerProfile;
                const user = profile?.user;
                const fullName = profile?.fullName || user?.profile?.fullName || 'Influencer';
                const email = user?.email || 'Unknown';

                return (
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20">
                            {fullName[0]?.toUpperCase() || email[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground truncate max-w-[150px]">{fullName}</span>
                            <span className="text-[10px] text-muted-foreground uppercase opacity-60 font-medium">
                                {email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => <VerifiedStatusBadge status={row.original.status} />,
        },
        {
            id: 'submitted',
            header: 'Submitted',
            accessorKey: 'createdAt',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <CalendarIcon size={14} />
                    {formatDate(row.original.createdAt)}
                </div>
            ),
        },
        {
            id: 'documents',
            header: 'Documents',
            cell: ({ row }) => {
                const docs = Object.entries(row.original.documents || {}).filter(
                    ([_, value]) => typeof value === 'string' && value.startsWith('http')
                );
                const count = docs.length;
                const firstDoc = docs[0]?.[1];

                return (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground bg-muted/20 px-2.5 py-1 rounded-full border border-border/30 uppercase tracking-tight">
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Open Document"
                                disabled={count === 0}
                                className="h-8 w-8 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                                onClick={() => window.open(firstDoc as string, '_blank')}
                            >
                                <FileText size={10} className="opacity-70" />
                                <span>{count} Files</span>
                            </Button>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            meta: { headerAlign: 'left' },
            cell: ({ row }) => {
                const request = row.original;
                const userEmail = request.influencerProfile?.user?.email || 'this user';

                return (
                    <div className="flex justify-start items-center gap-2">
                        {request.status === VerificationStatus.PENDING ? (
                            <Button
                                size="sm"
                                className="h-8 rounded-xl text-xs px-4 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                                onClick={() => setActiveRequestId(request.id)}
                            >
                                Process
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled
                                className="h-8 w-8 rounded-lg opacity-40 cursor-not-allowed"
                            >
                                <MoreHorizontal size={14} />
                            </Button>
                        )}

                        <AnimatedModal
                            isOpen={activeRequestId === request.id}
                            onClose={() => setActiveRequestId(null)}
                            title={request.status === VerificationStatus.PENDING ? 'Process Verification' : 'Verification Details'}
                            description={request.status === VerificationStatus.PENDING
                                ? `Provide feedback and decide on this verification request for ${userEmail}.`
                                : `Review the processed verification for ${userEmail}.`}
                            footer={request.status === VerificationStatus.PENDING && (
                                <div className="flex gap-3 justify-end w-full">
                                    <Button
                                        variant="outline"
                                        className="rounded-xl border-rose-500/20 text-rose-600 hover:bg-rose-50 px-6"
                                        onClick={() => handleProcess(request.id, 'REJECTED')}
                                    >
                                        Reject Request
                                    </Button>
                                    <Button
                                        className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 shadow-lg shadow-emerald-600/20"
                                        onClick={() => handleProcess(request.id, 'APPROVED')}
                                    >
                                        Approve Verification
                                    </Button>
                                </div>
                            )}
                        >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Internal Notes</label>
                                    <Textarea
                                        placeholder={request.status === VerificationStatus.PENDING ? "Add feedback for the influencer or reason for rejection..." : "No notes provided."}
                                        value={request.status === VerificationStatus.PENDING ? notes : (request as any).adminNotes || ''}
                                        onChange={(e) => setNotes(e.target.value)}
                                        readOnly={request.status !== VerificationStatus.PENDING}
                                        className="rounded-xl min-h-[120px] bg-muted/20 border-border/40 focus:border-primary/50 transition-all resize-none p-4"
                                    />
                                </div>
                                {request.status !== VerificationStatus.PENDING && (
                                    <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 text-sm space-y-3">
                                        <div className="flex justify-between items-center pb-2 border-b border-border/5">
                                            <span className="text-muted-foreground font-medium">Decision Status</span>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                request.status === VerificationStatus.APPROVED
                                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                    : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                            )}>
                                                {request.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-muted-foreground">Processed On</span>
                                            <span className="font-bold text-foreground">
                                                {formatDate(request.updatedAt)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </AnimatedModal>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Verification Requests</h1>
                <p className="text-muted-foreground">Review and process identity verification for influencers.</p>
            </div>

            {/* Verifications DataTable */}
            <DataTable
                data={requests}
                columns={columns}
                isLoading={isLoading}
                showSearch={true}
                searchPosition="end"
                className="w-full"
                emptyState={
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                        <Clock size={48} className="text-muted-foreground/30" />
                        <p className="mt-4 text-lg font-medium text-muted-foreground">No verification requests found.</p>
                    </div>
                }
            />
        </div>
    );
}
