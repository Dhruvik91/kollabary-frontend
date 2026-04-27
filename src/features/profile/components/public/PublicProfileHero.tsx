'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, AtSign, Briefcase, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/shared/ShareButton';
import { FRONTEND_ROUTES } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { UserRole } from '@/types/auth.types';

interface PublicProfileHeroProps {
    profileId: string;
    fullName: string;
    username: string;
    avatarUrl?: string;
    location?: string;
}

export const PublicProfileHero = ({
    profileId,
    fullName,
    username,
    avatarUrl,
    location,
}: PublicProfileHeroProps) => {
    return (
        <div className="relative">
            {/* Banner - Premium Gradient */}
            <div className="h-56 md:h-80 rounded-[3rem] bg-linear-to-br from-primary/20 via-primary/5 to-background border border-border/50 overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            </div>

            {/* Profile Info Overlay */}
            <div className="px-6 md:px-16 -mt-20 md:-mt-28 relative z-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] bg-zinc-100 glass-chip border-4 md:border-[12px] border-background shadow-2xl overflow-hidden flex items-center justify-center relative group shrink-0"
                >
                    {avatarUrl ? (
                        <Image 
                            src={avatarUrl} 
                            alt={fullName} 
                            fill 
                            priority
                            sizes="(max-width: 768px) 160px, 224px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                    ) : (
                        <div className="text-5xl md:text-7xl font-black text-primary/30">
                            {fullName.charAt(0)}
                        </div>
                    )}
                </motion.div>

                <div className="flex-1 space-y-4 md:pb-8">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground drop-shadow-sm">{fullName}</h1>
                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                <AtSign size={12} />
                                {username}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-bold text-base tracking-tight pt-2">
                            {location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-primary" />
                                    <span>{location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Briefcase size={18} className="text-primary" />
                                <span>Verified Brand</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:pb-8 flex flex-col gap-3">
                    <div className="flex gap-3">
                        <Link href={FRONTEND_ROUTES.AUTH.SIGNUP} className="flex-1">
                            <Button size="lg" className="w-full rounded-2xl h-14 bg-primary text-primary-foreground font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-base gap-3 border-none group">
                                <Zap size={20} className="group-hover:animate-bounce" />
                                Join Kollabary
                            </Button>
                        </Link>
                        <ShareButton
                            type={UserRole.USER}
                            id={profileId}
                            variant="outline"
                            size="lg"
                            className="h-14 w-14 rounded-2xl border-2 hover:bg-primary/5 hover:text-primary transition-all shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
