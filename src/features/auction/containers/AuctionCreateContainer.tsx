'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/shared/BackButton';
import { AuctionForm } from '@/features/auction/components/AuctionForm';
import { AuctionCreateHeader } from '@/features/auction/components/AuctionCreateHeader';
import { useCreateAuction } from '@/hooks/use-auction.hooks';
import { CreateAuctionDto } from '@/types/auction.types';
import { FRONTEND_ROUTES } from '@/constants';

export const AuctionCreateContainer = () => {
    const router = useRouter();
    const { mutateAsync: createAuction, isPending } = useCreateAuction();

    const handleSubmit = async (data: CreateAuctionDto) => {
        try {
            await createAuction(data);
            router.push(FRONTEND_ROUTES.DASHBOARD.AUCTIONS);
            router.refresh();
        } catch (error) {
            // Error is handled in the hook's toast
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            <div className="flex items-center justify-between">
                <BackButton label="Back to Auctions" className="p-0" />
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                    <AuctionCreateHeader />
                    <AuctionForm
                        onSubmit={handleSubmit}
                        isLoading={isPending}
                    />
                </div>
            </div>
        </div>
    );
};
