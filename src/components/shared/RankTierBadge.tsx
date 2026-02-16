'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    TrendingUp,
    ShieldCheck,
    Star,
    Flame,
    Trophy,
    Gem
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type RankTier =
    | 'Rising Creator'
    | 'Emerging Partner'
    | 'Trusted Collaborator'
    | 'Pro Influencer'
    | 'Elite Creator'
    | 'Kollabary Icon';

interface RankTierBadgeProps {
    tier?: string;
    showDescription?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const tierConfigs: Record<string, {
    label: string;
    color: string;
    bg: string;
    border: string;
    icon: React.ReactNode;
    description: string;
    animation?: any;
}> = {
    'Rising Creator': {
        label: 'Rising Creator',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        icon: <TrendingUp size={14} />,
        description: 'New influencer building initial trust.'
    },
    'Emerging Partner': {
        label: 'Emerging Partner',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        icon: <Zap size={14} />,
        description: 'Actively collaborating and gaining traction.'
    },
    'Trusted Collaborator': {
        label: 'Trusted Collaborator',
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        icon: <ShieldCheck size={14} />,
        description: 'Reliable influencer with consistent performance.'
    },
    'Pro Influencer': {
        label: 'Pro Influencer',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        icon: <Star size={14} />,
        description: 'High-performing creator with strong presence.'
    },
    'Elite Creator': {
        label: 'Elite Creator',
        color: 'text-violet-500',
        bg: 'bg-gradient-to-r from-violet-500/20 to-amber-500/20',
        border: 'border-violet-500/30',
        icon: <Flame size={14} />,
        description: 'Top-tier influencer with proven consistency.'
    },
    'Kollabary Icon': {
        label: 'Kollabary Icon',
        color: 'text-white',
        bg: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
        border: 'border-white/20',
        icon: <Gem size={14} />,
        description: 'Platform leader. Trusted at scale.',
        animation: {
            animate: {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            },
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "linear"
            }
        }
    }
};

export const RankTierBadge = ({
    tier = 'Rising Creator',
    showDescription = false,
    className,
    size = 'md'
}: RankTierBadgeProps) => {
    const config = tierConfigs[tier] || tierConfigs['Rising Creator'];

    const sizeClasses = {
        sm: "px-2 py-0.5 text-[10px] gap-1",
        md: "px-3 py-1 text-xs gap-1.5",
        lg: "px-4 py-2 text-sm gap-2"
    };

    return (
        <div className={cn("inline-flex flex-col", className)}>
            <motion.div
                {...(config.animation || {})}
                style={config.animation ? { backgroundSize: '200% 200%' } : {}}
                className={cn(
                    "flex items-center font-bold uppercase tracking-widest rounded-full border shadow-sm",
                    config.bg,
                    config.color,
                    config.border,
                    sizeClasses[size],
                    tier === 'Kollabary Icon' && "shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                )}
            >
                {config.icon}
                {config.label}
            </motion.div>
            {showDescription && (
                <p className="mt-1.5 text-[10px] text-muted-foreground italic pl-1">
                    {config.description}
                </p>
            )}
        </div>
    );
};
