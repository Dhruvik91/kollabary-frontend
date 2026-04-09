'use client';

import { useState } from 'react';
import { Bid, BidStatus } from '@/types/auction.types';
import { Button } from '@/components/ui/button';
import { Check, X, User, DollarSign, MessageCircle, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { AnimatedModal } from '@/components/modal/AnimatedModal';

interface BidListProps {
    bids: Bid[];
    onAccept: (bidId: string) => void;
    onReject: (bidId: string) => void;
    isProcessing?: boolean;
    showActions?: boolean;
}

export const BidList = ({ bids, onAccept, onReject, isProcessing, showActions = true }: BidListProps) => {
    const router = useRouter();
    const [rejectingBidId, setRejectingBidId] = useState<string | null>(null);

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

    const confirmReject = () => {
        if (rejectingBidId) {
            onReject(rejectingBidId);
            setRejectingBidId(null);
        }
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
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, ease: "easeOut" }}
                        className={`group relative p-4 sm:p-5 rounded-[1.5rem] border-2 transition-all duration-500 overflow-hidden ${bid.status === BidStatus.ACCEPTED
                            ? 'border-primary/40 bg-primary/5 shadow-xl shadow-primary/5'
                            : 'border-border/30 bg-background/40'
                            }`}
                    >
                        {/* Status Accent Glow */}
                        <div className={`absolute -right-12 -top-12 h-24 w-24 rounded-full blur-3xl opacity-20 transition-all duration-500 ${bid.status === BidStatus.ACCEPTED ? 'bg-green-500' : 'bg-primary'
                            }`} />

                        <div className="flex flex-col gap-5 relative z-10">
                            {/* Header: Avatar, Info, Status */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer ring-1 ring-border/50 transition-all duration-300 shadow-inner"
                                        onClick={() => influencerId && handleInfluencerClick(influencerId)}
                                    >
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt={influencerName} className="w-full h-full object-cover transition-transform duration-500" />
                                        ) : (
                                            <User className="text-primary/60" size={22} />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4
                                            className="font-black text-sm uppercase tracking-[0.05em] text-foreground truncate cursor-pointer hover:text-primary transition-colors duration-300"
                                            onClick={() => influencerId && handleInfluencerClick(influencerId)}
                                        >
                                            {influencerName}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10 border border-primary/20">
                                                <DollarSign size={10} className="text-primary" />
                                                <span className="text-xs font-black text-primary tracking-tighter italic">{bid.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border-2 backdrop-blur-md transition-all duration-300 overflow-hidden ${bid.status === BidStatus.ACCEPTED ? 'bg-green-500/10 text-green-600 border-green-500/10' :
                                    bid.status === BidStatus.REJECTED ? 'bg-red-500/10 text-red-600 border-red-500/10' :
                                        'bg-zinc-100/50 dark:bg-zinc-800/50 text-muted-foreground/80 border-border/10'
                                    }`}>
                                    <div className={`h-1.5 w-1.5 rounded-full ${bid.status === BidStatus.ACCEPTED ? 'bg-green-500 animate-pulse' : bid.status === BidStatus.PENDING ? 'bg-primary/50' : 'bg-muted-foreground/30'}`} />
                                    {bid.status}
                                </div>
                            </div>

                            {/* Proposal Body */}
                            <div className="relative group/proposal">
                                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 to-transparent rounded-full opacity-40 group-hover:opacity-100 transition-all duration-300" />
                                <p className="text-xs text-foreground/80 leading-relaxed font-medium italic pl-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                    "{bid.proposal}"
                                </p>
                            </div>

                            {/* Action Area */}
                            {showActions && bid.status === BidStatus.PENDING && (
                                <div className="flex gap-2 pt-2 border-t border-border/20 mt-1">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setRejectingBidId(bid.id)}
                                        disabled={isProcessing}
                                        className="rounded-xl h-10 w-11 p-0 border-2 border-border/40 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300 active:scale-90 group/btn"
                                    >
                                        <X size={16} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => onAccept(bid.id)}
                                        disabled={isProcessing}
                                        className="flex-1 rounded-xl h-10 font-black uppercase text-[10px] tracking-[0.2em] gap-3 shadow-lg shadow-primary/20 transition-all duration-300 active:scale-95 bg-primary hover:bg-primary/90 text-white border-2 border-white/10 group/accept"
                                    >
                                        <Check size={16} className="group-hover/accept:scale-125 transition-transform duration-300" />
                                        Accept Proposal
                                    </Button>
                                </div>
                            )}

                            {bid.status === BidStatus.ACCEPTED && (
                                <div className="flex items-center justify-center gap-3 text-green-500 font-black uppercase text-[9px] tracking-[0.2em] py-3 bg-green-500/5 rounded-2xl border-2 border-green-500/10 mt-1 shadow-inner group-hover:bg-green-500/10 transition-colors">
                                    <div className="p-1 rounded-full bg-green-500 text-white">
                                        <CheckCircle size={10} strokeWidth={4} />
                                    </div>
                                    Success: Bid Awarded
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}

            <AnimatedModal
                isOpen={!!rejectingBidId}
                onClose={() => setRejectingBidId(null)}
                title={
                    <div className="flex items-center gap-3 text-red-500">
                        <AlertTriangle className="h-6 w-6" />
                        <span>Reject Bid?</span>
                    </div>
                }
                description="Are you sure you want to reject this proposal? This action cannot be undone, and the influencer will be notified."
                footer={
                    <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
                        <Button
                            variant="ghost"
                            onClick={() => setRejectingBidId(null)}
                            className="rounded-xl font-bold uppercase text-[10px] tracking-widest w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmReject}
                            className="rounded-xl font-black uppercase text-[10px] tracking-widest px-8 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 w-full sm:w-auto"
                        >
                            Confirm Rejection
                        </Button>
                    </div>
                }
            >
                <div className="py-4 space-y-4">
                    {(() => {
                        const bid = bids.find(b => b.id === rejectingBidId);
                        if (!bid) return null;
                        const name = bid.influencer.influencerProfile?.fullName || bid.influencer.profile?.fullName || 'this influencer';
                        return (
                            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    You are about to reject the bid from <span className="font-bold text-red-500">{name}</span> for <span className="font-bold text-foreground">${bid.amount}</span>.
                                </p>
                            </div>
                        );
                    })()}
                </div>
            </AnimatedModal>
        </div>
    );
};
