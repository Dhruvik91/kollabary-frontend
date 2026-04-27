'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FRONTEND_ROUTES } from '@/constants';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/auth.types';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareButtonProps {
    type: UserRole.INFLUENCER | UserRole.USER;
    id: string;
    slug?: string;
    variant?: 'ghost' | 'outline' | 'default' | 'glass';
    size?: 'sm' | 'default' | 'lg' | 'icon' | 'icon-sm' | 'icon-xs';
    className?: string;
    showLabel?: boolean;
}

export const ShareButton = ({
    type,
    id,
    slug,
    variant = 'ghost',
    size = 'icon',
    className,
    showLabel = false,
}: ShareButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const getShareUrl = () => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const identifier = (type === UserRole.INFLUENCER && slug) ? slug : id;
        const path = type === UserRole.INFLUENCER
            ? FRONTEND_ROUTES.PUBLIC_SHAREABLE.INFLUENCER(identifier)
            : FRONTEND_ROUTES.PUBLIC_SHAREABLE.BRAND(identifier);
        return `${baseUrl}${path}`;
    };

    const handleCopy = async () => {
        const url = getShareUrl();
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.share) {
            const url = getShareUrl();
            try {
                await navigator.share({
                    title: 'Kollabary Profile',
                    text: `Check out this ${type} profile on Kollabary!`,
                    url,
                });
            } catch (err) {
                // If share fails or is cancelled, we don't necessarily want to copy
                // but if it's a specific error we might. For now, just let it be.
                console.error('Share failed:', err);
            }
        } else {
            handleCopy();
        }
    };

    const isGlass = variant === 'glass';

    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Button
                    variant={isGlass ? 'ghost' : variant}
                    size={size}
                    className={cn(
                        "rounded-xl transition-all active:scale-95",
                        isGlass && "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-xl",
                        className
                    )}
                    onClick={handleClick}
                >
                    {isCopied ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} />}
                    {showLabel && <span className="ml-2 font-bold uppercase tracking-widest text-[10px]">Share</span>}
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
                {isCopied ? 'Link Copied!' : 'Share Profile'}
            </TooltipContent>
        </Tooltip>
    );
};
