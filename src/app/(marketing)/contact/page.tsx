'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <StaticPageLayout
            title="Get in Touch"
            subtitle="We're here to help you scale your influencer strategy."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <StaticSection title="Email Us" icon={<Mail className="w-6 h-6 text-primary" />} index={0}>
                    <p>For general inquiries, support, or partnership opportunities.</p>
                    <div className="pt-2 font-bold text-primary">hello@kollabary.com</div>
                </StaticSection>

                <StaticSection title="Support Chat" icon={<MessageCircle className="w-6 h-6 text-primary" />} index={1}>
                    <p>Our average response time is under 2 hours during business hours.</p>
                    <Button variant="outline" className="mt-4 rounded-full">Open Live Chat</Button>
                </StaticSection>

                <StaticSection title="Office" icon={<MapPin className="w-6 h-6 text-primary" />} index={2}>
                    <p>While we are remote-first, our core team operates out of London, UK.</p>
                    <div className="pt-2 text-sm">International House, 12 Constance Street, London, E16 2DQ</div>
                </StaticSection>

                <StaticSection title="Business Hours" icon={<Clock className="w-6 h-6 text-primary" />} index={3}>
                    <p>Monday — Friday</p>
                    <div className="pt-2 font-bold">9:00 AM — 6:00 PM GMT</div>
                </StaticSection>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card p-12 rounded-[3rem] border border-border/50 text-center"
            >
                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input className="w-full bg-background border border-border rounded-xl px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input className="w-full bg-background border border-border rounded-xl px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea className="w-full bg-background border border-border rounded-xl px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[150px]" placeholder="How can we help?" />
                    </div>
                </div>
                <Button className="mt-8 rounded-full px-12 h-12 shadow-lg shadow-primary/20">Send Message</Button>
            </motion.div>
        </StaticPageLayout>
    );
}
