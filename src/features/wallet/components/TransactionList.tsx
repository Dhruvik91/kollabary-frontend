import React from 'react';
import { KCTransaction } from '@/types/wallet.types';
import { TransactionItem } from './TransactionItem';
import { Loader2, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TransactionListProps {
    transactions: KCTransaction[];
    loading?: boolean;
}

export const TransactionList = ({
    transactions,
    loading = false
}: TransactionListProps) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Fetching transactions...</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <History size={32} />
                </div>
                <div className="space-y-1">
                    <p className="font-bold">No Transactions Found</p>
                    <p className="text-xs text-muted-foreground max-w-[200px]">You haven't made any transactions yet. Your activity will appear here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
};
