'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuctionList } from '@/features/auction/components/AuctionList';
import { useAuctions } from '@/hooks/queries/use-auction.hooks';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';

export default function AuctionsPage() {
    const { data: auctions = [], isLoading } = useAuctions();
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    const filteredAuctions = auctions.filter(auction =>
        auction.title.toLowerCase().includes(search.toLowerCase()) ||
        auction.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Gavel className="h-8 w-8 text-primary" />
                        Collaboration Auctions
                    </h1>
                    <p className="text-gray-400">
                        Browse and bid on exclusive collaboration opportunities.
                    </p>
                </div>

                {user?.role === UserRole.USER && (
                    <Button
                        onClick={() => router.push('/auctions/create')}
                        className="bg-primary hover:bg-primary/90 text-black font-semibold"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Auction
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search auctions by title or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-primary/50"
                    />
                </div>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            <AuctionList
                auctions={filteredAuctions}
                isLoading={isLoading}
            />

            {!isLoading && filteredAuctions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-white/5 p-6 rounded-full mb-4">
                        <Gavel className="h-12 w-12 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-medium text-white">No auctions found</h3>
                    <p className="text-gray-400 mt-2">
                        Try adjusting your search or check back later for new opportunities.
                    </p>
                </div>
            )}
        </div>
    );
}
