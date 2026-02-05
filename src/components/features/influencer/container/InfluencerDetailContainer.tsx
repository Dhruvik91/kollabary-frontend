'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInfluencerDetail } from '@/hooks/useInfluencers';
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
    CheckCircle2,
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { RequestCollaborationModal } from '@/components/features/collaboration/components/RequestCollaborationModal';
import { ReviewsSection } from "@/components/features/influencer/components/ReviewsSection";
import { ReportInfluencerButton } from "@/components/features/influencer/components/ReportInfluencerButton";


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

const platformLabels: Record<string, string> = {
    instagram: "Instagram",
    youtube: "YouTube",
    twitter: "Twitter/X",
    tiktok: "TikTok",
    pinterest: "Pinterest",
};

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

// Mock extended data for profiles - replicated from kollabary-connect
const getExtendedProfile = (id: string) => ({
    location: "Los Angeles, CA",
    joinedDate: "January 2022",
    email: "contact@example.com",
    rating: 4.9,
    reviewCount: 127,
    completedCollabs: 45,
    responseRate: 98,
    avgResponseTime: "< 2 hours",
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
            id: "1",
            author: "TechBrand Co",
            rating: 5,
            text: "Exceptional work and great communication. The content was delivered on time and exceeded our expectations. The influencer was professional throughout the entire collaboration.",
            date: "2 weeks ago",
            helpful: 12,
            verified: true,
            categories: { communication: 5, quality: 5, professionalism: 5, timeliness: 5 },
        },
        {
            id: "2",
            author: "FashionHub",
            rating: 5,
            text: "Delivered amazing content that exceeded our expectations. The creativity and attention to detail was outstanding. Would definitely work together again!",
            date: "1 month ago",
            helpful: 8,
            verified: true,
            categories: { communication: 5, quality: 5, professionalism: 5, timeliness: 4 },
        },
        {
            id: "3",
            author: "FitLife Pro",
            rating: 4,
            text: "Professional and creative. Would work with again. The content quality was good, though there was a slight delay in delivery.",
            date: "2 months ago",
            helpful: 5,
            verified: true,
            categories: { communication: 4, quality: 5, professionalism: 4, timeliness: 3 },
        },
        {
            id: "4",
            author: "GreenEats",
            rating: 5,
            text: "Absolutely fantastic collaboration! The influencer understood our brand perfectly and created content that resonated with their audience. Great engagement results.",
            date: "2 months ago",
            helpful: 15,
            verified: true,
            categories: { communication: 5, quality: 5, professionalism: 5, timeliness: 5 },
        },
        {
            id: "5",
            author: "TravelMore Agency",
            rating: 4,
            text: "Good experience overall. The content was high quality and well-produced. Communication could have been slightly better but the end result was worth it.",
            date: "3 months ago",
            helpful: 3,
            verified: false,
            categories: { communication: 3, quality: 5, professionalism: 4, timeliness: 4 },
        },
    ],
});

export function InfluencerDetailContainer() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const { data: influencer, isLoading, isError } = useInfluencerDetail(id);
    const extendedProfile = useMemo(() => (id ? getExtendedProfile(id) : null), [id]);

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
                <GlassCard className="py-16 max-w-4xl mx-auto">
                    <h1 className="font-display text-2xl font-bold mb-4">Influencer Not Found</h1>
                    <p className="text-muted-foreground mb-6">
                        The influencer you're looking for doesn't exist or has been removed.
                    </p>
                    <Button onClick={() => router.push('/influencers')}>
                        Browse Influencers
                    </Button>
                </GlassCard>
            </div>
        );
    }

    const userProfile = influencer.user;

    return (
        <div className="container px-4 py-12 mx-auto">
            <BackgroundEffects />

            {/* Back Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                    <span>Back to Marketplace</span>
                </Button>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <GlassCard variant="elevated" className="p-6 sm:p-8 relative overflow-hidden">
                            <div className="absolute inset-0 gradient-bg opacity-[0.03] pointer-events-none" />
                            <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                                {/* Avatar */}
                                <div className="relative mx-auto sm:mx-0 shrink-0">
                                    <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
                                        <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-primary/10 bg-secondary/50 flex items-center justify-center">
                                            {userProfile?.profileImage ? (
                                                <Image
                                                    src={userProfile.profileImage}
                                                    alt={`${userProfile.name || 'User'}'s profile picture`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 112px, 144px"
                                                    priority
                                                />
                                            ) : (
                                                <Users className="w-12 h-12 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                    {influencer.verified && (
                                        <div
                                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center z-10"
                                            title="Verified Creator"
                                            aria-label="Verified creator"
                                        >
                                            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                        <h1 className="font-display text-3xl sm:text-4xl font-bold">{userProfile?.name || 'Influencer'}</h1>
                                        <div className="flex items-center justify-center sm:justify-start gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                                            <span className="font-medium">{influencer.avgRating || extendedProfile?.rating || 0}</span>
                                            <span className="text-muted-foreground text-sm">
                                                ({influencer.totalReviews || extendedProfile?.reviewCount || 0} reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">@{userProfile?.email?.split('@')[0]}</p>

                                    <div className="flex flex-wrap justify-center sm:justify-start gap-5 text-sm text-muted-foreground mb-6">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                                            {influencer.location || extendedProfile?.location || 'Global'}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                                            Joined {extendedProfile?.joinedDate || new Date(influencer.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className="text-foreground leading-relaxed text-lg">{influencer.bio || 'No bio available.'}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-glass-border">
                                <Button
                                    onClick={() => setIsRequestDialogOpen(true)}
                                    className="flex-1 gradient-bg border-0 glow-primary h-12 text-lg"
                                    aria-label="Send collaboration request"
                                >
                                    <MessageSquare className="w-5 h-5 mr-2" aria-hidden="true" />
                                    Request Collaboration
                                </Button>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="border-glass-border hover:bg-glass h-12 px-5"
                                        onClick={() => setIsSaved(!isSaved)}
                                        aria-label={isSaved ? "Remove from saved" : "Save to favorites"}
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${isSaved ? "fill-accent text-accent" : ""}`}
                                            aria-hidden="true"
                                        />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-glass-border hover:bg-glass h-12 px-5"
                                        aria-label="Share profile"
                                    >
                                        <Share2 className="w-5 h-5" aria-hidden="true" />
                                    </Button>
                                    <ReportInfluencerButton
                                        influencerId={influencer.id}
                                        influencerName={userProfile?.name || 'Influencer'}
                                        variant="icon"
                                    />
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <GlassCard className="p-4 text-center">
                                <Users className="w-6 h-6 mx-auto mb-2 text-primary" aria-hidden="true" />
                                <div className="font-display text-2xl font-bold">{formatNumber(influencer.followersCount || 0)}</div>
                                <div className="text-sm text-muted-foreground">Followers</div>
                            </GlassCard>
                            <GlassCard className="p-4 text-center">
                                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" aria-hidden="true" />
                                <div className="font-display text-2xl font-bold">{influencer.engagementRate || 0}%</div>
                                <div className="text-sm text-muted-foreground">Engagement</div>
                            </GlassCard>
                            <GlassCard className="p-4 text-center">
                                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" aria-hidden="true" />
                                <div className="font-display text-2xl font-bold">{extendedProfile?.completedCollabs || 0}</div>
                                <div className="text-sm text-muted-foreground">Collabs Done</div>
                            </GlassCard>
                            <GlassCard className="p-4 text-center">
                                <Mail className="w-6 h-6 mx-auto mb-2 text-primary" aria-hidden="true" />
                                <div className="font-display text-2xl font-bold">{extendedProfile?.responseRate || 100}%</div>
                                <div className="text-sm text-muted-foreground">Response Rate</div>
                            </GlassCard>
                        </div>
                    </motion.div>

                    {/* Recent Posts - Using Mock Only */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-6 sm:p-8">
                            <h2 className="font-display text-2xl font-semibold mb-6">Recent Content</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {extendedProfile?.recentPosts.map((post, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="aspect-square rounded-xl overflow-hidden cursor-pointer relative"
                                    >
                                        <Image
                                            src={post}
                                            alt={`Recent post ${index + 1}`}
                                            fill
                                            className="object-cover hover:opacity-90 transition-opacity"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Reviews Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {extendedProfile && (
                            <ReviewsSection
                                reviews={extendedProfile.reviews}
                                influencerName={userProfile?.name || 'Influencer'}
                                averageRating={influencer.avgRating || extendedProfile.rating}
                                totalReviews={influencer.totalReviews || extendedProfile.reviewCount}
                            />
                        )}
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Platforms */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <GlassCard className="p-6">
                            <h2 className="font-display text-xl font-semibold mb-6">Social Reach</h2>
                            <div className="space-y-4">
                                {influencer.platforms?.map((platform) => (
                                    <button
                                        key={platform}
                                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-glass-border/30 hover:bg-secondary/50 hover:border-glass-border transition-all text-left group"
                                    >
                                        <div className="w-11 h-11 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground group-hover:glow-primary transition-all">
                                            {platformIcons[platform.toLowerCase()] || <ExternalLink className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <span className="font-semibold block">
                                                {platformLabels[platform.toLowerCase()] || platform}
                                            </span>
                                            <span className="text-xs text-muted-foreground">Verified Account</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                                    </button>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Categories/Niche */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-6">
                            <h2 className="font-display text-xl font-semibold mb-4">Niches & Topics</h2>
                            <div className="flex flex-wrap gap-2">
                                {(influencer.niche ? [influencer.niche] : []).map((niche) => (
                                    <Badge
                                        key={niche}
                                        className="gradient-bg border-0 text-primary-foreground px-4 py-1.5"
                                    >
                                        {niche}
                                    </Badge>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <GlassCard className="p-6">
                            <h2 className="font-display text-xl font-semibold mb-6">Service Level</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-primary" />
                                        Avg. Response
                                    </span>
                                    <span className="font-bold text-primary">{extendedProfile?.avgResponseTime}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" />
                                        Response Rate
                                    </span>
                                    <span className="font-bold text-primary">{extendedProfile?.responseRate}%</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Completion
                                    </span>
                                    <span className="font-bold text-primary">100%</span>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
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
