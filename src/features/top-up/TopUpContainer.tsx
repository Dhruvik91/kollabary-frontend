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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-card/30 p-8 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
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
                                <span className="uppercase tracking-[0.2em] text-[11px]">Invite & Earn Free KC</span>
                                <ArrowUpRight size={20} />
                            </Button>
                        </Link>
                    }
                />
            </div>

            <div className="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-[3rem] p-6 md:p-12 border border-primary/10 relative">
                <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.25em] border border-primary/20 shadow-lg backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-amber-500" />
                        Exclusive Creator Packages
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground uppercase">Ready to scale your influence?</h2>
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
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => console.log('Razorpay loaded')}
            />
        </div>
    );
};

