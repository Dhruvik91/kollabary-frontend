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
                <p>We collect information you provide directly to us when you create an account, update your profile, or communicate with other users. This includes:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Identifiers:</strong> Name, email address, phone number, and social media handles.</li>
                    <li><strong>Professional Information:</strong> Portfolio links, niche categories, and collaboration history.</li>
                    <li><strong>Financial Information:</strong> Payment details and transaction history processed via our secure partners (e.g., Razorpay).</li>
                    <li><strong>Communication Data:</strong> Messages and content shared within the platform.</li>
                </ul>
                <p className="mt-4">We also automatically collect technical information such as IP addresses, browser types, device identifiers, and usage patterns via cookies and similar technologies.</p>
            </StaticSection>

            <StaticSection title="2. How We Use Your Information" icon={<Eye className="w-6 h-6 text-primary" />} index={1}>
                <p>Kollabary uses your data to power the bid-driven marketplace and ensure platform integrity:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Marketplace Operations:</strong> Facilitating auctions, bids, and collaborations between brands and creators.</li>
                    <li><strong>Performance Ranking:</strong> Calculating creator prestige scores based on verified collaboration data.</li>
                    <li><strong>Verification & Security:</strong> Verifying identities and preventing fraudulent activity.</li>
                    <li><strong>Financial Settlements:</strong> Processing payments and managing K-Coin balances.</li>
                    <li><strong>Personalization:</strong> Recommending relevant partners and opportunities.</li>
                </ul>
            </StaticSection>

            <StaticSection title="3. Data Sharing & Third Parties" icon={<Lock className="w-6 h-6 text-primary" />} index={2}>
                <p>We do not sell your personal data. We share information only in the following contexts:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Between Users:</strong> Profile data is visible to potential collaboration partners.</li>
                    <li><strong>Service Providers:</strong> Sharing with trusted partners like payment processors (Razorpay) and analytics providers (PostHog).</li>
                    <li><strong>Legal Compliance:</strong> When required by law or to protect our users and platform.</li>
                </ul>
            </StaticSection>

            <StaticSection title="4. Data Retention & Your Rights" icon={<FileText className="w-6 h-6 text-primary" />} index={3}>
                <p>We retain your information as long as your account is active or as needed to provide services. Under applicable laws (including GDPR and India IT Act), you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access & Portability:</strong> Request a copy of your personal data.</li>
                    <li><strong>Correction:</strong> Update inaccurate or incomplete information.</li>
                    <li><strong>Deletion:</strong> Request removal of your data ("Right to be Forgotten").</li>
                    <li><strong>Restriction:</strong> Limit how we process your data in specific scenarios.</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact our Data Protection Officer at support@kollabary.com.</p>
            </StaticSection>
        </StaticPageLayout>
    );
}
