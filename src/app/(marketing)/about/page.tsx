'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Rocket, Target, Users, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <StaticPageLayout
            title="About Kollabary"
            subtitle="The bridge between visionary brands and creative minds."
        >
            <StaticSection title="Our Mission" icon={<Target className="w-6 h-6 text-primary" />} index={0}>
                <p>Kollabary was founded with a simple goal: to make influencer marketing more authentic, transparent, and accessible for everyone. We believe that when the right brand finds the right creator, the results are powerful.</p>
            </StaticSection>

            <StaticSection title="The Kollabary Way" icon={<Rocket className="w-6 h-6 text-primary" />} index={1}>
                <p>We're not just a platform; we're a community. We build tools that handle the complexity of collaborations so that you can focus on what matters most: creating and connecting.</p>
            </StaticSection>

            <StaticSection title="Our Community" icon={<Users className="w-6 h-6 text-primary" />} index={2}>
                <p>Join over 500+ premium brands and thousands of creative minds already scaling their reach through Kollabary. From emerging startups to established enterprises, we support collaborations of all scales.</p>
            </StaticSection>

            <StaticSection title="Join Our Journey" icon={<Heart className="w-6 h-6 text-primary" />} index={3}>
                <p>We're constantly evolving and improving our platform based on your feedback. Together, we're redefining the future of influencer strategy.</p>
            </StaticSection>
        </StaticPageLayout>
    );
}
