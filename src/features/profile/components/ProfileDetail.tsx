'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Globe,
    AtSign,
    User as UserIcon,
    AlignLeft,
    ExternalLink,
    PencilLine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfile } from '@/services/profile.service';
import Link from 'next/link';
import Image from 'next/image';
import { FRONTEND_ROUTES } from '@/constants';

interface ProfileDetailProps {
    profile: UserProfile;
    isOwner?: boolean;
}

export const ProfileDetail = ({ profile, isOwner = false }: ProfileDetailProps) => {
    const { fullName, username, bio, location, socialLinks, profileImage, avatarUrl } = profile;
    const displayImage = avatarUrl || profileImage;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header / Hero Section */}
            <div className="relative">
                {/* Banner - Premium Gradient */}
                <div className="h-48 md:h-64 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-border/50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Profile Info Overlay */}
                <div className="px-6 md:px-12 -mt-16 md:-mt-20 relative z-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
                    {/* Avatar placeholder with initials or image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-zinc-100 dark:bg-zinc-800 border-4 md:border-8 border-background shadow-2xl overflow-hidden flex items-center justify-center relative group"
                    >
                        {displayImage ? (
                            <Image src={displayImage} alt={fullName} fill className="object-cover" />
                        ) : (
                            <div className="text-4xl md:text-5xl font-black text-primary/40 group-hover:text-primary transition-colors">
                                {fullName.charAt(0)}
                            </div>
                        )}
                    </motion.div>

                    <div className="flex-1 space-y-2 md:pb-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{fullName}</h1>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 text-xs font-bold uppercase tracking-wider">
                                <AtSign size={12} />
                                {username}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium">
                            {location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={16} className="text-primary" />
                                    <span>{location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <UserIcon size={16} className="text-primary" />
                                <span>Member since {new Date(profile.createdAt).getFullYear()}</span>
                            </div>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="md:pb-4">
                            <Link href="/profile/edit">
                                <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-2">
                                    <PencilLine size={18} />
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Social Links */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-[2rem] border-border/50 bg-card/30 backdrop-blur-md overflow-hidden border-none shadow-none ring-1 ring-border/50">
                        <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <Globe size={18} />
                            </div>
                            <h3 className="font-bold">Online Presence</h3>
                        </div>
                        <CardContent className="p-6 space-y-3">
                            {socialLinks && Object.entries(socialLinks).length > 0 ? (
                                Object.entries(socialLinks).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-xl hover:border-primary/50 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-bold capitalize">{platform}</p>
                                        </div>
                                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                    </a>
                                ))
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-xs text-muted-foreground italic">No social links added yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Center/Right: Bio */}
                <div className="lg:col-span-2">
                    <Card className="rounded-[2rem] border-border/50 bg-card/30 backdrop-blur-md p-8 md:p-10 border-none shadow-none ring-1 ring-border/50">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-primary">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <AlignLeft size={20} />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Biography</h3>
                            </div>
                            <p className="text-lg text-muted-foreground/90 leading-relaxed font-medium">
                                {bio || "This user hasn't added a bio yet. They're likely too busy crafting their next big thing!"}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
