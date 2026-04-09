'use client';

import { Gavel, Calendar, DollarSign, Tag, User, Edit2, Trash2, MoreVertical, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion"
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { useDeleteAuction } from '@/hooks/use-auction.hooks';
import { useState } from 'react';
import { Auction, AuctionStatus, BidStatus } from '@/types/auction.types';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { formatCollaborationType } from '@/lib/format-collaboration-type';

interface AuctionCardProps {
    auction: Auction & { myBidStatus?: BidStatus };
}

export const AuctionCard = ({ auction }: AuctionCardProps) => {
    const { id, title, description, minBudget, maxBudget, deadline, status, category, creator, myBidStatus } = auction;
    const router = useRouter();
    const { user } = useAuth();
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const isOwner = user?.id === creator.id;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { mutateAsync: deleteAuction, isPending: isDeleting } = useDeleteAuction();

    const formattedDeadline = format(new Date(deadline), 'PPP');
    const budgetRange = minBudget && maxBudget
        ? `$${minBudget} - $${maxBudget}`
        : minBudget ? `From $${minBudget}` : maxBudget ? `Up to $${maxBudget}` : 'Competitive';

    const getStatusStyles = (status: BidStatus) => {
        switch (status) {
            case BidStatus.ACCEPTED:
                return { color: 'text-green-500 bg-green-500/10', icon: CheckCircle };
            case BidStatus.REJECTED:
                return { color: 'text-red-500 bg-red-500/10', icon: XCircle };
            default:
                return { color: 'text-yellow-500 bg-yellow-500/10', icon: Clock };
        }
    };

    const StatusIcon = myBidStatus ? getStatusStyles(myBidStatus).icon : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card className="border-border bg-card shadow-sm hover:border-primary/20 transition-all duration-500 ease-out rounded-[2rem] h-full flex flex-col border p-0 overflow-hidden">
                <CardContent className="p-6 flex flex-col gap-4 h-full relative">
                    {/* Header: Title and Creator */}
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                            <div className="space-y-2 flex-1 min-w-0">
                                <h3 className="text-xl font-black tracking-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                    {title}
                                </h3>
                                {myBidStatus && (
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyles(myBidStatus).color}`}>
                                        {StatusIcon && <StatusIcon size={12} />}
                                        My Bid: {myBidStatus}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2 self-end sm:self-start">
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${status === AuctionStatus.OPEN ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {status}
                                </div>

                                {isOwner && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-muted">
                                                <MoreVertical size={14} className="text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl border-border/50">
                                            <DropdownMenuItem
                                                onClick={() => router.push(`${FRONTEND_ROUTES.DASHBOARD.AUCTION_DETAIL(id)}/edit`)}
                                                className="gap-2 font-bold text-xs uppercase tracking-widest cursor-pointer"
                                            >
                                                <Edit2 size={14} />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setShowDeleteModal(true)}
                                                className="gap-2 font-bold text-xs uppercase tracking-widest text-destructive focus:text-destructive cursor-pointer"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                {creator.profile?.avatarUrl ? (
                                    <img src={creator.profile.avatarUrl} alt={creator.profile.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={12} className="text-primary" />
                                )}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider truncate">
                                {creator.profile?.fullName || 'Brand Name'}
                            </span>
                        </div>
                    </div>

                    {/* Category Tag */}
                    {category && (
                        <div className="flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-primary/5 text-primary border border-primary/10">
                                <Tag size={10} />
                                {formatCollaborationType(category)}
                            </span>
                        </div>
                    )}

                    {/* Description excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {description}
                    </p>

                    {/* Stats/Info Grid */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-muted/50 dark:bg-white/2 rounded-2xl border border-border mt-auto">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter flex items-center gap-1">
                                <DollarSign size={10} /> Budget
                            </span>
                            <p className="text-sm font-black italic truncate">{budgetRange}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter flex items-center gap-1">
                                <Calendar size={10} /> Deadline
                            </span>
                            <p className="text-sm font-black italic truncate">{formattedDeadline}</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <Button
                            onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.AUCTION_DETAIL(id))}
                            className="w-full h-11 rounded-xl font-black text-xs uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95 transition-all text-white"
                        >
                            <Gavel size={16} strokeWidth={3} />
                            {isInfluencer && status === AuctionStatus.OPEN ? 'Place Bid' : 'View Details'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <AnimatedModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title={
                    <div className="flex items-center gap-3 text-red-500">
                        <AlertTriangle className="h-6 w-6" />
                        <span>Delete Auction?</span>
                    </div>
                }
                description="Are you sure you want to delete this auction? This action cannot be undone."
                footer={
                    <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
                        <Button
                            variant="ghost"
                            onClick={() => setShowDeleteModal(false)}
                            className="rounded-xl font-bold uppercase text-[10px] tracking-widest w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={async () => {
                                await deleteAuction(id);
                                setShowDeleteModal(false);
                            }}
                            className="rounded-xl font-black uppercase text-[10px] tracking-widest px-8 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 w-full sm:w-auto"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Forever'}
                        </Button>
                    </div>
                }
            >
                <div className="py-4">
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                        <p className="text-sm text-foreground/80 leading-relaxed text-left">
                            You are about to permanently delete <span className="font-bold text-foreground">"{title}"</span>.
                            This action will remove the auction and all associated bids from our system forever.
                        </p>
                    </div>
                </div>
            </AnimatedModal>
        </motion.div>
    );
};
