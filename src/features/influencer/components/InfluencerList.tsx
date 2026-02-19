'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { InfluencerCard } from './InfluencerCard';
import { InfluencerProfile } from '@/types/influencer.types';
import { Loader2 } from 'lucide-react';
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
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="space-y-8 md:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {influencers.map((influencer) => (
                    <InfluencerCard key={influencer.id} influencer={influencer} />
                ))}
            </div>

            {/* Load More Trigger */}
            <div ref={ref} className="flex justify-center py-10">
                {isFetchingNextPage ? (
                    <div className="flex items-center gap-2 text-primary animate-pulse">
                        <Loader2 className="animate-spin" size={20} />
                        <span className="font-medium">Loading more creators...</span>
                    </div>
                ) : hasNextPage ? (
                    <div className="h-1" />
                ) : (
                    <p className="text-sm text-muted-foreground bg-muted/30 px-4 py-1.5 rounded-full">
                        You've reached the end of the list
                    </p>
                )}
            </div>
        </div>
    );
};
