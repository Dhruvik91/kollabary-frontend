'use client';

import { motion } from 'framer-motion';
import { Calendar, DollarSign, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Collaboration } from '@/types/collaboration';
import { CollaborationStatus } from '@/constants/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUpdateCollaborationStatus } from '@/hooks/useCollaborations';
import { format } from 'date-fns';

interface CollaborationCardProps {
    collaboration: Collaboration;
    userRole: string;
}

export function CollaborationCard({ collaboration, userRole }: CollaborationCardProps) {
    const { id, title, description, status, createdAt, influencer, requester, proposedTerms } = collaboration;
    const { mutate: updateStatus, isPending } = useUpdateCollaborationStatus();

    // Budget might be in proposedTerms
    const budget = proposedTerms?.budget || proposedTerms?.deliverables?.budget || 0;

    // Resolve names
    const influencerName = influencer?.profile?.fullName || influencer?.email || 'Influencer';
    const requesterName = requester?.profile?.fullName || requester?.email || 'Brand';

    const getStatusIcon = (status: CollaborationStatus) => {
        switch (status) {
            case CollaborationStatus.COMPLETED: return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case CollaborationStatus.REJECTED:
            case CollaborationStatus.CANCELLED: return <XCircle className="h-4 w-4 text-destructive" />;
            case CollaborationStatus.REQUESTED: return <Clock className="h-4 w-4 text-yellow-500" />;
            default: return <AlertCircle className="h-4 w-4 text-primary" />;
        }
    };

    const statusColors: Record<string, string> = {
        [CollaborationStatus.REQUESTED]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        [CollaborationStatus.ACCEPTED]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        [CollaborationStatus.IN_PROGRESS]: 'bg-primary/10 text-primary border-primary/20',
        [CollaborationStatus.COMPLETED]: 'bg-green-500/10 text-green-500 border-green-500/20',
        [CollaborationStatus.REJECTED]: 'bg-destructive/10 text-destructive border-destructive/20',
        [CollaborationStatus.CANCELLED]: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-enhanced rounded-2xl p-6 relative overflow-hidden group hover:border-primary/40 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <Badge variant="outline" className={`mb-3 ${statusColors[status]}`}>
                        <span className="mr-1.5">{getStatusIcon(status)}</span>
                        {status}
                    </Badge>
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-medium text-foreground">
                            {userRole === 'INFLUENCER' ? requesterName : influencerName}
                        </span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        {createdAt && format(new Date(createdAt), 'MMM dd, yyyy')}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-primary flex items-center justify-end">
                        <DollarSign className="h-5 w-5" />
                        {budget}
                    </div>
                    <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Estimated Budget</div>
                </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
                {description}
            </p>

            {status === CollaborationStatus.REQUESTED && userRole === 'INFLUENCER' && (
                <div className="flex gap-3 pt-6 border-t border-white/5">
                    <Button
                        variant="premium"
                        className="flex-1 rounded-xl"
                        onClick={() => updateStatus({ id, status: CollaborationStatus.ACCEPTED })}
                        disabled={isPending}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl border-white/10 hover:bg-white/5"
                        onClick={() => updateStatus({ id, status: CollaborationStatus.REJECTED })}
                        disabled={isPending}
                    >
                        Decline
                    </Button>
                </div>
            )}

            {status === CollaborationStatus.ACCEPTED && userRole === 'INFLUENCER' && (
                <div className="pt-6 border-t border-white/5">
                    <Button
                        variant="premium"
                        className="w-full rounded-xl !from-green-600 !to-emerald-600 shadow-green-900/20"
                        onClick={() => updateStatus({ id, status: CollaborationStatus.IN_PROGRESS })}
                        disabled={isPending}
                    >
                        Start Project
                    </Button>
                </div>
            )}
        </motion.div>
    );
}
