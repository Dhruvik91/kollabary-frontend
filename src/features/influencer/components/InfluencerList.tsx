import React from 'react';
import { InfluencerCard } from './InfluencerCard';
import { InfluencerProfile } from '@/types/influencer.types';
import { Loader2 } from 'lucide-react';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';

interface InfluencerListProps {
    influencers: InfluencerProfile[];
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfluencerList = ({
    influencers,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: InfluencerListProps) => {
    return (
        <InfiniteScrollContainer
            items={influencers}
            renderItem={(influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
            )}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
            loader={
                <div className="flex items-center gap-2 text-primary animate-pulse">
                    <Loader2 className="animate-spin" size={20} />
                    <span className="font-medium">Loading more creators...</span>
                </div>
            }
            endMessage={
                <p className="text-sm text-muted-foreground bg-muted/30 px-4 py-1.5 rounded-full">
                    You've reached the end of the list
                </p>
            }
        />
    );
};
