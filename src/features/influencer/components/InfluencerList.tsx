'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { InfluencerCard } from './InfluencerCard';
import { InfluencerProfile } from '@/types/influencer.types';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchX, Loader2 } from 'lucide-react';

interface InfluencerListProps {
    influencers: InfluencerProfile[];
    isLoading: boolean;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfluencerList = ({
    influencers,
    isLoading,
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

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-32 w-full rounded-[1.5rem]" />
                        <div className="space-y-2 p-4">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="pt-4 grid grid-cols-3 gap-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (influencers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/20 border border-dashed border-border rounded-[2rem]">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <SearchX size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No influencers found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
