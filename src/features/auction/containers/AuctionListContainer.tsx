'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuctions } from '@/hooks/use-auction.hooks';
import { useAuth } from '@/contexts/auth-context';
import { AuctionListHeader } from '../components/AuctionListHeader';
import { AuctionSearch } from '../components/AuctionSearch';
import { AuctionList } from '../components/AuctionList';
import { FRONTEND_ROUTES } from '@/constants';
import { toast } from 'sonner';

export const AuctionListContainer = () => {
    const { data: auctions = [], isLoading } = useAuctions();
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    const filteredAuctions = auctions.filter(auction =>
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

            <AuctionSearch
                search={search}
                onSearchChange={setSearch}
                onFilterClick={handleFilterClick}
            />

            <AuctionList
                auctions={filteredAuctions}
                isLoading={isLoading}
            />
        </div>
    );
};
