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
import { ReviewForm } from '@/components/features/reviews/components/ReviewForm';
import { LoadingState } from '@/components/ui/states/LoadingState';
import { ErrorState } from '@/components/ui/states/ErrorState';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { IndianRupee, Briefcase, Globe, CheckCircle2, PieChart, Flag } from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants/constants';
import { ReportDialog } from '@/components/features/report/ReportDialog';


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


export function InfluencerDetailContainer() {
    const params = useParams();
    const id = params?.id as string;
    const { user: currentUser } = useAuth();
    const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<any | null>(null);
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

    const { data: influencer, isLoading, isError } = useInfluencerDetail(id);
    const { data: realReviews } = useInfluencerReviews(id);
    const deleteReviewMutation = useDeleteReview();
    const startConversation = useStartConversation();

    const displayReviews = useMemo(() => {
        const reviews = realReviews || [];
        return reviews.map(r => ({
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
    }, [realReviews]);

    const handleEditReview = (review: any) => {
        setEditingReview({
            id: review.id,
            rating: review.rating,
            comment: review.text,
            categories: review.categories
        });
        setIsReviewModalOpen(true);
    };

    const isOwnProfile = currentUser && influencer && currentUser.id === influencer.user.id;

    if (isLoading) return <LoadingState message="Loading influencer profile..." />;
    if (isError || !influencer) return <ErrorState message="Influencer not found" />;

    return (
        <PageContainer>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Hero Profile Section */}
                <div className="relative rounded-[2rem] overflow-hidden glass border-glass-border shadow-sm">
                    <div className="h-48 sm:h-64 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 relative">
                        <div className="absolute inset-0 backdrop-blur-3xl opacity-50" />
                    </div>

                    <div className="px-6 sm:px-12 pb-12 -mt-24 sm:-mt-32 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition-opacity" />
                                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-[2.5rem] bg-secondary border-4 border-background overflow-hidden relative shadow-sm">
                                        <img
                                            src={influencer.user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${influencer.user.name}`}
                                            alt={influencer.user.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-green-500 border-2 border-background shadow-sm" />
                                </motion.div>

                                <div className="text-center md:text-left space-y-3 pb-2">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
                                            {influencer.user.name}
                                        </h1>
                                        {influencer.verified && (
                                            <Badge variant="outline" className="rounded-full px-3 border-primary/50 text-primary">
                                                <Star className="w-3 h-3 mr-1 fill-current" /> Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xl text-muted-foreground font-medium">@{influencer.user.email.split('@')[0]}</p>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                                            <IndianRupee className="w-3.5 h-3.5" />
                                            Starting from ₹{"5,000"}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {influencer.location || "Mumbai, India"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-4 pb-2">
                                {isOwnProfile ? (
                                    <Link href={FRONTEND_ROUTES.PROFILE.EDIT}>
                                        <Button variant="outline" className="rounded-xl px-8 h-12 glass border-glass-border font-medium">
                                            Edit Profile
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl px-8 h-12 glass border-glass-border font-medium"
                                            onClick={() => influencer.user.email && (window.location.href = `mailto:${influencer.user.email}`)}
                                        >
                                            <Mail className="w-4 h-4 mr-2" />
                                            Message
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="rounded-xl px-8 h-12 shadow-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                                            onClick={() => setIsCollabModalOpen(true)}
                                        >
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            Collaborate
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Bio/About */}
                        <GlassCard className="p-8 sm:p-10 border-glass-border shadow-sm">
                            <h2 className="text-2xl font-display font-bold mb-6">About</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                                {influencer.bio || `${influencer.user.name} is a creative visionary based in ${influencer.location || 'Mumbai'}. With a passion for storytelling and authentic engagement, they have built a thriving community focused on ${influencer.niche || 'quality content'}.`}
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 p-6 rounded-2xl bg-secondary/20 border border-glass-border">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Followers</p>
                                    <p className="text-2xl font-bold font-display">{formatNumber(influencer.followersCount)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Reach</p>
                                    <p className="text-2xl font-bold font-display">{formatNumber(influencer.followersCount * 1.5)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Engagement</p>
                                    <p className="text-2xl font-bold font-display">{influencer.engagementRate || "4.8"}%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Niche</p>
                                    <p className="text-sm font-bold font-display line-clamp-1">{influencer.niche || 'Modern Tech'}</p>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Recent Work / Gallery */}
                        <GlassCard className="p-8 sm:p-10 border-glass-border shadow-xl">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-display font-bold">Portfolio</h2>
                                <Button variant="ghost" className="text-primary font-medium">View All</Button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className="aspect-square rounded-2xl bg-secondary overflow-hidden relative group"
                                    >
                                        <img
                                            src={`https://images.unsplash.com/photo-${1600000000000 + i * 1000000}?w=400&h=400&fit=crop`}
                                            alt="Portfolio work"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <ExternalLink className="text-white w-6 h-6" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Reviews */}
                        <ReviewsSection
                            reviews={displayReviews}
                            influencerName={influencer.user.name || 'Influencer'}

                            averageRating={influencer.avgRating || 0}
                            totalReviews={displayReviews.length}
                            currentUserId={currentUser?.id}
                            onEdit={handleEditReview}
                            onDelete={(reviewId) => deleteReviewMutation.mutate({ id: reviewId, influencerId: id })}
                        />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Social Links */}
                        <GlassCard className="p-8 border-glass-border shadow-xl">
                            <h3 className="text-xl font-display font-bold mb-6">Social Reach</h3>
                            <div className="space-y-6">
                                {influencer.platforms?.map((platform: string) => (
                                    <div key={platform} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Globe className="w-5 h-5 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-medium capitalize">{platform}</p>
                                                <p className="text-xs text-muted-foreground">Main Channel</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{formatNumber(influencer.followersCount)}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Followers</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Quick Stats / Highlights */}
                        <GlassCard className="p-8 border-glass-border shadow-xl bg-primary/5">
                            <h3 className="text-xl font-display font-bold mb-6">Collaboration Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>Typically responds in 24 hours</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <span>45+ successful projects</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                        <PieChart className="w-4 h-4" />
                                    </div>
                                    <span>High audience authenticity</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-glass-border">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="font-display font-bold text-lg">Leave a Review</p>
                                    <Badge variant="outline" className="text-[10px] font-bold">BRANDS ONLY</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                    Already worked with {influencer.user.name}? Share your experience with the community.
                                </p>
                                {!isOwnProfile && currentUser?.role === ROLES.BRAND && (
                                    <Button
                                        className="w-full rounded-xl h-11 premium-gradient-bg border-0 shadow-sm font-semibold"
                                        onClick={() => setIsReviewModalOpen(true)}
                                    >
                                        Write a Review
                                    </Button>
                                )}
                            </div>
                        </GlassCard>

                        {/* Quick Actions */}
                        <div className="flex flex-col gap-3">
                            <Button
                                variant="outline"
                                className="w-full rounded-xl h-12 glass border-glass-border gap-2"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Profile link copied!");
                                }}
                            >
                                <Share2 className="w-4 h-4" /> Share Profile
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full rounded-xl h-12 text-destructive hover:bg-destructive/5 gap-2"
                                onClick={() => setIsReportDialogOpen(true)}
                            >
                                <Flag className="w-4 h-4" /> Report Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
                <DialogContent className="glass border-glass-border sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingReview ? 'Edit Your Review' : `Write a Review for ${influencer.user.name}`}</DialogTitle>
                    </DialogHeader>
                    <ReviewForm
                        influencerId={id}
                        initialData={editingReview}
                        onSuccess={() => {
                            setIsReviewModalOpen(false);
                            setEditingReview(null);
                        }}
                    />
                </DialogContent>
            </Dialog>

            <RequestCollaborationModal
                isOpen={isCollabModalOpen}
                onClose={() => setIsCollabModalOpen(false)}
                influencerId={id}
                influencerName={influencer.user.name || 'Influencer'}

            />

            <ReportDialog
                isOpen={isReportDialogOpen}
                onClose={() => setIsReportDialogOpen(false)}
                type="influencer"
                targetName={influencer.user.name || 'Influencer'}

                targetId={id}
            />
        </PageContainer>
    );
}
