'use client';

import React from 'react';
import Image from 'next/image';
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
    image: string;
    description: string;
}> = {
    'Rising Creator': {
        label: 'Rising Creator',
        image: '/badges/rising_creator.png',
        description: 'New influencer building initial trust.'
    },
    'Emerging Partner': {
        label: 'Emerging Partner',
        image: '/badges/emerging_partner.png',
        description: 'Actively collaborating and gaining traction.'
    },
    'Trusted Collaborator': {
        label: 'Trusted Collaborator',
        image: '/badges/trusted_collaborator.png',
        description: 'Reliable influencer with consistent performance.'
    },
    'Pro Influencer': {
        label: 'Pro Influencer',
        image: '/badges/pro_influencer.png',
        description: 'High-performing creator with strong presence.'
    },
    'Elite Creator': {
        label: 'Elite Creator',
        image: '/badges/elite_creator.png',
        description: 'Top-tier influencer with proven consistency.'
    },
    'Kollabary Icon': {
        label: 'Kollabary Icon',
        image: '/badges/kollabary_icon.png',
        description: 'Platform leader. Trusted at scale.'
    }
};

const sizeMap = {
    sm: { width: 40, height: 40, className: 'w-10 h-10' },
    md: { width: 56, height: 56, className: 'w-14 h-14' },
    lg: { width: 72, height: 72, className: 'w-[172px] h-[172px]' },
};

export const RankTierBadge = ({
    tier = 'Rising Creator',
    showDescription = false,
    className,
    size = 'md'
}: RankTierBadgeProps) => {
    const config = tierConfigs[tier] || tierConfigs['Rising Creator'];
    const dimensions = sizeMap[size];

    return (
        <div className={cn("inline-flex flex-col items-center shrink-0", className)}>
            <Image
                src={config.image}
                alt={config.label}
                width={dimensions.width}
                height={dimensions.height}
                className={cn(
                    "object-contain drop-shadow-lg",
                    dimensions.className
                )}
            />
            {showDescription && (
                <p className="mt-1.5 text-[10px] text-muted-foreground italic text-center">
                    {config.description}
                </p>
            )}
        </div>
    );
};
