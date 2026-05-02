import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ShoppingBag,
    ChevronRight,
    Calendar,
    Zap
} from 'lucide-react';
import { FRONTEND_ROUTES } from '@/constants';

interface BrandAuctionListProps {
    auctions: any[];
}

export const BrandAuctionList = ({ auctions }: BrandAuctionListProps) => {
    if (!auctions || auctions.length === 0) {
        return (
            <Card className="rounded-[2.5rem] border-border/50 bg-card/40 glass-card p-12 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center text-muted-foreground">
                        <ShoppingBag size={32} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xl font-bold">No Active Auctions</h4>
                        <p className="text-muted-foreground">This brand doesn't have any live auctions at the moment. Check back soon!</p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Zap className="text-primary" size={28} />
                Active Auctions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                    <Card
                        key={auction.id}
                        className="rounded-[2rem] border-border/50 bg-card/40 glass-card-elevated overflow-hidden group hover:border-primary/50 transition-all flex flex-col"
                    >
                        <CardContent className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                                    {auction.category || 'General'}
                                </Badge>
                                <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                                    <Calendar size={12} />
                                    {new Date(auction.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                    {auction.title}
                                </h4>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                    {auction.description}
                                </p>
                            </div>

                            <div className="flex items-start justify-start pt-2 border-t border-border/30">
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Budget</p>
                                    <p className="text-lg font-black text-foreground tabular-nums">
                                        {auction.minBudget || auction.maxBudget ? (
                                            <>₹{auction.minBudget || 0} - ₹{auction.maxBudget || 0}</>
                                        ) : (
                                            <>₹{auction.budget || 0}</>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <Link href={FRONTEND_ROUTES.DASHBOARD.AUCTION_DETAIL(auction.id)} className="block pt-2">
                                <Button>
                                    View Details
                                    <ChevronRight size={18} />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
