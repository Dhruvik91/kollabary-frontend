'use client';

import posthog from 'posthog-js';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/shared/BackButton';
import { AuctionForm } from '@/features/auction/components/AuctionForm';
import { AuctionCreateHeader } from '@/features/auction/components/AuctionCreateHeader';
import { useCreateAuction } from '@/hooks/use-auction.hooks';
import { CreateAuctionDto } from '@/types/auction.types';
import { FRONTEND_ROUTES } from '@/constants';
import { useActionConsent } from '@/hooks/use-action-consent';
import { useConfetti } from '@/contexts/confetti-context';
import { useState, useEffect } from 'react';
import { useProfileCompletion } from '@/contexts/profile-completion-context';
import { Lock, ArrowLeft, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';

export const AuctionCreateContainer = () => {
    const { triggerConfetti } = useConfetti();
    const router = useRouter();
    const { mutateAsync: createAuction, isPending } = useCreateAuction();
    const { checkActionAllowed, showGatingModal } = useProfileCompletion();
    const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

    const { executeWithConsent, ConsentModalElement } = useActionConsent({
        actionType: 'AUCTION_CREATE',
        title: 'Create New Auction',
    });

    useEffect(() => {
        // Run check on mount
        const allowed = checkActionAllowed('createAuction');
        setIsAllowed(allowed);
    }, [checkActionAllowed]);

    const handleSubmit = async (data: CreateAuctionDto) => {
        if (!checkActionAllowed('createAuction')) {
            return;
        }
        executeWithConsent(async () => {
            try {
                await createAuction(data);
                posthog.capture('auction_created', {
                    category: data.category,
                    min_budget: data.minBudget,
                    max_budget: data.maxBudget,
                });
                triggerConfetti({ numberOfPieces: 500 });
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

    // Render loading state while checking permissions
    if (isAllowed === null) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <span className="text-sm text-zinc-500 font-bold">Verifying Permissions...</span>
                </div>
            </div>
        );
    }

    // Render lock screen if restricted
    if (!isAllowed) {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-6 bg-card border border-border/80 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-xl shadow-rose-500/5 relative z-10 animate-bounce">
                        <Lock size={36} className="stroke-[2.5]" />
                    </div>

                    <div className="space-y-3 relative z-10">
                        <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
                            Campaign Creation Gated
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                            To ensure high-quality collaboration requests on Kollabary, brands are required to complete their profile to at least 70% before creating new campaigns.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 relative z-10">
                        <Button
                            variant="outline"
                            onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.AUCTIONS)}
                            className="h-12 rounded-xl px-6 font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 gap-2"
                        >
                            <ArrowLeft size={16} />
                            Back to Campaigns
                        </Button>
                        <Button
                            onClick={() => showGatingModal('createAuction')}
                            className="h-12 rounded-xl px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold gap-2 shadow-lg shadow-rose-500/20"
                        >
                            <ClipboardCheck size={16} />
                            View Requirements
                        </Button>
                        <Link href="/profile/edit" prefetch={false}>
                            <Button className="h-12 rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 w-full">
                                Complete Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
            {ConsentModalElement}
        </div>
    );
};
