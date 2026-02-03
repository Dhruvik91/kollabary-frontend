'use client';

import { useInfluencerDetail } from '@/hooks/useInfluencers';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Instagram, Youtube, Twitter, MapPin, CheckCircle, Calendar, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RequestCollaborationModal } from '@/components/features/collaboration/components/RequestCollaborationModal';

export function InfluencerDetailContainer() {
    const { id } = useParams();
    const { data: influencer, isLoading, isError } = useInfluencerDetail(id as string);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    if (isError || !influencer) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Influencer not found</h2>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        );
    }

    const { user, bio, followerCount, categories, location, socialMediaLinks, isVerified } = influencer;

    return (
        <div className="container px-4 py-12 mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
                {/* Profile Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-enhanced rounded-3xl p-8 text-center relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            {isVerified && <CheckCircle className="h-6 w-6 text-blue-500 fill-blue-500/10" />}
                        </div>

                        <Avatar className="h-32 w-32 mx-auto mb-6 ring-4 ring-primary/10">
                            <AvatarImage src={user?.profileImage} />
                            <AvatarFallback className="text-3xl bg-primary/10 text-primary font-bold">
                                {user?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
                        <div className="flex items-center justify-center text-muted-foreground gap-1 mb-6">
                            <MapPin className="h-4 w-4" />
                            {location || 'Global'}
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                            <div>
                                <div className="font-bold text-lg">{followerCount ? (followerCount / 1000).toFixed(1) + 'K' : 'N/A'}</div>
                                <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Followers</div>
                            </div>
                            <div>
                                <div className="font-bold text-lg">4.2%</div>
                                <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Engage</div>
                            </div>
                            <div>
                                <div className="font-bold text-lg">120+</div>
                                <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Kollabs</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-enhanced rounded-3xl p-8">
                        <h3 className="font-bold mb-4">Contact & Social</h3>
                        <div className="space-y-4">
                            {socialMediaLinks?.instagram && (
                                <a href={socialMediaLinks.instagram} className="flex items-center justify-between p-3 rounded-xl bg-pink-500/5 hover:bg-pink-500/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Instagram className="h-5 w-5 text-pink-500" />
                                        <span>Instagram</span>
                                    </div>
                                    <Badge variant="outline" className="border-pink-500/20 text-pink-500">Active</Badge>
                                </a>
                            )}
                            {socialMediaLinks?.youtube && (
                                <a href={socialMediaLinks.youtube} className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Youtube className="h-5 w-5 text-red-500" />
                                        <span>YouTube</span>
                                    </div>
                                    <Badge variant="outline" className="border-red-500/20 text-red-500">Partner</Badge>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="glass-enhanced rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-6">About the Influencer</h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            {bio || 'This influencer has not provided a bio yet. They are specialists in creating high-quality, engaging content for their audience and looking for meaningful brand partnerships.'}
                        </p>

                        <h3 className="font-bold mb-4">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories?.map(cat => (
                                <Badge key={cat} className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border-none">
                                    {cat}
                                </Badge>
                            )) || <span className="text-muted-foreground italic text-sm">No categories specified</span>}
                        </div>
                    </section>

                    <section className="flex items-center justify-between p-8 glass-enhanced rounded-3xl bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Ready to Collaborate?</h2>
                            <p className="text-muted-foreground">Send a proposal to {user?.name} for your next project.</p>
                        </div>
                        <Button size="lg" className="rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform" onClick={() => setIsRequestModalOpen(true)}>
                            Request Collaboration
                        </Button>
                    </section>
                </div>
            </motion.div>

            <RequestCollaborationModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                influencerId={influencer.id}
                influencerName={user?.name || 'Influencer'}
            />
        </div>
    );
}
