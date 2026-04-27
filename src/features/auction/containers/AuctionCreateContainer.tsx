'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/shared/BackButton';
import { AuctionForm } from '@/features/auction/components/AuctionForm';
import { AuctionCreateHeader } from '@/features/auction/components/AuctionCreateHeader';
import { useCreateAuction } from '@/hooks/use-auction.hooks';
import { CreateAuctionDto } from '@/types/auction.types';
import { FRONTEND_ROUTES } from '@/constants';
import { useActionConsent } from '@/hooks/use-action-consent';
import ConfettiEffect from '@/components/shared/ConfettiEffect';
import { useState } from 'react';

export const AuctionCreateContainer = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    const router = useRouter();
    const { mutateAsync: createAuction, isPending } = useCreateAuction();
    const { executeWithConsent, ConsentModalElement } = useActionConsent({
        actionType: 'AUCTION_CREATE',
        title: 'Create New Auction',
    });

    const handleSubmit = async (data: CreateAuctionDto) => {
        executeWithConsent(async () => {
            try {
                await createAuction(data);
                setShowConfetti(true);
                // Delay redirect to show confetti
                setTimeout(() => {
                    router.push(FRONTEND_ROUTES.DASHBOARD.AUCTIONS);
                    router.refresh();
                }, 3000);
            } catch (error) {
                // Error is handled in the hook's toast
            }
        });
    };


    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
            {showConfetti && (
                <ConfettiEffect 
                    recycle={false} 
                    numberOfPieces={500} 
                    onConfettiComplete={() => setShowConfetti(false)} 
                />
            )}
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
            {ConsentModalElement}
        </div>

    );
};
