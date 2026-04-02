'use client';

import { Gavel } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';

export const AuctionCreateHeader = () => {
    return (
        <PageHeader
            label="Post New Auction"
            title="Define Your"
            highlightedTitle="Requirements."
            subtitle="Let influencers know what you're looking for and find the perfect collaborator for your brand."
            icon={Gavel}
            className="mb-8"
        />
    );
};
