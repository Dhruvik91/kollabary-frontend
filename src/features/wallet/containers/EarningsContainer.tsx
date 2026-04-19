'use client';

import React from 'react';
import { useWallet, useInfiniteTransactions } from '@/hooks/queries/useWalletQueries';
import { WalletCard } from '@/components/shared/WalletCard';
import { TransactionList } from '../components/TransactionList';
import { PageHeader } from '@/components/shared/PageHeader';
import { Coins, Loader2, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';

export const EarningsContainer = () => {
    const { data: wallet, isLoading: isWalletLoading } = useWallet();
    const { 
        data: transactionPages,
        isLoading: isTransactionsLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useInfiniteTransactions({ limit: 15 });

    const transactions = transactionPages?.pages.flatMap(page => page.items) || [];

    const isLoading = isWalletLoading || isTransactionsLoading;

    return (
        <div className="space-y-8 pb-20">
            <PageHeader 
                label="Earnings & Wallet"
                title="Manage your"
                highlightedTitle="KC Coins"
                subtitle="Track your earnings, view transaction history, and manage your virtual currency."
                icon={Coins}
                action={
                    <Link href={FRONTEND_ROUTES.DASHBOARD.REFERRALS}>
                        <Button className="h-12 px-6 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold transition-all gap-2 border-none">
                            <span className="uppercase tracking-widest text-[10px]">Invite & Earn</span>
                            <ArrowUpRight size={18} />
                        </Button>
                    </Link>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <WalletCard 
                        balance={wallet?.balance || 0} 
                        loading={isWalletLoading} 
                    />
                    
                    <Card className="rounded-[2.5rem] border-border/50 glass-card p-8">
                        <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-muted-foreground">Quick Info</h4>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <p className="text-xs font-bold text-primary uppercase mb-1">What are KC Coins?</p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    KC Coins are the primary currency of Kollabary. Use them to create auctions, bid on collaborations, and unlock premium features.
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10">
                                <p className="text-xs font-bold text-secondary uppercase mb-1">How to earn?</p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    Earn KC by referring friends, participating in platform events, or receiving daily allowances based on your activity tier.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card className="rounded-[2.5rem] border-border/50 backdrop-blur-md overflow-hidden min-h-[500px]">
                        <div className="p-8 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold tracking-tight">Transaction History</h3>
                                <p className="text-xs text-muted-foreground mt-1">Detailed log of all your KC coin movements</p>
                            </div>
                        </div>
                        <CardContent className="p-4 sm:p-6">
                            <TransactionList 
                                transactions={transactions} 
                                loading={isTransactionsLoading} 
                                hasNextPage={hasNextPage}
                                isFetchingNextPage={isFetchingNextPage}
                                fetchNextPage={fetchNextPage}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
