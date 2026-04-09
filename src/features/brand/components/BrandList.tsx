import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';
import { UserProfile } from '@/services/profile.service';
import { BrandCard } from './BrandCard';
import { Handshake } from 'lucide-react';

interface BrandListProps {
    brands: UserProfile[];
    isLoading?: boolean;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const BrandList = ({
    brands,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: BrandListProps) => {
    return (
        <InfiniteScrollContainer
            items={brands}
            renderItem={(brand) => <BrandCard key={brand.id} brand={brand} />}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            loader={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-[400px] rounded-[2rem] bg-zinc-100 dark:bg-white/5 animate-pulse" />
                    ))}
                </div>
            }
            emptyState={
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                        <Handshake size={32} />
                    </div>
                    <h3 className="text-xl font-bold">No brands found</h3>
                    <p className="text-muted-foreground max-w-xs">
                        Try adjusting your filters to find the right partner for your next collaboration.
                    </p>
                </div>
            }
        />
    );
};
