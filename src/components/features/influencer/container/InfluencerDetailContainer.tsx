'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInfluencerDetail } from '@/hooks/useInfluencers';
import { useStartConversation } from '@/hooks/useMessaging';
import { useInfluencerReviews, useUpdateReview, useDeleteReview } from '@/hooks/useReviews';
import { toast } from 'sonner';
import { useAuth } from '@/providers/auth-provider';
import { motion } from 'framer-motion';
import {
    Instagram,
    Youtube,
    Twitter,
    ExternalLink,
    Users,
    TrendingUp,
    MapPin,
    Calendar,
    Mail,
    ArrowLeft,
    Share2,
    Heart,
    MessageSquare,
    Star,
    Loader2,
    Plus,
} from "lucide-react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { RequestCollaborationModal } from '@/components/features/collaboration/components/RequestCollaborationModal';
import { ReviewsSection } from "@/components/features/influencer/components/ReviewsSection";
import { ReportInfluencerButton } from "@/components/features/influencer/components/ReportInfluencerButton";
import { ROLES } from '@/constants/constants';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReviewForm } from '@/features/reviews/components/ReviewForm';

const platformIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram className="w-5 h-5" aria-hidden="true" />,
    youtube: <Youtube className="w-5 h-5" aria-hidden="true" />,
    twitter: <Twitter className="w-5 h-5" aria-hidden="true" />,
    tiktok: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    ),
    pinterest: <ExternalLink className="w-5 h-5" aria-hidden="true" />,
};

function formatNumber(value: number | string): string {
    const num = Number(value);
    if (isNaN(num)) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
}

const getExtendedProfile = (id: string) => ({
    location: "Los Angeles, CA",
    joinedDate: "January 2022",
    email: "contact@example.com",
    rating: 4.9,
    reviewCount: 127,
    completedCollabs: 45,
    recentPosts: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1583396087350-9c84c781c021?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    ],
    reviews: [
        {
            id: "m1",
            author: "TechBrand Co",
            rating: 5,
            text: "Exceptional work and great communication. The content was delivered on time and exceeded our expectations.",
            date: "2 weeks ago",
            helpful: 12,
            verified: true,
            categories: { communication: 5, quality: 5, professionalism: 5, timeliness: 5 },
        },
    ],
});

export function InfluencerDetailContainer() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const { user: currentUser } = useAuth();
    const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<any | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    const { data: influencer, isLoading, isError } = useInfluencerDetail(id);
    const { data: realReviews } = useInfluencerReviews(id);
    const deleteReviewMutation = useDeleteReview();
    const startConversation = useStartConversation();
    const extendedProfile = useMemo(() => (id ? getExtendedProfile(id) : null), [id]);

    const displayReviews = useMemo(() => {
        const reviews = realReviews || [];
        // Map real reviews to the format expected by ReviewsSection
        const mappedReal = reviews.map(r => ({
            id: r.id,
            author: r.reviewer?.name || 'Anonymous',
            authorAvatar: r.reviewer?.profileImage,
            rating: r.rating,
            text: r.comment,
            date: new Date(r.createdAt).toLocaleDateString(),
            helpful: r.helpful || 0,
            verified: r.verified || false,
            categories: r.categories,
            reviewerId: r.reviewer?.id,
        }));

        return [...mappedReal, ...(extendedProfile?.reviews || [])];
    }, [realReviews, extendedProfile]);

    const handleEditReview = (review: any) => {
        setEditingReview({
            id: review.id,
            rating: review.rating,
            comment: review.text
        });
        setIsReviewFormOpen(true);
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await deleteReviewMutation.mutateAsync({ id: reviewId, influencerId: id });
            toast.success('Review deleted');
        } catch (error) {
            toast.error('Failed to delete review');
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground animate-pulse">Loading profile...</p>
            </div>
        );
    }

    if (!influencer || isError) {
        return (
            <div className="container py-20 text-center">
                <BackgroundEffects />
                <GlassCard className="py-16 max-w-4xl mx-auto text-center px-4">
                    <h1 className="font-display text-2xl font-bold mb-4">Influencer Not Found</h1>
                    <Button onClick={() => router.push('/influencers')}>Browse Influencers</Button>
                </GlassCard>
            </div>
        );
    }

    const userProfile = influencer.user;
    const isOwnProfile = currentUser?.id === userProfile?.id;

    const handleStartChat = async () => {
        if (!currentUser) {
            router.push('/auth/login');
            return;
        }
        try {
            const conversation = await startConversation.mutateAsync({ targetUserId: userProfile.id });
            router.push(`/messages?id=${conversation.id}`);
        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    };

    return (
        <div className="container px-4 py-12 mx-auto">
            <BackgroundEffects />
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
                <Button variant="ghost" onClick={() => router.back()} className="group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Marketplace</span>
                </Button>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <GlassCard variant="elevated" className="p-6 sm:p-8 relative overflow-hidden">
                            <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                                <div className="relative mx-auto sm:mx-0 shrink-0">
                                    <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
                                        <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-primary/10 bg-secondary/50 flex items-center justify-center">
                                            {userProfile?.profileImage ? (
                                                <Image src={userProfile.profileImage} alt={userProfile.name || 'User'} fill className="object-cover" />
                                            ) : (
                                                <Users className="w-12 h-12 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                        <h1 className="font-display text-3xl sm:text-4xl font-bold">{userProfile?.name || 'Influencer'}</h1>
                                        <div className="flex items-center justify-center sm:justify-start gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-medium">{Number(influencer.avgRating || 0)}</span>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">@{userProfile?.email?.split('@')[0]}</p>
                                    <p className="text-foreground leading-relaxed text-lg">{influencer.bio || 'No bio available.'}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-glass-border">
                                {!isOwnProfile && (
                                    <>
                                        <Button
                                            onClick={() => setIsRequestDialogOpen(true)}
                                            className="flex-1 gradient-bg border-0 glow-primary h-12 text-lg"
                                            disabled={currentUser?.role === ROLES.INFLUENCER || !currentUser}
                                        >
                                            <Users className="w-5 h-5 mr-2" />
                                            Request Collaboration
                                        </Button>
                                        <Button
                                            onClick={handleStartChat}
                                            variant="secondary"
                                            className="flex-1 glass border-primary/20 hover:bg-primary/10 h-12 text-lg"
                                            disabled={startConversation.isPending}
                                        >
                                            {startConversation.isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <MessageSquare className="w-5 h-5 mr-2" />}
                                            Message
                                        </Button>
                                    </>
                                )}
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setIsSaved(!isSaved)} className="h-12 px-5 border-glass-border hover:bg-glass">
                                        <Heart className={`w-5 h-5 ${isSaved ? "fill-accent text-accent" : ""}`} />
                                    </Button>
                                    <Button variant="outline" className="h-12 px-5 border-glass-border hover:bg-glass">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                    <ReportInfluencerButton influencerId={influencer.id} influencerName={userProfile?.name || 'Influencer'} variant="icon" />
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <GlassCard className="p-4 text-center">
                            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="font-display text-2xl font-bold">{formatNumber(influencer.followersCount || 0)}</div>
                            <div className="text-sm text-muted-foreground">Followers</div>
                        </GlassCard>
                        <GlassCard className="p-4 text-center">
                            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" />
                            <div className="font-display text-2xl font-bold">{Number(influencer.engagementRate || 0)}%</div>
                            <div className="text-sm text-muted-foreground">Engagement</div>
                        </GlassCard>
                        <GlassCard className="p-4 text-center">
                            <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                            <div className="font-display text-2xl font-bold">{influencer.totalReviews || 0}</div>
                            <div className="text-sm text-muted-foreground">Reviews</div>
                        </GlassCard>
                        <GlassCard className="p-4 text-center">
                            <Mail className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="font-display text-2xl font-bold">98%</div>
                            <div className="text-sm text-muted-foreground">Response</div>
                        </GlassCard>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-2xl font-bold">Reviews</h2>
                            {!isOwnProfile && currentUser?.role === ROLES.BRAND && (
                                <Dialog open={isReviewFormOpen} onOpenChange={setIsReviewFormOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                                            <Plus className="w-4 h-4" />
                                            Write a Review
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="glass border-glass-border sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>{editingReview ? 'Edit Your Review' : `Write a Review for ${userProfile?.name}`}</DialogTitle>
                                        </DialogHeader>
                                        <ReviewForm
                                            influencerId={influencer.id}
                                            initialData={editingReview}
                                            onSuccess={() => {
                                                setIsReviewFormOpen(false);
                                                setEditingReview(null);
                                            }}
                                        />
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                        <ReviewsSection
                            reviews={displayReviews}
                            influencerName={userProfile?.name || 'Influencer'}
                            averageRating={influencer.avgRating || 0}
                            totalReviews={displayReviews.length}
                            currentUserId={currentUser?.id}
                            onEdit={handleEditReview}
                            onDelete={handleDeleteReview}
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <GlassCard className="p-6">
                        <h2 className="font-display text-xl font-semibold mb-6">Social Reach</h2>
                        <div className="space-y-4">
                            {influencer.platforms?.map((platform) => (
                                <div key={platform} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-glass-border/30">
                                    <div className="w-11 h-11 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground">
                                        {platformIcons[platform.toLowerCase()] || <ExternalLink className="w-5 h-5" />}
                                    </div>
                                    <span className="font-semibold">{platform}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h2 className="font-display text-xl font-semibold mb-4">Location</h2>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>{influencer.location || "Global"}</span>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <RequestCollaborationModal
                isOpen={isRequestDialogOpen}
                onClose={() => setIsRequestDialogOpen(false)}
                influencerId={influencer.id}
                influencerName={userProfile?.name || 'Influencer'}
            />
        </div>
    );
}
