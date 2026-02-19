'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Users,
    Star,
    TrendingUp,
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
    ShieldCheck,
    ArrowLeft,
    Clock,
    X,
    Plus,
    Lock
} from 'lucide-react';
import { useSubmitVerification, useMyVerificationStatus } from '@/hooks/queries/useVerificationQueries';
import { VerificationStatus } from '@/types/admin.types';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfluencerProfile, AvailabilityStatus, CollaborationType } from '@/types/influencer.types';
import { cn } from '@/lib/utils';
import { formatCollaborationType } from '@/lib/format-collaboration-type';
import { CollaborationRequestDialog } from './CollaborationRequestDialog';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import { RankingScoreCard } from './RankingScoreCard';
import { RankingBreakdownCard } from './RankingBreakdownCard';
import { RankTierBadge } from '@/components/shared/RankTierBadge';
import { RankingBreakdown } from '@/types/ranking';
import { useInfluencerReviews, useDeleteReview, useUpdateReview } from '@/hooks/use-review.hooks';
import { ReviewList } from '@/features/review/components/ReviewList';
import { ReviewSubmissionModal } from '@/features/review/components/ReviewSubmissionModal';
import { Review } from '@/types/review.types';
import { ReportModal } from '@/features/report/components/ReportModal';
import { useUpdateInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { PasswordUpdateForm } from '@/features/profile/components/PasswordUpdateForm';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [docUrl, setDocUrl] = useState('');
    const [notes, setNotes] = useState('');

    const verificationMutation = useSubmitVerification();
    const { data: verificationRequests } = useMyVerificationStatus();
    const currentVerification = (verificationRequests as any[])?.[0];

    const { user: influencerUser, niche, platforms, avatarUrl, bio, address, avgRating, totalReviews, verified, availability } = influencer;

    // Calculate total followers from all platforms
    const followersCount = Object.values(platforms || {}).reduce((sum: number, platform: any) => sum + (platform.followers || 0), 0);

    // Calculate average engagement rate from platforms
    const platformsWithEngagement = Object.values(platforms || {}).filter((p: any) => p.engagementRate);
    const avgEngagementRate = platformsWithEngagement.length > 0
        ? platformsWithEngagement.reduce((sum: number, p: any) => sum + (p.engagementRate || 0), 0) / platformsWithEngagement.length
        : 0;
    const collaborationTypes = influencer.collaborationTypes || [];
    const profile = influencerUser?.profile;
    const displayBio = bio || profile?.bio;
    const displayAvatar = avatarUrl || profile?.avatarUrl;

    const { data: reviews = [], isLoading: isReviewsLoading } = useInfluencerReviews(influencer.id);
    const deleteReview = useDeleteReview(influencer.id);
    const updateReview = useUpdateReview(influencer.id);
    const updateInfluencer = useUpdateInfluencerProfile();

    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const handleUpdateAvailability = (status: AvailabilityStatus) => {
        updateInfluencer.mutate({ availability: status });
    };

    const handleAddCollabType = (type: CollaborationType) => {
        if (!collaborationTypes.includes(type as any)) {
            updateInfluencer.mutate({
                collaborationTypes: [...collaborationTypes, type] as any
            });
        }
    };

    const handleRemoveCollabType = (type: string) => {
        updateInfluencer.mutate({
            collaborationTypes: collaborationTypes.filter(t => t !== type) as any
        });
    };

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
            <Link
                href={FRONTEND_ROUTES.DASHBOARD.DISCOVER}
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Discovery
            </Link>

            {/* Profile Header */}
            <div className="relative">
                {/* Banner */}
                <div className="h-64 rounded-[3rem] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border/50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                </div>

                {/* Profile Info Overlay */}
                <div className="px-4 sm:px-8 -mt-24 relative z-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-6 md:border-8 border-background shadow-2xl"
                    >
                        {displayAvatar ? (
                            <Image
                                src={displayAvatar}
                                alt={profile?.fullName || 'Influencer'}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-5xl font-bold">
                                {profile?.fullName?.charAt(0) || '?'}
                            </div>
                        )}
                    </motion.div>

                    <div className="flex-1 min-w-0 pb-4 space-y-3 md:space-y-4">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight truncate max-w-[280px] sm:max-w-none">{profile?.fullName}</h1>
                            {(ranking?.rankingTier || influencer.rankingTier) && (
                                <RankTierBadge tier={ranking?.rankingTier || influencer.rankingTier} size="lg" />
                            )}
                            {verified && (
                                <div className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                                    <CheckCircle2 size={14} />
                                    Verified Creator
                                </div>
                            )}
                            {isOwner && !verified && !currentVerification && (
                                <button
                                    onClick={() => setIsVerificationModalOpen(true)}
                                    className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-all active:scale-95"
                                >
                                    <ShieldCheck size={14} />
                                    Get Verified
                                </button>
                            )}
                            {isOwner && !verified && currentVerification?.status === VerificationStatus.PENDING && (
                                <div className="bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-yellow-500/20">
                                    <Clock size={14} />
                                    Verification Pending
                                </div>
                            )}
                            {isOwner && !verified && currentVerification?.status === VerificationStatus.REJECTED && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-red-500/10 text-red-600 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-red-500/20">
                                        <Flag size={14} />
                                        Rejected
                                    </div>
                                    <button
                                        onClick={() => setIsVerificationModalOpen(true)}
                                        className="text-primary text-[10px] font-bold underline hover:text-primary/80 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {isOwner ? (
                                <Select
                                    value={availability}
                                    onValueChange={handleUpdateAvailability}
                                    disabled={updateInfluencer.isPending}
                                >
                                    <SelectTrigger className="h-8 border-border/50 bg-background/50 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider w-fit">
                                        <div className="flex items-center gap-2">
                                            <span className={cn("w-2 h-2 rounded-full", getAvailabilityColor(availability))} />
                                            <SelectValue placeholder={availability} />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={AvailabilityStatus.OPEN}>OPEN</SelectItem>
                                        <SelectItem value={AvailabilityStatus.BUSY}>BUSY</SelectItem>
                                        <SelectItem value={AvailabilityStatus.CLOSED}>CLOSED</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-border/50">
                                    <span className={cn("w-2 h-2 rounded-full", getAvailabilityColor(availability))} />
                                    <span className="text-xs font-bold uppercase tracking-wider">{availability}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-foreground">@{profile?.username}</span>
                            </div>
                            {profile?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-primary" />
                                    <span>{profile.location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Briefcase size={18} className="text-primary" />
                                <span>{niche}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pb-4 flex gap-4">
                        {isOwner ? (
                            <Link href={FRONTEND_ROUTES.DASHBOARD.INFLUENCER_EDIT}>
                                <Button className="px-8 h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                    <AlignLeft size={20} />
                                    Edit Profile
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsReportModalOpen(true)}
                                    className="w-14 h-14 bg-muted/50 rounded-2xl border-border/50 hover:bg-destructive/10 hover:text-destructive transition-all flex items-center justify-center group"
                                    title="Report Influencer"
                                >
                                    <Flag size={20} className="group-hover:fill-destructive transition-colors" />
                                </Button>
                                <Button className="px-8 h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                    <MessageCircle size={20} />
                                    Contact
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Left Column: Stats & Socials */}
                <div className="xl:col-span-1 space-y-6 md:space-y-8">
                    {/* Stats Card */}
                    <Card className="rounded-[2rem] border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/30">
                            <h3 className="font-bold tracking-tight">Channel Performance</h3>
                        </div>
                        <CardContent className="p-8 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users size={16} />
                                        <span className="text-xs font-bold uppercase">Total Reach</span>
                                    </div>
                                    <p className="text-3xl font-black">
                                        {Intl.NumberFormat('en', { notation: 'compact' }).format(followersCount)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <TrendingUp size={24} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-2xl border border-border/50">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Avg Eng. Rate</p>
                                    <p className="text-xl font-bold text-green-500">{avgEngagementRate.toFixed(1)}%</p>
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-2xl border border-border/50">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Avg Rating</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xl font-bold">{avgRating}</p>
                                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ranking Card */}
                    {ranking ? (
                        <RankingBreakdownCard breakdown={ranking} />
                    ) : isRankingLoading ? (
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
                                                <div key={type} className="group relative">
                                                    <Badge className="px-4 py-2 bg-primary/5 border border-primary/10 text-primary rounded-xl text-sm font-bold flex items-center gap-2 shadow-none hover:bg-primary/10">
                                                        {formatCollaborationType(type)}
                                                        {isOwner && (
                                                            <button
                                                                onClick={() => handleRemoveCollabType(type)}
                                                                className="hover:text-destructive transition-colors"
                                                                disabled={updateInfluencer.isPending}
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        )}
                                                    </Badge>
                                                </div>
                                            ))
                                        ) : (
                                            !isOwner && <span className="text-muted-foreground italic">Contact for details</span>
                                        )}

                                        {isOwner && (
                                            <Select
                                                key={`collab-type-${collaborationTypes.length}`}
                                                onValueChange={(val) => handleAddCollabType(val as CollaborationType)}
                                                disabled={updateInfluencer.isPending}
                                            >
                                                <SelectTrigger className="w-fit h-9 rounded-xl border-dashed border-2 px-3 text-xs font-bold">
                                                    <div className="flex items-center gap-2">
                                                        <Plus size={14} />
                                                        <SelectValue placeholder="Add Type" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(CollaborationType)
                                                        .filter(t => !collaborationTypes.includes(t as any))
                                                        .map(t => (
                                                            <SelectItem key={t} value={t}>
                                                                {formatCollaborationType(t)}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
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

                            <div className="pt-8 border-t border-border/50 flex flex-wrap gap-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 min-w-[200px] h-14 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border-none"
                                >
                                    View Media Kit
                                    <ExternalLink size={18} />
                                </Button>
                                {(user?.role === UserRole.USER || user?.role === UserRole.ADMIN) && user?.id !== influencer.user.id && (
                                    <CollaborationRequestDialog
                                        influencerId={influencer.id}
                                        influencerName={profile?.fullName || 'Creator'}
                                    >
                                        <Button className="flex-1 min-w-[200px] h-14 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
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

            {/* Account Security (Password Update) */}
            {isOwner && (
                <div className="pt-6 md:pt-8">
                    <Card className="rounded-[2rem] md:rounded-[3rem] border-border/50 bg-card/30 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 border-none shadow-none ring-1 ring-border/50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                        <Lock size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight">Account Security</h3>
                                </div>
                                <p className="text-lg text-muted-foreground font-medium">
                                    Keep your account secure by updating your password regularly.
                                </p>
                            </div>
                            <div className="md:col-span-2 max-w-xl">
                                <PasswordUpdateForm />
                            </div>
                        </div>
                    </Card>
                </div>
            )}

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

            {/* Verification Modal */}
            <AnimatedModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
                title="Request Profile Verification"
                description="Submit proof of your identity or social media influence to get the verified badge."
                size="md"
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="docUrl" className="font-bold">Identity/Influence Proof (URL)</Label>
                        <Input
                            id="docUrl"
                            placeholder="e.g. Google Drive or Dropbox link to your documents"
                            value={docUrl}
                            onChange={(e) => setDocUrl(e.target.value)}
                            className="h-12 rounded-xl"
                        />
                        <p className="text-[10px] text-muted-foreground">Provide a link to a document or screenshot that proves your identity or reach.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="v-notes" className="font-bold">Additional Notes (Optional)</Label>
                        <Textarea
                            id="v-notes"
                            placeholder="Tell us why your profile should be verified..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="min-h-[100px] rounded-xl resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setIsVerificationModalOpen(false)}
                            className="flex-1 h-12 rounded-xl font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-[2] h-12 rounded-xl font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                            onClick={() => {
                                verificationMutation.mutate({
                                    documents: {
                                        idProof: docUrl,
                                        notes
                                    }
                                }, {
                                    onSuccess: () => setIsVerificationModalOpen(false)
                                });
                            }}
                            disabled={!docUrl || verificationMutation.isPending}
                        >
                            {verificationMutation.isPending ? "Submitting..." : "Submit Request"}
                        </Button>
                    </div>
                </div>
            </AnimatedModal>
        </div>
    );
};
