'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Eye,
    Clock,
    Calendar as CalendarIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { VerificationRequest, VerificationStatus } from '@/types/admin.types';
import { VerifiedStatusBadge } from './VerifiedStatusBadge';
import { Button } from '@/components/ui/button';
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

interface VerificationRequestCardProps {
    request: VerificationRequest;
    index: number;
    onProcess: (id: string, status: 'APPROVED' | 'REJECTED', notes: string) => void;
}

export function VerificationRequestCard({ request, index, onProcess }: VerificationRequestCardProps) {
    const [notes, setNotes] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleProcess = (status: 'APPROVED' | 'REJECTED') => {
        onProcess(request.id, status, notes);
        setNotes('');
        setIsDialogOpen(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 glass-card shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:border-primary/20 will-change-transform"
        >
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {request.user?.email?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold truncate max-w-[150px]">{request.user?.email || 'Unknown User'}</h3>
                            <p className="text-[10px] text-muted-foreground">ID: {request.id.slice(0, 8)}...</p>
                        </div>
                    </div>
                    <VerifiedStatusBadge status={request.status} />
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon size={14} />
                        Submitted: {format(new Date(request.submittedAt), 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FileText size={14} />
                        Documents: {request.documents.length} attached
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-9 text-xs gap-2"
                        onClick={() => request.documents[0] && window.open(request.documents[0], '_blank')}
                        disabled={!request.documents.length}
                    >
                        <Eye size={14} /> View Docs
                    </Button>

                    {request.status === VerificationStatus.PENDING && (
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex-1 rounded-xl h-9 text-xs gap-2">
                                    Process
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Process Verification</DialogTitle>
                                    <DialogDescription>
                                        Provide feedback and decide on this verification request for {request.user?.email || 'this user'}.
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
                                        onClick={() => handleProcess('REJECTED')}
                                    >
                                        Reject Request
                                    </Button>
                                    <Button
                                        className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                                        onClick={() => handleProcess('APPROVED')}
                                    >
                                        Approve Verification
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
            <div className="absolute top-0 right-0 h-1 w-full bg-linear-to-r from-transparent via-primary/20 to-transparent" />
        </motion.div>
    );
}
