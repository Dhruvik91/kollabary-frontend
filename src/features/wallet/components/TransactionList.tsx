import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';
import { TransactionItem } from './TransactionItem';
import { Loader2, History } from 'lucide-react';
import { KCTransaction } from '@/types/wallet.types';

interface TransactionListProps {
    transactions: KCTransaction[];
    loading?: boolean;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => void;
}

export const TransactionList = ({
    transactions,
    loading = false,
    hasNextPage,
    isFetchingNextPage = false,
    fetchNextPage = () => {},
}: TransactionListProps) => {
    if (loading && transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Fetching transactions...</p>
            </div>
        );
    }

    if (!loading && transactions.length === 0) {
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
        <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 transition-colors">
            <InfiniteScrollContainer
                items={transactions}
                renderItem={(transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                )}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isLoading={loading}
                gridClassName="space-y-3"
            />
        </div>
    );
};
