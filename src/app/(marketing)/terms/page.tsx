'use client';

import React from 'react';
import { StaticPageLayout, StaticSection, StaticCallout } from '@/components/marketing/StaticPageLayout';
import { ShieldAlert, CreditCard, Users, Scale } from 'lucide-react';

export default function TermsPage() {
    return (
        <StaticPageLayout
            title="Terms & Conditions"
            subtitle="Please read these terms carefully before using the Kollabary platform."
            lastUpdated="February 24, 2026"
        >
            <StaticSection title="1. The Kollabary Platform" icon={<Users className="w-5 h-5" />} index={0}>
                <p>
                    Kollabary acts strictly as an intermediary (&apos;The Bridge&apos;) connecting Brands (Clients) and Influencers (Creators). We provide the tools for discovery, communication, and collaboration management, but we are not a party to any agreements made between users.
                </p>
            </StaticSection>

            <StaticSection title="2. Payment Disputes & Liability" icon={<CreditCard className="w-5 h-5 text-red-500" />} index={1}>
                <p>
                    <strong>CRITICAL:</strong> Kollabary does not handle, process, or guarantee payments between Brands and Influencers. All financial transactions occur independently of the platform. Any payment issues, including but not limited to non-payment, partial payment, or delayed payment, must be resolved directly between the parties involved. Kollabary offers no mediation, insurance, or reimbursement for financial concerns.
                </p>
            </StaticSection>

            <StaticSection title="3. User Responsibilities" icon={<ShieldAlert className="w-5 h-5" />} index={2}>
                <p>
                    Users are solely responsible for verifying the identity and reliability of their collaboration partners. We recommend having written contracts and secure payment methods outside of Kollabary for all engagements.
                </p>
            </StaticSection>

            <StaticSection title="4. Limitation of Service" icon={<Scale className="w-5 h-5" />} index={3}>
                <p>
                    As a &apos;bridge&apos; service, we do not guarantee the quality of work from influencers or the fulfillment of payment from brands. Our service is provided &apos;as-is&apos; without warranties of any kind regarding the outcomes of collaborations initiated on the platform.
                </p>
            </StaticSection>

            <StaticCallout title="Disclaimer" variant="danger">
                By using Kollabary, you acknowledge that we are just a facilitator and not responsible for the professional or financial conduct of other users.
            </StaticCallout>
        </StaticPageLayout>
    );
}

