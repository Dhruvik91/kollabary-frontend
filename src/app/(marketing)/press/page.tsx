'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Newspaper, Mail, Download, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PressPage() {
    return (
        <StaticPageLayout
            title="Press Room"
            subtitle="Everything you need to cover the Kollabary story."
        >
            <StaticSection title="Media Inquiries" icon={<Mail className="w-6 h-6 text-primary" />} index={0}>
                <p>For interview requests, statements, or detailed platform insights, please contact our press team.</p>
                <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 inline-block font-mono text-primary">
                    press@kollabary.com
                </div>
            </StaticSection>

            <StaticSection title="Brand Assets" icon={<Download className="w-6 h-6 text-primary" />} index={1}>
                <p>Download our official logos, brand guidelines, and high-resolution platform screenshots.</p>
                <div className="flex flex-wrap gap-4 mt-4">
                    <Button variant="outline" className="rounded-full gap-2">
                        <Download className="w-4 h-4" /> Logo Pack (.zip)
                    </Button>
                    <Button variant="outline" className="rounded-full gap-2">
                        <Camera className="w-4 h-4" /> Platform Kit (.zip)
                    </Button>
                </div>
            </StaticSection>

            <StaticSection title="Latest News" icon={<Newspaper className="w-6 h-6 text-primary" />} index={2}>
                <div className="space-y-6">
                    <div className="border-l-2 border-primary/20 pl-6 py-2">
                        <span className="text-sm text-muted-foreground">Feb 15, 2026</span>
                        <h3 className="text-xl font-bold">Kollabary Surpasses 50,000 Verified Influencers</h3>
                        <p className="text-muted-foreground mt-2">Rapid growth signals a shift towards authentic, human-first digital marketing strategies.</p>
                    </div>
                </div>
            </StaticSection>
        </StaticPageLayout>
    );
}
