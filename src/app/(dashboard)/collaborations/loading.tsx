'use client';

import React from 'react';
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton';
import { GridSkeleton } from '@/components/shared/skeletons/GridSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollaborationsLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <PageHeaderSkeleton 
                label="My Collaborations"
                hasSubtitle={true}
            />

            <div className="space-y-8">
                {/* Filter Bar Skeleton */}
                <div className="flex flex-wrap items-center gap-4">
                    <Skeleton className="h-12 w-full md:w-64 rounded-xl" />
                    <Skeleton className="h-12 w-48 rounded-xl" />
                    <Skeleton className="h-12 w-32 rounded-xl" />
                </div>

                {/* Grid Skeleton */}
                <GridSkeleton 
                    variant="collaboration" 
                    count={8} 
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                />
            </div>
        </div>
    );
}
