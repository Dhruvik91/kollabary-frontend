'use client';

import { Badge } from '@/components/ui/badge';
import { Gavel, User as UserIcon, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Auction } from '@/types/auction.types';
import { PageHeader } from '@/components/shared/PageHeader';

interface AuctionDetailHeaderProps {
    auction: Auction;
    isCompleted: boolean;
}

export const AuctionDetailHeader = ({ auction, isCompleted }: AuctionDetailHeaderProps) => {
    return (
        <PageHeader
            label="Auction Details"
            title={auction.title}
            subtitle={`Posted by ${auction.creator.profile?.fullName || 'Brand'} • ${format(new Date(auction.createdAt), 'MMMM dd, yyyy')}`}
            icon={Gavel}
            action={
                <Badge 
                    variant={isCompleted ? "secondary" : "outline"} 
                    className={isCompleted 
                        ? "bg-green-500/20 text-green-500 border-green-500/20 px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest text-[10px]" 
                        : "bg-primary/20 text-primary border-primary/20 px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                    }
                >
                    {auction.status}
                </Badge>
            }
        />
    );
};
