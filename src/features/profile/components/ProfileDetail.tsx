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
    PencilLine,
    Lock,
    LogOut,
    ShieldCheck,
} from 'lucide-react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { useLogout } from '@/hooks/use-auth.hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfile } from '@/services/profile.service';
import Link from 'next/link';
import Image from 'next/image';
import { FRONTEND_ROUTES } from '@/constants';
import { ShareButton } from '@/components/shared/ShareButton';
import { PasswordUpdateForm } from './PasswordUpdateForm';
import { useChangePasswordMutation } from '@/hooks/queries/useProfileQueries';
import { UserRole } from '@/types/auth.types';
import { VerificationSection } from './VerificationSection';
import { AccountManagementSection } from './AccountManagementSection';

interface ProfileDetailProps {
    profile: UserProfile;
    isOwner?: boolean;
}

export const ProfileDetail = ({ profile, isOwner = false }: ProfileDetailProps) => {
    const { fullName, username, bio, location, socialLinks, profileImage, avatarUrl } = profile;
    const displayImage = avatarUrl || profileImage;
    const changePasswordMutation = useChangePasswordMutation();
    const logoutMutation = useLogout();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0">
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
                        className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-zinc-100 glass-chip border-4 md:border-8 border-background shadow-2xl overflow-hidden flex items-center justify-center relative group"
                    >
                        {displayImage ? (
                            <Image src={displayImage} alt={fullName} fill className="object-cover" sizes="(max-width: 768px) 128px, 160px" loading="eager" />
                        ) : (
                            <div className="text-4xl md:text-5xl font-black text-primary/40 group-hover:text-primary transition-colors">
                                {fullName.charAt(0)}
                            </div>
                        )}
                    </motion.div>

                    <div className="flex-1 space-y-2 md:pb-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2">
                                {fullName}
                                {profile.verified && (
                                    <div className="text-blue-500 bg-blue-500/10 p-1 rounded-full border border-blue-500/20" title="Verified Account">
                                        <ShieldCheck size={20} />
                                    </div>
                                )}
                            </h1>
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
                        <div className="md:pb-4 flex items-center gap-3">
                            <Link href="/profile/edit">
                                <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-2">
                                    <PencilLine size={18} />
                                    Edit Profile
                                </Button>
                            </Link>
                            <ShareButton
                                type={UserRole.USER}
                                id={profile.id}
                                variant="outline"
                                size="default"
                                className="h-12 w-12 rounded-xl border-2"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Social Links */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-[2rem] border-border/50 bg-card/30 glass-card overflow-hidden border-none shadow-none ring-1 ring-border/50">
                        <div className="p-6 border-b border-border/50 glass-section bg-muted/20 flex items-center gap-3">
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
                    <Card className="rounded-[2rem] border-border/50 bg-card/30 glass-card p-8 md:p-10 border-none shadow-none ring-1 ring-border/50">
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

            {/* Trust & Verification */}
            {isOwner && (
                <div className="lg:col-span-3">
                    <VerificationSection profile={profile} />
                </div>
            )}

            {/* Account Security (Password Update) */}
            {isOwner && (
                <div className="lg:col-span-3">
                    <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8 md:p-10 border-none shadow-none ring-1 ring-border/50">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-primary">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Lock size={20} />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight">Account Security</h3>
                                </div>
                                <p className="text-muted-foreground font-medium">
                                    Keep your account secure by updating your password regularly.
                                </p>
                            </div>
                            <div className="md:col-span-2 max-w-lg">
                                <PasswordUpdateForm
                                    onSubmit={(data) => changePasswordMutation.mutate(data)}
                                    isLoading={changePasswordMutation.isPending}
                                    username={username}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Account Management (Lifecycle: Deactivate/Delete) */}
            {isOwner && (
                <div className="lg:col-span-3">
                    <AccountManagementSection profile={profile} />
                </div>
            )}

            {/* Logout (Mobile Only) */}
            {isOwner && (
                <div className="lg:hidden">
                    <Card className="rounded-[2.5rem] border-red-500/20 bg-red-500/5 dark:bg-red-500/10 p-8 md:p-10 border-none shadow-none ring-1 ring-red-500/20">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-red-500">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                                        <LogOut size={20} />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight">Account Session</h3>
                                </div>
                                <p className="text-muted-foreground font-medium">
                                    Log out of your account on this device.
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={() => setIsLogoutModalOpen(true)}
                                className="h-12 px-8 rounded-xl bg-red-500 text-white font-bold shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95 transition-all gap-2"
                            >
                                <LogOut size={18} />
                                Log Out
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            <AnimatedModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="End Session?"
                description="Are you sure you want to log out? You'll need to sign in again to access your dashboard."
                size="sm"
            >
                <div className="flex flex-col gap-3">
                    <Button
                        variant="destructive"
                        size="lg"
                        className="w-full rounded-2xl font-bold h-12 shadow-lg shadow-red-500/20"
                        onClick={() => {
                            logoutMutation.mutate();
                            setIsLogoutModalOpen(false);
                        }}
                        disabled={logoutMutation.isPending}
                    >
                        {logoutMutation.isPending ? "Logging out..." : "Log me out"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full rounded-2xl font-bold h-12"
                        onClick={() => setIsLogoutModalOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </AnimatedModal>
        </div>
    );
};
