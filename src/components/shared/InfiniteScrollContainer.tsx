'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfiniteScrollContainerProps<T> {
    /**
     * Array of items to render
     */
    items: T[];
    /**
     * Function to render each item
     */
    renderItem: (item: T, index: number) => React.ReactNode;
    /**
     * Function to fetch the next page of data
     */
    fetchNextPage: () => void;
    /**
     * Whether there is a next page available
     */
    hasNextPage: boolean | undefined;
    /**
     * Whether the next page is currently being fetched
     */
    isFetchingNextPage: boolean;
    /**
     * Whether the initial loading is in progress
     */
    isLoading?: boolean;
    /**
     * CSS class for the outer container
     */
    className?: string;
    /**
     * CSS class for the grid/list container that wraps the items
     */
    gridClassName?: string;
    /**
     * Custom loader component to show at the bottom while fetching
     */
    loader?: React.ReactNode;
    /**
     * Custom end message to show when no more pages are available
     */
    endMessage?: React.ReactNode;
    /**
     * Custom component to show when there are no items and not loading
     */
    emptyState?: React.ReactNode;
    /**
     * Intersection observer root margin
     */
    rootMargin?: string;
    /**
     * Intersection observer threshold
     */
    threshold?: number | number[];
}

/**
 * A generic infinite scroll container component that handles intersection observer logic
 * and provides standardized loading/end-of-list states.
 */
export function InfiniteScrollContainer<T>({
    items,
    renderItem,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading = false,
    className,
    gridClassName,
    loader,
    endMessage,
    emptyState,
    rootMargin = '100px',
    threshold = 0.1,
}: InfiniteScrollContainerProps<T>) {
    const { ref, inView } = useInView({
        threshold,
        rootMargin,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading]);

    // Initial loading state
    if (isLoading && items.length === 0) {
        return <div className={cn('w-full', className)}>{loader}</div>;
    }

    // Empty state
    if (!isLoading && items.length === 0 && emptyState) {
        return <div className={cn('w-full', className)}>{emptyState}</div>;
    }

    return (
        <div className={cn('space-y-8 md:space-y-10', className)}>
            <div className={gridClassName}>
                {items.map((item, index) => renderItem(item, index))}
            </div>

            {/* Load More Trigger / States */}
            <div ref={ref} className="flex justify-center py-10 w-full">
                {isFetchingNextPage ? (
                    loader || (
                        <div className="flex items-center gap-2 text-primary animate-pulse">
                            <Loader2 className="animate-spin" size={20} />
                            <span className="font-medium text-sm">Loading more items...</span>
                        </div>
                    )
                ) : hasNextPage ? (
                    // Just a small spacer to trigger intersection
                    <div className="h-4 w-full" />
                ) : items.length > 0 ? (
                    endMessage || (
                        <p className="text-xs text-muted-foreground bg-muted/30 px-4 py-1.5 rounded-full border border-border/50">
                            You've reached the end of the list
                        </p>
                    )
                ) : null}
            </div>
        </div>
    );
}
