'use client';

import React, { useMemo } from 'react';
import { useInfiniteMyOrders, useSyncOrder } from '@/hooks/queries/usePaymentQueries';
import { PageHeader } from '@/components/shared/PageHeader';
import { Package } from 'lucide-react';
import { OrderItem } from './components/OrdersList';
import { ErrorState } from '@/components/shared/ErrorState';
import { InfiniteScrollContainer } from '@/components/shared/InfiniteScrollContainer';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const OrdersContainer = () => {
    const limit = 10;
    
    const { 
        data: infiniteData, 
        isLoading, 
        isError, 
        error, 
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteMyOrders(limit);
    
    const { mutate: syncOrder, isPending: isSyncing } = useSyncOrder();

    // Flatten all items from all pages
    const orders = useMemo(() => {
        return infiniteData?.pages.flatMap(page => page.items) || [];
    }, [infiniteData]);

    if (isError) {
        return (
            <ErrorState
                title="Failed to load orders"
                description={error?.message || "Something went wrong while fetching your order history."}
                onRetry={refetch}
            />
        );
    }

    const loader = (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
        </div>
    );

    const emptyState = (
        <Card className="border-dashed border-2 border-primary/20 bg-primary/5 rounded-3xl py-12">
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                    <Package size={40} />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold">No orders found</CardTitle>
                    <CardDescription className="max-w-xs mx-auto">
                        You haven't made any purchases yet. Your top-up history will appear here.
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            <PageHeader
                label="HISTORY"
                title="Your"
                highlightedTitle="Orders"
                subtitle="Track all your KC coin purchases and their current payment status."
                icon={Package}
            />

            <div className="max-w-5xl">
                <InfiniteScrollContainer
                    items={orders}
                    isLoading={isLoading}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                    loader={loader}
                    emptyState={emptyState}
                    gridClassName="space-y-4"
                    renderItem={(order) => (
                        <OrderItem 
                            key={order.id} 
                            order={order} 
                            isSyncing={isSyncing}
                            onSync={syncOrder}
                        />
                    )}
                />
            </div>

            <div className="text-center text-muted-foreground text-sm max-w-2xl mx-auto pt-8 border-t border-border/50">
                <p>
                    If your payment is successful but the status is still pending, use the sync button to update it. 
                    For further assistance, contact our support team.
                </p>
            </div>
        </div>
    );
};
