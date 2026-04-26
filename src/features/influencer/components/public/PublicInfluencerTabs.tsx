'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Instagram, Twitter, Linkedin, Youtube, ExternalLink, CheckCircle2, ArrowRight, MessageSquareOff, Loader2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ReviewList } from '@/features/review/components/ReviewList';
import Image from 'next/image';
import Link from 'next/link';
import { ReviewCard } from '@/features/review/components/ReviewCard';
import { AudienceInsights } from './AudienceInsights';
import { formatCollaborationType } from '@/lib/format-collaboration-type';
import { Badge } from '@/components/ui/badge';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

interface PublicInfluencerTabsProps {
    influencerId: string;
    platforms: Record<string, any>;
    brandPartners: any[];
    reviews: any[];
    reviewsLoading: boolean;
    bio?: string;
    genderRatio?: Record<string, number>;
    ageBrackets?: Record<string, number>;
    topCountries?: string[];
    collaborationTypes?: string[];
}

export const PublicInfluencerTabs = ({
    influencerId,
    platforms,
    brandPartners,
    reviews,
    reviewsLoading,
    bio,
    genderRatio,
    ageBrackets,
    topCountries,
    collaborationTypes = [],
}: PublicInfluencerTabsProps) => {
    const [portfolioApi, setPortfolioApi] = useState<CarouselApi>();
    const [reviewsApi, setReviewsApi] = useState<CarouselApi>();
    
    const [portfolioCurrent, setPortfolioCurrent] = useState(0);
    const [portfolioCount, setPortfolioCount] = useState(0);
    const [reviewsCurrent, setReviewsCurrent] = useState(0);
    const [reviewsCount, setReviewsCount] = useState(0);

    // Sync Portfolio stats
    useEffect(() => {
        if (!portfolioApi) return;
        setPortfolioCount(portfolioApi.scrollSnapList().length);
        setPortfolioCurrent(portfolioApi.selectedScrollSnap() + 1);
        portfolioApi.on("select", () => {
            setPortfolioCurrent(portfolioApi.selectedScrollSnap() + 1);
        });
    }, [portfolioApi]);

    // Sync Reviews stats
    useEffect(() => {
        if (!reviewsApi) return;
        setReviewsCount(reviewsApi.scrollSnapList().length);
        setReviewsCurrent(reviewsApi.selectedScrollSnap() + 1);
        reviewsApi.on("select", () => {
            setReviewsCurrent(reviewsApi.selectedScrollSnap() + 1);
        });
    }, [reviewsApi]);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const platformIcons: Record<string, any> = {
        instagram: Instagram,
        twitter: Twitter,
        linkedin: Linkedin,
        youtube: Youtube,
        facebook: (props: any) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
        tiktok: (props: any) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
        ),
    };

    return (
        <Tabs defaultValue="about" className="space-y-12">
            <TabsList className="bg-muted/20 p-1.5 rounded-[1.5rem] border border-border/50 glass-chip w-full md:w-auto h-auto grid grid-cols-3 md:flex md:gap-2">
                <TabsTrigger value="about" className="rounded-xl px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">About</TabsTrigger>
                <TabsTrigger value="collaborations" className="rounded-xl px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl px-8 py-3.5 font-black uppercase text-[11px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
                {/* Biography Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Globe size={20} />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Biography</h3>
                        </div>
                        <p className="text-lg text-muted-foreground/90 leading-relaxed font-medium italic">
                            {bio || "This creator hasn't added a bio yet, but their work speaks for itself. They're likely focused on creating their next masterpiece!"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <ArrowRight size={20} />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Quick Facts</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 bg-muted/20 rounded-2xl border border-border/50">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Collaboration Types</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {collaborationTypes.length > 0 ? (
                                        collaborationTypes.map((type) => (
                                            <Badge
                                                key={type}
                                                variant="outline"
                                                className="bg-primary/5 border border-primary/10 text-primary rounded-lg text-[10px] font-bold shadow-none uppercase px-2 py-0.5"
                                            >
                                                {formatCollaborationType(type)}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm font-bold text-muted-foreground italic">Contact for details</p>
                                    )}
                                </div>
                            </div>
                            <div className="p-4 bg-muted/20 rounded-2xl border border-border/50">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Response Time</p>
                                <p className="text-sm font-bold">Usually within 24 hours</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platform Statistics */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-xl font-black tracking-tight uppercase">Presence Across Platforms</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(platforms).map(([name, data]) => {
                            const Icon = platformIcons[name.toLowerCase()] || Globe;
                            return (
                                <Card key={name} className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                                    <CardContent className="p-8 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                    <Icon size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-lg capitalize">{name}</h4>
                                                    <p className="text-xs text-muted-foreground font-medium">@{data.handle}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black tracking-tight">{formatNumber(data.followers)}</p>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Followers</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                                                <span>Engagement</span>
                                                <span className="text-primary">{data.engagementRate || 0}%</span>
                                            </div>
                                            <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden border border-primary/5">
                                                <motion.div
                                                    className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${data.engagementRate || 0}%` }}
                                                    transition={{ duration: 1.5, ease: "circOut" }}
                                                />
                                            </div>
                                        </div>

                                        <Button variant="ghost" className="w-full rounded-2xl h-12 gap-2 font-black text-[11px] uppercase tracking-widest bg-muted/20 hover:bg-primary hover:text-white transition-all group" asChild>
                                            <a href={`https://${name}.com/${data.handle}`} target="_blank" rel="noopener noreferrer">
                                                Explore Profile <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="collaborations" className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
                {/* Brand Partners Carousel */}
                <div className="space-y-8">
                    <Carousel
                        setApi={setPortfolioApi}
                        opts={{ align: "start", loop: false }}
                        className="w-full group"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1.5 bg-primary rounded-full" />
                                <h3 className="text-2xl font-black tracking-tight uppercase">Trusted by Following Brands</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                {portfolioCount > 1 && (
                                    <div className="px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                                        {portfolioCurrent} <span className="mx-1 text-muted-foreground/30">/</span> {portfolioCount}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <CarouselPrevious className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-10 rounded-xl" />
                                    <CarouselNext className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-10 rounded-xl" />
                                </div>
                            </div>
                        </div>

                        {brandPartners?.length > 0 ? (
                            <div className="relative">
                                <CarouselContent className="-ml-4">
                                    {brandPartners.map((brand: any) => (
                                        <CarouselItem key={brand.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                                            <Link href={`/b/${brand.id}`} className="block h-full group/card">
                                                <div className="flex items-center gap-4 p-5 bg-card/30 border border-border/50 rounded-[2.2rem] glass-card hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]">
                                                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 overflow-hidden relative border-border/50 group-hover/card:border-primary/50 transition-all">
                                                        {brand.avatarUrl ? (
                                                            <Image src={brand.avatarUrl} alt="" fill className="object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-primary/30 text-xl font-black uppercase">
                                                                {brand.fullName?.charAt(0) || 'B'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="grow">
                                                        <p className="text-sm font-black tracking-tight group-hover/card:text-primary transition-colors line-clamp-1">{brand.fullName || 'Brand'}</p>
                                                        <div className="flex items-center gap-1.5">
                                                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">View Brand</p>
                                                            <ArrowRight size={10} className="text-primary opacity-0 group-hover/card:opacity-100 -translate-x-2 group-hover/card:translate-x-0 transition-all" />
                                                        </div>
                                                    </div>
                                                    <CheckCircle2 size={16} className="text-primary/40 group-hover/card:text-primary transition-colors" />
                                                </div>
                                            </Link>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground italic px-2 font-medium">This creator is ready for their first major brand partnership!</p>
                        )}
                    </Carousel>
                </div>
            </TabsContent>

            <TabsContent value="reviews" className="animate-in fade-in duration-700 slide-in-from-bottom-4">
                <div className="space-y-8">
                    <Carousel
                        setApi={setReviewsApi}
                        opts={{ align: "start", loop: false }}
                        className="w-full group"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1.5 bg-primary rounded-full" />
                                <h3 className="text-2xl font-black tracking-tight uppercase">Recent Feedback</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                {reviewsCount > 1 && (
                                    <div className="px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                                        {reviewsCurrent} <span className="mx-1 text-muted-foreground/30">/</span> {reviewsCount}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <CarouselPrevious className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-10 rounded-xl" />
                                    <CarouselNext className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-10 rounded-xl" />
                                </div>
                            </div>
                        </div>

                        {!reviewsLoading && reviews?.length > 0 ? (
                            <div className="relative">
                                <CarouselContent className="-ml-4 sm:-ml-6">
                                    {(reviews || []).map((review) => (
                                        <CarouselItem key={review.id} className="pl-4 sm:pl-6 basis-full sm:basis-1/2">
                                            <div className="pb-4">
                                                <ReviewCard review={review} className="h-full bg-card/40 border-border/40 hover:border-primary/20 transition-all duration-500" />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </div>
                        ) : reviewsLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
                                <p className="text-muted-foreground text-xs font-black uppercase tracking-widest animate-pulse">
                                    Fetching reviews...
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-muted/5 rounded-[3rem] border-2 border-dashed border-border/50">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse" />
                                    <div className="relative w-20 h-20 rounded-[2.5rem] bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary/40 rotate-6 border border-primary/10">
                                        <MessageSquareOff size={40} />
                                    </div>
                                </div>
                                <div className="space-y-2 max-w-xs">
                                    <h3 className="font-bold text-xl tracking-tight">No reviews yet</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        This influencer hasn't received any feedback from brand partners yet.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Carousel>
                </div>
            </TabsContent>
        </Tabs>
    );
};

