'use client';

import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { useInfiniteSentPitches, useInfiniteReceivedPitches, useUpdatePitchStatus } from '@/hooks/use-pitch.hooks';
import { PitchList } from '../components/PitchList';
import { Sparkles, Filter } from 'lucide-react';
import { PitchStatus } from '@/types/pitch.types';
import { PageHeader } from '@/components/shared/PageHeader';
import { useConfetti } from '@/contexts/confetti-context';

export const PitchContainer = () => {
    const { user, isLoading: isAuthLoading } = useAuth();
    const { triggerConfetti } = useConfetti();
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const isBrand = user?.role === UserRole.USER;

    if (isAuthLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className="animate-pulse space-y-8">
                    <div className="h-40 bg-muted/20 rounded-[40px]" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-60 bg-muted/20 rounded-3xl" />)}
                    </div>
                </div>
            </div>
        );
    }

    // Hooks for data
    const sentPitches = useInfiniteSentPitches(10, { enabled: isInfluencer });
    const receivedPitches = useInfiniteReceivedPitches(10, { enabled: isBrand });
    const { mutateAsync: updatePitch, isPending: isUpdating } = useUpdatePitchStatus();

    const handleUpdateStatus = async (id: string, status: PitchStatus) => {
        try {
            await updatePitch({ id, data: { status } });
            if (status === PitchStatus.ACCEPTED) {
                triggerConfetti({ numberOfPieces: 500 });
            }
        } catch (error) {
            // Error handled by hook
        }
    };

    const allSentItems = isInfluencer ? (sentPitches.data?.pages.flatMap(page => page.items) || []) : [];
    const allReceivedItems = isBrand ? (receivedPitches.data?.pages.flatMap(page => page.items) || []) : [];

    return (
        <div className="container mx-auto py-8 space-y-12">
            <PageHeader
                label="Collaboration Hub"
                title="Your Creative"
                highlightedTitle="Pitches"
                subtitle="Manage your direct collaboration requests and responses with ease."
                icon={Sparkles}
            />
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">


                    <div className="flex items-center gap-2">
                        <div className="px-4 py-2.5 rounded-2xl bg-muted/30 border border-border/50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <Filter size={14} />
                            All Status
                        </div>
                    </div>
                </div>
                {
                    isInfluencer ? (
                        <PitchList
                            pitches={allSentItems}
                            type="sent"
                            fetchNextPage={sentPitches.fetchNextPage}
                            hasNextPage={!!sentPitches.hasNextPage}
                            isFetchingNextPage={sentPitches.isFetchingNextPage}
                            isLoading={sentPitches.isLoading}
                        />
                    ) : (
                        <PitchList
                            pitches={allReceivedItems}
                            type="received"
                            fetchNextPage={receivedPitches.fetchNextPage}
                            hasNextPage={!!receivedPitches.hasNextPage}
                            isFetchingNextPage={receivedPitches.isFetchingNextPage}
                            isLoading={receivedPitches.isLoading}
                            onUpdateStatus={handleUpdateStatus}
                            isUpdating={isUpdating}
                        />)
                }

            </div>
        </div>
    );
};
