'use client';

import { format } from 'date-fns';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Hammer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AuctionStatus, Auction } from '@/types/auction.types';
import { useAdminQueries } from '@/hooks/queries/useAdminQueries';

export const AdminAuctionsContainer = () => {
    const { useAuctions } = useAdminQueries();
    const { data: auctions = [], isLoading } = useAuctions({});

    const columns: ColumnDef<Auction>[] = [
        {
            id: 'auction',
            header: 'Auction',
            accessorKey: 'title',
            cell: ({ row }) => {
                const auction = row.original;
                return (
                    <div className="flex flex-col">
                        <span className="font-black text-sm uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                            {auction.title}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                            ID: {auction.id}
                        </span>
                    </div>
                );
            },
        },
        {
            id: 'brand',
            header: 'Brand',
            accessorKey: 'creator.profile.fullName',
            cell: ({ row }) => {
                const auction = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs ring-1 ring-primary/20">
                            {auction.creator?.profile?.fullName?.[0] || (auction.creator as any)?.influencerProfile?.fullName?.[0] || 'B'}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">
                                {auction.creator?.profile?.fullName || (auction.creator as any)?.influencerProfile?.fullName || 'Brand'}
                            </span>
                            <span className="text-[10px] font-medium text-muted-foreground uppercase opacity-70">
                                @{auction.creator?.profile?.username || (auction.creator as any)?.influencerProfile?.fullName?.toLowerCase().replace(/\s+/g, '') || 'user'}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'stats',
            header: 'Stats',
            cell: ({ row }) => {
                const auction = row.original;
                return (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-muted-foreground leading-none">Bids</span>
                            <span className="font-black text-sm text-foreground tabular-nums">{auction.bids?.length || 0}</span>
                        </div>
                        <div className="flex flex-col border-l border-border/30 pl-4">
                            <span className="text-[10px] font-black uppercase text-muted-foreground leading-none">Budget</span>
                            <span className="font-black text-sm text-foreground tabular-nums">${auction.minBudget}-${auction.maxBudget}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.original.status;
                switch (status) {
                    case AuctionStatus.OPEN:
                        return <Badge className="bg-green-500/10 text-green-600 border-green-500/10 rounded-lg">Open</Badge>;
                    case AuctionStatus.COMPLETED:
                        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/10 rounded-lg">Completed</Badge>;
                    case AuctionStatus.CANCELLED:
                        return <Badge className="bg-red-500/10 text-red-600 border-red-500/10 rounded-lg">Cancelled</Badge>;
                    default:
                        return <Badge className="bg-zinc-100 text-zinc-600 rounded-lg">{status}</Badge>;
                }
            },
        },
        {
            id: 'date',
            header: 'Date',
            accessorKey: 'createdAt',
            cell: ({ row }) => (
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {format(new Date(row.original.createdAt), 'MMM dd, yyyy')}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-foreground uppercase">System Auctions</h2>
                <p className="text-muted-foreground font-medium mt-1">Monitor and manage all platform auctions.</p>
            </div>

            <DataTable
                data={auctions}
                columns={columns}
                isLoading={isLoading}
                showSearch={true}
                searchPosition="end"
                className="w-full"
                emptyState={
                    <div className="flex flex-col items-center gap-4 py-20">
                        <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
                            <Hammer size={32} className="text-muted-foreground/30" />
                        </div>
                        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">
                            No auctions found matching your criteria
                        </p>
                    </div>
                }
            />
        </div>
    );
};
