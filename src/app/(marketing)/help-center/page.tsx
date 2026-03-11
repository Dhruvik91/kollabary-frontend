'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Search, HelpCircle, LifeBuoy, FileQuestion } from 'lucide-react';

export default function HelpCenterPage() {
    return (
        <StaticPageLayout
            title="Help Center"
            subtitle="Frequently asked questions and support resources."
        >
            <div className="relative mb-12">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input className="w-full bg-card/50 border border-border rounded-full pl-14 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" placeholder="How can we help today?" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                <div className="p-8 rounded-[2rem] border border-border/50 bg-card/30 text-center">
                    <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h4 className="font-bold mb-1">Knowledge Base</h4>
                    <span className="text-xs text-muted-foreground">Browse articles</span>
                </div>
                <div className="p-8 rounded-[2rem] border border-border/50 bg-card/30 text-center">
                    <LifeBuoy className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h4 className="font-bold mb-1">Live Support</h4>
                    <span className="text-xs text-muted-foreground">Chat with us</span>
                </div>
                <div className="p-8 rounded-[2rem] border border-border/50 bg-card/30 text-center">
                    <FileQuestion className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h4 className="font-bold mb-1">Submit Ticket</h4>
                    <span className="text-xs text-muted-foreground">Email inquiry</span>
                </div>
            </div>

            <StaticSection title="Popular Questions" icon={<FileQuestion className="w-6 h-6 text-primary" />} index={0}>
                <div className="space-y-4">
                    <details className="group border-b border-border/50 pb-4">
                        <summary className="list-none font-bold cursor-pointer flex justify-between items-center text-foreground hover:text-primary transition-colors">
                            How do I verify my brand account? <span className="text-primary">{"+"}</span>
                        </summary>
                        <p className="mt-3 text-sm opacity-80 leading-relaxed">To verify your brand, go to Settings &gt; Verification and upload your business credentials. Review typically takes 24-48 hours.</p>
                    </details>
                    <details className="group border-b border-border/50 pb-4">
                        <summary className="list-none font-bold cursor-pointer flex justify-between items-center text-foreground hover:text-primary transition-colors">
                            What payment methods do you support? <span className="text-primary">{"+"}</span>
                        </summary>
                        <p className="mt-3 text-sm opacity-80 leading-relaxed">Kollabary is a bridge service. While we support invoicing tools, actual payments happen between you and the creator via your preferred external gateway.</p>
                    </details>
                </div>
            </StaticSection>
        </StaticPageLayout>
    );
}
