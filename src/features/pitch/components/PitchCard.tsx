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
    Eye,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { useState } from 'react';

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
    const [isExpanded, setIsExpanded] = useState(false);

    // Truncate at word boundaries for long messages
    const MESSAGE_THRESHOLD = 120;
    const isLongMessage = !!(pitch.message && pitch.message.length > MESSAGE_THRESHOLD);

    let previewText = pitch.message || '';
    let remainingText = '';

    if (isLongMessage && pitch.message) {
        const lastSpaceIndex = pitch.message.lastIndexOf(' ', MESSAGE_THRESHOLD);
        const splitIndex = lastSpaceIndex > 0 ? lastSpaceIndex : MESSAGE_THRESHOLD;
        previewText = pitch.message.slice(0, splitIndex).trimEnd();
        remainingText = pitch.message.slice(splitIndex).trimStart();
    }

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

    const handleViewProfile = () => {
        const detailId = isSent ? pitch.target?.profile?.id : pitch.influencer?.influencerProfile?.id;
        if (!detailId) return;

        const route = isSent
            ? FRONTEND_ROUTES.DASHBOARD.BRAND_DETAIL(detailId)
            : FRONTEND_ROUTES.DASHBOARD.INFLUENCER_DETAIL(detailId);

        router.push(route);
    };

    // The user to display (the other party)
    const otherParty = isSent ? pitch.target : pitch.influencer?.influencerProfile;
    const profile = otherParty?.profile || otherParty;

    const statusConfig = {
        [PitchStatus.PENDING]: {
            color: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20',
            icon: <Clock size={14} />,
            label: 'Pending'
        },
        [PitchStatus.ACCEPTED]: {
            color: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/20',
            icon: <CheckCircle2 size={14} />,
            label: 'Accepted'
        },
        [PitchStatus.REJECTED]: {
            color: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/20',
            icon: <XCircle size={14} />,
            label: 'Rejected'
        }
    };

    const config = statusConfig[pitch.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 min-h-[340px] flex flex-col"
        >
            <div className="p-6 space-y-6 flex flex-col flex-1">
                {/* Header: User Info & Status */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div
                        className="flex items-center gap-3 cursor-pointer group/author"
                        onClick={handleViewProfile}
                    >
                        <Avatar className="w-12 h-12 rounded-2xl border border-border/50 shadow-sm group-hover/author:border-primary/50 transition-all">
                            <AvatarImage src={profile?.avatarUrl || profile?.profileImage} />
                            <AvatarFallback className="bg-primary/5 text-primary font-black italic">
                                {profile?.fullName?.charAt(0) || '?'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="font-black text-sm uppercase tracking-tight truncate max-w-[140px] sm:max-w-[200px] group-hover/author:text-primary transition-colors">
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
                <div className="space-y-3 flex-1 flex flex-col">
                    <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-primary/10 rounded-full" />

                        {isLongMessage ? (
                            <Accordion
                                type="single"
                                collapsible
                                value={isExpanded ? 'message' : ''}
                                onValueChange={(val) => setIsExpanded(val === 'message')}
                                className="w-full"
                            >
                                <AccordionItem value="message" className="border-none">
                                    <p className="text-sm font-medium leading-relaxed text-foreground/80 pl-4 italic">
                                        "{previewText}{!isExpanded ? '..."' : ''}
                                    </p>
                                    <AccordionContent className="pb-0 pt-1 pl-4">
                                        <p className="text-sm font-medium leading-relaxed text-foreground/80 italic">
                                            {remainingText}"
                                        </p>
                                    </AccordionContent>
                                    <AccordionTrigger
                                        className="w-fit py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 pl-4 transition-colors gap-1.5 flex items-center cursor-pointer mt-1 hover:no-underline border-none p-0 focus-visible:ring-0 [&>svg]:text-primary [&>svg]:size-3.5 [&>svg]:translate-y-0 bg-transparent hover:bg-transparent shadow-none"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {isExpanded ? 'Read Less' : 'Read More'}
                                    </AccordionTrigger>
                                </AccordionItem>
                            </Accordion>
                        ) : (
                            <p className="text-sm font-medium leading-relaxed text-foreground/80 pl-4 italic">
                                "{pitch.message}"
                            </p>
                        )}
                    </div>

                    {pitch.workUrl && (
                        <div className="mt-auto">
                            <a
                                href={pitch.workUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-2xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-all group/link w-full sm:w-fit"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest">View Reference Work</span>
                                <ExternalLink size={12} className="opacity-50" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className={cn(
                    "pt-4 flex border-t border-border/50 gap-2 mt-auto",
                    pitch.status === PitchStatus.ACCEPTED ? "flex-row items-center" : "flex-col sm:flex-row sm:items-center justify-between",
                    isSent && pitch.status !== PitchStatus.ACCEPTED && "hidden"
                )}>
                    {!isSent && (
                        <Button
                            size="sm"
                            className={cn(
                                "h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all gap-2",
                                pitch.status === PitchStatus.ACCEPTED ? "flex-1" : "w-full sm:w-auto"
                            )}
                            onClick={handleViewProfile}
                        >
                            <Eye size={14} />
                            View Profile
                        </Button>
                    )}

                    {pitch.status === PitchStatus.ACCEPTED && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-initial h-10 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 gap-2"
                            onClick={handleMessage}
                            disabled={isStartingChat}
                        >
                            <MessageSquare size={14} />
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
