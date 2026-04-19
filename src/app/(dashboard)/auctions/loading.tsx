'use client';

import React from 'react';
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton';
import { GridSkeleton } from '@/components/shared/skeletons/GridSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionsLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <PageHeaderSkeleton 
                label="Launchpad"
                hasSubtitle={true}
            />

            <div className="space-y-6">
                {/* Tabs Skeleton */}
                <div className="flex gap-2 mb-8">
                    <Skeleton className="h-12 w-32 rounded-2xl" />
                    <Skeleton className="h-12 w-32 rounded-2xl" />
                </div>

                {/* Search & Filter Skeleton */}
                <div className="flex gap-4">
                    <Skeleton className="h-14 flex-1 rounded-2xl" />
                    <Skeleton className="h-14 w-14 rounded-2xl" />
                </div>

                {/* Grid Skeleton */}
                <GridSkeleton 
                    variant="auction" 
                    count={9} 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                />
            </div>
        </div>
    );
}
