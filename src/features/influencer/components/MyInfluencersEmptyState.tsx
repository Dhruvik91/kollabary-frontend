import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';

interface MyInfluencersEmptyStateProps {
    hasFilters?: boolean;
    onReset?: () => void;
}

export const MyInfluencersEmptyState = ({ hasFilters, onReset }: MyInfluencersEmptyStateProps) => {
    const router = useRouter();

    if (hasFilters) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-24 h-24 rounded-[2.5rem] bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary/40 rotate-6 border border-primary/10 mx-auto">
                        <Users size={48} />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black">No Results Found</h2>
                    <p className="text-muted-foreground text-lg">
                        We couldn't find any influencers matching your filters. Try adjusting your search criteria.
                    </p>
                </div>
                <Button
                    onClick={onReset}
                    variant="outline"
                    className="px-8 h-12 rounded-2xl font-bold border-2"
                >
                    Clear Filters
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
            <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-[2.5rem] bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary/40 rotate-6 border border-primary/10 mx-auto">
                    <Users size={48} />
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black">No Collaborations Yet</h2>
                <p className="text-muted-foreground text-lg">
                    You haven't collaborated with any influencers yet. Start discovering creators to work with!
                </p>
            </div>
            <Button
                onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCERS)}
                className="px-8 h-12 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20"
            >
                Discover Influencers
            </Button>
        </div>
    );
};
