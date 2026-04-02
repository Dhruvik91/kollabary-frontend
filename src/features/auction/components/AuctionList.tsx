'use client';

import { Auction } from '@/types/auction.types';
import { AuctionCard } from './AuctionCard';
import { Gavel } from 'lucide-react';

interface AuctionListProps {
    auctions: Auction[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export const AuctionList = ({ auctions, isLoading, emptyMessage }: AuctionListProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-80 rounded-[2rem] bg-muted dark:bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (auctions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-muted/40 dark:bg-white/2 rounded-[2rem] border-2 border-dashed border-border/60">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Gavel size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-widest text-foreground">No Auctions Found</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto font-medium">
                    {emptyMessage || "There are no active collaboration auctions at the moment. Check back later!"}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
            ))}
        </div>
    );
};
