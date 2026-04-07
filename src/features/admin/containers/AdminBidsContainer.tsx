'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Search, 
    Filter, 
    Gavel, 
    User, 
    Hammer,
    Calendar,
    ChevronRight,
    TrendingUp,
    MoreVertical,
    Eye,
    DollarSign,
    Target
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BidStatus, Bid } from '@/types/auction.types';
import { useAdminQueries } from '@/hooks/queries/useAdminQueries';
import { format } from 'date-fns';

export const AdminBidsContainer = () => {
    const [search, setSearch] = useState('');
    const { useBids } = useAdminQueries();
    
    const { data: bids = [], isLoading } = useBids({ 
        search: search || undefined 
    });

    const getStatusBadge = (status: BidStatus) => {
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
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground uppercase">System Bids</h2>
                    <p className="text-muted-foreground font-medium mt-1">Review all influencer proposals across platform auctions.</p>
                </div>
            </div>

            <Card className="rounded-[2rem] border-border/50 bg-card/40 backdrop-blur-xl border-2 shadow-2xl shadow-black/5 overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-6 border-b border-border/30 bg-muted/20 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="relative flex-1 group w-full">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search by influencer or auction..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-12 h-14 rounded-2xl border-border/50 bg-background/50 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium"
                            />
                        </div>
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-border/50 bg-background/50 shrink-0">
                            <Filter size={20} />
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/10">
                                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.1em] text-muted-foreground border-b border-border/30">Influencer</th>
                                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.1em] text-muted-foreground border-b border-border/30">Auction Title</th>
                                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.1em] text-muted-foreground border-b border-border/30">Amount</th>
                                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.1em] text-muted-foreground border-b border-border/30">Status</th>
                                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.1em] text-muted-foreground border-b border-border/30">Date</th>
                                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.1em] text-muted-foreground border-b border-border/30 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    Array(5).fill(0).map((_, i) => (
                                        <tr key={i} className="border-b border-border/10">
                                            <td className="px-6 py-5"><Skeleton className="h-12 w-48 rounded-xl" /></td>
                                            <td className="px-6 py-5"><Skeleton className="h-12 w-40 rounded-xl" /></td>
                                            <td className="px-6 py-5"><Skeleton className="h-10 w-20 rounded-xl" /></td>
                                            <td className="px-6 py-5"><Skeleton className="h-8 w-20 rounded-lg" /></td>
                                            <td className="px-6 py-5"><Skeleton className="h-8 w-24 rounded-lg" /></td>
                                            <td className="px-6 py-5 text-right"><Skeleton className="h-10 w-10 ml-auto rounded-xl" /></td>
                                        </tr>
                                    ))
                                ) : bids.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
                                                    <Gavel size={32} className="text-muted-foreground/30" />
                                                </div>
                                                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No bids found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    bids.map((bid: Bid) => (
                                        <motion.tr 
                                            key={bid.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="border-b border-border/10 hover:bg-muted/5 transition-colors group"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center ring-2 ring-primary/5">
                                                        <User className="text-primary" size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-sm uppercase tracking-tight text-foreground transition-colors">{bid.influencer?.profile?.fullName || 'Influencer'}</span>
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">@{bid.influencer?.profile?.username}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <Target size={14} className="text-muted-foreground" />
                                                    <span className="font-bold text-sm text-foreground max-w-[200px] truncate">{bid.auction?.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/30 border border-border/30 w-fit">
                                                    <DollarSign size={14} className="text-primary" />
                                                    <span className="font-black text-sm text-foreground tabular-nums tracking-tighter italic">{bid.amount}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                {getStatusBadge(bid.status)}
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{format(new Date(bid.createdAt), 'MMM dd, yyyy')}</span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2 text-muted-foreground">
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                                                        <Eye size={18} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-100">
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
