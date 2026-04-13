'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, MessageSquare, Eye, Briefcase, Handshake, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { UserProfile } from '@/services/profile.service';
import { ShareButton } from '@/components/shared/ShareButton';

interface BrandCardProps {
    brand: UserProfile;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
    const router = useRouter();
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();

    const {
        id,
        fullName,
        username,
        avatarUrl,
        bio,
        location,
        stats,
        user
    } = brand;

    const handleMessage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (user?.id) {
            startConversation(user.id, {
                onSuccess: (conversation) => {
                    router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
                }
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card className="border-border/40 bg-card/40 glass-card hover:border-primary/20 transition-all duration-500 ease-out rounded-[2rem] h-full flex flex-col border p-0 overflow-hidden">
                <CardContent className="p-0 flex flex-col flex-1 relative">
                    {/* Header/Cover Image Section */}
                    <div className="relative h-24 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-secondary/20 via-secondary/5 to-transparent dark:from-secondary/10 dark:via-transparent dark:to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(var(--secondary-rgb),0.1),transparent_50%)]" />

                        {/* Share Button */}
                        <div className="absolute top-4 right-4 z-20">
                            <ShareButton 
                                type="brand" 
                                id={id} 
                                variant="glass" 
                                size="icon-sm" 
                            />
                        </div>
                    </div>

                    {/* Profile Section with Overlapping Avatar */}
                    <div className="relative px-6 -mt-12 mb-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-background/80 backdrop-blur-sm shadow-xl group-hover:scale-105 transition-transform duration-500 bg-background">
                            {avatarUrl ? (
                                <Image
                                    src={avatarUrl}
                                    alt={fullName}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-secondary/80 to-secondary flex items-center justify-center text-white text-2xl font-bold">
                                    {fullName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="pb-6 px-6 space-y-4 flex flex-col flex-1">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold tracking-tight line-clamp-1">
                                {fullName}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium">@{username}</p>
                        </div>

                        {bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                                {bio}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {location && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-border/50">
                                    <MapPin size={12} className="text-secondary/70" />
                                    {location}
                                </span>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-50/50 dark:bg-white/2 rounded-2xl border border-border/40 mt-auto">
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-border/50">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Auctions</span>
                                <div className="flex items-center gap-1.5">
                                    <Briefcase size={12} className="text-secondary/70" />
                                    <p className="text-sm font-black">{stats?.totalAuctions ?? 0}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Collabs</span>
                                <div className="flex items-center gap-1.5">
                                    <Handshake size={12} className="text-secondary/70" />
                                    <p className="text-sm font-black">{stats?.completedCollaborations ?? 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <Button
                                onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.BRAND_DETAIL(id))}
                                className="h-11 rounded-xl font-bold text-xs uppercase tracking-widest gap-2 transition-all"
                            >
                                <Eye size={16} />
                                Profile
                            </Button>
                            <Button
                                onClick={handleMessage}
                                disabled={isStartingChat}
                                variant="outline"
                                className="h-11 rounded-xl font-bold text-xs uppercase tracking-widest gap-2 border-2 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all shadow-sm"
                            >
                                <MessageSquare size={16} />
                                Message
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
