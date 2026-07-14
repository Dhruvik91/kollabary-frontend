'use client';

import React, { useState } from 'react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { useNotification } from '@/contexts/notification-context';
import { Button } from '@/components/ui/button';
import {
    Bell,
    MessageSquare,
    Zap,
    Clock,
    ShieldAlert,
    ArrowRight,
    Sparkles,
    Gavel,
    Building2,
    Handshake,
    Send,
    ShieldCheck
} from 'lucide-react';
import { NOTIFICATIONS_TRIGGERS } from '@/constants';

export const Notifications = () => {
    const {
        isPermissionModalOpen,
        triggerSource,
        closePermissionModal,
        subscribe,
        loading,
        permission
    } = useNotification();

    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async () => {
        setIsSubscribing(true);
        try {
            await subscribe();
        } finally {
            setIsSubscribing(false);
            closePermissionModal();
        }
    };

    const handleClose = () => {
        if (triggerSource !== NOTIFICATIONS_TRIGGERS.DEFAULT) {
            try {
                localStorage.setItem(`kollabary-prompt-dismissed-${triggerSource}`, Date.now().toString());
            } catch (e) {
                // ignore
            }
        }
        closePermissionModal();
    };

    const getPageContent = (source: string) => {
        switch (source) {
            case NOTIFICATIONS_TRIGGERS.MESSAGES:
                return {
                    title: 'Never Miss a Message',
                    description: 'Get real-time push notifications the moment a brand or creator messages you about a potential collaboration.',
                    features: [
                        {
                            icon: <MessageSquare size={18} />,
                            title: 'Instant Chat Alerts',
                            description: 'Receive notifications instantly when new messages land in your inbox.',
                            colorClass: 'bg-violet-500/10 text-violet-500',
                        },
                        {
                            icon: <Zap size={18} />,
                            title: 'Fast Response Times',
                            description: 'Reply immediately to secure brand partnerships before other creators do.',
                            colorClass: 'bg-amber-500/10 text-amber-500',
                        },
                        {
                            icon: <Clock size={18} />,
                            title: 'Milestone Agreements',
                            description: 'Stay in sync regarding critical chat discussions and terms verification.',
                            colorClass: 'bg-emerald-500/10 text-emerald-500',
                        }
                    ]
                };
            case NOTIFICATIONS_TRIGGERS.AUCTIONS:
                return {
                    title: 'Track Live Auctions',
                    description: 'Receive real-time bid updates, end-of-auction alerts, and win notifications directly on your device.',
                    features: [
                        {
                            icon: <Gavel size={18} />,
                            title: 'New Bid Alerts',
                            description: 'Get notified immediately when someone places a bid or makes an offer.',
                            colorClass: 'bg-indigo-500/10 text-indigo-500',
                        },
                        {
                            icon: <Clock size={18} />,
                            title: 'Time-Critical Updates',
                            description: 'Never miss the final, high-value minutes of an active campaign auction.',
                            colorClass: 'bg-rose-500/10 text-rose-500',
                        },
                        {
                            icon: <Sparkles size={18} />,
                            title: 'Win & Match Notifications',
                            description: 'Be the first to know the instant your bids are accepted or an auction wraps up.',
                            colorClass: 'bg-emerald-500/10 text-emerald-500',
                        }
                    ]
                };
            case NOTIFICATIONS_TRIGGERS.BRANDS:
                return {
                    title: 'Connect with Verified Brands',
                    description: 'Stay notified whenever brand pages request views, send direct requests, or invite you to connect.',
                    features: [
                        {
                            icon: <Building2 size={18} />,
                            title: 'Brand Inquiries',
                            description: 'Get notified immediately when reputable brands request details on your profile.',
                            colorClass: 'bg-blue-500/10 text-blue-500',
                        },
                        {
                            icon: <Zap size={18} />,
                            title: 'Instant Partnership Invites',
                            description: 'Receive immediate notifications when verified brands add you to campaign targets.',
                            colorClass: 'bg-purple-500/10 text-purple-500',
                        },
                        {
                            icon: <ShieldCheck size={18} />,
                            title: 'Safe Communications',
                            description: 'Only receive push notices for safe, fully verified brand interactions.',
                            colorClass: 'bg-emerald-500/10 text-emerald-500',
                        }
                    ]
                };
            case NOTIFICATIONS_TRIGGERS.COLLABORATIONS:
                return {
                    title: 'Collaboration Tracking',
                    description: 'Keep tabs on ongoing campaign deliverables, content approvals, and escrow milestones.',
                    features: [
                        {
                            icon: <Handshake size={18} />,
                            title: 'Agreement Milestones',
                            description: 'Get notified when terms are signed, approved, or changed.',
                            colorClass: 'bg-emerald-500/10 text-emerald-500',
                        },
                        {
                            icon: <Clock size={18} />,
                            title: 'Content Approval Checks',
                            description: 'Receive alerts the second your submitted content draft has been reviewed by the brand.',
                            colorClass: 'bg-cyan-500/10 text-cyan-500',
                        },
                        {
                            icon: <Sparkles size={18} />,
                            title: 'Escrow Release Alerts',
                            description: 'Stay updated when funding milestones are completed and ready for payout.',
                            colorClass: 'bg-amber-500/10 text-amber-500',
                        }
                    ]
                };
            case NOTIFICATIONS_TRIGGERS.PITCHES:
                return {
                    title: 'Stay Updated on Pitches',
                    description: 'Track the status of your pitches, campaign applications, and custom requests.',
                    features: [
                        {
                            icon: <Send size={18} />,
                            title: 'Pitch Status Updates',
                            description: 'Know immediately when a brand views, counters, or accepts your pitch.',
                            colorClass: 'bg-sky-500/10 text-sky-500',
                        },
                        {
                            icon: <Zap size={18} />,
                            title: 'Exclusive Brief Alerts',
                            description: 'Get notified when new campaign briefs match your pitch preferences.',
                            colorClass: 'bg-pink-500/10 text-pink-500',
                        },
                        {
                            icon: <Clock size={18} />,
                            title: 'Pitch Submission Deadlines',
                            description: 'Stay reminded of key dates for submit-by-windows and offer extensions.',
                            colorClass: 'bg-amber-500/10 text-amber-500',
                        }
                    ]
                };
            default:
                return {
                    title: 'Enable Push Notifications',
                    description: 'Stay connected and receive instant updates on your campaign activity, offers, and messages.',
                    features: [
                        {
                            icon: <MessageSquare size={18} />,
                            title: 'Direct Messaging',
                            description: 'Receive instant alerts when brands message you about a project.',
                            colorClass: 'bg-violet-500/10 text-violet-500',
                        },
                        {
                            icon: <Zap size={18} />,
                            title: 'Campaign Invites & Offers',
                            description: 'Get notified immediately when you receive a new collaboration invitation.',
                            colorClass: 'bg-emerald-500/10 text-emerald-500',
                        },
                        {
                            icon: <Clock size={18} />,
                            title: 'Escrow & Payment Milestone Updates',
                            description: 'Stay informed on funding status, milestones, and payout receipts.',
                            colorClass: 'bg-orange-500/10 text-orange-500',
                        }
                    ]
                };
        }
    };

    const isBlocked = permission === 'denied';
    const pageContent = getPageContent(triggerSource);

    return (
        <AnimatedModal
            isOpen={isPermissionModalOpen}
            onClose={handleClose}
            title={
                <div className="flex items-center gap-2">
                    <Sparkles className="text-primary w-5 h-5 animate-pulse" />
                    <span>{isBlocked ? 'Notifications Blocked' : pageContent.title}</span>
                </div>
            }
            description={
                isBlocked
                    ? 'To receive real-time updates, you need to update your browser settings.'
                    : pageContent.description
            }
            size="md"
        >
            {isBlocked ? (
                <div className="space-y-6">
                    {/* Blocked State Instructions */}
                    <div className="p-5 bg-destructive/5 border border-destructive/10 rounded-2xl flex items-start gap-4">
                        <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center text-destructive shrink-0 mt-0.5">
                            <ShieldAlert size={20} />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-destructive">How to unblock notifications:</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                You previously chose to block notifications for this website. You must manually reset this in your browser settings to continue.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <h4 className="font-bold text-sm tracking-tight text-foreground uppercase">Follow these steps:</h4>
                        <ol className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-bold text-foreground shrink-0 mt-0.5">1</span>
                                <span>Look at your browser address bar and click the <strong>lock</strong> or <strong>settings</strong> icon on the left side of the URL.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-bold text-foreground shrink-0 mt-0.5">2</span>
                                <span>Find the <strong>Notifications</strong> permission option.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-bold text-foreground shrink-0 mt-0.5">3</span>
                                <span>Toggle or select the setting to <strong>Allow</strong>.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-bold text-foreground shrink-0 mt-0.5">4</span>
                                <span>Refresh this tab or browser window to apply changes.</span>
                            </li>
                        </ol>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-border/5">
                        <Button
                            className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-95"
                            onClick={handleClose}
                        >
                            Got It
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Welcome Banner */}
                    <div className="flex flex-col items-center justify-center py-4 gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                                <Bell size={32} className="text-primary animate-bounce" strokeWidth={1.5} />
                            </div>
                            <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/30 animate-ping opacity-60" />
                        </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3">
                        {pageContent.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-border/40 hover:bg-muted/10 transition-colors">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${feature.colorClass}`}>
                                    {feature.icon}
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-sm">{feature.title}</h4>
                                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-border/5">
                        <Button
                            className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all gap-2"
                            onClick={handleSubscribe}
                            disabled={loading || isSubscribing}
                        >
                            {loading || isSubscribing ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Enabling...
                                </span>
                            ) : (
                                <>
                                    <span>Enable Notifications</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full h-10 rounded-xl text-muted-foreground hover:text-foreground font-medium"
                            onClick={handleClose}
                            disabled={loading || isSubscribing}
                        >
                            Maybe Later
                        </Button>
                    </div>
                </div>
            )}
        </AnimatedModal>
    );
};
