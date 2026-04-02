'use client';

import { Bid, BidStatus } from '@/types/auction.types';
import { Button } from '@/components/ui/button';
import { Check, X, User, DollarSign, MessageCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';

interface BidListProps {
    bids: Bid[];
    onAccept: (bidId: string) => void;
    onReject: (bidId: string) => void;
    isProcessing?: boolean;
    showActions?: boolean;
}

export const BidList = ({ bids, onAccept, onReject, isProcessing, showActions = true }: BidListProps) => {
    const router = useRouter();

    if (bids.length === 0) {
        return (
            <div className="p-8 text-center bg-muted/30 dark:bg-white/2 rounded-2xl border-2 border-dashed border-border/60">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">No bids yet</p>
            </div>
        );
    }

    const handleInfluencerClick = (influencerId: string) => {
        router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCER_DETAIL(influencerId));
    };

    return (
        <div className="space-y-4">
            {bids.map((bid, index) => {
                const profile = bid.influencer.profile;
                const influencerProfile = bid.influencer.influencerProfile;

                const influencerName = influencerProfile?.fullName || profile?.fullName || profile?.username || 'Anonymous Influencer';
                const avatarUrl = influencerProfile?.avatarUrl || profile?.avatarUrl;
                const influencerId = influencerProfile?.id;

                return (
                    <motion.div
                        key={bid.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-2xl border-2 transition-all ${bid.status === BidStatus.ACCEPTED
                                ? 'border-green-500/30 bg-green-500/5 shadow-2xl shadow-green-500/5'
                                : 'border-border bg-card shadow-sm'
                            }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4 flex-1">
                                <div
                                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all"
                                    onClick={() => influencerId && handleInfluencerClick(influencerId)}
                                >
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={influencerName} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-primary" size={24} />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer group"
                                        onClick={() => influencerId && handleInfluencerClick(influencerId)}
                                    >
                                        <h4 className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">
                                            {influencerName}
                                        </h4>
                                        <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-primary font-black uppercase text-xs">
                                            <DollarSign size={14} />
                                            <span>{bid.amount}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted dark:bg-white/5 border border-border text-foreground">
                                            {bid.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 md:max-w-md lg:max-w-xl">
                                <div className="flex gap-2 items-start text-sm text-foreground/70 dark:text-muted-foreground italic">
                                    <MessageCircle size={16} className="mt-0.5 flex-shrink-0 text-primary/40" />
                                    <p>"{bid.proposal}"</p>
                                </div>
                            </div>

                            {showActions && bid.status === BidStatus.PENDING && (
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onReject(bid.id)}
                                        disabled={isProcessing}
                                        className="rounded-xl h-10 px-4 border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95"
                                    >
                                        <X size={16} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => onAccept(bid.id)}
                                        disabled={isProcessing}
                                        className="rounded-xl h-10 px-6 font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 bg-primary hover:bg-primary/90 text-white"
                                    >
                                        <Check size={16} />
                                        Accept Bid
                                    </Button>
                                </div>
                            )}

                            {bid.status === BidStatus.ACCEPTED && (
                                <div className="flex items-center gap-2 text-green-500 font-bold uppercase text-[10px] tracking-widest px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
                                    <Check size={14} />
                                    Accepted
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
