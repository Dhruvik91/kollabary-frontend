'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
                <Button onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.AUCTIONS)} className="mt-4">
                    Back to Auctions
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 md:px-0">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-muted-foreground hover:text-foreground transition-colors p-0 font-medium"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
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
