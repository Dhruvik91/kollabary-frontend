'use client';

import { motion } from 'framer-motion';
import { Gavel, Calendar, DollarSign, Tag, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Auction, AuctionStatus } from '@/types/auction.types';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { formatCollaborationType } from '@/lib/format-collaboration-type';

interface AuctionCardProps {
    auction: Auction;
}

export const AuctionCard = ({ auction }: AuctionCardProps) => {
    const { id, title, description, minBudget, maxBudget, deadline, status, category, creator } = auction;
    const router = useRouter();
    const { user } = useAuth();
    const isInfluencer = user?.role === UserRole.INFLUENCER;

    const formattedDeadline = format(new Date(deadline), 'PPP');
    const budgetRange = minBudget && maxBudget 
        ? `$${minBudget} - $${maxBudget}` 
        : minBudget ? `From $${minBudget}` : maxBudget ? `Up to $${maxBudget}` : 'Competitive';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card className="border-border/40 bg-card/40 glass-card hover:border-primary/20 transition-all duration-500 ease-out rounded-[2rem] h-full flex flex-col border p-0 overflow-hidden">
                <CardContent className="p-6 flex flex-col gap-4 h-full relative">
                    {/* Header: Title and Creator */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                            <h3 className="text-xl font-black tracking-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                {title}
                            </h3>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                status === AuctionStatus.OPEN ? 'bg-green-500/10 text-green-500' : 'bg-zinc-500/10 text-zinc-500'
                            }`}>
                                {status}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <User size={12} className="text-primary" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider truncate">
                                {creator.profile?.fullName || 'Brand Name'}
                            </span>
                        </div>
                    </div>

                    {/* Category Tag */}
                    {category && (
                        <div className="flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-primary/5 text-primary border border-primary/10">
                                <Tag size={10} />
                                {formatCollaborationType(category)}
                            </span>
                        </div>
                    )}

                    {/* Description excerpt */}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                        {description}
                    </p>

                    {/* Stats/Info Grid */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-zinc-50/50 dark:bg-white/2 rounded-2xl border border-border/40 mt-auto">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter flex items-center gap-1">
                                <DollarSign size={10} /> Budget
                            </span>
                            <p className="text-sm font-black italic truncate">{budgetRange}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter flex items-center gap-1">
                                <Calendar size={10} /> Deadline
                            </span>
                            <p className="text-sm font-black italic truncate">{formattedDeadline}</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <Button
                            onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.AUCTION_DETAIL(id))}
                            className="w-full h-11 rounded-xl font-black text-xs uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                        >
                            <Gavel size={16} strokeWidth={3} />
                            {isInfluencer && status === AuctionStatus.OPEN ? 'Place Bid' : 'View Details'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
