'use client';

import React, { useEffect, useState } from 'react';
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
    Settings,
    Award,
    LayoutGrid,
    TrendingUp,
    PieChart as PieChartIcon,
    BarChart3,
} from 'lucide-react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { BackButton } from '@/components/shared/BackButton';
import { ShareButton } from '@/components/shared/ShareButton';


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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const {
        user: influencerUser,
        categories = [],
        platforms,
        avatarUrl,
        bio,
        address,
        avgRating,
        totalReviews,
        verified,
        availability,
        fullName,
        completedCollaborations,
        totalFollowers,
        avgEngagementRate,
        locationCountry,
        locationCity,
        languages,
        minPrice,
        maxPrice,
        audienceTopCountries,
        gender
    } = influencer;


    const collaborationTypes = influencer.collaborationTypes || [];
    const profile = influencerUser?.profile;
    const displayBio = bio || profile?.bio;
    const displayAvatar = avatarUrl || profile?.avatarUrl;
    const displayLocation = locationCity && locationCountry
        ? `${locationCity}, ${locationCountry}`
        : profile?.location || address;

    const { data: reviews = [], isLoading: isReviewsLoading } = useInfluencerReviews(influencer.id);
    const deleteReview = useDeleteReview(influencer.id);
    const updateReview = useUpdateReview(influencer.id);

    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isAllReviewsOpen, setIsAllReviewsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const handleChange = () => setIsDesktop(mediaQuery.matches);
        handleChange();
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

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
        <div className="space-y-6 sm:space-y-10 pb-24 md:px-0 max-w-[1600px] mx-auto">
            {/* Back Button */}
            {!isOwner && (
                <BackButton label="Back to Discovery" className="p-0" />
            )}

            {/* Main Layout: Left content + Right ranking sidebar */}
            <div className="flex flex-col xl:flex-row gap-6 md:gap-8 mt-8">
                {/* Left: All Main Content */}
                <div className="flex-1 min-w-0 space-y-6 md:space-y-8">

                    {/* Profile Header */}
                    <div className="relative group">
                        {/* Banner */}
                        <div className="h-48 sm:h-64 md:h-72 rounded-[2.5rem] sm:rounded-[4rem] bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/10 overflow-hidden relative shadow-2xl shadow-primary/5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.25),transparent_60%),radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
                            <div className="absolute inset-0 opacity-10 mask-[radial-gradient(circle_at_center,black,transparent_80%)] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[60px_60px]" />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"
                            />
                        </div>

                        {/* Profile Info Overlay */}
                        <div className="px-4 sm:px-8 -mt-16 sm:-mt-20 md:-mt-24 relative z-10">
                            <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-border/50 bg-card/40 glass-card-elevated shadow-xl shadow-black/5 p-4 sm:p-6 md:p-8">
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
                                                priority
                                                sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, 176px"
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
                                                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter truncate min-w-0 bg-linear-to-b from-foreground to-foreground/70 bg-clip-text leading-[1.1]">
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

                                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground/80">
                                            {displayLocation && (
                                                <div className="flex items-center gap-2 group/loc">
                                                    <MapPin size={16} className="text-primary group-hover/loc:scale-110 transition-transform" />
                                                    <span className="text-sm font-medium">{displayLocation}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 group/cat">
                                                <LayoutGrid size={16} className="text-primary group-hover/cat:scale-110 transition-transform" />
                                                <span className="text-sm font-medium">
                                                    {(categories || []).slice(0, 3).join(', ')}
                                                    {(categories || []).length > 3 ? '...' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto flex items-center gap-3 sm:gap-4 self-end md:self-auto">
                                        {isOwner ? (
                                            <>
                                                <Link href={FRONTEND_ROUTES.DASHBOARD.INFLUENCER_EDIT} className="flex-1 md:flex-none">
                                                    <Button className="w-full md:w-auto px-6 sm:px-8 h-12 sm:h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                                                        <AlignLeft size={18} />
                                                        Edit Profile
                                                    </Button>
                                                </Link>
                                                <Link href={FRONTEND_ROUTES.DASHBOARD.SETTINGS}>
                                                    <Button
                                                        variant="outline"
                                                        className="h-12 sm:h-14 w-12 sm:w-14 rounded-2xl border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all flex items-center justify-center"
                                                    >
                                                        <Settings size={18} />
                                                    </Button>
                                                </Link>
                                                <ShareButton
                                                    type={UserRole.INFLUENCER}
                                                    id={influencer.id}
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-12 sm:h-14 w-12 sm:w-14 rounded-2xl border-border/50 hover:bg-primary/5 hover:border-primary/30"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsReportModalOpen(true)}
                                                    className="h-12 sm:h-14 w-12 sm:w-14 bg-muted/20 rounded-2xl border-border/50 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all flex items-center justify-center"
                                                    title="Report Influencer"
                                                >
                                                    <Flag size={18} />
                                                </Button>
                                                <ShareButton
                                                    type={UserRole.INFLUENCER}
                                                    id={influencer.id}
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-12 sm:h-14 w-12 sm:w-14 rounded-2xl border-border/50 hover:bg-primary/5 hover:border-primary/30"
                                                />
                                                <Button
                                                    className="flex-1 md:flex-none px-6 sm:px-8 h-12 sm:h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
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

                    {/* Ranking Card - Mobile Only (shows after banner) */}
                    {isOwner && (ranking || isRankingLoading) && (
                        <div className="xl:hidden">
                            {ranking ? (
                                <RankingBreakdownCard
                                    breakdown={ranking}
                                    stats={{
                                        completedCollaborations: completedCollaborations ?? 0,
                                        avgRating,
                                        totalReviews,
                                        rankingTier: ranking?.rankingTier || influencer.rankingTier,
                                    }}
                                />
                            ) : (
                                <Card className="rounded-[2.5rem] border-border/50 bg-card/10 backdrop-blur-md h-[450px] animate-pulse flex items-center justify-center">
                                    <div className="text-muted-foreground/50 font-bold uppercase tracking-widest animate-pulse">Calculating Score...</div>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* Content Grid: Stats/Socials + About/Reviews */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                        {/* Left Column: Stats */}
                        {!isOwner && (
                            <div className="xl:col-span-1 space-y-6 md:space-y-8">
                                <Card className="rounded-[2rem] border-border/50 bg-card/50 glass-card overflow-hidden">
                                    <div className="p-6 border-b border-border/50 glass-section bg-muted/30">
                                        <h3 className="font-bold tracking-tight">Creator Stats</h3>
                                    </div>
                                    <CardContent className="p-6 sm:p-8 space-y-6">
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

                                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                            <div className="bg-primary/5 p-3 sm:p-4 rounded-2xl border border-primary/10 text-center hover:bg-primary/[0.08] transition-all group/stat">
                                                <div className="flex items-center justify-center gap-1.5 text-primary mb-2 group-hover/stat:scale-110 transition-transform">
                                                    <Award size={14} />
                                                </div>
                                                <p className="text-lg sm:text-2xl font-black tabular-nums text-primary">
                                                    {completedCollaborations ?? 0}
                                                </p>
                                                <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-tight">Collabs</p>
                                            </div>
                                            <div className="bg-yellow-500/5 p-3 sm:p-4 rounded-2xl border border-yellow-500/10 text-center hover:bg-yellow-500/[0.08] transition-all group/stat">
                                                <div className="flex items-center justify-center gap-1.5 text-yellow-500 mb-2 group-hover/stat:scale-110 transition-transform">
                                                    <Star size={14} className="fill-yellow-500" />
                                                </div>
                                                <p className="text-lg sm:text-2xl font-black tabular-nums text-yellow-600">{avgRating}</p>
                                                <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-tight">Rating</p>
                                            </div>
                                            <div className="bg-indigo-500/5 p-3 sm:p-4 rounded-2xl border border-indigo-500/10 text-center hover:bg-indigo-500/[0.08] transition-all group/stat">
                                                <div className="flex items-center justify-center gap-1.5 text-indigo-500 mb-2 group-hover/stat:scale-110 transition-transform">
                                                    <MessageCircle size={14} />
                                                </div>
                                                <p className="text-lg sm:text-2xl font-black tabular-nums text-indigo-600">{totalReviews}</p>
                                                <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-tight">Reviews</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <div className="bg-muted/30 p-4 rounded-2xl border border-border/50 text-center hover:bg-muted/40 transition-colors">
                                                <p className="text-xl font-black tabular-nums text-foreground">
                                                    {totalFollowers ? Intl.NumberFormat('en', { notation: 'compact' }).format(totalFollowers) : 'N/A'}
                                                </p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Total Reach</p>
                                            </div>
                                            <div className="bg-green-500/5 p-4 rounded-2xl border border-green-500/10 text-center hover:bg-green-500/[0.08] transition-colors">
                                                <p className="text-xl font-black tabular-nums text-green-600">
                                                    {avgEngagementRate ? `${avgEngagementRate}%` : 'N/A'}
                                                </p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Avg. Eng.</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Right Column: About & Reviews */}
                        <div className={cn(isOwner ? "xl:col-span-3" : "xl:col-span-2", "space-y-6 md:space-y-8")}>
                            <Card className="rounded-[2rem] md:rounded-[3rem] border-border/50 bg-card/50 glass-card p-6 sm:p-8 md:p-10 lg:p-12">
                                <div className="space-y-6 md:space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black tracking-tight">About {profile?.fullName?.split(' ')[0] || 'Creator'}</h3>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {displayBio || "This creator hasn't added a bio yet, but their work speaks for itself. They specialize in high-quality content that engages and inspires their community."}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {/* Connected Platforms */}
                                        <div className="space-y-4 lg:col-span-1">
                                            <div className="flex items-center gap-2 text-primary">
                                                <Globe size={20} />
                                                <h4 className="font-bold">Connected Platforms</h4>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                                                {Object.entries(platforms || {}).map(([name, data]: [string, any]) => (
                                                    <a
                                                        key={name}
                                                        href={data.handle}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-3 bg-muted/30 glass-section border border-border/50 rounded-2xl hover:border-primary/50 transition-colors group"
                                                    >
                                                        <div className="w-8 h-8 bg-zinc-100 glass-chip rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                                            {getPlatformIcon(name)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-bold capitalize truncate">{name}</p>
                                                            <p className="text-[10px] font-black text-primary truncate leading-none">
                                                                {Intl.NumberFormat('en', { notation: 'compact' }).format(data.followers)}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Collaboration Types */}
                                        <div className="space-y-4 lg:col-span-1">
                                            <div className="flex items-center gap-2 text-primary">
                                                <Calendar size={20} />
                                                <h4 className="font-bold">Collaboration Types</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {collaborationTypes.length > 0 ? (
                                                    collaborationTypes.map((type) => (
                                                        <Badge
                                                            key={type}
                                                            variant="outline"
                                                            className="px-4 py-2 bg-primary/5 border border-primary/10 text-primary rounded-xl text-sm font-bold shadow-none uppercase"
                                                        >
                                                            {formatCollaborationType(type)}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-muted-foreground italic">Contact for details</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Reviews & Sentiment */}
                                        <div className="space-y-4 lg:col-span-1">
                                            <div className="flex items-center gap-2 text-primary">
                                                <Star size={20} />
                                                <h4 className="font-bold">Reviews & Sentiment</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Based on {totalReviews} previous collaborations, this creator has maintained a {avgRating}/5 rating with consistent positive feedback regarding communication and content quality.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Profile Details Section */}
                                    <div className="pt-10 space-y-8 border-t border-border/50">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                                    <Briefcase size={22} />
                                                </div>
                                                Profile Details
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            {/* Left Column: Languages & Future expansion */}
                                            <div className="space-y-8">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                                        <MessageCircle size={16} />
                                                        <span>Languages</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(languages || []).map(lang => (
                                                            <Badge key={lang} variant="secondary" className="bg-muted/50 hover:bg-muted/80 text-foreground border-border/30 rounded-lg px-2.5 py-1 text-[10px] font-bold">
                                                                {lang}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                {/* Hidden Audience Data */}
                                                {false && (
                                                    <div className="opacity-0 h-0 overflow-hidden">
                                                        {/* Gender Split, Age, etc would be here */}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Column: Pricing */}
                                            <div className="space-y-8">
                                                <div className="p-6 sm:p-8 rounded-[2rem] bg-linear-to-br from-primary/10 via-background to-background border border-primary/20 shadow-2xl shadow-primary/5 group/price relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-between mb-8">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2.5 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20">
                                                                    <Briefcase size={20} />
                                                                </div>
                                                                <h4 className="text-xl font-black tracking-tight">Standard Rates</h4>
                                                            </div>
                                                            <div className="text-[10px] font-black text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">USD</div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-end">
                                                                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Starting from</span>
                                                                <div className="text-right">
                                                                    <span className="text-3xl font-black text-primary group-hover/price:scale-105 inline-block transition-transform">${minPrice || 0}</span>
                                                                </div>
                                                            </div>
                                                            {(maxPrice || 0) > (minPrice || 0) && (
                                                                <>
                                                                    <div className="h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                                                                    <div className="flex justify-between items-end">
                                                                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Project Max</span>
                                                                        <span className="text-xl font-bold text-foreground/80">${maxPrice}</span>
                                                                    </div>
                                                                </>
                                                            )}
                                                            <p className="text-[9px] text-muted-foreground/60 mt-4 leading-relaxed font-medium italic">
                                                                * Final pricing varies based on usage rights, content complexity, and timeline.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-border/50 w-full">
                                        {(user?.role === UserRole.USER || user?.role === UserRole.ADMIN) && user?.id !== influencer.user.id && (
                                            <CollaborationRequestDialog
                                                influencerId={influencer.id}
                                                influencerName={profile?.fullName || 'Creator'}
                                            >
                                                <Button className="flex-1 w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                                    Start Collaboration
                                                </Button>
                                            </CollaborationRequestDialog>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Reviews Section */}
                            <div>
                                <ReviewList
                                    reviews={reviews}
                                    isLoading={isReviewsLoading}
                                    maxItems={2}
                                    totalCount={reviews.length}
                                    onEdit={setEditingReview}
                                    onDelete={handleDeleteReview}
                                />

                                {!isReviewsLoading && reviews.length > 2 && (
                                    <div className="mt-6 flex justify-center">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsAllReviewsOpen(true)}
                                            className="h-12 px-8 rounded-2xl font-bold border-border/50 bg-background/50"
                                        >
                                            Show more reviews
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Ranking Breakdown Sticky Sidebar (Owner Only) */}
                {isOwner && (ranking || isRankingLoading) && (
                    <div className="hidden xl:block w-full xl:w-[380px] xl:shrink-0">
                        <div className="xl:sticky xl:top-24">
                            {ranking ? (
                                <RankingBreakdownCard
                                    breakdown={ranking}
                                    stats={{
                                        completedCollaborations: completedCollaborations ?? 0,
                                        avgRating,
                                        totalReviews,
                                        rankingTier: ranking?.rankingTier || influencer.rankingTier,
                                    }}
                                />
                            ) : (
                                <Card className="rounded-[2.5rem] border-border/50 bg-card/10 backdrop-blur-md h-[450px] animate-pulse flex items-center justify-center">
                                    <div className="text-muted-foreground/50 font-bold uppercase tracking-widest animate-pulse">Calculating Score...</div>
                                </Card>
                            )}
                        </div>
                    </div>
                )}
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

            <Sheet open={isAllReviewsOpen && !isDesktop} onOpenChange={setIsAllReviewsOpen}>
                <SheetContent
                    side="bottom"
                    className="h-[85vh] rounded-t-[3.5rem] p-0 border-t border-border/50 bg-background/80 backdrop-blur-2xl"
                >
                    <SheetHeader className="px-8 pt-8 pb-4 border-b border-border/50">
                        <SheetTitle className="text-2xl font-black tracking-tight">
                            All Reviews
                        </SheetTitle>
                    </SheetHeader>
                    <div className="overflow-y-auto h-full px-8 py-8 pb-24">
                        <ReviewList
                            reviews={reviews}
                            isLoading={isReviewsLoading}
                            showHeader={false}
                            totalCount={reviews.length}
                            onEdit={setEditingReview}
                            onDelete={handleDeleteReview}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <AnimatedModal
                isOpen={isAllReviewsOpen && isDesktop}
                onClose={() => setIsAllReviewsOpen(false)}
                title="All Reviews"
                description={`Showing all feedback for ${profile?.fullName || fullName || 'this creator'}.`}
                size="lg"
            >
                <div className="max-h-[70vh] overflow-y-auto pr-1">
                    <ReviewList
                        reviews={reviews}
                        isLoading={isReviewsLoading}
                        showHeader={false}
                        totalCount={reviews.length}
                        onEdit={setEditingReview}
                        onDelete={handleDeleteReview}
                    />
                </div>
            </AnimatedModal>
        </div>
    );
};
