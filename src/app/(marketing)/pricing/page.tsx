'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Check, Star, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            price: "Free",
            desc: "For small brands starting out.",
            features: ["5 Campaign posts", "Basic discovery", "Messaging access", "Standard support"]
        },
        {
            name: "Pro",
            price: "$99",
            desc: "For growing marketing teams.",
            popular: true,
            features: ["Unlimited campaigns", "Advanced analytics", "Priority ranking", "Verified badge", "Expert support"]
        },
        {
            name: "Enterprise",
            price: "Custom",
            desc: "For global scale & performance.",
            features: ["Custom integration", "Dedicated manager", "SAML/SSO", "Unlimited everything", "API access"]
        }
    ];

    return (
        <StaticPageLayout
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that fits your growth strategy."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        className={`glass-card p-8 rounded-[3rem] border border-border/50 flex flex-col ${plan.popular ? 'border-primary shadow-xl shadow-primary/10 relative overflow-hidden' : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-8 py-2 rotate-45 translate-x-[25px] translate-y-[15px]">
                                Popular
                            </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold">{plan.price}</span>
                            {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{plan.desc}</p>

                        <div className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>

                        <Button className={`w-full rounded-full h-12 font-bold ${plan.popular ? '' : 'variant-outline border-border'}`}>
                            {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                        </Button>
                    </motion.div>
                ))}
            </div>

            <StaticSection title="Trusted Worldwide" icon={<ShieldCheck className="w-6 h-6 text-primary" />} index={0}>
                <p>Join over 500+ premium brands already protecting their strategy with Kollabary's secure bridge platform.</p>
            </StaticSection>
        </StaticPageLayout>
    );
}
