'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface GridSkeletonProps {
    count?: number;
    className?: string;
    variant?: 'collaboration' | 'influencer' | 'auction' | 'generic';
}

export const GridSkeleton = ({
    count = 8,
    variant = 'generic',
    className,
}: GridSkeletonProps) => {
    const renderCard = (i: number) => {
        if (variant === 'collaboration') {
            return (
                <Card key={i} className="glass-card border-border overflow-hidden relative rounded-2xl">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent className="pb-4">
                        <div className="space-y-2 mb-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                        <Skeleton className="h-9 w-full rounded-md" />
                    </CardFooter>
                </Card>
            );
        }

        if (variant === 'influencer') {
            return (
                <Card key={i} className="border-border/40 bg-card/40 glass-card rounded-[2rem] overflow-hidden">
                    <div className="h-28 w-full bg-linear-to-br from-primary/10 via-transparent to-transparent" />
                    <CardContent className="p-0 flex flex-col relative px-6 -mt-10 mb-6">
                        <div className="flex justify-between items-end mb-4">
                            <Skeleton className="w-20 h-20 rounded-2xl border-4 border-background" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 p-3 bg-muted/20 rounded-2xl">
                                <div className="space-y-1 text-center"><Skeleton className="h-2 w-full mx-auto" /><Skeleton className="h-4 w-full" /></div>
                                <div className="space-y-1 text-center"><Skeleton className="h-2 w-full mx-auto" /><Skeleton className="h-4 w-full" /></div>
                                <div className="space-y-1 text-center"><Skeleton className="h-2 w-full mx-auto" /><Skeleton className="h-4 w-full" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Skeleton className="h-11 rounded-xl" />
                                <Skeleton className="h-11 rounded-xl" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        // Generic / Auction
        return (
            <Card key={i} className="rounded-2xl border-border/50 overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6",
            variant === 'influencer' && "xl:grid-cols-3",
            className
        )}>
            {[...Array(count)].map((_, i) => renderCard(i))}
        </div>
    );
};
