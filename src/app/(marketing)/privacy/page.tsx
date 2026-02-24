'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <StaticPageLayout
            title="Privacy Policy"
            subtitle="Your privacy is core to our trust-based community. Here is how we handle your data."
            lastUpdated="February 24, 2026"
        >
            <StaticSection title="1. Information We Collect" icon={<Shield className="w-6 h-6 text-primary" />} index={0}>
                <p>We collect information you provide directly to us when you create an account, update your profile, or communicate with other users. This includes your name, email address, profile photos, and social media handles.</p>
                <p>We also automatically collect certain technical information when you use our platform, such as your IP address, browser type, and usage patterns.</p>
            </StaticSection>

            <StaticSection title="2. How We Use Your Information" icon={<Eye className="w-6 h-6 text-primary" />} index={1}>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve the Kollabary platform.</li>
                    <li>Facilitate connections between brands and influencers.</li>
                    <li>Personalize your experience and content.</li>
                    <li>Communicate with you about products, services, and events.</li>
                    <li>Monitor and analyze trends and usage.</li>
                </ul>
            </StaticSection>

            <StaticSection title="3. Data Security" icon={<Lock className="w-6 h-6 text-primary" />} index={2}>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
                <p>However, no security system is impenetrable, and we cannot guarantee the absolute security of our systems or your data.</p>
            </StaticSection>

            <StaticSection title="4. Your Rights" icon={<FileText className="w-6 h-6 text-primary" />} index={3}>
                <p>You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a copy of the data we hold about you or ask us to restrict the processing of your data in certain circumstances.</p>
            </StaticSection>
        </StaticPageLayout>
    );
}
