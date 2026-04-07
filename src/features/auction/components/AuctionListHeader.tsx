'use client';

import { Plus, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/auth.types';
import { PageHeader } from '@/components/shared/PageHeader';

interface AuctionListHeaderProps {
    userRole?: UserRole;
    onCreateClick: () => void;
}

export const AuctionListHeader = ({ userRole, onCreateClick }: AuctionListHeaderProps) => {
    return (
        <PageHeader
            label="Collaboration Auctions"
            title="Bid on Exclusive"
            highlightedTitle="Opportunities."
            subtitle="Browse and bid on exclusive collaboration opportunities and grow your brand presence."
            icon={Gavel}
            action={
                userRole === UserRole.USER && (
                    <Button
                        onClick={onCreateClick}
                        className="h-14 px-8 rounded-[1.5rem] bg-secondary hover:bg-secondary/90 text-white font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 border-none"
                    >
                        <Plus size={20} className="stroke-[3]" />
                        <span className="uppercase tracking-widest text-xs">Post New Auction</span>
                    </Button>
                )
            }
        />
    );
};
