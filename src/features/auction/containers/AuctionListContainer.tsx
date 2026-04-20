'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteAuctions, useInfiniteMyBids, useInfiniteMyAuctions } from '@/hooks/use-auction.hooks';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { AuctionListHeader } from '../components/AuctionListHeader';
import { AuctionSearch } from '../components/AuctionSearch';
import { AuctionList } from '../components/AuctionList';
import { FRONTEND_ROUTES } from '@/constants';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AuctionListContainer = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [activeTab, setActiveTab] = useState('all');

    const filters = useMemo(() => ({
        search: debouncedSearch,
        limit: 9,
    }), [debouncedSearch]);
    
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const isBrand = user?.role === UserRole.USER || user?.role === UserRole.ADMIN;

    const { 
        data: allData, 
        isLoading: isLoadingAll,
        fetchNextPage: fetchNextAll,
        hasNextPage: hasNextAll,
        isFetchingNextPage: isFetchingNextAll
    } = useInfiniteAuctions(filters);

    const { 
        data: bidsData, 
        isLoading: isLoadingMyBids,
        fetchNextPage: fetchNextBids,
        hasNextPage: hasNextBids,
        isFetchingNextPage: isFetchingNextBids
    } = useInfiniteMyBids(filters, { enabled: isInfluencer });

    const { 
        data: myAuctionsData, 
        isLoading: isLoadingMyAuctions,
        fetchNextPage: fetchNextMyAuctions,
        hasNextPage: hasNextMyAuctions,
        isFetchingNextPage: isFetchingNextMyAuctions
    } = useInfiniteMyAuctions(filters, { enabled: isBrand });



    // Flatten pages
    const auctions = useMemo(() => 
        allData?.pages.flatMap(page => page.items) || [], 
    [allData]);

    const myBids = useMemo(() => 
        bidsData?.pages.flatMap(page => page.items) || [], 
    [bidsData]);

    const myAuctions = useMemo(() => 
        myAuctionsData?.pages.flatMap(page => page.items) || [], 
    [myAuctionsData]);

    // Bid auctions mapping
    const bidAuctions = useMemo(() => 
        myBids.map(bid => ({
            ...bid.auction,
            myBidStatus: bid.status
        })),
    [myBids]);

    const handleCreateClick = () => {
        router.push(FRONTEND_ROUTES.DASHBOARD.AUCTION_CREATE);
    };

    const handleFilterClick = () => {
        toast.info('Advanced filters for auctions are coming soon!');
    };

    const handleResetFilters = () => {
        setSearch('');
    };

    const hasActiveFilters = debouncedSearch.length > 0;

    return (
        <div className="space-y-6 sm:space-y-8 pb-20">
            <AuctionListHeader
                userRole={user?.role}
                onCreateClick={handleCreateClick}
            />

            <div className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {(isInfluencer || isBrand) && (
                        <div className="mb-8 w-full flex justify-start">
                            <div className="overflow-x-auto overflow-y-hidden scrollbar-none pb-2 max-w-full">
                                <TabsList className="h-12 p-1 bg-card border border-border rounded-2xl inline-flex w-fit items-center gap-1.5 shadow-sm overflow-y-hidden">
                                    <TabsTrigger 
                                        value="all"
                                        className="px-6 h-10 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all shrink-0"
                                    >
                                        Explore
                                    </TabsTrigger>
                                    {isInfluencer ? (
                                        <TabsTrigger 
                                            value="my-bids"
                                            className="px-6 h-10 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all shrink-0"
                                        >
                                            My Bids
                                        </TabsTrigger>
                                    ) : (
                                        <TabsTrigger 
                                            value="my-auctions"
                                            className="px-6 h-10 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all shrink-0"
                                        >
                                            My History
                                        </TabsTrigger>
                                    )}
                                </TabsList>
                            </div>
                        </div>
                    )}

                    <div className="mb-6">
                        <AuctionSearch
                            search={search}
                            onSearchChange={setSearch}
                            onFilterClick={handleFilterClick}
                        />
                    </div>

                    <TabsContent value="all" className="mt-0 outline-none">
                        <AuctionList
                            auctions={auctions}
                            isLoading={isLoadingAll}
                            hasNextPage={hasNextAll}
                            isFetchingNextPage={isFetchingNextAll}
                            fetchNextPage={fetchNextAll}
                            hasActiveFilters={hasActiveFilters}
                            onResetFilters={handleResetFilters}
                        />
                    </TabsContent>

                    <TabsContent value="my-bids" className="mt-0 outline-none">
                        <AuctionList
                            auctions={bidAuctions as any}
                            isLoading={isLoadingMyBids}
                            hasNextPage={hasNextBids}
                            isFetchingNextPage={isFetchingNextBids}
                            fetchNextPage={fetchNextBids}
                            emptyMessage="You haven't placed any bids yet."
                            hasActiveFilters={hasActiveFilters}
                            onResetFilters={handleResetFilters}
                        />
                    </TabsContent>

                    <TabsContent value="my-auctions" className="mt-0 outline-none">
                        <AuctionList
                            auctions={myAuctions}
                            isLoading={isLoadingMyAuctions}
                            hasNextPage={hasNextMyAuctions}
                            isFetchingNextPage={isFetchingNextMyAuctions}
                            fetchNextPage={fetchNextMyAuctions}
                            emptyMessage="You haven't created any auctions yet."
                            readOnly
                            hasActiveFilters={hasActiveFilters}
                            onResetFilters={handleResetFilters}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
