'use client';

import { Gavel } from 'lucide-react';
import { format } from 'date-fns';
import { Auction, AuctionStatus } from '@/types/auction.types';
import { PageHeader } from '@/components/shared/PageHeader';

interface AuctionDetailHeaderProps {
    auction: Auction;
}

const getStatusBadgeStyles = (status: AuctionStatus | string) => {
    switch (status) {
        case AuctionStatus.OPEN:
            return 'bg-green-500/15 text-green-500 border border-green-500/20';
        case AuctionStatus.COMPLETED:
            return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
        case AuctionStatus.CANCELLED:
            return 'bg-red-500/10 text-red-400 border border-red-500/15';
        default:
            return 'bg-muted text-muted-foreground border border-border/40';
    }
};

export const AuctionDetailHeader = ({ auction }: AuctionDetailHeaderProps) => {
    return (
        <PageHeader
            label="Auction Details"
            title={auction.title}
            subtitle={`Posted by ${auction.creator.profile?.fullName || 'Brand'} • ${format(new Date(auction.createdAt), 'MMMM dd, yyyy')}`}
            icon={Gavel}
            action={
                <div className="flex items-center gap-3">
                    {/* Status badge — color-coded to match auction cards */}
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest leading-none ${getStatusBadgeStyles(auction.status)}`}>
                        {auction.status}
                    </span>
                </div>
            }
        />
    );
};
