'use client';

import { useState } from 'react';
import { useCreateReport } from '@/hooks/useReports';
import { ReportReason } from '@/types/report';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetUserId: string;
    targetName: string;
}

export function ReportModal({ isOpen, onClose, targetUserId, targetName }: ReportModalProps) {
    const [reason, setReason] = useState<ReportReason | ''>('');
    const [description, setDescription] = useState('');
    const createReport = useCreateReport();

    const handleSubmit = async () => {
        if (!reason) {
            toast.error('Please select a reason');
            return;
        }

        if (description.length < 10) {
            toast.error('Please provide more details (at least 10 characters)');
            return;
        }

        try {
            await createReport.mutateAsync({
                targetId: targetUserId,
                targetType: 'user', // Default to user for this modal
                reason: reason as ReportReason,
                details: description,
            });
            toast.success('Report submitted successfully. We will review it shortly.');
            onClose();
            setReason('');
            setDescription('');
        } catch (error) {
            toast.error('Failed to submit report');
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] glass border-glass-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="w-5 h-5" />
                        Report {targetName}
                    </DialogTitle>
                    <DialogDescription>
                        Please provide details about the issue. Your report is confidential.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Reason</label>
                        <Select value={reason} onValueChange={(val) => setReason(val as ReportReason)}>
                            <SelectTrigger className="bg-secondary/20 border-glass-border">
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent className="glass border-glass-border">
                                <SelectItem value={ReportReason.SPAM}>Spam</SelectItem>
                                <SelectItem value={ReportReason.HARASSMENT}>Harassment</SelectItem>
                                <SelectItem value={ReportReason.INAPPROPRIATE_CONTENT}>Inappropriate Content</SelectItem>
                                <SelectItem value={ReportReason.DISHONEST_BEHAVIOR}>Dishonest Behavior</SelectItem>
                                <SelectItem value={ReportReason.OTHER}>Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            placeholder="Please provide as much detail as possible..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-secondary/20 border-glass-border min-h-[100px]"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button
                        variant="destructive"
                        onClick={handleSubmit}
                        disabled={createReport.isPending}
                    >
                        {createReport.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Submit Report
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
