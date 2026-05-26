'use client';

import { Search, Megaphone, MessageSquareCode, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Solution() {
    const solutionCards = [
        {
            icon: Search,
            title: 'Discover creators',
            description: 'Search, filter, and discover highly targeted creators based on their exact niche, content quality, and audited audience metrics.',
            badge: 'For Brands',
        },
        {
            icon: Megaphone,
            title: 'Create opportunities',
            description: 'Brands post concrete campaign briefs and collaboration requirements, letting matching creators apply directly with clear pitches.',
            badge: 'Dual Flow',
        },
        {
            icon: MessageSquareCode,
            title: 'Connect directly',
            description: 'Cut out middlemen agency fees. Collaborate, negotiate campaign terms, and coordinate deliverables inside a direct communication channel.',
            badge: 'Seamless',
        },
    ];

    return (
        <section id="solution" className="relative py-24 bg-background overflow-hidden">
            {/* Visual gradient backdrop */}
            <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">The Solution</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-foreground">
                        Kollabary brings brands and <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            creators together.
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground font-semibold max-w-2xl mx-auto">
                        Brands can discover matching creators by specific niche and content standards. Creators can showcase their profiles and apply for active opportunities.
                    </p>
                </div>

                {/* Solution Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {solutionCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                whileHover={{ y: -6 }}
                                className="p-8 rounded-3xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 shadow-md relative overflow-hidden flex flex-col items-start text-left group"
                            >
                                {/* Glow element on hover */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />

                                {/* Icon container */}
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white mb-6 shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
                                    <Icon className="w-5.5 h-5.5" />
                                </div>

                                {/* Badge */}
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 border border-primary/20 px-2 py-0.5 rounded-full mb-3">
                                    {card.badge}
                                </span>

                                {/* Title & Text */}
                                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
