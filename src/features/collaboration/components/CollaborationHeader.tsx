'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';

export const CollaborationHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <Link href={FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS}>
                <Button variant="ghost" size="sm" className="group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to List
                </Button>
            </Link>
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                    <Share2 size={16} />
                </Button>
            </div>
        </div>
    );
};
