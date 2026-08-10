'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Loader2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { useMe } from '@/hooks/use-auth.hooks';
import { useCreateInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { useSubscriptionPlans, useInitiateSubscription, useVerifySubscription } from '@/hooks/queries/useSubscriptionQueries';
import { InfluencerProfileForm } from '../components/InfluencerProfileForm';
import { FRONTEND_ROUTES, COMPANY_EMAIL } from '@/constants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SubscriptionTier } from '@/types/subscription.types';

export const InfluencerSetupContainer = () => {
    const router = useRouter();
    const { data: user, isLoading: isUserLoading } = useMe();
    const { data: plans, isLoading: isPlansLoading, isError: isPlansError, refetch: refetchPlans } = useSubscriptionPlans();

    const { mutateAsync: initiateSubscription, isPending: isInitiating } = useInitiateSubscription();
    const { mutateAsync: verifySubscription, isPending: isVerifying } = useVerifySubscription();
    const { mutateAsync: createProfile, isPending: isCreatingProfile } = useCreateInfluencerProfile();

    const [step, setStep] = useState<'subscription' | 'profile'>('subscription');

    // Auto-advance to profile setup if user already has an active subscription
    useEffect(() => {
        if (user?.subscription?.status === 'ACTIVE') {
            setStep('profile');
        }
    }, [user]);

    // Handle profile submission
    const handleProfileSubmit = useCallback(async (data: any) => {
        const platformsRecord: Record<string, { handle: string; followers: number; engagementRate?: number }> = {};
        if (Array.isArray(data.platforms)) {
            data.platforms.forEach((p: any) => {
                if (p.handle && p.handle.trim() !== '') {
                    platformsRecord[p.name] = {
                        handle: p.handle,
                        followers: p.followers || 0,
                        ...(p.engagementRate !== undefined && { engagementRate: p.engagementRate })
                    };
                }
            });
        }

        const submissionData = {
            ...data,
            platforms: platformsRecord
        };

        try {
            await createProfile(submissionData);
            router.replace(FRONTEND_ROUTES.DASHBOARD.OVERVIEW);
        } catch (error: any) {
            console.error('Profile creation failed:', error);
        }
    }, [createProfile, router]);

    // Handle plan selection and payment flow
    const handleSelectPlan = async (plan: any) => {
        const isFreePlan = plan.price === 0 || plan.name.toUpperCase() === SubscriptionTier.FREE;

        if (isFreePlan) {
            const toastId = toast.loading("Activating your Free Plan...");
            try {
                const res = await initiateSubscription(plan.id);
                if (res.activated) {
                    toast.success("Free Plan activated successfully!");
                    setStep('profile');
                } else {
                    toast.error("Failed to activate Free Plan. Please try again.");
                }
            } catch (err: any) {
                console.error("Free plan activation failed:", err);
            } finally {
                toast.dismiss(toastId);
            }
            return;
        }

        // Paid plans require Razorpay
        if (!(window as any).Razorpay) {
            toast.error("Payment Gateway (Razorpay) is still loading. Please try again in a few seconds.");
            return;
        }

        const toastId = toast.loading("Initializing payment...");
        try {
            const res = await initiateSubscription(plan.id);
            toast.dismiss(toastId);

            if (!res.subscriptionId || !res.razorpayKeyId) {
                toast.error("Failed to initialize subscription checkout.");
                return;
            }

            const options = {
                key: res.razorpayKeyId,
                subscription_id: res.subscriptionId,
                name: "Kollabary",
                description: `${plan.name} Creator Membership`,
                handler: async function (response: any) {
                    const verifyToastId = toast.loading("Verifying payment, please do not close this page...");
                    try {
                        await verifySubscription({
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySubscriptionId: response.razorpay_subscription_id || res.subscriptionId,
                            razorpaySignature: response.razorpay_signature,
                        });
                        setStep('profile');
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                    } finally {
                        toast.dismiss(verifyToastId);
                    }
                },
                prefill: {
                    name: user?.username || "Creator",
                    email: user?.email || "",
                },
                theme: {
                    color: "#E91E8C",
                },
                modal: {
                    ondismiss: function () {
                        toast.info("Subscription payment cancelled");
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            toast.dismiss(toastId);
            console.error("Paid subscription initiation failed:", error);
        }
    };

    // Sorting plans by price so they display FREE -> PRO -> ELITE
    const sortedPlans = plans ? [...plans].sort((a, b) => Number(a.price) - Number(b.price)) : [];

    // Fallback static features if database record features is empty
    const getFallbackFeatures = (planName: string) => {
        const name = planName.toUpperCase();
        if (name === SubscriptionTier.FREE) {
            return [
                "Apply to public collaboration campaigns",
                "Standard creator portfolio page",
                "Basic reach & engagement statistics",
                "Standard community support access"
            ];
        } else if (name === SubscriptionTier.PRO) {
            return [
                "Priority bid placement on collaborations",
                "Verified Creator badge on search results",
                "Advanced analytics & audience insights",
                "Unlimited active collaboration applications",
                "Higher visibility on brand searches"
            ];
        } else {
            return [
                "Dedicated manager & strategy assistance",
                "Premium portfolio design themes",
                "1-on-1 brand pitch review & formulation",
                "0% platform service fees on deals",
                "Early access to premium sponsor campaigns"
            ];
        }
    };

    const getPlanDesign = (planName: string) => {
        const name = planName.toUpperCase();
        if (name === SubscriptionTier.FREE) {
            return {
                icon: Layers,
                colorClass: "bg-white dark:bg-zinc-950 border-emerald-500/20 ring-2 ring-emerald-500/20 shadow-emerald-500/10 shadow-xl",
                iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
                buttonText: "Get Started",
                buttonVariant: "outline" as const,
                popularBadgeClass: "bg-emerald-500 shadow-emerald-500/35"
            };
        } else if (name === SubscriptionTier.PRO) {
            return {
                icon: Zap,
                colorClass: "bg-white dark:bg-zinc-950 border-pink-500 ring-2 ring-pink-500/20 shadow-pink-500/10 shadow-xl",
                iconColor: "text-pink-500 bg-pink-50 dark:bg-pink-950 dark:text-pink-400",
                buttonText: "Subscribe to Pro",
                buttonVariant: "default" as const,
                popularBadgeClass: "bg-pink-500 shadow-pink-500/35"
            };
        } else {
            return {
                icon: ShieldCheck,
                colorClass: "bg-white dark:bg-zinc-950 border-violet-500 ring-2 ring-violet-500/20 shadow-violet-500/10 shadow-xl",
                iconColor: "text-violet-500 bg-violet-50 dark:bg-violet-950/50 dark:text-violet-400",
                buttonText: "Go Elite",
                buttonVariant: "default" as const,
                popularBadgeClass: "bg-violet-600 shadow-violet-600/35"
            };
        }
    };

    const isLoading = isUserLoading || isPlansLoading;

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm font-medium animate-pulse">Setting up your experience...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 md:px-0 flex flex-col items-center justify-center pt-8 sm:pt-12 max-w-7xl mx-auto w-full">
            {/* Step Indicator Header */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300",
                        step === 'subscription'
                            ? "bg-primary text-white ring-4 ring-primary/20 shadow-md shadow-primary/10"
                            : "bg-emerald-500 text-white"
                    )}>
                        {step === 'subscription' ? '1' : <Check size={16} />}
                    </div>
                    <span className={cn(
                        "font-black text-xs uppercase tracking-wider hidden sm:inline",
                        step === 'subscription' ? "text-foreground" : "text-emerald-500"
                    )}>
                        Choose Plan
                    </span>
                </div>

                <div className="h-[2px] w-12 bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center gap-2">
                    <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300",
                        step === 'profile'
                            ? "bg-primary text-white ring-4 ring-primary/20 shadow-md shadow-primary/10"
                            : "bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-700"
                    )}>
                        2
                    </div>
                    <span className={cn(
                        "font-black text-xs uppercase tracking-wider hidden sm:inline",
                        step === 'profile' ? "text-foreground" : "text-muted-foreground"
                    )}>
                        Complete Profile
                    </span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 'subscription' ? (
                    <motion.div
                        key="subscription-step"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="text-center mb-12 space-y-4 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                <Sparkles size={12} className="animate-pulse" />
                                Step 1: Choose Your Creator Tier
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                                Pick your path to growth
                            </h1>
                            <p className="text-muted-foreground text-md sm:text-lg">
                                Access specialized tooling, collaboration networks, and priority placement designed for your growth stage.
                            </p>
                        </div>

                        {isPlansError ? (
                            <div className="text-center space-y-4 p-8 border rounded-3xl border-rose-500/20 bg-rose-500/5">
                                <p className="text-rose-500 font-bold">Failed to load membership plans.</p>
                                <Button onClick={() => refetchPlans()} variant="outline">Retry Loading</Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 justify-items-center">
                                {sortedPlans.map((plan, index) => {
                                    const design = getPlanDesign(plan.name);
                                    const Icon = design.icon;
                                    const features = (Array.isArray(plan.features) && plan.features.length > 0)
                                        ? plan.features
                                        : getFallbackFeatures(plan.name);

                                    return (
                                        <motion.div
                                            key={plan.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            whileHover={{ y: -8 }}
                                            className={cn(
                                                "relative flex flex-col rounded-3xl border p-8 w-full max-w-[370px] h-full justify-between transition-all duration-300 ease-out shadow-sm hover:shadow-xl",
                                                design.colorClass
                                            )}
                                        >
                                            {plan.isPopular && (
                                                <div className={cn(
                                                    "absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-black text-white uppercase tracking-widest shadow-lg",
                                                    design.popularBadgeClass
                                                )}>
                                                    Most Popular
                                                </div>
                                            )}

                                            <div>
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className={cn("rounded-2xl p-3.5", design.iconColor)}>
                                                        <Icon size={22} />
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-3xl font-black">₹{plan.price}</span>
                                                        <span className="text-[11px] text-muted-foreground block font-bold uppercase tracking-wider">
                                                            {plan.billingPeriod || 'monthly'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-bold font-sans tracking-tight mb-2">{plan.name}</h3>
                                                <p className="text-sm text-muted-foreground mb-6">
                                                    {plan.description || `Optimized access for ${plan.name.toLowerCase()} tier creators.`}
                                                </p>

                                                <div className="space-y-4 mb-8">
                                                    {features.map((feature: string, i: number) => (
                                                        <div key={i} className="flex items-start gap-3 text-sm">
                                                            <div className="mt-1 rounded-full bg-emerald-500/10 p-0.5 text-emerald-500 dark:bg-emerald-500/20">
                                                                <Check size={12} className="stroke-[3]" />
                                                            </div>
                                                            <span className="text-zinc-600 dark:text-zinc-300">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <Button
                                                variant={design.buttonVariant}
                                                disabled={isInitiating || isVerifying}
                                                onClick={() => handleSelectPlan(plan)}
                                                className={cn(
                                                    "w-full rounded-2xl h-12 font-black uppercase tracking-wider text-xs transition-transform active:scale-95",
                                                    plan.name.toUpperCase() === SubscriptionTier.ELITE && "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 bg-none",
                                                    plan.name.toUpperCase() === SubscriptionTier.PRO && "bg-pink-500 text-white hover:bg-pink-600 bg-none",
                                                    plan.name.toUpperCase() === SubscriptionTier.FREE && "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 bg-none"
                                                )}
                                            >
                                                {isInitiating || isVerifying ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    design.buttonText
                                                )}
                                            </Button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="profile-step"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="text-center mb-12 space-y-4 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                <Check size={12} />
                                Plan Active
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                                Complete your setup
                            </h1>
                            <p className="text-muted-foreground text-md sm:text-lg">
                                Fill in details about your platforms, reach, and audience to begin matching with premium brand campaigns.
                            </p>
                        </div>

                        <InfluencerProfileForm
                            onSubmit={handleProfileSubmit}
                            isLoading={isCreatingProfile}
                            mode="setup"
                            submitLabel="Complete Profile"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-sm text-muted-foreground text-center"
            >
                Need help? <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary font-bold hover:underline">Contact our creator team</a>
            </motion.p>

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => console.log('Razorpay Script loaded successfully')}
            />
        </div>
    );
};
