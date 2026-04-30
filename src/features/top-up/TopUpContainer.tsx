'use client';

import { useRef, useEffect, useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Coins, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { usePaymentPlans, useInitiateTopUp, useVerifyPayment, useCancelOrder } from '@/hooks/queries/usePaymentQueries';
import { TopUpList } from './components/TopUpList';
import { PageHeader } from '@/components/shared/PageHeader';
import { ErrorState } from '@/components/shared/ErrorState';
import { useConfetti } from '@/contexts/confetti-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

export const TopUpContainer = () => {
    const { triggerConfetti } = useConfetti();
    const activeOrderIdRef = useRef<string | null>(null);
    const { data: plans, isLoading: isPlansLoading, isError, error, refetch } = usePaymentPlans();
    const { mutateAsync: initiateTopUp, isPending: isInitiating } = useInitiateTopUp();
    const { mutate: verifyPayment, isPending: isVerifying } = useVerifyPayment();
    const { mutate: cancelOrder } = useCancelOrder();

    // Prevent user from leaving during critical verification phase
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isVerifying || isInitiating) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isVerifying, isInitiating]);

    const handleBuy = async (planId: string) => {
        if (!(window as any).Razorpay) {
            toast.error("Payment Gateway (Razorpay) is still loading. Please try again in a few seconds.");
            return;
        }

        try {
            const orderData = await initiateTopUp(planId);
            activeOrderIdRef.current = orderData.orderId;

            const options = {
                key: orderData.key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Kollabary",
                description: "KC Coin Top-up",
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    const toastId = toast.loading("Verifying payment, please do not close this window...");
                    verifyPayment({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    }, {
                        onSuccess: () => {
                            triggerConfetti({ numberOfPieces: 500 });
                            toast.success("Payment verified successfully! Your KC coins have been added.");
                        },
                        onSettled: () => {
                            toast.dismiss(toastId);
                        }
                    });
                },
                prefill: {
                    name: orderData.prefill?.name || "",
                    email: orderData.prefill?.email || "",
                },
                theme: {
                    color: "#E91E8C",
                },
                modal: {
                    ondismiss: function () {
                        toast.info("Payment cancelled");
                        if (activeOrderIdRef.current) {
                            cancelOrder(activeOrderIdRef.current);
                        }
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
            <PageHeader
                label="BOOST YOUR WALLET"
                title="KC"
                highlightedTitle="Coins"
                subtitle="Unlock premium features, bid on top collaborations, and grow your presence with KC Coins."
                icon={Coins}
                className="relative z-10"
                action={
                    <Link href={FRONTEND_ROUTES.DASHBOARD.REFERRALS}>
                        <Button className="h-14 px-8 rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 hover:scale-105 active:scale-95 text-white font-black transition-all gap-3 border-none shadow-xl shadow-secondary/20">
                            <span className="uppercase tracking-[0.2em] text-[11px]">Invite & Earn </span>
                            <ArrowUpRight size={20} />
                        </Button>
                    </Link>
                }
            />
            <div className="relative">
                {isPlansLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12 px-4 max-w-7xl mx-auto justify-items-center">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-[480px] rounded-[2.5rem] w-full max-w-[320px]" />
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
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => console.log('Razorpay loaded')}
            />
        </div>
    );
};

