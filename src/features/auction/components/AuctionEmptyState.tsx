'use client';

import { Gavel } from 'lucide-react';

interface AuctionEmptyStateProps {
    title?: string;
    description?: string;
}

export const AuctionEmptyState = ({ 
    title = "No auctions found", 
    description = "Try adjusting your search or check back later for new opportunities." 
}: AuctionEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted/50 p-6 rounded-full mb-4">
                <Gavel className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground mt-2">
                {description}
            </p>
        </div>
    );
};
