'use client';

import { AlertCircle, Clock, Search, MessageSquare, EyeOff, Radio, MailQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

export function Problem() {
    return (
        <section id="problem" className="relative py-20 bg-background/50 border-y border-border/40">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header text */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
                        Finding the right collaboration should not be hard.
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground font-semibold">
                        The current process is broken. Brands and creators waste days dealing with friction and disconnected platforms.
                    </p>
                </div>

                {/* Problems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Brand Card Pain Point */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm relative overflow-hidden flex flex-col items-start text-left"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/25 flex items-center justify-center text-destructive mb-6">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">For Brands</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-semibold">
                            Brands spend hours searching manually for creators, auditing profiles for fake followers, and sending cold messages that get ignored.
                        </p>
                        <ul className="space-y-3.5 text-xs md:text-sm font-semibold text-muted-foreground mt-auto w-full">
                            <li className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-destructive/80 shrink-0" />
                                Hours wasted on manual spreadsheets
                            </li>
                            <li className="flex items-center gap-3">
                                <Search className="w-4 h-4 text-destructive/80 shrink-0" />
                                Unverified engagement and stats
                            </li>
                            <li className="flex items-center gap-3">
                                <MessageSquare className="w-4 h-4 text-destructive/80 shrink-0" />
                                Extremely low reply rates from cold emails
                            </li>
                        </ul>
                    </motion.div>

                    {/* Creator Card Pain Point */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm relative overflow-hidden flex flex-col items-start text-left"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/25 flex items-center justify-center text-destructive mb-6">
                            <MailQuestion className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">For Creators</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-semibold">
                            Creators often miss real brand deals because they aren&apos;t easily discoverable, leaving them pitching constantly with zero feedback.
                        </p>
                        <ul className="space-y-3.5 text-xs md:text-sm font-semibold text-muted-foreground mt-auto w-full">
                            <li className="flex items-center gap-3">
                                <EyeOff className="w-4 h-4 text-destructive/80 shrink-0" />
                                Invisible to top-tier brands in your niche
                            </li>
                            <li className="flex items-center gap-3">
                                <Radio className="w-4 h-4 text-destructive/80 shrink-0" />
                                Constant manual outreach with low outcome
                            </li>
                            <li className="flex items-center gap-3">
                                <AlertCircle className="w-4 h-4 text-destructive/80 shrink-0" />
                                Lack of transparency in campaign terms
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
