'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuctionForm } from '@/features/auction/components/AuctionForm';
import { useCreateAuction } from '@/hooks/queries/use-auction.hooks';
import { CreateAuctionDto } from '@/types/auction.types';

export default function CreateAuctionPage() {
    const router = useRouter();
    const { mutateAsync: createAuction, isPending } = useCreateAuction();

    const handleSubmit = async (data: CreateAuctionDto) => {
        await createAuction(data);
        router.push('/auctions');
        router.refresh();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Auctions
                </Button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <Gavel className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Post an Auction</h1>
                    </div>
                    <p className="text-gray-400">
                        Define your collaboration requirements and let influencers bid for the opportunity.
                    </p>
                </div>

                <AuctionForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            </div>
        </div>
    );
}
