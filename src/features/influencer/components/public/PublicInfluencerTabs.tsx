'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Instagram, Twitter, Linkedin, Youtube, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReviewList } from '@/features/review/components/ReviewList';
import Image from 'next/image';
import { AudienceInsights } from './AudienceInsights';

interface PublicInfluencerTabsProps {
    platforms: Record<string, any>;
    activeCollaborations: any[];
    completedCollaborations: any[];
    reviews: any[];
    reviewsLoading: boolean;
    bio?: string;
    genderRatio?: Record<string, number>;
    ageBrackets?: Record<string, number>;
    topCountries?: string[];
}

export const PublicInfluencerTabs = ({
    platforms,
    activeCollaborations,
    completedCollaborations,
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
        <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="bg-muted/20 p-1 rounded-2xl border border-border/50 glass-chip w-full md:w-auto h-auto grid grid-cols-3 md:flex md:gap-2">
                <TabsTrigger value="about" className="rounded-xl px-6 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">About</TabsTrigger>
                <TabsTrigger value="collaborations" className="rounded-xl px-6 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Kollabs</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl px-6 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(platforms).map(([name, data]) => {
                        const Icon = platformIcons[name.toLowerCase()] || Globe;
                        return (
                            <Card key={name} className="rounded-[2rem] border-border/50 bg-card/30 glass-card overflow-hidden group">
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold capitalize">{name}</h4>
                                                <p className="text-xs text-muted-foreground">@{data.handle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black">{formatNumber(data.followers)}</p>
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">Followers</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                                            <span>Engagement</span>
                                            <span className="text-foreground">{data.engagementRate || 0}%</span>
                                        </div>
                                        <div className="w-full bg-primary/10 rounded-full h-2.5 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${data.engagementRate || 0}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>

                                    <Button variant="ghost" size="sm" className="w-full rounded-xl gap-2 font-bold text-xs" asChild>
                                        <a href={`https://${name}.com/${data.handle}`} target="_blank" rel="noopener noreferrer">
                                            View Profile <ExternalLink size={12} />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Audience Insights */}
                <AudienceInsights 
                    genderRatio={genderRatio}
                    ageBrackets={ageBrackets}
                    topCountries={topCountries}
                />
            </TabsContent>

            <TabsContent value="collaborations" className="space-y-10 animate-in fade-in duration-500">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-1.5 bg-emerald-500 rounded-full" />
                        <h3 className="text-2xl font-black tracking-tight uppercase">Live Collaborations</h3>
                    </div>
                    {activeCollaborations?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeCollaborations.map((collab: any) => (
                                <Card key={collab.id} className="rounded-3xl border-emerald-500/20 bg-emerald-500/5 glass-card p-6 border-l-4 border-l-emerald-500 group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-background border border-border/50 overflow-hidden relative">
                                            {collab.requester?.profile?.avatarUrl ? (
                                                <Image src={collab.requester.profile.avatarUrl} alt="" fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-primary/30 font-black">B</div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-base">{collab.requester?.profile?.fullName || 'Brand'}</h4>
                                            <Badge className="bg-emerald-500/20 text-emerald-600 border-none text-[8px] font-black uppercase tracking-widest">{collab.status}</Badge>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest">Ongoing Project</p>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground italic px-2">No active collaborations at the moment.</p>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                        <h3 className="text-2xl font-black tracking-tight uppercase">History of Excellence</h3>
                    </div>
                    {completedCollaborations?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {completedCollaborations.map((collab: any) => (
                                <div key={collab.id} className="flex items-center justify-between p-5 bg-card/30 border border-border/50 rounded-3xl glass-card">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-100 overflow-hidden relative border border-border/50">
                                            {collab.requester?.profile?.avatarUrl ? (
                                                <Image src={collab.requester.profile.avatarUrl} alt="" fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-primary/30 font-black">B</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black tracking-tight">{collab.requester?.profile?.fullName || 'Brand'}</p>
                                            <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest">Successfully Completed</p>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Impact Delivered</p>
                                        <CheckCircle2 size={16} className="text-primary ml-auto" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground italic px-2">This creator is ready for their first major breakthrough!</p>
                    )}
                </div>
            </TabsContent>

            <TabsContent value="reviews" className="animate-in fade-in duration-500">
                <ReviewList reviews={reviews} isLoading={reviewsLoading} showHeader={true} />
            </TabsContent>
        </Tabs>
    );
};
