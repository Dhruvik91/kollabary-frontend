'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: "What is Kollabary?",
        answer: "Kollabary is a premium influencer marketing platform that connects brands with verified creators through a transparent, bid-driven marketplace. We replace manual outreach with automated workflows and data-driven performance metrics."
    },
    {
        question: "How does the auction system work?",
        answer: "Brands create campaign 'auctions' detailing their requirements and budget. Verified creators can then bid on these auctions with their unique value propositions. Brands select the best fit, and the collaboration begins instantly through our secure workspace."
    },
    {
        question: "What is a K-Coin (KC)?",
        answer: "K-Coin is our platform's internal currency that ensures secure and instant transactions. It simplifies the payment process, especially for international collaborations, and provides a clear history of earnings and spendings."
    },
    {
        question: "How do I join as a brand?",
        answer: "Simply click 'Join the Network' and select the Brand track. You'll need to verify your business details, after which you can immediately start creating auctions and discovering top-tier creators."
    },
    {
        question: "Is Kollabary free for influencers?",
        answer: "Yes, joining the Kollabary network as a creator is completely free. We take a small service fee only when you successfully complete a paid collaboration, ensuring we only succeed when you do."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    return (
        <section id="faq" className="py-24 lg:py-40 bg-muted/10 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-chip border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
                    >
                        <HelpCircle size={14} />
                        <span>Common Inquiries</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter">
                        Frequently Asked <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-secondary italic pr-2">Questions.</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "rounded-[2rem] border border-border overflow-hidden transition-all duration-300",
                                openIndex === idx ? "bg-card border-primary/20" : "bg-card/50 hover:bg-card/80"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full px-8 py-7 flex items-center justify-between text-left group cursor-pointer"
                            >
                                <span className={cn(
                                    "text-lg font-bold transition-colors",
                                    openIndex === idx ? "text-primary" : "text-foreground group-hover:text-primary"
                                )}>
                                    {faq.question}
                                </span>
                                <div className={cn(
                                    "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                    openIndex === idx ? "bg-primary text-white" : "bg-primary/5 text-primary"
                                )}>
                                    {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-8 pb-8 text-muted-foreground leading-relaxed font-medium">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Schema.org FAQPage */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(faq => ({
                                "@type": "Question",
                                "name": faq.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.answer
                                }
                            }))
                        })
                    }}
                />
            </div>
        </section>
    );
};
