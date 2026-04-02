'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuctions, useMyBids, useMyAuctions } from '@/hooks/use-auction.hooks';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { AuctionListHeader } from '../components/AuctionListHeader';
import { AuctionSearch } from '../components/AuctionSearch';
import { AuctionList } from '../components/AuctionList';
import { FRONTEND_ROUTES } from '@/constants';
import { toast } from 'sonner';

export const AuctionListContainer = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'my-bids' | 'my-auctions'>('all');

    const { data: allAuctions = [], isLoading: isLoadingAll } = useAuctions();
    const { data: myBids = [], isLoading: isLoadingMyBids } = useMyBids();
    const { data: myAuctions = [], isLoading: isLoadingMyAuctions } = useMyAuctions();

    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const isBrand = user?.role === UserRole.USER;

    const filteredAuctions = allAuctions.filter(auction =>
        auction.title.toLowerCase().includes(search.toLowerCase()) ||
        auction.description.toLowerCase().includes(search.toLowerCase())
    );

    // Map bids to their auctions for display
    const bidAuctions = myBids.map(bid => ({
        ...bid.auction,
        myBidStatus: bid.status
    }));

    const filteredMyBids = bidAuctions.filter(auction =>
        auction.title.toLowerCase().includes(search.toLowerCase()) ||
        auction.description.toLowerCase().includes(search.toLowerCase())
    );

    const filteredMyAuctions = myAuctions.filter(auction =>
        auction.title.toLowerCase().includes(search.toLowerCase()) ||
        auction.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreateClick = () => {
        router.push(FRONTEND_ROUTES.DASHBOARD.AUCTION_CREATE);
    };

    const handleFilterClick = () => {
        toast.info('Advanced filters for auctions are coming soon!');
    };

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 md:px-0">
            <AuctionListHeader
                userRole={user?.role}
                onCreateClick={handleCreateClick}
            />

            <div className="space-y-6">
                {(isInfluencer || isBrand) && (
                    <div className="flex p-1 bg-card border border-border rounded-2xl w-full sm:w-[350px]">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`flex-1 h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                                activeTab === 'all' 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Explore
                        </button>
                        {isInfluencer ? (
                            <button
                                onClick={() => setActiveTab('my-bids')}
                                className={`flex-1 h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                                    activeTab === 'my-bids' 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                My Bids ({myBids.length})
                            </button>
                        ) : (
                            <button
                                onClick={() => setActiveTab('my-auctions')}
                                className={`flex-1 h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                                    activeTab === 'my-auctions' 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                My History ({myAuctions.length})
                            </button>
                        )}
                    </div>
                )}

                <AuctionSearch
                    search={search}
                    onSearchChange={setSearch}
                    onFilterClick={handleFilterClick}
                />

                {activeTab === 'all' ? (
                    <AuctionList
                        auctions={filteredAuctions}
                        isLoading={isLoadingAll}
                    />
                ) : activeTab === 'my-bids' ? (
                    <AuctionList
                        auctions={filteredMyBids as any}
                        isLoading={isLoadingMyBids}
                        emptyMessage="You haven't placed any bids yet."
                    />
                ) : (
                    <AuctionList
                        auctions={filteredMyAuctions}
                        isLoading={isLoadingMyAuctions}
                        emptyMessage="You haven't created any auctions yet."
                    />
                )}
            </div>
        </div>
    );
};
