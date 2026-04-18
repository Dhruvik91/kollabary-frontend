'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MetricCardsSkeletonProps {
    count?: number;
    className?: string;
    gridClassName?: string;
}

export const MetricCardsSkeleton = ({
    count = 4,
    className,
    gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
}: MetricCardsSkeletonProps) => {
    return (
        <div className={cn(gridClassName, className)}>
            {[...Array(count)].map((_, i) => (
                <Card key={i} className="rounded-[2rem] border-border/50 glass-card overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="w-12 h-12 rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-2 w-32" />
                        </div>
                    </CardContent>
                    <Skeleton className="h-1 w-full opacity-30" />
                </Card>
            ))}
        </div>
    );
};
