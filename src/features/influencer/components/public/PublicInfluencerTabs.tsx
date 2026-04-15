'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Instagram, Twitter, Linkedin, Youtube, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ReviewList } from '@/features/review/components/ReviewList';
import Image from 'next/image';
import Link from 'next/link';
import { AudienceInsights } from './AudienceInsights';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
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
}: PublicInfluencerTabsProps) => {

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

                <AudienceInsights
                    genderRatio={genderRatio}
                    ageBrackets={ageBrackets}
                    topCountries={topCountries}
                />
            </TabsContent>

            <TabsContent value="collaborations" className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
                {/* Brand Partners Carousel */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                        <h3 className="text-2xl font-black tracking-tight uppercase">Trusted by Following Brands</h3>
                    </div>
                    {brandPartners?.length > 0 ? (
                        <div className="relative px-12">
                            <Carousel
                                opts={{ align: "start", loop: false }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-4">
                                    {brandPartners.map((brand: any) => (
                                        <CarouselItem key={brand.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                                            <Link href={`/b/${brand.id}`} className="block h-full group">
                                                <div className="flex items-center gap-4 p-5 bg-card/30 border border-border/50 rounded-[2.2rem] glass-card hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.05]">
                                                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 overflow-hidden relative border-2 border-border/50 group-hover:border-primary/50 transition-all">
                                                        {brand.avatarUrl ? (
                                                            <Image src={brand.avatarUrl} alt="" fill className="object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-primary/30 text-xl font-black uppercase">
                                                                {brand.fullName?.charAt(0) || 'B'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="grow">
                                                        <p className="text-sm font-black tracking-tight group-hover:text-primary transition-colors line-clamp-1">{brand.fullName || 'Brand'}</p>
                                                        <div className="flex items-center gap-1.5">
                                                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">View Brand</p>
                                                            <ArrowRight size={10} className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                        </div>
                                                    </div>
                                                    <CheckCircle2 size={16} className="text-primary/40 group-hover:text-primary transition-colors" />
                                                </div>
                                            </Link>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="hidden md:flex -left-6 bg-background/80 hover:bg-primary hover:text-white transition-all border-border/50" />
                                <CarouselNext className="hidden md:flex -right-6 bg-background/80 hover:bg-primary hover:text-white transition-all border-border/50" />
                            </Carousel>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground italic px-2 font-medium">This creator is ready for their first major brand partnership!</p>
                    )}
                </div>
            </TabsContent>

            <TabsContent value="reviews" className="animate-in fade-in duration-700 slide-in-from-bottom-4">
                <ReviewList reviews={reviews} isLoading={reviewsLoading} showHeader={true} />
            </TabsContent>
        </Tabs>
    );
};

