import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { walletService } from '@/services/wallet.service';
import { transactionService } from '@/services/transaction.service';
import { TransactionType, TransactionPurpose } from '@/types/wallet.types';

export const WALLET_QUERY_KEYS = {
    all: ['wallet'] as const,
    my: () => [...WALLET_QUERY_KEYS.all, 'my'] as const,
};

export const TRANSACTION_QUERY_KEYS = {
    all: ['transactions'] as const,
    my: (params: any) => [...TRANSACTION_QUERY_KEYS.all, 'my', params] as const,
};

export const useWallet = () => {
    return useQuery({
        queryKey: WALLET_QUERY_KEYS.my(),
        queryFn: () => walletService.getMyWallet(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useTransactions = (params: {
    page?: number;
    limit?: number;
    type?: TransactionType;
    purpose?: TransactionPurpose;
} = {}) => {
    return useQuery({
        queryKey: TRANSACTION_QUERY_KEYS.my(params),
        queryFn: () => transactionService.getMyHistory(params),
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

export const useInfiniteTransactions = (params: {
    limit?: number;
    type?: TransactionType;
    purpose?: TransactionPurpose;
} = {}) => {
    return useInfiniteQuery({
        queryKey: TRANSACTION_QUERY_KEYS.my({ ...params, infinite: true }),
        queryFn: ({ pageParam = 1 }) => 
            transactionService.getMyHistory({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.page < lastPage.meta.totalPages) {
                return lastPage.meta.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};
