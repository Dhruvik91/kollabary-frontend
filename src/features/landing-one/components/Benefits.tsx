'use client';

import { Clock, Search, Briefcase, MessageSquare, ToggleLeft, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function Benefits() {
    const benefitsData = [
        {
            icon: Clock,
            title: 'Saves time',
            description: 'Instantly discover verified creators or active campaign briefs. Cut manual spreadsheet building and endless back-and-forth cold pitching.',
        },
        {
            icon: Search,
            title: 'Better creator discovery',
            description: 'Advanced category sorting and niche tags locate the perfect brand fit. Search exactly what aesthetic matches your upcoming product line.',
        },
        {
            icon: Briefcase,
            title: 'Real opportunities',
            description: 'Creators gain access to pre-vetted campaigns posted by real brands looking for direct creators. Stop applying to placeholder forms.',
        },
        {
            icon: MessageSquare,
            title: 'Direct connection',
            description: 'In-platform secure communication coordinates contract details and draft review directly between creator and manager.',
        },
        {
            icon: ToggleLeft,
            title: 'Simple process',
            description: 'Clean interface with zero complex layers. Designed for frictionless signups, speedy campaign setups, and instant outcomes.',
        },
        {
            icon: Layers,
            title: 'Built for both sides',
            description: 'A balanced marketing ecosystem focusing equally on brands achieving high-converting campaigns, and creators growing their journey.',
        },
    ];

    return (
        <section id="benefits" className="relative py-24 bg-background border-t border-border/40">
            {/* Ambient decorative lighting */}
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
                        Why use Kollabary?
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground font-semibold">
                        A modern, product-led marketing platform designed to establish authentic creator-brand connections with absolute clarity.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefitsData.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="p-8 rounded-3xl border border-border/50 bg-card/65 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 shadow-sm relative overflow-hidden text-left flex flex-col items-start group"
                            >
                                {/* Mini decorative gradient */}
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/50 group-hover:to-secondary transition-all duration-500" />

                                {/* Icon box */}
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-105 duration-300">
                                    <Icon className="w-5 h-5" />
                                </div>

                                {/* Title & Text */}
                                <h3 className="text-lg font-bold mb-2.5 text-foreground group-hover:text-primary transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground font-semibold leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
