'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { FRONTEND_ROUTES } from '@/constants';
import { ShieldAlert, CreditCard, Users, Scale } from 'lucide-react';

export default function TermsPage() {
    const sections = [
        {
            title: "1. The Kollabary Platform",
            icon: <Users className="w-6 h-6 text-primary" />,
            content: "Kollabary acts strictly as an intermediary ('The Bridge') connecting Brands (Clients) and Influencers (Creators). We provide the tools for discovery, communication, and collaboration management, but we are not a party to any agreements made between users."
        },
        {
            title: "2. Payment Disputes & Liability",
            icon: <CreditCard className="w-6 h-6 text-red-500" />,
            content: "CRITICAL: Kollabary does not handle, process, or guarantee payments between Brands and Influencers. All financial transactions occur independently of the platform. Any payment issues, including but not limited to non-payment, partial payment, or delayed payment, must be resolved directly between the parties involved. Kollabary offers no mediation, insurance, or reimbursement for financial concerns."
        },
        {
            title: "3. User Responsibilities",
            icon: <ShieldAlert className="w-6 h-6 text-primary" />,
            content: "Users are solely responsible for verifying the identity and reliability of their collaboration partners. We recommend having written contracts and secure payment methods outside of Kollabary for all engagements."
        },
        {
            title: "4. Limitation of Service",
            icon: <Scale className="w-6 h-6 text-primary" />,
            content: "As a 'bridge' service, we do not guarantee the quality of work from influencers or the fulfillment of payment from brands. Our service is provided 'as-is' without warranties of any kind regarding the outcomes of collaborations initiated on the platform."
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                            Terms & Conditions
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Please read these terms carefully before using the Kollabary platform.
                        </p>
                        <p className="text-sm text-muted-foreground mt-4">
                            Last Updated: February 24, 2026
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <motion.section
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-8 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-colors"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold">{section.title}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {section.content}
                                </p>
                            </motion.section>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-16 p-8 bg-red-500/5 border border-red-500/20 rounded-[2rem] text-center"
                    >
                        <h3 className="text-xl font-bold text-red-500 mb-2 italic">Disclaimer</h3>
                        <p className="text-muted-foreground italic">
                            By using Kollabary, you acknowledge that we are just a facilitator and not responsible for the professional or financial conduct of other users.
                        </p>
                    </motion.div>

                    <div className="mt-12 text-center">
                        <Link href={FRONTEND_ROUTES.HOME}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                            >
                                Return Home
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
