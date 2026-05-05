'use client';

import posthog from 'posthog-js';
import { useState, useEffect } from 'react';
import { useConfetti } from '@/contexts/confetti-context';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, MessageCircle, PackageSearch, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { BidForm } from '@/features/auction/components/BidForm';
import { BidList } from '@/features/auction/components/BidList';
import { CreateBidDto } from '@/types/auction.types';
import {
    useAuctionDetail,
    usePlaceBid,
    useAcceptBid,
    useRejectBid
} from '@/hooks/use-auction.hooks';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { BackButton } from '@/components/shared/BackButton';
import { FRONTEND_ROUTES } from '@/constants';
import { AuctionDetailHeader } from '../components/AuctionDetailHeader';
import { AuctionInfoGrid } from '../components/AuctionInfoGrid';
import { BrandCard } from '../components/BrandCard';
import { useActionConsent } from '@/hooks/use-action-consent';

import { messagingService } from '@/services/messaging.service';
import { toast } from 'sonner';

interface AuctionDetailContainerProps {
    id: string;
}

export const AuctionDetailContainer = ({ id }: AuctionDetailContainerProps) => {
    const { user } = useAuth();
    const router = useRouter();
    const { triggerConfetti } = useConfetti();

    const { data: auction, isLoading, isError } = useAuctionDetail(id);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const { executeWithConsent, ConsentModalElement } = useActionConsent({
        actionType: 'BID_PLACE',
        title: 'Confirm Your Bid',
        actionName: 'Place Bid',
    });


    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Trigger confetti for influencer if their bid is accepted
    useEffect(() => {
        if (auction && user?.role === UserRole.INFLUENCER) {
            const myBid = auction.bids?.find((bid: any) => bid.influencer.id === user?.id);
            if (myBid?.status === 'ACCEPTED') {
                // Use a key in sessionStorage to ensure it only runs once per acceptance
                const storageKey = `confetti-bid-accepted-${myBid.id}`;
                if (!sessionStorage.getItem(storageKey)) {
                    triggerConfetti({ numberOfPieces: 500 });
                    sessionStorage.setItem(storageKey, 'true');
                }
            }
        }
    }, [auction, user]);

    const placeBidMutation = usePlaceBid(id);
    const acceptBidMutation = useAcceptBid(id);
    const rejectBidMutation = useRejectBid(id);

    const handlePlaceBid = async (data: CreateBidDto) => {
        executeWithConsent(async () => {
            await placeBidMutation.mutateAsync(data);
            posthog.capture('bid_submitted', {
                auction_id: id,
                bid_amount: data.amount,
            });
        });
    };


    const handleAcceptBid = async (bidId: string) => {
        if (!auction) return;
        try {
            await acceptBidMutation.mutateAsync(bidId);
            posthog.capture('bid_accepted', {
                auction_id: id,
                bid_id: bidId,
            });
            triggerConfetti({ numberOfPieces: 500 });
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

    if (isLoading) {
        return <AuctionDetailSkeleton />;
    }

    if (isError) {
        return (
            <div className="py-20">
                <ErrorState 
                    title="Edge case in the system" 
                    description="We couldn't retrieve this auction detail. It might be archived or temporarily unavailable." 
                    onRetry={() => window.location.reload()} 
                />
            </div>
        );
    }

    if (!auction) {
        return <AuctionNotFound />;
    }

    const isOwner = user?.id === auction.creator.id;
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const hasAlreadyBid = auction.bids?.some(bid => bid.influencer.id === user?.id);
    const isCompleted = auction.status === 'COMPLETED';

    const myBid = auction.bids?.find((bid: any) => bid.influencer.id === user?.id);
    const isBidAccepted = myBid?.status === 'ACCEPTED';

    return (
        <div className="space-y-6 sm:space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <BackButton label="Back to Auctions" className="p-0" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Auction Details & Brand Information */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Auction Details Section */}
                    <div className="bg-card border border-border rounded-[2rem] p-5 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-sm">
                        <AuctionDetailHeader
                            auction={auction}
                        />

                        <div className="mt-8 space-y-8">
                            <AuctionInfoGrid
                                minBudget={auction.minBudget || 0}
                                maxBudget={auction.maxBudget || 'Open'}
                                deadline={auction.deadline}
                                category={auction.category || 'General'}
                                bidsCount={auction.bids?.length || 0}
                            />

                            <div className="space-y-4">
                                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">About this Opportunity</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                                    {auction.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Brand Information moved here */}
                    <BrandCard
                        brandId={auction.creator.profile?.id || ''}
                        brandName={auction.creator.profile?.fullName || 'Brand'}
                        avatarLetter={auction.creator.profile?.fullName?.charAt(0) || 'B'}
                        avatarUrl={auction.creator.profile?.avatarUrl}
                        onContactClick={handleContactClick}
                        showContactButton={isBidAccepted}
                        className="rounded-[2rem] p-5 sm:p-8 border border-border bg-card shadow-sm"
                    />

                    {/* On Mobile & Small Desktop: Bids List / Bid Form follows here */}
                    <div className="xl:hidden space-y-8">
                        {isOwner && (
                            <Carousel
                                setApi={setApi}
                                className="mt-8 space-y-6"
                                opts={{
                                    align: "center",
                                    loop: false,
                                }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                                            <h3 className="text-2xl font-black uppercase tracking-tight text-foreground text-gradient">Auction Bids</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium italic ml-4.5">Swipe to review received proposals.</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4.5 sm:ml-0">
                                        <div className="px-5 py-2 rounded-full border-2 border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.2em] w-fit shadow-sm">
                                            {auction.bids?.length || 0} PROPOSALS
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CarouselPrevious className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-9 rounded-xl" />
                                            <CarouselNext className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-9 rounded-xl" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative -mx-4 sm:-mx-6 px-4 sm:px-6">
                                    <CarouselContent className="-ml-4 sm:-ml-6">
                                        {(auction.bids || []).map((bid: any) => (
                                            <CarouselItem key={bid.id} className="pl-4 sm:pl-6 basis-[88%] sm:basis-[420px]">
                                                <div className="pb-4">
                                                    <BidList
                                                        bids={[bid]}
                                                        onAccept={handleAcceptBid}
                                                        onReject={handleRejectBid}
                                                        showActions={true}
                                                        isProcessing={acceptBidMutation.isPending}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    {(auction?.bids?.length ?? 0) === 0 && (
                                        <div className="w-full text-center py-16 bg-card/40 rounded-[2.5rem] border-2 border-dashed border-border/30 backdrop-blur-sm">
                                            <div className="mx-auto w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center mb-6 ring-1 ring-primary/10">
                                                <MessageCircle className="text-primary/40" size={28} />
                                            </div>
                                            <h4 className="text-sm font-black text-foreground/70 uppercase tracking-[0.2em]">No Bids Yet</h4>
                                            <p className="text-xs text-muted-foreground mt-2 font-medium italic">Proposals will appear here once submitted.</p>
                                        </div>
                                    )}

                                    {/* Pagination / Scroll Indicators */}
                                    {count > 1 && (
                                        <div className="flex justify-center gap-2.5 mt-2">
                                            {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === current
                                                        ? 'w-10 bg-primary shadow-lg shadow-primary/20'
                                                        : 'w-2.5 bg-border/40 hover:bg-border/60'
                                                        }`}
                                                    onClick={() => api?.scrollTo(i)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Carousel>
                        )}

                        {isInfluencer && !isCompleted && (
                            <div className="bg-card border border-border rounded-[2rem] p-6 backdrop-blur-xl shadow-sm">
                                {hasAlreadyBid ? (
                                    <BidStatusDisplay auction={auction} user={user} />
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Place Your Bid</h3>
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

                        {!isOwner && isCompleted && (
                            <AuctionCompletedDisplay />
                        )}
                    </div>
                </div>

                {/* Right Column: Bids & Actions (Large Desktop only) */}
                <div className="hidden xl:block space-y-8">
                    {isOwner && (
                        <div className="bg-card border border-border rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-sm sticky top-8 flex flex-col max-h-[calc(100vh-120px)] transition-all duration-500 xl:block">
                            <div className="p-6 border-b border-border space-y-2 bg-card/80 backdrop-blur-md z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Auction Bids</h3>
                                    </div>
                                    <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
                                        {auction.bids?.length || 0} Total
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-medium italic opacity-70">Review and manage received proposals.</p>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                                <BidList
                                    bids={auction.bids || []}
                                    onAccept={handleAcceptBid}
                                    onReject={handleRejectBid}
                                    showActions={true}
                                    isProcessing={acceptBidMutation.isPending}
                                />
                            </div>
                            {(auction?.bids?.length ?? 0) > 0 && (
                                <div className="p-4 bg-zinc-50/50 dark:bg-white/5 border-t border-border/50 text-center">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center justify-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                                        End of Proposals
                                        <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {isInfluencer && !isCompleted && (
                        <div className="bg-card border border-border rounded-[2rem] p-6 backdrop-blur-xl sticky top-8 shadow-sm">
                            {hasAlreadyBid ? (
                                <BidStatusDisplay auction={auction} user={user} />
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Place Your Bid</h3>
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

                    {!isOwner && isCompleted && (
                        <AuctionCompletedDisplay />
                    )}
                </div>
            </div>
            {ConsentModalElement}
        </div>
    );
};


const BidStatusDisplay = ({ auction, user }: { auction: any, user: any }) => {
    const myBid = auction.bids?.find((bid: any) => bid.influencer.id === user?.id);
    const isRejected = myBid?.status === 'REJECTED';
    const isAccepted = myBid?.status === 'ACCEPTED';

    return (
        <div className="text-center space-y-4 py-4">
            <div className={`p-3 rounded-full w-fit mx-auto ${isAccepted ? 'bg-green-500/20' : isRejected ? 'bg-red-500/20' : 'bg-primary/20'
                }`}>
                {isAccepted ? <CheckCircle className="h-8 w-8 text-green-500" /> :
                    isRejected ? <XCircle className="h-8 w-8 text-red-500" /> :
                        <Clock className="h-8 w-8 text-primary" />}
            </div>
            <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
                    {isAccepted ? 'Bid Accepted!' : isRejected ? 'Bid Rejected' : 'You\'ve Already Bid'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 font-medium italic">
                    {isAccepted
                        ? 'Congratulations! The brand has accepted your proposal.'
                        : isRejected
                            ? 'The brand has decided to move forward with another proposal.'
                            : 'Your proposal is being reviewed by the brand.'}
                </p>
            </div>
        </div>
    );
};

const AuctionCompletedDisplay = () => (
    <div className="bg-green-500/10 border border-green-500/20 rounded-[2rem] p-8 text-center backdrop-blur-xl">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Auction Completed</h3>
        <p className="text-muted-foreground mt-2 font-medium italic">This opportunity has been successfully awarded.</p>
    </div>
);

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

const AuctionNotFound = () => (
    <div className="max-w-2xl mx-auto py-32 flex flex-col items-center text-center px-6">
        <div className="w-24 h-24 rounded-[2.5rem] bg-zinc-50 dark:bg-white/5 border border-border/50 flex items-center justify-center mb-8 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <PackageSearch size={40} className="text-muted-foreground/30 relative z-10 group-hover:text-primary/50 transition-colors duration-500" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-foreground text-gradient">Auction Not Found</h2>
        <p className="text-muted-foreground mt-3 max-w-sm font-medium italic">
            The opportunity you&apos;re looking for doesn&apos;t exist, has been removed, or moved to a different coordinate.
        </p>
        <div className="mt-10">
            <BackButton
                label="Return to Auctions Library"
                className="px-10 h-14 rounded-2xl border-2 border-primary/20 bg-background text-primary font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 active:scale-95"
            />
        </div>
    </div>
);
