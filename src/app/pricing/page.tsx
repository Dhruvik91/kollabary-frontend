'use client';

import { useSubscriptionPlans } from '@/hooks/useSubscription';
import { PageContainer } from '@/components/layout/PageContainer';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/states/LoadingState';
import { ErrorState } from '@/components/ui/states/ErrorState';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const planIcons = {
    basic: Sparkles,
    pro: Zap,
    premium: Crown,
};

export default function PricingPage() {
    const { data: plans, isLoading, isError } = useSubscriptionPlans();

    if (isLoading) return <LoadingState message="Loading pricing plans..." />;
    if (isError) return <ErrorState message="Failed to load pricing plans" />;

    const activePlans = plans?.filter(plan => plan.isActive) || [];

    return (
        <PageContainer>
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/50">
                            Pricing Plans
                        </Badge>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-display font-bold tracking-tight"
                    >
                        Choose Your Plan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Unlock premium features and grow your influence with our flexible subscription plans.
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activePlans.map((plan, index) => {
                        const Icon = planIcons[plan.name.toLowerCase() as keyof typeof planIcons] || Sparkles;
                        const isPopular = plan.name.toLowerCase() === 'pro';

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="relative"
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                        <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 shadow-lg">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <GlassCard
                                    className={`p-8 border-glass-border h-full flex flex-col ${isPopular ? 'ring-2 ring-primary shadow-2xl shadow-primary/20' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPopular ? 'bg-primary/20' : 'bg-secondary'
                                            }`}>
                                            <Icon className={`w-6 h-6 ${isPopular ? 'text-primary' : ''}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display font-bold">{plan.name}</h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="text-5xl font-bold">₹{plan.price}</span>
                                        <span className="text-muted-foreground">/ {plan.duration} days</span>
                                    </div>

                                    <div className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-primary" />
                                                </div>
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        className={`w-full rounded-xl h-12 font-semibold ${isPopular
                                                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
                                                : ''
                                            }`}
                                        variant={isPopular ? 'default' : 'outline'}
                                    >
                                        Get Started
                                    </Button>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* FAQ or Additional Info */}
                <div className="text-center space-y-4 pt-12">
                    <h2 className="text-3xl font-display font-bold">Need a custom plan?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Contact our team to discuss enterprise solutions and custom pricing for your organization.
                    </p>
                    <Button variant="outline" className="rounded-xl px-8 h-12">
                        Contact Sales
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
}
