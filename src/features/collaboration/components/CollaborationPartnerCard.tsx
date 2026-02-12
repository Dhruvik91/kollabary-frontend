'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon, MessageSquare } from 'lucide-react';
import { User } from '@/types/auth.types';
import { Button } from '@/components/ui/button';

interface CollaborationPartnerCardProps {
    partner: User;
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
    return (
        <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 text-center lg:text-left">
                <CardTitle className="text-lg">Partner Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col lg:flex-row items-center gap-4 p-4 bg-muted/20 rounded-2xl border border-border/20 text-center lg:text-left">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <UserIcon size={28} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-bold text-lg leading-tight truncate">{partner.email.split('@')[0]}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                            {isInfluencer ? 'Brand Partner' : 'Influencer Partner'}
                        </p>
                    </div>
                </div>

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
