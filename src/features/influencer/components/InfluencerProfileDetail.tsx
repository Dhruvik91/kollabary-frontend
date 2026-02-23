'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Star,
    MapPin,
    CheckCircle2,
    Instagram,
    Youtube,
    Twitter,
    Globe,
    ExternalLink,
    Briefcase,
    Calendar,
    MessageCircle,
    Flag,
    AlignLeft,
    ArrowLeft,
    Settings,
    Award,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfluencerProfile, AvailabilityStatus } from '@/types/influencer.types';
import { cn } from '@/lib/utils';
import { formatCollaborationType } from '@/lib/format-collaboration-type';
import { CollaborationRequestDialog } from './CollaborationRequestDialog';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import { RankTierBadge } from '@/components/shared/RankTierBadge';
import { RankingBreakdownCard } from './RankingBreakdownCard';
import { RankingBreakdown } from '@/types/ranking';
import { useInfluencerReviews, useDeleteReview, useUpdateReview } from '@/hooks/use-review.hooks';
import { ReviewList } from '@/features/review/components/ReviewList';
import { ReviewSubmissionModal } from '@/features/review/components/ReviewSubmissionModal';
import { Review } from '@/types/review.types';
import { ReportModal } from '@/features/report/components/ReportModal';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { Badge } from '@/components/ui/badge';


interface InfluencerProfileDetailProps {
    influencer: InfluencerProfile;
    ranking?: RankingBreakdown;
    isRankingLoading?: boolean;
    isOwner?: boolean;
}

export const InfluencerProfileDetail = ({
    influencer,
    ranking,
    isRankingLoading,
    isOwner = false
}: InfluencerProfileDetailProps) => {
    const { user } = useAuth();
    const router = useRouter();

    const { user: influencerUser, niche, platforms, avatarUrl, bio, address, avgRating, totalReviews, verified, availability, fullName } = influencer;


    const collaborationTypes = influencer.collaborationTypes || [];
    const profile = influencerUser?.profile;
    const displayBio = bio || profile?.bio;
    const displayAvatar = avatarUrl || profile?.avatarUrl;

    const { data: reviews = [], isLoading: isReviewsLoading } = useInfluencerReviews(influencer.id);
    const deleteReview = useDeleteReview(influencer.id);
    const updateReview = useUpdateReview(influencer.id);

    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();

    const handleDeleteReview = (id: string) => {
        setReviewToDelete(id);
    };

    const confirmDelete = () => {
        if (reviewToDelete) {
            deleteReview.mutate(reviewToDelete, {
                onSuccess: () => setReviewToDelete(null)
            });
        }
    };

    const handleUpdateReview = (data: { rating: number; comment: string }) => {
        if (editingReview) {
            updateReview.mutate({ id: editingReview.id, data }, {
                onSuccess: () => setEditingReview(null)
            });
        }
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <Instagram size={20} />;
            case 'youtube': return <Youtube size={20} />;
            case 'twitter':
            case 'x': return <Twitter size={20} />;
            default: return <Globe size={20} />;
        }
    };

    const getAvailabilityColor = (status: AvailabilityStatus) => {
        switch (status) {
            case AvailabilityStatus.OPEN: return 'bg-green-500';
            case AvailabilityStatus.BUSY: return 'bg-yellow-500';
            case AvailabilityStatus.CLOSED: return 'bg-red-500';
            default: return 'bg-zinc-500';
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Back Button */}
            {!isOwner ? (
                <Link
                    href={FRONTEND_ROUTES.DASHBOARD.INFLUENCERS}
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Discovery
                </Link>
            ) : (
                <Link
                    href={FRONTEND_ROUTES.DASHBOARD.SETTINGS}
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Settings
                </Link>
            )}

            {/* Profile Header */}
            <div className="relative">
                {/* Banner */}
                <div className="h-44 sm:h-56 md:h-64 rounded-[2rem] sm:rounded-[3rem] bg-linear-to-r from-primary/12 via-primary/6 to-transparent border border-border/50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(circle_at_80%_10%,hsl(var(--primary)/0.12),transparent_45%)]" />
                    <div className="absolute inset-0 opacity-15 mask-[radial-gradient(circle_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[44px_44px]" />
                </div>

                {/* Profile Info Overlay */}
                <div className="px-4 sm:px-8 -mt-16 sm:-mt-20 md:-mt-24 relative z-10">
                    <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-border/50 bg-card/40 backdrop-blur-xl shadow-xl shadow-black/5 p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-end gap-4 sm:gap-6 md:gap-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden ring-4 ring-background shadow-2xl"
                            >
                                {displayAvatar ? (
                                    <Image
                                        src={displayAvatar}
                                        alt={profile?.fullName || fullName || 'Influencer'}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-3xl sm:text-4xl font-black">
                                        {(profile?.fullName || fullName || '?')?.charAt(0)}
                                    </div>
                                )}
                            </motion.div>

                            <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight truncate min-w-0">
                                            {profile?.fullName || fullName || 'Creator'}
                                        </h1>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {verified && (
                                            <div className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                                                <CheckCircle2 size={14} />
                                                Verified Creator
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border/50">
                                            <span className={cn("w-2 h-2 rounded-full", getAvailabilityColor(availability))} />
                                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{availability}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground">
                                    {profile?.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-primary" />
                                            <span className="text-sm truncate">{profile.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={16} className="text-primary" />
                                        <span className="text-sm truncate">{niche}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex items-center gap-3 sm:gap-4">
                                {isOwner ? (
                                    <>
                                        <Link href={FRONTEND_ROUTES.DASHBOARD.INFLUENCER_EDIT} className="flex-1 md:flex-none">
                                            <Button className="w-full md:w-auto px-5 sm:px-6 h-12 sm:h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/10 active:scale-95 transition-transform flex items-center justify-center gap-2">
                                                <AlignLeft size={18} />
                                                Edit Profile
                                            </Button>
                                        </Link>
                                        <Link href={FRONTEND_ROUTES.DASHBOARD.SETTINGS}>
                                            <Button
                                                variant="outline"
                                                className="h-12 sm:h-14 w-12 sm:w-14 rounded-2xl border-border/50 hover:bg-muted transition-colors flex items-center justify-center"
                                            >
                                                <Settings size={18} />
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsReportModalOpen(true)}
                                            className="h-12 sm:h-14 w-12 sm:w-14 bg-muted/50 rounded-2xl border-border/50 hover:bg-destructive/10 hover:text-destructive transition-colors flex items-center justify-center"
                                            title="Report Influencer"
                                        >
                                            <Flag size={18} />
                                        </Button>
                                        <Button
                                            className="flex-1 md:flex-none px-5 sm:px-6 h-12 sm:h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/10 active:scale-95 transition-transform flex items-center justify-center gap-2"
                                            disabled={isStartingChat}
                                            onClick={() => {
                                                startConversation(influencerUser.id, {
                                                    onSuccess: (conversation) => {
                                                        router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
                                                    },
                                                });
                                            }}
                                        >
                                            <MessageCircle size={18} />
                                            {isStartingChat ? 'Connecting...' : 'Contact'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Left Column: Stats & Socials */}
                <div className="xl:col-span-1 space-y-6 md:space-y-8">
                    {/* Creator Stats Card */}
                    <Card className="rounded-[2rem] border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/30">
                            <h3 className="font-bold tracking-tight">Creator Stats</h3>
                        </div>
                        <CardContent className="p-6 sm:p-8 space-y-6">
                            {/* Ranking Tier Badge */}
                            {isRankingLoading ? (
                                <div className="flex flex-col items-center justify-center py-4 space-y-3">
                                    <div className="w-[72px] h-[72px] rounded-2xl bg-muted/50 animate-pulse" />
                                    <div className="w-28 h-4 rounded-lg bg-muted/50 animate-pulse" />
                                </div>
                            ) : (ranking?.rankingTier || influencer.rankingTier) ? (
                                <div className="flex flex-col items-center justify-center py-4 space-y-2">
                                    <RankTierBadge
                                        tier={ranking?.rankingTier || influencer.rankingTier}
                                        size="lg"
                                        showDescription
                                    />
                                    <span className="text-sm font-bold text-foreground">
                                        {ranking?.rankingTier || influencer.rankingTier}
                                    </span>
                                </div>
                            ) : null}

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-2xl border border-border/50 text-center">
                                    <div className="flex items-center justify-center gap-1.5 text-primary mb-2">
                                        <Award size={14} />
                                    </div>
                                    <p className="text-xl sm:text-2xl font-black tabular-nums">
                                        {ranking?.completedCollaborations?.count ?? 0}
                                    </p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Collabs</p>
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-2xl border border-border/50 text-center">
                                    <div className="flex items-center justify-center gap-1.5 text-yellow-500 mb-2">
                                        <Star size={14} className="fill-yellow-500" />
                                    </div>
                                    <p className="text-xl sm:text-2xl font-black tabular-nums">{avgRating}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Avg Rating</p>
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-2xl border border-border/50 text-center">
                                    <div className="flex items-center justify-center gap-1.5 text-primary mb-2">
                                        <MessageCircle size={14} />
                                    </div>
                                    <p className="text-xl sm:text-2xl font-black tabular-nums">{totalReviews}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Reviews</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ranking Breakdown Card (Owner Only) */}
                    {(ranking && isOwner) ? (
                        <RankingBreakdownCard breakdown={ranking} />
                    ) : isRankingLoading && isOwner ? (
                        <Card className="rounded-[2.5rem] border-border/50 bg-card/10 backdrop-blur-md h-[450px] animate-pulse flex items-center justify-center">
                            <div className="text-muted-foreground/50 font-bold uppercase tracking-widest animate-pulse">Calculating Score...</div>
                        </Card>
                    ) : null}

                    {/* Socials Card */}
                    <Card className="rounded-[2rem] border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/30">
                            <h3 className="font-bold tracking-tight">Connected Platforms</h3>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            {Object.entries(platforms || {}).map(([name, data]: [string, any]) => (
                                <a
                                    key={name}
                                    href={data.handle}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-2xl hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            {getPlatformIcon(name)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold capitalize">{name}</p>
                                            <p className="text-xs text-muted-foreground">{data.handle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-sm font-bold">{Intl.NumberFormat('en', { notation: 'compact' }).format(data.followers)}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Followers</p>
                                        {data.engagementRate && (
                                            <p className="text-xs font-bold text-green-500">{data.engagementRate}% Eng.</p>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: About & Collabs */}
                <div className="xl:col-span-2 space-y-6 md:space-y-8">
                    <Card className="rounded-[2rem] md:rounded-[3rem] border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12">
                        <div className="space-y-6 md:space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black tracking-tight">About {profile?.fullName?.split(' ')[0] || 'Creator'}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {displayBio || "This creator hasn't added a bio yet, but their work speaks for itself. They specialize in high-quality content that engages and inspires their community."}
                                </p>
                                {address && (
                                    <div className="flex items-center gap-2 text-muted-foreground pt-2">
                                        <MapPin size={16} className="text-primary" />
                                        <span className="text-sm">{address}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Calendar size={20} />
                                        <h4 className="font-bold">Collaboration Types</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {collaborationTypes.length > 0 ? (
                                            collaborationTypes.map((type) => (
                                                <Badge
                                                    key={type}
                                                    className="px-4 py-2 bg-primary/5 border border-primary/10 text-primary rounded-xl text-sm font-bold shadow-none capitalize"
                                                >
                                                    {formatCollaborationType(type)}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-muted-foreground italic">Contact for details</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Star size={20} />
                                        <h4 className="font-bold">Reviews & Sentiment</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Based on {totalReviews} previous collaborations, this creator has maintained a {avgRating}/5 rating with consistent positive feedback regarding communication and content quality.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-border/50 w-full">
                                {(user?.role === UserRole.USER || user?.role === UserRole.ADMIN) && user?.id !== influencer.user.id && (
                                    <CollaborationRequestDialog
                                        influencerId={influencer.id}
                                        influencerName={profile?.fullName || 'Creator'}
                                    >
                                        <Button className="flex-1 !w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all ">
                                            Start Collaboration
                                        </Button>
                                    </CollaborationRequestDialog>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Reviews Section */}
                    <div className="pt-4">
                        <ReviewList
                            reviews={reviews}
                            isLoading={isReviewsLoading}
                            onEdit={setEditingReview}
                            onDelete={handleDeleteReview}
                        />
                    </div>
                </div>
            </div>

            {/* Editing Modal */}
            <ReviewSubmissionModal
                isOpen={!!editingReview}
                onClose={() => setEditingReview(null)}
                influencerName={influencerUser?.profile?.fullName || 'the Influencer'}
                onSubmit={handleUpdateReview}
                isLoading={updateReview.isPending}
                initialData={editingReview ? { rating: editingReview.rating, comment: editingReview.comment } : undefined}
                title="Edit Your Review"
                description="Update your feedback for this collaboration."
            />

            {/* Deletion Confirmation Modal */}
            <AnimatedModal
                isOpen={!!reviewToDelete}
                onClose={() => setReviewToDelete(null)}
                title="Confirm Deletion"
                description="Are you sure you want to delete this review? This action cannot be undone."
                size="sm"
                footer={
                    <div className="flex gap-4 justify-end">
                        <Button
                            variant="ghost"
                            onClick={() => setReviewToDelete(null)}
                            className="rounded-xl font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deleteReview.isPending}
                            className="rounded-xl font-bold px-8 shadow-xl shadow-destructive/20"
                        >
                            {deleteReview.isPending ? 'Deleting...' : 'Delete Review'}
                        </Button>
                    </div>
                }
            >
                <div className="py-4">
                    <p className="text-muted-foreground">
                        Your review and rating for <span className="text-foreground font-bold">@{profile?.username}</span> will be permanently removed.
                    </p>
                </div>
            </AnimatedModal>

            {/* Report Modal */}
            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={influencer.id}
                targetType="influencer"
                targetName={profile?.fullName || 'the Influencer'}
            />
        </div>
    );
};
