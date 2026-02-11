'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Users,
    Zap,
    Shield,
    Globe,
    Layers
} from 'lucide-react';

const features = [
    {
        title: 'Advanced Analytics',
        description: 'Track real-time performance metrics and ROI for every collaboration campaign.',
        icon: BarChart3,
        color: 'bg-blue-500/10 text-blue-600',
    },
    {
        title: 'Smart Matching',
        description: 'Find the perfect influencers for your brand using our AI-driven discovery engine.',
        icon: Users,
        color: 'bg-purple-500/10 text-purple-600',
    },
    {
        title: 'Fast Payments',
        description: 'Automated, secure payment processing that keeps your partners happy.',
        icon: Zap,
        color: 'bg-amber-500/10 text-amber-600',
    },
    {
        title: 'Brand Safety',
        description: 'Rigorous verification processes to ensure authentic and safe partnerships.',
        icon: Shield,
        color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
        title: 'Global Reach',
        description: 'Connect with creators across borders and access diverse international markets.',
        icon: Globe,
        color: 'bg-cyan-500/10 text-cyan-600',
    },
    {
        title: 'Infinite Scalability',
        description: 'Built on enterprise architecture to support growth from startup to global giant.',
        icon: Layers,
        color: 'bg-rose-500/10 text-rose-600',
    },
];

/**
 * Features section with grid layout and premium card design
 */
export const Features = () => {
    return (
        <section id="features" className="py-24 bg-zinc-50/50 dark:bg-zinc-900/10">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Everything you need for <br />
                        <span className="text-primary italic font-serif">elite collaborations</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground"
                    >
                        Experience a comprehensive suite of tools designed to elevate your brand presence through authentic human connections.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 rounded-3xl border border-border bg-card hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Subtle radial-gradient hover effect */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ maskImage: 'radial-gradient(circle at center, black, transparent 70%)' }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
