'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Calendar,
    DollarSign,
    Tag,
    User as UserIcon,
    Clock,
    Gavel,
    CheckCircle,
    MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BidForm } from '@/features/auction/components/BidForm';
import { BidList } from '@/features/auction/components/BidList';
import { CreateBidDto } from '@/types/auction.types';
import { useAuctionDetail, usePlaceBid, useAcceptBid } from '@/hooks/queries/use-auction.hooks';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { auctionService } from '@/features/auction/api/auction-service';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const auction = await auctionService.getAuctionDetail(params.id);
        return {
            title: `${auction.title} | Auctions | Kollabary`,
            description: auction.description.substring(0, 160),
        };
    } catch {
        return {
            title: 'Auction Details | Kollabary',
        };
    }
}

export default function AuctionDetailPage() {
    const { id } = useParams<{ id: string }>();
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
        return (
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
    }

    if (isError || !auction) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold text-white">Auction not found</h2>
                <p className="text-gray-400 mt-2">The auction you're looking for doesn't exist or has been removed.</p>
                <Button 
                    onClick={() => router.push('/auctions')} 
                    className="mt-6 bg-primary text-black"
                >
                    Back to Auctions
                </Button>
            </div>
        );
    }

    const isOwner = user?.id === auction.creator.id;
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const hasAlreadyBid = auction.bids?.some(bid => bid.influencer.id === user?.id);
    const isCompleted = auction.status === 'COMPLETED';

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
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
                        <div className="absolute top-0 right-0 p-6">
                            <Badge variant={isCompleted ? "secondary" : "outline"} className={isCompleted ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"}>
                                {auction.status}
                            </Badge>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold text-white">{auction.title}</h1>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <UserIcon className="h-4 w-4 text-primary" />
                                        <span>{auction.creator.profile?.fullName || 'Brand'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span>Posted {format(new Date(auction.createdAt), 'MMM dd, yyyy')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-white/10">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Budget Range</p>
                                    <p className="text-lg font-medium text-white flex items-center">
                                        <DollarSign className="h-4 w-4 text-primary" />
                                        {auction.minBudget || 0} - ${auction.maxBudget || 'Open'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Deadline</p>
                                    <p className="text-lg font-medium text-white flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        {format(new Date(auction.deadline), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Category</p>
                                    <p className="text-lg font-medium text-white flex items-center gap-1.5">
                                        <Tag className="h-4 w-4 text-primary" />
                                        {auction.category || 'General'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Bids Count</p>
                                    <p className="text-lg font-medium text-white flex items-center gap-1.5">
                                        <Gavel className="h-4 w-4 text-primary" />
                                        {auction.bids?.length || 0} Bids
                                    </p>
                                </div>
                            </div>

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
                                <Badge variant="outline" className="text-primary border-primary/50">
                                    {auction.bids?.length || 0} Total
                                </Badge>
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
                                        <h3 className="text-lg font-bold text-white">You've Already Bid</h3>
                                        <p className="text-sm text-gray-400 mt-1">Your proposal is being reviewed by the brand.</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-6">
                                        <Gavel className="h-5 w-5 text-primary" />
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

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Brand Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/30">
                                    {auction.creator.profile?.fullName?.charAt(0) || 'B'}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{auction.creator.profile?.fullName || 'Brand'}</p>
                                    <p className="text-xs text-gray-400">Verified Brand</p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Contact Brand
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
