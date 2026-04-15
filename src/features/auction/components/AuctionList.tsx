import { Auction, BidStatus } from '@/types/auction.types';
import { AuctionCard } from './AuctionCard';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';

interface AuctionListProps {
    auctions: (Auction & { myBidStatus?: BidStatus })[];
    isLoading: boolean;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => void;
    emptyMessage?: string;
    /** When true, removes owner action menus from cards (used for history / read-only views) */
    readOnly?: boolean;
}

export const AuctionList = ({
    auctions,
    isLoading,
    hasNextPage,
    isFetchingNextPage = false,
    fetchNextPage = () => {},
    emptyMessage = "No active auctions found",
    readOnly = false,
}: AuctionListProps) => {
    return (
        <InfiniteScrollContainer
            items={auctions}
            renderItem={(auction) => (
                <AuctionCard key={auction.id} auction={auction} readOnly={readOnly} />
            )}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            gridClassName="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
            loader={
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 w-full">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[380px] rounded-[2rem] bg-muted/50 animate-pulse border border-border/50" />
                    ))}
                </div>
            }
            emptyState={
                <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-card/50 backdrop-blur-xl border border-border/50 rounded-[3rem] shadow-2xl shadow-black/5">
                    <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">No Results</h3>
                    <p className="text-muted-foreground max-w-md mx-auto font-medium italic">
                        {emptyMessage}
                    </p>
                </div>
            }
            endMessage={
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center border-t border-border/50 mt-8 w-full"
                >
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                        You've reached the end of the line
                    </p>
                </motion.div>
            }
        />
    );
};
