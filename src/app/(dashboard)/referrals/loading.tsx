'use client';

import React from 'react';
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReferralsLoading() {
    return (
        <div className="space-y-8 pb-20 md:px-0">
            <PageHeaderSkeleton 
                label="Referral Program"
                hasSubtitle={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    {/* Referral Card Skeleton */}
                    <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
                </div>

                <div className="lg:col-span-2 space-y-8">
                    {/* How it Works Card Skeleton */}
                    <Card className="rounded-[2.5rem] border-border/50 overflow-hidden">
                        <div className="p-8 border-b border-border/50 bg-muted/30">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-3 w-64 mt-1" />
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="space-y-4">
                                        <Skeleton className="w-12 h-12 rounded-2xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-3 w-3/4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Anti-Fraud Banner Skeleton */}
                    <Card className="rounded-[2.5rem] border-border/50 border-dashed p-8">
                        <div className="flex items-center gap-6">
                            <Skeleton className="w-16 h-16 rounded-full shrink-0" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
