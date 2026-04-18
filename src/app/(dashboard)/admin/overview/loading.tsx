'use client';

import React from 'react';
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton';
import { MetricCardsSkeleton } from '@/components/shared/skeletons/MetricCardsSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminOverviewLoading() {
    return (
        <div className="space-y-8 p-1">
            <PageHeaderSkeleton 
                label="Admin Dashboard"
                hasSubtitle={true}
            />

            <MetricCardsSkeleton count={4} />

            <div className="grid gap-6 lg:grid-cols-2">
                <Skeleton className="h-80 w-full rounded-2xl" />
                <Skeleton className="h-80 w-full rounded-2xl" />
            </div>
        </div>
    );
}
