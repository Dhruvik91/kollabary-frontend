'use client';

import React from 'react';
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EarningsLoading() {
    return (
        <div className="space-y-8 pb-20 md:px-0">
            <PageHeaderSkeleton 
                label="Earnings & Wallet"
                hasSubtitle={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    {/* Wallet Card Skeleton */}
                    <Skeleton className="h-[250px] w-full rounded-[2.5rem]" />
                    
                    {/* Quick Info Skeleton */}
                    <Card className="rounded-[2.5rem] border-border/50 p-8">
                        <Skeleton className="h-4 w-24 mb-6" />
                        <div className="space-y-4">
                            <Skeleton className="h-24 w-full rounded-2xl" />
                            <Skeleton className="h-24 w-full rounded-2xl" />
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {/* Transaction History Card Skeleton */}
                    <Card className="rounded-[2.5rem] border-border/50 overflow-hidden min-h-[500px]">
                        <div className="p-8 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-3 w-64" />
                            </div>
                        </div>
                        <CardContent className="p-8 space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
