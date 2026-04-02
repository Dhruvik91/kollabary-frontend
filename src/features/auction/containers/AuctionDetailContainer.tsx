'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BidForm } from '@/features/auction/components/BidForm';
import { BidList } from '@/features/auction/components/BidList';
import { CreateBidDto } from '@/types/auction.types';
import {
    useAuctionDetail,
    usePlaceBid,
    useAcceptBid,
    useDeleteAuction,
    useRejectBid
} from '@/hooks/use-auction.hooks';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { BackButton } from '@/components/shared/BackButton';
import { FRONTEND_ROUTES } from '@/constants';
import { AuctionDetailHeader } from '../components/AuctionDetailHeader';
import { AuctionInfoGrid } from '../components/AuctionInfoGrid';
import { BrandCard } from '../components/BrandCard';
import { messagingService } from '@/services/messaging.service';
import { toast } from 'sonner';

interface AuctionDetailContainerProps {
    id: string;
}

export const AuctionDetailContainer = ({ id }: AuctionDetailContainerProps) => {
    const { user } = useAuth();
    const router = useRouter();

    const { data: auction, isLoading, isError } = useAuctionDetail(id);
    const placeBidMutation = usePlaceBid(id);
    const acceptBidMutation = useAcceptBid(id);
    const rejectBidMutation = useRejectBid(id);
    const { mutateAsync: deleteAuction } = useDeleteAuction();

    const handlePlaceBid = async (data: CreateBidDto) => {
        await placeBidMutation.mutateAsync(data);
    };

    const handleAcceptBid = async (bidId: string) => {
        if (!auction) return;
        try {
            await acceptBidMutation.mutateAsync(bidId);
        } catch (error) {
            // Error handled by mutation hook
        }
    };

    const handleRejectBid = async (bidId: string) => {
        if (!auction) return;
        try {
            await rejectBidMutation.mutateAsync(bidId);
        } catch (error) {
            // Error handled by mutation hook
        }
    };

    const handleContactClick = async () => {
        if (!auction) return;
        try {
            const conversation = await messagingService.getOrCreateConversation(auction.creator.id);
            router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
        } catch (error) {
            toast.error('Failed to start conversation. Please try again.');
        }
    };

    const handleEdit = () => {
        router.push(`${FRONTEND_ROUTES.DASHBOARD.AUCTION_DETAIL(id)}/edit`);
    };

    const handleRemove = async () => {
        try {
            await deleteAuction(id);
            router.push(FRONTEND_ROUTES.DASHBOARD.AUCTIONS);
        } catch (error) {
            // Error managed by hook
        }
    };

    if (isLoading) {
        return <AuctionDetailSkeleton />;
    }

    if (isError || !auction) {
        return <AuctionNotFound onBack={() => router.back()} />;
    }

    const isOwner = user?.id === auction.creator.id;
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const hasAlreadyBid = auction.bids?.some(bid => bid.influencer.id === user?.id);
    const isCompleted = auction.status === 'COMPLETED';

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 md:px-0">
            <div className="flex items-center justify-between">
                <BackButton label="Back to Auctions" className="p-0" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden">
                        <AuctionDetailHeader
                            auction={auction}
                            isCompleted={isCompleted}
                            onEdit={isOwner && !isCompleted ? handleEdit : undefined}
                            onDelete={isOwner ? handleRemove : undefined}
                        />

                        <div className="mt-8 space-y-6">
                            <AuctionInfoGrid
                                minBudget={auction.minBudget || 0}
                                maxBudget={auction.maxBudget || 'Open'}
                                deadline={auction.deadline}
                                category={auction.category || 'General'}
                                bidsCount={auction.bids?.length || 0}
                            />

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">About this Opportunity</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {auction.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bid Management / List */}
                    {isOwner && (
                        <div className="bg-card border border-border rounded-2xl overflow-hidden backdrop-blur-xl">
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Auction Bids</h3>
                                    <p className="text-sm text-muted-foreground">Review and accept the best proposal.</p>
                                </div>
                                <div className="px-3 py-1 rounded-full border border-primary/50 text-primary text-xs font-medium">
                                    {auction.bids?.length || 0} Total
                                </div>
                            </div>
                            <BidList
                                bids={auction.bids || []}
                                onAccept={handleAcceptBid}
                                onReject={handleRejectBid}
                                showActions={true}
                                isProcessing={acceptBidMutation.isPending}
                            />
                        </div>
                    )}

                    {!isOwner && isCompleted && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center backdrop-blur-xl">
                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground">Auction Completed</h3>
                            <p className="text-muted-foreground mt-2">This opportunity has been successfully awarded.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-8">
                    {isInfluencer && !isCompleted && (
                        <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl sticky top-8">
                            {hasAlreadyBid ? (
                                <div className="text-center space-y-4 py-4">
                                    {(() => {
                                        const myBid = auction.bids?.find(bid => bid.influencer.id === user?.id);
                                        const isRejected = myBid?.status === 'REJECTED';
                                        const isAccepted = myBid?.status === 'ACCEPTED';

                                        return (
                                            <>
                                                <div className={`p-3 rounded-full w-fit mx-auto ${isAccepted ? 'bg-green-500/20' : isRejected ? 'bg-red-500/20' : 'bg-primary/20'
                                                    }`}>
                                                    {isAccepted ? <CheckCircle className="h-8 w-8 text-green-500" /> :
                                                        isRejected ? <XCircle className="h-8 w-8 text-red-500" /> :
                                                            <Clock className="h-8 w-8 text-primary" />}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-foreground">
                                                        {isAccepted ? 'Bid Accepted!' : isRejected ? 'Bid Rejected' : 'You\'ve Already Bid'}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {isAccepted
                                                            ? 'Congratulations! The brand has accepted your proposal.'
                                                            : isRejected
                                                                ? 'The brand has decided to move forward with another proposal.'
                                                                : 'Your proposal is being reviewed by the brand.'}
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        <h3 className="text-lg font-bold text-foreground">Place Your Bid</h3>
                                    </div>
                                    <BidForm
                                        onSubmit={handlePlaceBid}
                                        isLoading={placeBidMutation.isPending}
                                        suggestedMin={auction.minBudget}
                                        suggestedMax={auction.maxBudget}
                                    />
                                </>
                            )}
                        </div>
                    )}

                    <BrandCard
                        brandName={auction.creator.profile?.fullName || 'Brand'}
                        avatarLetter={auction.creator.profile?.fullName?.charAt(0) || 'B'}
                        avatarUrl={auction.creator.profile?.avatarUrl}
                        onContactClick={handleContactClick}
                    />
                </div>
            </div>
        </div>
    );
};

const AuctionDetailSkeleton = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
        <Skeleton className="h-10 w-32 bg-white/5" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 rounded-2xl bg-white/5" />
                <Skeleton className="h-96 rounded-2xl bg-white/5" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-48 rounded-2xl bg-white/5" />
                <Skeleton className="h-96 rounded-2xl bg-white/5" />
            </div>
        </div>
    </div>
);

const AuctionNotFound = ({ onBack }: { onBack: () => void }) => (
    <div className="max-w-2xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground">Auction not found</h2>
        <p className="text-muted-foreground mt-2">The auction you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <BackButton label="Back to Auctions" className="mt-6 px-6 h-10 border border-border/50" />
    </div>
);
