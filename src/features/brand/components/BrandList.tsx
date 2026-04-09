'use client';

import React from 'react';
import { BrandCard } from './BrandCard';
import { UserProfile } from '@/services/profile.service';
import { Button } from '@/components/ui/button';
import { Loader2, Handshake } from 'lucide-react';

interface BrandListProps {
    brands: UserProfile[];
    isLoading?: boolean;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => void;
}

export const BrandList = ({
    brands,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: BrandListProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[400px] rounded-[2rem] bg-zinc-100 dark:bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (brands.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                    <Handshake size={32} />
                </div>
                <h3 className="text-xl font-bold">No brands found</h3>
                <p className="text-muted-foreground max-w-xs">
                    Try adjusting your filters to find the right partner for your next collaboration.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {brands.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                ))}
            </div>

            {hasNextPage && (
                <div className="flex justify-center pt-8">
                    <Button
                        onClick={() => fetchNextPage?.()}
                        disabled={isFetchingNextPage}
                        variant="outline"
                        className="h-14 px-8 rounded-full font-bold border-2 hover:bg-zinc-50 dark:hover:bg-white/5 min-w-[200px]"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading more
                            </>
                        ) : (
                            'Load More Brands'
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};
