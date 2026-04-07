'use client';

import { Auction, BidStatus } from '@/types/auction.types';
import { AuctionCard } from './AuctionCard';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuctionListProps {
    auctions: (Auction & { myBidStatus?: BidStatus })[];
    isLoading: boolean;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => void;
    emptyMessage?: string;
}

export const AuctionList = ({
    auctions,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    emptyMessage = "No active auctions found"
}: AuctionListProps) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && fetchNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading && auctions.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[380px] rounded-[2rem] bg-muted/50 animate-pulse border border-border/50" />
                ))}
            </div>
        );
    }

    if (auctions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-card/50 backdrop-blur-xl border border-border/50 rounded-[3rem] shadow-2xl shadow-black/5">
                <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">No Results</h3>
                <p className="text-muted-foreground max-w-md mx-auto font-medium italic">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>

            {/* Load More Trigger */}
            {hasNextPage && (
                <div
                    ref={ref}
                    className="py-12 flex flex-col items-center justify-center gap-4 border-t border-border/50 mt-8"
                >
                    <div className="flex items-center gap-3 px-6 py-3 bg-card border border-border/50 rounded-2xl shadow-xl">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                            Loading more opportunities...
                        </span>
                    </div>
                </div>
            )}

            {!hasNextPage && auctions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center border-t border-border/50 mt-8"
                >
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                        You've reached the end of the line
                    </p>
                </motion.div>
            )}
        </div>
    );
};
