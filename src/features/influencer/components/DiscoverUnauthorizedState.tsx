'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';

export const DiscoverUnauthorizedState = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/5 dark:bg-zinc-800/50 border border-border/50 rounded-[3rem] text-center space-y-8 max-w-2xl mx-auto backdrop-blur-xl">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse">
                <ShieldAlert size={48} />
            </div>

            <div className="space-y-3">
                <h3 className="text-3xl font-black tracking-tight">Access Restricted</h3>
                <p className="text-muted-foreground text-lg leading-relaxed px-8">
                    You don't have the necessary permissions to browse the influencer network. This feature is reserved for brand partners and administrators.
                </p>
            </div>

            <Button asChild className="h-14 px-10 rounded-2xl font-bold bg-primary shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                <Link href={FRONTEND_ROUTES.DASHBOARD.OVERVIEW}>
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>
            </Button>
        </div>
    );
};
