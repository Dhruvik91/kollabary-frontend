'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Users, Briefcase, Zap, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CareersPage() {
    const jobCategories = [
        { title: 'Engineering', positions: 3 },
        { title: 'Product & Design', positions: 2 },
        { title: 'Marketing & Sales', positions: 4 },
        { title: 'Operations', positions: 1 }
    ];

    return (
        <StaticPageLayout
            title="Careers at Kollabary"
            subtitle="Help us build the future of human-first marketing."
        >
            <StaticSection title="Why Kollabary?" icon={<Zap className="w-6 h-6 text-primary" />} index={0}>
                <p>We're a fast-growing team of creators, engineers, and strategists passionate about building tools that empower others. We value autonomy, transparency, and a relentless focus on our users.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <Globe className="w-5 h-5 text-primary" />
                        <span className="font-medium">Remote-first culture</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <Heart className="w-5 h-5 text-primary" />
                        <span className="font-medium">Health & Wellness support</span>
                    </div>
                </div>
            </StaticSection>

            <StaticSection title="Our Teams" icon={<Users className="w-6 h-6 text-primary" />} index={1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {jobCategories.map((cat) => (
                        <div key={cat.title} className="flex justify-between items-center p-4 rounded-2xl border border-border/50">
                            <span className="font-bold">{cat.title}</span>
                            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{cat.positions} open</span>
                        </div>
                    ))}
                </div>
            </StaticSection>

            <StaticSection title="Don't See a Role?" icon={<Briefcase className="w-6 h-6 text-primary" />} index={2}>
                <p>We're always looking for talented individuals to join our mission. Even if you don't see a perfect match, feel free to reach out and tell us how you can help.</p>
                <Button className="mt-4 rounded-full px-8">Send General Application</Button>
            </StaticSection>
        </StaticPageLayout>
    );
}
