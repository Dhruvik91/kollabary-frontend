import { Pitch, PitchStatus } from '@/types/pitch.types';
import { PitchCard } from './PitchCard';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Inbox } from 'lucide-react';

interface PitchListProps {
    pitches: Pitch[];
    type: 'sent' | 'received';
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isLoading: boolean;
    onUpdateStatus?: (id: string, status: PitchStatus) => void;
    isUpdating?: boolean;
}

export const PitchList = ({
    pitches,
    type,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    onUpdateStatus,
    isUpdating
}: PitchListProps) => {

    if (isLoading && pitches.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-card border border-border/50 rounded-3xl p-6 space-y-6 h-[250px]">
                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <Skeleton className="w-12 h-12 rounded-2xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-20 w-full rounded-2xl" />
                        <div className="flex justify-between pt-4 border-t border-border/50">
                            <Skeleton className="h-8 w-20 rounded-xl" />
                            <Skeleton className="h-8 w-24 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!isLoading && pitches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-4 bg-muted/20 border border-dashed border-border/50 rounded-[40px]">
                <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center text-muted-foreground/30 shadow-inner">
                    {type === 'sent' ? <Sparkles size={40} /> : <Inbox size={40} />}
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-black uppercase tracking-tight">No Pitches Found</h3>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest max-w-[300px]">
                        {type === 'sent'
                            ? "You haven't sent any collaboration pitches yet. Start exploring brands to pitch your ideas!"
                            : "You haven't received any pitches from influencers yet. Your brand profile is ready for discovery!"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <InfiniteScrollContainer
            items={pitches}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            renderItem={(pitch) => (
                <PitchCard
                    key={pitch.id}
                    pitch={pitch}
                    type={type}
                    onUpdateStatus={onUpdateStatus}
                    isUpdating={isUpdating}
                />
            )}
            loader={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-card border border-border/50 rounded-3xl p-6 space-y-6 opacity-50">
                            <Skeleton className="h-[200px] w-full rounded-2xl" />
                        </div>
                    ))}
                </div>
            }
        />
    );
};
