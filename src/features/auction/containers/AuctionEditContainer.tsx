'use client';

import posthog from 'posthog-js';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/shared/BackButton';
import { AuctionForm } from '@/features/auction/components/AuctionForm';
import { PageHeader } from '@/components/shared/PageHeader';
import { useAuctionDetail, useUpdateAuction } from '@/hooks/use-auction.hooks';
import { CreateAuctionDto } from '@/types/auction.types';
import { FRONTEND_ROUTES } from '@/constants';
import { Gavel } from 'lucide-react';

interface AuctionEditContainerProps {
    id: string;
}

export const AuctionEditContainer = ({ id }: AuctionEditContainerProps) => {
    const router = useRouter();
    const { data: auction, isLoading: isFetching } = useAuctionDetail(id);
    const { mutateAsync: updateAuction, isPending: isUpdating } = useUpdateAuction(id);

    const handleSubmit = async (data: Partial<CreateAuctionDto>) => {
        try {
            await updateAuction(data);
            posthog.capture('auction_updated', {
                auction_id: id,
                category: data.category,
            });
            router.push(FRONTEND_ROUTES.DASHBOARD.AUCTION_DETAIL(id));
            router.refresh();
        } catch (error) {
            // Error is handled in the hook's toast
        }
    };

    if (isFetching) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!auction) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Auction not found</h2>
                <BackButton label="Back to Auctions" className="mt-4 px-6 h-10 border border-border/50" />
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <div className="flex items-center justify-between">
                <BackButton label="Back" className="p-0" />
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group transition-all duration-300">
                <div className="relative z-10">
                    <PageHeader
                        label="Edit Auction"
                        title="Update Your"
                        highlightedTitle="Requirements."
                        subtitle="Refine your campaign details to better attract the right influencers."
                        icon={Gavel}
                        className="mb-4"
                    />
                    <AuctionForm
                        onSubmit={handleSubmit}
                        isLoading={isUpdating}
                        initialData={auction}
                    />
                </div>
            </div>
        </div>
    );
};
