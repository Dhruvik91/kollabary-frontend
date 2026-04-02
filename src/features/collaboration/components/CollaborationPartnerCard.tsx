'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

interface CollaborationPartnerCardProps {
    partner: any;
    isInfluencer: boolean;
    onMessage?: () => void;
    isMessaging?: boolean;
}

export const CollaborationPartnerCard = ({
    partner,
    isInfluencer,
    onMessage,
    isMessaging = false
}: CollaborationPartnerCardProps) => {
    const avatarUrl = isInfluencer
        ? partner.profile?.avatarUrl
        : partner.avatarUrl || partner.user?.profile?.avatarUrl;

    const partnerName = isInfluencer
        ? partner.profile?.fullName || partner.email?.split('@')[0]
        : partner.fullName || partner.user?.profile?.fullName || partner.user?.email?.split('@')[0] || partner.email?.split('@')[0];

    const initials = partnerName?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

    const profileLink = !isInfluencer
        ? FRONTEND_ROUTES.DASHBOARD.INFLUENCER_DETAIL(partner.id)
        : null;

    const PartnerInfo = (
        <div className={cn(
            "flex flex-col lg:flex-row items-center gap-4 p-4 glass-section bg-muted/20 rounded-2xl border border-border/20 text-center lg:text-left transition-all duration-300",
            profileLink ? "hover:bg-muted/30 cursor-pointer active:scale-[0.98]" : ""
        )}>
            <Avatar size="lg" className="h-14 w-14 border-2 border-primary/20 shadow-lg shadow-primary/5">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={partnerName} className="object-cover" />}
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <p className="font-bold text-lg leading-tight truncate">
                    {partnerName}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                    {isInfluencer ? 'Brand Partner' : 'Influencer Partner'}
                </p>
            </div>
        </div>
    );

    return (
        <Card className="rounded-3xl border-border/40 bg-card/40 glass-card shadow-sm hover:border-primary/20 transition-shadow duration-300 ease-out overflow-hidden">
            <CardHeader className="pb-3 text-center lg:text-left">
                <CardTitle className="text-lg">Partner Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {profileLink ? (
                    <Link href={profileLink} className="block group/partner">
                        {PartnerInfo}
                    </Link>
                ) : (
                    PartnerInfo
                )}

                {onMessage && (
                    <Button
                        onClick={onMessage}
                        disabled={isMessaging}
                        className="w-full rounded-2xl h-12 font-bold gap-2 shadow-lg shadow-primary/10"
                    >
                        <MessageSquare size={18} />
                        Message Partner
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
