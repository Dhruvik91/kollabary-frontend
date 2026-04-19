'use client';

import React from 'react';
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton';
import { GridSkeleton } from '@/components/shared/skeletons/GridSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function BrandsLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <PageHeaderSkeleton 
                label="Brand Network"
                hasSubtitle={true}
            />

            <div className="space-y-8">
                {/* Search Skeleton */}
                <Skeleton className="h-14 w-full max-w-2xl rounded-2xl" />

                {/* Grid Skeleton */}
                <GridSkeleton 
                    variant="generic" 
                    count={8} 
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                />
            </div>
        </div>
    );
}
