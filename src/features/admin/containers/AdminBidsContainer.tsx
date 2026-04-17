'use client';

import { format } from 'date-fns';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Gavel, User, DollarSign, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BidStatus, Bid } from '@/types/auction.types';
import { useAdminQueries } from '@/hooks/queries/useAdminQueries';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const AdminBidsContainer = () => {
    const { useBids } = useAdminQueries();
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);

    const { data: bids = [], isLoading } = useBids({ search: debouncedSearch });

    const columns: ColumnDef<Bid>[] = [
        {
            id: 'influencer',
            header: 'Influencer',
            accessorKey: 'influencer.profile.fullName',
            cell: ({ row }) => {
                const bid = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center ring-2 ring-primary/5">
                            <User className="text-primary" size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-sm uppercase tracking-tight text-foreground transition-colors">
                                {bid.influencer?.profile?.fullName || bid.influencer?.influencerProfile?.fullName || 'Influencer'}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                                @{bid.influencer?.profile?.username || bid.influencer?.influencerProfile?.fullName?.toLowerCase().replace(/\s+/g, '') || 'user'}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'auction',
            header: 'Auction Title',
            accessorKey: 'auction.title',
            cell: ({ row }) => {
                const bid = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <Target size={14} className="text-muted-foreground" />
                        <span className="font-bold text-sm text-foreground max-w-[200px] truncate">
                            {bid.auction?.title}
                        </span>
                    </div>
                );
            },
        },
        {
            id: 'amount',
            header: 'Amount',
            accessorKey: 'amount',
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/30 border border-border/30 w-fit">
                    <DollarSign size={14} className="text-primary" />
                    <span className="font-black text-sm text-foreground tabular-nums tracking-tighter italic">
                        {row.original.amount}
                    </span>
                </div>
            ),
        },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.original.status;
                switch (status) {
                    case BidStatus.ACCEPTED:
                        return <Badge className="bg-green-500/10 text-green-600 border-green-500/10 rounded-lg">Accepted</Badge>;
                    case BidStatus.REJECTED:
                        return <Badge className="bg-red-500/10 text-red-600 border-red-500/10 rounded-lg">Rejected</Badge>;
                    case BidStatus.PENDING:
                        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/10 rounded-lg">Pending</Badge>;
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
                <h2 className="text-3xl font-black tracking-tight text-foreground uppercase">System Bids</h2>
                <p className="text-muted-foreground font-medium mt-1">Review all influencer proposals across platform auctions.</p>
            </div>

            <DataTable
                data={bids}
                columns={columns}
                isLoading={isLoading}
                showSearch={true}
                manualSearching={true}
                onSearch={setSearch}
                searchPosition="end"
                className="w-full"
                emptyState={
                    <div className="flex flex-col items-center gap-4 py-20">
                        <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
                            <Gavel size={32} className="text-muted-foreground/30" />
                        </div>
                        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">
                            No bids found
                        </p>
                    </div>
                }
            />
        </div>
    );
};
