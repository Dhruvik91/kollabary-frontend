'use client';

import React from 'react';
import { StaticPageLayout, StaticSection } from '@/components/marketing/StaticPageLayout';
import { Cookie, Settings, Info, Bell } from 'lucide-react';

export default function CookiesPage() {
    return (
        <StaticPageLayout
            title="Cookies Policy"
            subtitle="Understand how we use cookies to provide a seamless experience."
            lastUpdated="February 24, 2026"
        >
            <StaticSection title="1. What are Cookies?" icon={<Cookie className="w-6 h-6 text-primary" />} index={0}>
                <p>Cookies are small text files that are stored on your device when you visit a website. They help the website recognize your device and remember information about your visit, like your preferred language and other settings.</p>
            </StaticSection>

            <StaticSection title="2. Types of Cookies We Use" icon={<Info className="w-6 h-6 text-primary" />} index={1}>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-foreground">Essential Cookies</h3>
                        <p>Necessary for the platform to function properly, such as for authentication and security.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">Preference Cookies</h3>
                        <p>Used to remember your settings and preferences for a better user experience.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">Analytics Cookies</h3>
                        <p>Help us understand how visitors interact with our platform by collecting and reporting information anonymously.</p>
                    </div>
                </div>
            </StaticSection>

            <StaticSection title="3. Managing Cookies" icon={<Settings className="w-6 h-6 text-primary" />} index={2}>
                <p>Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, but this may affect the functionality of our platform.</p>
            </StaticSection>

            <StaticSection title="4. Updates to This Policy" icon={<Bell className="w-6 h-6 text-primary" />} index={3}>
                <p>We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.</p>
            </StaticSection>
        </StaticPageLayout>
    );
}
