'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BidForm } from '@/features/auction/components/BidForm';
import { BidList } from '@/features/auction/components/BidList';
import { CreateBidDto } from '@/types/auction.types';
import { useAuctionDetail, usePlaceBid, useAcceptBid } from '@/hooks/use-auction.hooks';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import { AuctionDetailHeader } from '../components/AuctionDetailHeader';
import { AuctionInfoGrid } from '../components/AuctionInfoGrid';
import { BrandCard } from '../components/BrandCard';

interface AuctionDetailContainerProps {
    id: string;
}

export const AuctionDetailContainer = ({ id }: AuctionDetailContainerProps) => {
    const { user } = useAuth();
    const router = useRouter();

    const { data: auction, isLoading, isError } = useAuctionDetail(id);
    const placeBidMutation = usePlaceBid(id);
    const acceptBidMutation = useAcceptBid(id);

    const handlePlaceBid = async (data: CreateBidDto) => {
        await placeBidMutation.mutateAsync(data);
    };

    const handleAcceptBid = async (bidId: string) => {
        await acceptBidMutation.mutateAsync(bidId);
        router.refresh();
    };

    if (isLoading) {
        return <AuctionDetailSkeleton />;
    }

    if (isError || !auction) {
        return <AuctionNotFound onBack={() => router.push(FRONTEND_ROUTES.DASHBOARD.AUCTIONS)} />;
    }

    const isOwner = user?.id === auction.creator.id;
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const hasAlreadyBid = auction.bids?.some(bid => bid.influencer.id === user?.id);
    const isCompleted = auction.status === 'COMPLETED';

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 md:px-0">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Auctions
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden">
                        <AuctionDetailHeader auction={auction} isCompleted={isCompleted} />

                        <div className="mt-8 space-y-6">
                            <AuctionInfoGrid
                                minBudget={auction.minBudget || 0}
                                maxBudget={auction.maxBudget || 'Open'}
                                deadline={auction.deadline}
                                category={auction.category || 'General'}
                                bidsCount={auction.bids?.length || 0}
                            />

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-white">About this Opportunity</h3>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {auction.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bid Management / List */}
                    {isOwner && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Auction Bids</h3>
                                    <p className="text-sm text-gray-400">Review and accept the best proposal.</p>
                                </div>
                                <div className="px-3 py-1 rounded-full border border-primary/50 text-primary text-xs font-medium">
                                    {auction.bids?.length || 0} Total
                                </div>
                            </div>
                            <BidList
                                bids={auction.bids || []}
                                onAccept={handleAcceptBid}
                                onReject={() => { }}
                                showActions={true}
                            />
                        </div>
                    )}

                    {!isOwner && isCompleted && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center backdrop-blur-xl">
                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white">Auction Completed</h3>
                            <p className="text-gray-400 mt-2">This opportunity has been successfully awarded.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-8">
                    {isInfluencer && !isCompleted && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl sticky top-8">
                            {hasAlreadyBid ? (
                                <div className="text-center space-y-4 py-4">
                                    <div className="bg-primary/20 p-3 rounded-full w-fit mx-auto">
                                        <CheckCircle className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">You&apos;ve Already Bid</h3>
                                        <p className="text-sm text-gray-400 mt-1">Your proposal is being reviewed by the brand.</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        <h3 className="text-lg font-bold text-white">Place Your Bid</h3>
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
                        onContactClick={() => { }}
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
        <h2 className="text-2xl font-bold text-white">Auction not found</h2>
        <p className="text-gray-400 mt-2">The auction you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button onClick={onBack} className="mt-6 bg-primary text-black">
            Back to Auctions
        </Button>
    </div>
);
