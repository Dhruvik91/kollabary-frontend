import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, MessageCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { InfluencerProfile } from '@/types/influencer.types';
import Image from 'next/image';
import { RankTierBadge } from '@/components/shared/RankTierBadge';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';

interface MyInfluencerData {
    influencer: InfluencerProfile;
    totalCollaborations: number;
    completedCollaborations: number;
    lastCollaborationDate: string;
}

interface MyInfluencersListProps {
    influencers: MyInfluencerData[];
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const MyInfluencersList = ({
    influencers,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: MyInfluencersListProps) => {
    const router = useRouter();
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();

    const handleMessage = (influencerUserId: string, conversationId?: string) => {
        if (conversationId) {
            router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversationId}`);
        } else {
            startConversation(influencerUserId, {
                onSuccess: (conversation) => {
                    router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
                }
            });
        }
    };

    return (
        <InfiniteScrollContainer
            items={influencers}
            renderItem={(data: MyInfluencerData, index: number) => {
                const { influencer, totalCollaborations, completedCollaborations } = data;
                const profile = influencer.user?.profile;
                const displayAvatar = influencer.avatarUrl || profile?.avatarUrl;

                return (
                    <motion.div
                        key={influencer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index % 9) * 0.05, duration: 0.3 }}
                    >
                        <Card className="border-border/40 bg-card/40 glass-card hover:border-primary/20 transition-all duration-500 rounded-[2rem] h-full flex flex-col p-0">
                            <CardContent className="p-0 flex flex-col flex-1">
                                <div className="relative h-28 w-full overflow-hidden rounded-t-[2rem]">
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
                                </div>

                                <div className="relative px-6 -mt-12 mb-4">
                                    <div className="flex justify-between items-end">
                                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                                            {displayAvatar ? (
                                                <Image
                                                    src={displayAvatar}
                                                    alt={influencer.fullName || profile?.fullName || 'Influencer'}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                                                    {(influencer.fullName || profile?.fullName)?.charAt(0) || '?'}
                                                </div>
                                            )}
                                        </div>
                                        {influencer.rankingTier && (
                                            <RankTierBadge tier={influencer.rankingTier} size="md" />
                                        )}
                                    </div>
                                </div>

                                <div className="px-6 pb-6 space-y-4 flex flex-col flex-1">
                                    <div>
                                        <h3 className="text-xl font-black tracking-tight line-clamp-1">
                                            {influencer.fullName || profile?.fullName || 'Unknown Creator'}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{(influencer.categories && influencer.categories[0]) || 'Creator'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-2xl border border-border/40">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 text-primary mb-1">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <p className="text-lg font-black">{completedCollaborations}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Completed</p>
                                        </div>
                                        <div className="text-center border-l border-border/50">
                                            <div className="flex items-center justify-center gap-1 text-primary mb-1">
                                                <Calendar size={14} />
                                            </div>
                                            <p className="text-lg font-black">{totalCollaborations}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Total</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <Button
                                            onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCER_DETAIL(influencer.id))}
                                            className="h-11 rounded-xl font-bold text-xs uppercase tracking-widest"
                                        >
                                            View Profile
                                        </Button>
                                        <Button
                                            onClick={() => handleMessage(influencer.user.id)}
                                            variant="outline"
                                            disabled={isStartingChat}
                                            className="h-11 rounded-xl font-bold text-xs uppercase tracking-widest gap-2"
                                        >
                                            <MessageCircle size={16} />
                                            Message
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            }}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            loader={
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 size={20} className="animate-spin" />
                    <span className="text-sm font-medium">Loading more influencers...</span>
                </div>
            }
            endMessage={null} // Or custom end message if desired
        />
    );
};
