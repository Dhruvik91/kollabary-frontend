import { Auction, BidStatus } from '@/types/auction.types';
import { AuctionCard } from './AuctionCard';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';
import { motion } from 'framer-motion';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { PackageSearch, SearchX } from 'lucide-react';

interface AuctionListProps {
    auctions: (Auction & { myBidStatus?: BidStatus })[];
    isLoading: boolean;
    error?: any;
    onRetry?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => void;
    emptyMessage?: string;
    hasActiveFilters?: boolean;
    onResetFilters?: () => void;
    /** When true, removes owner action menus from cards (used for history / read-only views) */
    readOnly?: boolean;
}

export const AuctionList = ({
    auctions,
    isLoading,
    error,
    onRetry,
    hasNextPage,
    isFetchingNextPage = false,
    fetchNextPage = () => {},
    emptyMessage = "No active auctions found",
    hasActiveFilters = false,
    onResetFilters,
    readOnly = false,
}: AuctionListProps) => {
    if (error) {
        return <ErrorState onRetry={onRetry} />;
    }

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
                <EmptyState
                    title={hasActiveFilters ? "No matches found" : "No active auctions"}
                    description={hasActiveFilters 
                        ? "Try adjusting your search or filters to see more opportunities." 
                        : emptyMessage}
                    icon={hasActiveFilters ? SearchX : PackageSearch}
                    secondaryAction={hasActiveFilters && onResetFilters ? {
                        label: "Clear Filters",
                        onClick: onResetFilters,
                    } : undefined}
                />
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
