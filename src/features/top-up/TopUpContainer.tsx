'use client';

import { usePaymentPlans, useInitiateTopUp, useVerifyPayment } from '@/hooks/queries/usePaymentQueries';
import { TopUpList } from './components/TopUpList';
import { PageHeader } from '@/components/shared/PageHeader';
import { WalletCard } from '@/components/shared/WalletCard';
import { ErrorState } from '@/components/shared/ErrorState';
import { Skeleton } from '@/components/ui/skeleton';
import { Coins, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useWallet } from '@/hooks/queries/useWalletQueries';

export const TopUpContainer = () => {
    const { data: plans, isLoading: isPlansLoading, isError, error, refetch } = usePaymentPlans();
    const { mutateAsync: initiateTopUp, isPending: isInitiating } = useInitiateTopUp();
    const { mutate: verifyPayment } = useVerifyPayment();
    const { data: wallet, isLoading: isWalletLoading } = useWallet();

    const handleBuy = async (planId: string) => {
        try {
            const orderData = await initiateTopUp(planId);

            const options = {
                key: orderData.key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Kollabary",
                description: "KC Coin Top-up",
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    verifyPayment({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    });
                },
                prefill: {
                },
                theme: {
                    color: "#E91E8C",
                },
                modal: {
                    ondismiss: function() {
                        toast.info("Payment cancelled");
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err) {
            // Error handled by mutation onError
        }
    };

    if (isError) {
        return (
            <ErrorState
                title="Failed to load plans"
                description={error?.message || "Something went wrong while fetching top-up plans."}
                onRetry={refetch}
            />
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <PageHeader
                    label="TOP UP"
                    title="KC"
                    highlightedTitle="Coins"
                    subtitle="Choose a plan to boost your balance and unlock more opportunities."
                    icon={Coins}
                />
                <div className="w-full md:w-auto">
                    <WalletCard balance={wallet?.balance || 0} loading={isWalletLoading} />
                </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl p-4 md:p-8 border border-primary/10">
                <div className="max-w-4xl mx-auto text-center space-y-4 mb-4">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        Limited Time Offers
                    </div>
                </div>

                {isPlansLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-[400px] rounded-2xl w-full" />
                        ))}
                    </div>
                ) : (
                    <TopUpList
                        plans={plans || []}
                        onBuy={handleBuy}
                        isLoading={isInitiating}
                    />
                )}
            </div>

            <div className="text-center text-muted-foreground text-sm max-w-2xl mx-auto">
                <p>
                    By topping up, you agree to our Terms of Service. KC coins are non-refundable and can only be used within the Kollabary platform.
                </p>
            </div>
        </div>
    );
};
