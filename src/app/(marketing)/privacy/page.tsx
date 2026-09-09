'use client';

import React from 'react';
import { StaticPageLayout, StaticSection, StaticCallout } from '@/components/marketing/StaticPageLayout';
import { Shield, Lock, Eye, FileText, Cookie, Database, UserCheck, Globe, Sparkles, HelpCircle } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <StaticPageLayout
            title="Privacy Policy"
            subtitle="Your privacy and data security are fundamental to our trust-based marketplace. Here is how we collect, protect, and manage your data."
            lastUpdated="September 9, 2026"
        >
            <StaticSection title="1. Information We Collect" icon={<Shield className="w-5 h-5" />} index={0}>
                <p>
                    We collect information you provide directly to us when using Kollabary, creating an account, filling out forms, or communicating with other users:
                </p>
                <ul>
                    <li><strong>Account & Personal Identifiers:</strong> Name, email address, phone number, password hashes (handled securely via Google Auth / Firebase), and account role (Brand or Creator/Influencer).</li>
                    <li><strong>Professional & Profile Data:</strong> Portfolio assets, social media handles (Instagram, YouTube, TikTok, etc.), niche categories, pricing rates, and collaboration history.</li>
                    <li><strong>Form Data & User Submissions:</strong> Information provided when submitting contact forms, waitlist forms, feedback, support inquiries, and lead generation responses.</li>
                    <li><strong>Financial Information:</strong> Payment details, tax identifiers, and transaction history processed via our PCI-compliant payment partners (e.g., Razorpay).</li>
                    <li><strong>Communication Data:</strong> Messages, campaign briefs, negotiation logs, and media shared within the Kollabary platform.</li>
                </ul>
                <p className="mt-4">
                    We also automatically collect technical telemetry when you browse our platform, including IP addresses, device identifiers, browser types, operating systems, referring URLs, time zones, and activity logs.
                </p>
            </StaticSection>

            <StaticSection title="2. Form Data Consents & Direct Communications" icon={<FileText className="w-5 h-5" />} index={1}>
                <p>
                    When you submit data through any forms on Kollabary (such as waitlist registration, contact us requests, feedback forms, or newsletter sign-ups), you explicitly consent to:
                </p>
                <ul>
                    <li><strong>Processing Form Inquiries:</strong> Allowing Kollabary to process your submitted details to respond to your queries, deliver requested services, and provide customer assistance.</li>
                    <li><strong>Service & Security Alerts:</strong> Receiving critical transactional emails, account status updates, and security notifications.</li>
                    <li><strong>Marketing Communications (Opt-In/Opt-Out):</strong> Receiving occasional platform updates, industry insights, and promotional announcements. You may opt out of promotional communications at any time by clicking the &quot;Unsubscribe&quot; link in any marketing email or updating your account settings.</li>
                </ul>
            </StaticSection>

            <StaticSection title="3. Cookies, Google Analytics & Advertising Disclosures" icon={<Cookie className="w-5 h-5" />} index={2}>
                <p>
                    Kollabary uses cookies, web beacons, and similar tracking technologies to enhance user experience, ensure platform security, and analyze performance.
                </p>
                <div className="mt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-foreground">A. Essential & Functional Cookies</h4>
                        <p className="text-sm">
                            Necessary for the core operation of our platform, maintaining authenticated user sessions (e.g., <code>user_role</code> cookies), securing forms, and enforcing user preferences (such as cookie consent choices stored in <code>kollabary_cookie_consent</code>).
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">B. Google Analytics & Google Tag Manager</h4>
                        <p className="text-sm">
                            We utilize Google Analytics and Google Tag Manager to analyze how users interact with Kollabary. These tools use cookies to aggregate anonymous statistics, traffic patterns, and page usage. For more details on Google&apos;s data practices, please visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google&apos;s Privacy &amp; Terms</a>.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">C. Google AdSense & Third-Party Advertising Cookies</h4>
                        <p className="text-sm">
                            Third-party vendors, including Google, use cookies (such as the DART cookie) to serve ads based on a user&apos;s prior visits to Kollabary or other websites on the internet.
                        </p>
                        <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to Kollabary and/or other sites on the Internet.</li>
                            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ad Settings</a> or by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info</a>.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">D. Cookie Preference Management</h4>
                        <p className="text-sm">
                            You can manage your cookie preferences at any time via our interactive Cookie Consent banner or through your web browser settings. Note that disabling essential cookies may impact platform functionality.
                        </p>
                    </div>
                </div>
            </StaticSection>

            <StaticSection title="4. How We Use Your Information" icon={<Eye className="w-5 h-5" />} index={3}>
                <p>We process your data strictly to operate, protect, and improve the Kollabary marketplace:</p>
                <ul>
                    <li><strong>Marketplace Matching & Auctions:</strong> Facilitating discovery, bids, campaign matches, and contract workflows between Brands and Creators.</li>
                    <li><strong>Algorithmic Ranking & Prestige Scoring:</strong> Calculating creator performance metrics and verification scores based on platform collaboration metrics.</li>
                    <li><strong>Verification & Security:</strong> Validating identities, preventing fraud, detecting spam or malicious bots, and maintaining network safety.</li>
                    <li><strong>Customer Support & Service Upgrades:</strong> Troubleshooting platform errors and launching requested features.</li>
                </ul>
            </StaticSection>

            <StaticSection title="5. Data Sharing & Third-Party Integrations" icon={<Lock className="w-5 h-5" />} index={4}>
                <p>
                    <strong>We DO NOT sell or rent your personal data to third parties.</strong> We share information only under strict confidentiality and operational safeguards:
                </p>
                <ul>
                    <li><strong>Inter-User Profile Visibility:</strong> Creator portfolios, stats, and brand profiles are displayed publicly or to verified users on the marketplace to facilitate collaboration.</li>
                    <li><strong>Trusted Service Providers:</strong> Secure infrastructure providers (hosting, payment gateways like Razorpay, authentication via Firebase/Google OAuth, and analytics providers).</li>
                    <li><strong>Legal & Compliance Demands:</strong> When required by law, subpoena, court order, or to defend Kollabary against illegal activity or policy violations.</li>
                </ul>
            </StaticSection>

            <StaticSection title="6. Legal Basis for Data Processing" icon={<Database className="w-5 h-5" />} index={5}>
                <p>Under international laws (including GDPR and India IT / DPDP Act 2023), we process your data based on:</p>
                <ul>
                    <li><strong>Contractual Performance:</strong> To fulfill our obligation of providing marketplace services to registered users.</li>
                    <li><strong>Explicit Consent:</strong> Granted by you when submitting forms, opting into marketing, or accepting cookie usage.</li>
                    <li><strong>Legitimate Business Interests:</strong> Maintaining site security, preventing fraudulent activity, and refining service UX.</li>
                    <li><strong>Legal Obligations:</strong> Compliance with applicable accounting, tax, and anti-spam legislation.</li>
                </ul>
            </StaticSection>

            <StaticSection title="7. Data Retention & Protection Standards" icon={<UserCheck className="w-5 h-5" />} index={6}>
                <p>
                    We retain personal data as long as your account remains active or as required by law. Form submissions and support logs are stored securely for record-keeping and audit purposes.
                </p>
                <p className="mt-2">
                    We employ industry-standard technical measures, including TLS/SSL encryption for data in transit, encrypted storage databases, strict access permissions, and periodic security reviews.
                </p>
            </StaticSection>

            <StaticSection title="8. Global Privacy Rights & Controls" icon={<Globe className="w-5 h-5" />} index={7}>
                <p>Depending on your jurisdiction (GDPR, CCPA/CPRA, India DPDP Act 2023), you hold the following rights:</p>
                <ul>
                    <li><strong>Access & Export:</strong> Right to request a copy of the personal data we store about you.</li>
                    <li><strong>Rectification:</strong> Right to correct incomplete or inaccurate profile details.</li>
                    <li><strong>Deletion (&quot;Right to be Forgotten&quot;):</strong> Right to request permanent erasure of your account and personal data, subject to statutory retention limits.</li>
                    <li><strong>Consent Withdrawal:</strong> Right to revoke consent for marketing emails, form processing, or cookie tracking at any time.</li>
                </ul>
            </StaticSection>

            <StaticSection title="9. Protection of Minors (COPPA & Child Safety)" icon={<Sparkles className="w-5 h-5" />} index={8}>
                <p>
                    Kollabary is strictly intended for individuals aged 18 and older (or minors aged 13-17 operating with explicit parent or legal guardian oversight). We do not knowingly collect personal data from children under 13. If you believe a child under 13 has submitted data to us, please contact us immediately for deletion.
                </p>
            </StaticSection>

            <StaticSection title="10. Contact Us & Data Officer" icon={<HelpCircle className="w-5 h-5" />} index={9}>
                <p>
                    If you have questions, privacy concerns, or wish to exercise your legal data rights, please contact our Data Protection Officer at:
                </p>
                <div className="mt-3 p-4 rounded-xl bg-card border border-border">
                    <p className="font-semibold text-foreground">Kollabary Data Protection Office</p>
                    <p className="text-sm text-muted-foreground mt-1">Email: <a href="mailto:support@kollabary.com" className="text-primary hover:underline font-medium">support@kollabary.com</a></p>
                    <p className="text-sm text-muted-foreground">Response Window: We strive to address all formal privacy requests within 30 calendar days.</p>
                </div>
            </StaticSection>

            <StaticCallout title="Cookie & Privacy Consent Notice" variant="info">
                By browsing Kollabary, submitting forms, or using our services, you confirm that you have read and agreed to this Privacy Policy.
            </StaticCallout>
        </StaticPageLayout>
    );
}


