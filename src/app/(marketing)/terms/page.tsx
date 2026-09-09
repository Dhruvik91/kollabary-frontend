'use client';

import React from 'react';
import { StaticPageLayout, StaticSection, StaticCallout } from '@/components/marketing/StaticPageLayout';
import { ShieldAlert, CreditCard, Users, Scale, FileText, Ban, Copyright, AlertTriangle, Gavel, HelpCircle } from 'lucide-react';

export default function TermsPage() {
    return (
        <StaticPageLayout
            title="Terms & Conditions"
            subtitle="Please read these Terms & Conditions carefully before accessing or using the Kollabary platform and services."
            lastUpdated="September 9, 2026"
        >
            <StaticSection title="1. Acceptance of Terms & Eligibility" icon={<Users className="w-5 h-5" />} index={0}>
                <p>
                    By accessing, browsing, registering an account, or submitting form data on Kollabary (&quot;the Platform&quot;), you enter into a legally binding contract with Kollabary and agree to comply with all terms stated herein.
                </p>
                <p className="mt-2">
                    <strong>Eligibility:</strong> You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to create an account or initiate commercial engagements on Kollabary. Minors between 13 and 17 may only use the platform under active parental or legal guardian supervision.
                </p>
            </StaticSection>

            <StaticSection title="2. Platform Role & Intermediary Safe Harbor" icon={<Scale className="w-5 h-5" />} index={1}>
                <p>
                    Kollabary operates strictly as an online marketplace and information intermediary (&apos;The Bridge&apos;) connecting Brands (Clients) and Creators/Influencers. We provide tools for discovery, bid placement, campaign management, and user interaction.
                </p>
                <p className="mt-2">
                    <strong>Intermediary Disclaimer (Safe Harbor):</strong> Kollabary is not a publisher, agent, employer, or party to any agreements made independently between Brands and Creators. Under applicable intermediary laws (including Section 230 and Digital Services Act provisions), Kollabary disclaims all liability for user-generated content, campaign proposals, representations, or fulfillment failures by users.
                </p>
            </StaticSection>

            <StaticSection title="3. User Accounts, Form Submissions & Security" icon={<ShieldAlert className="w-5 h-5" />} index={2}>
                <p>
                    When creating an account or submitting data via forms (e.g. waitlists, contact, or onboarding forms), you guarantee that all information provided is accurate, current, and complete.
                </p>
                <ul>
                    <li><strong>Account Security:</strong> You are responsible for safeguarding your login credentials (including Google Auth tokens) and all activities occurring under your account.</li>
                    <li><strong>No Impersonation:</strong> You may not impersonate any individual, brand, or entity, or falsely claim affiliation with third parties.</li>
                    <li><strong>Automated Activity Prohibition:</strong> Account creation or form submissions using automated bots, scrapers, or script generators are strictly forbidden.</li>
                </ul>
            </StaticSection>

            <StaticSection title="4. Payment Disputes & Off-Platform Financial Disclaimers" icon={<CreditCard className="w-5 h-5 text-red-500" />} index={3}>
                <p>
                    <strong>CRITICAL DISPUTE & LIABILITY LIMITATION:</strong> Kollabary does not handle, process, mediate, or guarantee payments between Brands and Creators. All financial arrangements and transactions occur independently of the Platform.
                </p>
                <ul>
                    <li>All independent financial transactions occur at the sole risk and discretion of the participating users.</li>
                    <li>Kollabary provides no warranty, insurance, mediation, or reimbursement for payment disputes, non-payment, partial payment, deliverable failures, or breach of independent campaign agreements.</li>
                    <li>Users are strongly advised to execute written contracts and utilize verified payment gateways for all off-platform transactions.</li>
                </ul>
            </StaticSection>

            <StaticSection title="5. User-Generated Content (UGC) & Intellectual Property Rights" icon={<FileText className="w-5 h-5" />} index={4}>
                <p>
                    Users retain full ownership of the intellectual property rights in their uploaded content, portfolio media, logos, and campaign briefs.
                </p>
                <p className="mt-2">
                    <strong>License to Kollabary:</strong> By uploading content to public profile areas or marketplace listings, you grant Kollabary a non-exclusive, worldwide, royalty-free, sublicensable license to host, display, index, reformat, and showcase your profile content solely for operating, promoting, and marketing the Kollabary platform.
                </p>
                <p className="mt-2">
                    <strong>Warranties:</strong> You warrant that your uploaded content does not violate third-party copyrights, trademarks, privacy rights, publicity rights, or non-disclosure agreements.
                </p>
            </StaticSection>

            <StaticSection title="6. DMCA & Copyright Takedown Policy" icon={<Copyright className="w-5 h-5" />} index={5}>
                <p>
                    Kollabary respects the intellectual property of others and expects users to do the same. If you believe your copyrighted work has been infringed on our site, please submit a written DMCA Takedown Notice to our designated copyright agent at <a href="mailto:support@kollabary.com" className="text-primary hover:underline font-medium">support@kollabary.com</a> including:
                </p>
                <ul>
                    <li>Identification of the copyrighted work claimed to have been infringed.</li>
                    <li>Identification of the material to be removed, including specific URLs.</li>
                    <li>Your contact details (name, email address, physical address, and phone number).</li>
                    <li>A statement of good faith belief and a statement under penalty of perjury that the info provided is accurate.</li>
                </ul>
            </StaticSection>

            <StaticSection title="7. Prohibited Conduct & Acceptable Use Policy" icon={<Ban className="w-5 h-5" />} index={6}>
                <p>You agree NOT to engage in any of the following prohibited behaviors on Kollabary:</p>
                <ul>
                    <li><strong>Fraud & Fake Engagement:</strong> Manipulating social metrics, inflating follower counts, purchasing fake engagement, or committing click fraud.</li>
                    <li><strong>Data Mining & Scraping:</strong> Using automated crawlers, scrapers, or tools to harvest platform data, user contact details, or profile analytics without explicit authorization.</li>
                    <li><strong>Malicious Code & Spam:</strong> Transmitting malware, viruses, unsolicited commercial messages (spam), or flooding forms.</li>
                    <li><strong>Platform Circumvention:</strong> Attempting to reverse engineer, disrupt network infrastructure, bypass security filters, or compromise user accounts.</li>
                    <li><strong>Harassment & Defamation:</strong> Posting abusive, defamatory, hateful, obscene, or unlawful material.</li>
                </ul>
            </StaticSection>

            <StaticSection title="8. Third-Party Links, Tools & Advertising Disclosures" icon={<AlertTriangle className="w-5 h-5" />} index={7}>
                <p>
                    Kollabary may display third-party advertisements (such as Google AdSense units), embedded widgets, social media integrations, or external website links.
                </p>
                <p className="mt-2">
                    Kollabary does not control, endorse, or assume responsibility for any third-party websites, terms, content, products, or privacy practices. Interacting with third-party advertisers or external services is entirely at your own risk.
                </p>
            </StaticSection>

            <StaticSection title="9. Disclaimer of Warranties (&quot;AS IS&quot;) & Liability Limits" icon={<Gavel className="w-5 h-5" />} index={8}>
                <p>
                    KOLLABARY IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="mt-2">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, KOLLABARY AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL ARISING FROM YOUR USE OF THE PLATFORM.
                </p>
            </StaticSection>

            <StaticSection title="10. Indemnification" icon={<ShieldAlert className="w-5 h-5" />} index={9}>
                <p>
                    You agree to defend, indemnify, and hold harmless Kollabary, its parent entity, affiliates, directors, officers, employees, and agents from and against any claims, liabilities, losses, damages, expenses, or legal fees (including attorney fees) resulting from:
                </p>
                <ul>
                    <li>Your breach of these Terms &amp; Conditions.</li>
                    <li>Your user-generated content or portfolio materials.</li>
                    <li>Your dispute with another user (Brand or Creator).</li>
                    <li>Your violation of any law or third-party rights.</li>
                </ul>
            </StaticSection>

            <StaticSection title="11. Governing Law, Termination & Contact" icon={<HelpCircle className="w-5 h-5" />} index={10}>
                <p>
                    <strong>Termination:</strong> We reserve the right to suspend or terminate your account and access to Kollabary at our sole discretion, without prior notice, for conduct violating these Terms.
                </p>
                <p className="mt-2">
                    <strong>Governing Law:</strong> These Terms shall be governed and construed in accordance with applicable governing laws, without regard to conflict of law principles. Any legal action shall be resolved via binding arbitration or courts of competent jurisdiction.
                </p>
                <p className="mt-2">
                    For legal notices or questions regarding these Terms, contact us at: <a href="mailto:support@kollabary.com" className="text-primary hover:underline font-medium">support@kollabary.com</a>.
                </p>
            </StaticSection>

            <StaticCallout title="Limitation of Intermediary Liability Disclaimer" variant="danger">
                By using Kollabary, you explicitly acknowledge that Kollabary is an intermediary marketplace bridge and is not liable for user interactions, user-submitted content, or off-platform payment settlements.
            </StaticCallout>
        </StaticPageLayout>
    );
}


