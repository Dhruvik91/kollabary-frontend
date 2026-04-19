'use client';

import React from 'react';
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton';
import { MetricCardsSkeleton } from '@/components/shared/skeletons/MetricCardsSkeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function OverviewLoading() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <PageHeaderSkeleton 
                label="Dashboard Overview"
                hasSubtitle={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Metric Cards Grid */}
                    <MetricCardsSkeleton 
                        count={4} 
                        gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6" 
                    />

                    {/* Wallet & Referral Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-[200px] rounded-[2.5rem]" />
                        <Skeleton className="h-[200px] rounded-[2.5rem]" />
                    </div>

                    {/* Large Card Skeleton */}
                    <Card className="rounded-[2.5rem] border-border/50 overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <CardContent className="p-12 flex flex-col items-center justify-center space-y-4">
                            <Skeleton className="w-16 h-16 rounded-full" />
                            <div className="space-y-2 text-center">
                                <Skeleton className="h-6 w-32 mx-auto" />
                                <Skeleton className="h-4 w-64 mx-auto" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1">
                    <Skeleton className="h-[600px] w-full rounded-[2.5rem]" />
                </div>
            </div>
        </div>
    );
}
