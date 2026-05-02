"use client"
import { Pitch, PitchStatus } from '@/types/pitch.types';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    CheckCircle2,
    XCircle,
    Clock,
    MessageSquare,
    ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { useStartConversation } from '@/hooks/use-messaging.hooks';

interface PitchCardProps {
    pitch: Pitch;
    type: 'sent' | 'received';
    onUpdateStatus?: (id: string, status: PitchStatus) => void;
    isUpdating?: boolean;
}

export const PitchCard = ({ pitch, type, onUpdateStatus, isUpdating }: PitchCardProps) => {
    const isPending = pitch.status === PitchStatus.PENDING;
    const isSent = type === 'sent';
    const router = useRouter();
    const { mutateAsync: startConversation, isPending: isStartingChat } = useStartConversation();

    const handleMessage = async () => {
        // partner is the other side of the pitch
        const partnerId = isSent ? pitch.target?.id : pitch.influencer?.id;
        if (!partnerId) return;

        try {
            const conversation = await startConversation(partnerId);
            router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    };

    // The user to display (the other party)
    const otherParty = isSent ? pitch.target : pitch.influencer?.influencerProfile;
    const profile = otherParty?.profile || otherParty;

    const statusConfig = {
        [PitchStatus.PENDING]: {
            color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
            icon: <Clock size={14} />,
            label: 'Pending'
        },
        [PitchStatus.ACCEPTED]: {
            color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            icon: <CheckCircle2 size={14} />,
            label: 'Accepted'
        },
        [PitchStatus.REJECTED]: {
            color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
            icon: <XCircle size={14} />,
            label: 'Rejected'
        }
    };

    const config = statusConfig[pitch.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300"
        >
            <div className="p-6 space-y-6">
                {/* Header: User Info & Status */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 rounded-2xl border border-border/50 shadow-sm">
                            <AvatarImage src={profile?.avatarUrl || profile?.profileImage} />
                            <AvatarFallback className="bg-primary/5 text-primary font-black italic">
                                {profile?.fullName?.charAt(0) || '?'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="font-black text-sm uppercase tracking-tight truncate max-w-[140px] sm:max-w-[200px]">
                                {profile?.fullName || 'Unknown User'}
                            </h4>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter sm:hidden">
                                {formatDistanceToNow(new Date(pitch.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2">
                        <Badge className={cn("rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border", config.color)}>
                            <span className="mr-1.5">{config.icon}</span>
                            {config.label}
                        </Badge>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter hidden sm:block">
                            {formatDistanceToNow(new Date(pitch.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>

                {/* Message Content */}
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-primary/10 rounded-full" />
                        <p className="text-sm font-medium leading-relaxed text-foreground/80 pl-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-500 italic">
                            "{pitch.message}"
                        </p>
                    </div>

                    {pitch.workUrl && (
                        <a
                            href={pitch.workUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-2xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-all group/link w-full sm:w-fit"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest">View Reference Work</span>
                            <ExternalLink size={12} className="opacity-50" />
                        </a>
                    )}
                </div>

                {/* Footer Actions */}
                <div className={cn(
                    "pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-border/50 gap-4",
                    (isSent || !isPending) && pitch.status !== PitchStatus.ACCEPTED && "hidden"
                )}>
                    {pitch.status === PitchStatus.ACCEPTED && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto h-10 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-primary/20 transition-all duration-300 gap-2"
                            onClick={handleMessage}
                            disabled={isStartingChat}
                        >
                            {isStartingChat ? 'Opening Chat...' : 'Send Message'}
                        </Button>
                    )}

                    {!isSent && isPending && (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 sm:flex-initial h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-rose-500/20 text-rose-500 hover:bg-rose-500/5 hover:text-rose-600 transition-all"
                                onClick={() => onUpdateStatus?.(pitch.id, PitchStatus.REJECTED)}
                                disabled={isUpdating}
                            >
                                Reject
                            </Button>
                            <Button
                                size="sm"
                                className="flex-1 sm:flex-initial h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all"
                                onClick={() => onUpdateStatus?.(pitch.id, PitchStatus.ACCEPTED)}
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Wait...' : 'Accept'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Indicator Glow */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 h-1 opacity-20",
                pitch.status === PitchStatus.ACCEPTED ? "bg-emerald-500" :
                    pitch.status === PitchStatus.REJECTED ? "bg-rose-500" :
                        "bg-amber-500"
            )} />
        </motion.div>
    );
};
