'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotification } from '@/hooks/use-push-notification';
import { useAuth } from '@/contexts/auth-context';
import { PWA_STORAGE_KEYS } from '@/constants';

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

/** Returns true if the user dismissed the push prompt recently (within 2 days). */
function isDismissedRecently(): boolean {
    try {
        const dismissed = localStorage.getItem(PWA_STORAGE_KEYS.PUSH_PROMPT_DISMISSED);
        if (!dismissed) return false;
        return Date.now() - parseInt(dismissed, 10) < TWO_DAYS_MS;
    } catch {
        return false;
    }
}

/**
 * PushNotificationPrompt
 *
 * A native OS-style bottom-sheet that asks authenticated users for push
 * notification permission. Behaviour:
 * - Only shows when the user is logged in, push is supported, and the user
 *   is not yet subscribed.
 * - Waits for BOTH auth and push-notification state to finish loading before
 *   scheduling the prompt, so async service-worker checks never reset the timer.
 * - Only schedules the 6-second delay once (via ref) to prevent re-trigger loops.
 * - After "Not Now" it stores a dismissal timestamp and won't re-appear for 2 days.
 * - After "Enable" it calls the existing subscribe() hook and marks as subscribed.
 */
export const PushNotificationPrompt = () => {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { isSupported, isSubscribed, permission, subscribe, loading: isPushLoading } = usePushNotification();

    const [show, setShow] = useState(false);
    const [isEnabling, setIsEnabling] = useState(false);

    // Prevent the timer from being re-scheduled every time async state updates
    // (e.g. when checkSubscription() resolves and flips isSubscribed / permission)
    const hasScheduledRef = useRef(false);

    useEffect(() => {
        // ── 1. Wait for BOTH loading states to fully settle ──────────────────
        // Without this, the service-worker's async checkSubscription() can flip
        // isSubscribed/permission mid-flight, re-triggering this effect and
        // resetting the timer before it ever fires.
        if (isAuthLoading || isPushLoading) return;

        // ── 2. Gate conditions — bail out silently if not applicable ──────────
        if (!isAuthenticated) return;
        if (!isSupported) return;
        if (permission === 'granted' || isSubscribed) return;
        if (permission === 'denied') return;
        if (isDismissedRecently()) return;

        // ── 3. Schedule only once — ref survives re-renders & effect re-runs ─
        if (hasScheduledRef.current) return;
        hasScheduledRef.current = true;

        // Show after 6 s so the PWA install prompt (3 s) has time to animate in
        const timer = setTimeout(() => setShow(true), 6000);
        return () => clearTimeout(timer);
    }, [isAuthenticated, isAuthLoading, isSupported, isSubscribed, permission, isPushLoading]);

    const handleEnable = async () => {
        setIsEnabling(true);
        const success = await subscribe();
        setIsEnabling(false);
        if (success) {
            try {
                localStorage.setItem(PWA_STORAGE_KEYS.PUSH_SUBSCRIBED, 'true');
            } catch { /* ignore */ }
        }
        setShow(false);
    };

    const handleDismiss = () => {
        setShow(false);
        try {
            localStorage.setItem(PWA_STORAGE_KEYS.PUSH_PROMPT_DISMISSED, Date.now().toString());
        } catch { /* ignore */ }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="push-prompt"
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                    className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[110] w-full px-4 sm:px-0 sm:max-w-sm"
                >
                    {/* Card — mirrors iOS/Android system permission dialog aesthetics */}
                    <div className="relative bg-background/95 backdrop-blur-2xl border border-primary/15 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.25)] overflow-hidden">

                        {/* Subtle gradient accent at top */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-primary to-rose-500 opacity-80 rounded-t-[2rem]" />

                        {/* Dismiss X button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 h-7 w-7 rounded-full hover:bg-muted text-muted-foreground z-10"
                        >
                            <X size={14} />
                            <span className="sr-only">Dismiss</span>
                        </Button>

                        <div className="px-6 pt-7 pb-6 flex flex-col items-center text-center gap-5">
                            {/* Bell icon — styled like a system dialog icon */}
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner shadow-primary/10">
                                    <Bell
                                        size={32}
                                        className="text-primary"
                                        strokeWidth={1.75}
                                    />
                                </div>
                                {/* Animated ping ring */}
                                <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/30 animate-ping opacity-60" />
                            </div>

                            {/* Headline + body — mirrors native OS permission copy */}
                            <div className="space-y-1.5">
                                <h3 className="font-black text-lg tracking-tight leading-snug">
                                    Allow Notifications
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
                                    <span className="font-semibold text-foreground">Kollabary</span> wants to send
                                    you deal alerts, new messages, and campaign updates.
                                </p>
                            </div>

                            {/* Permission badges — mirrors how iOS lists what app will access */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {[
                                    '💬 Messages',
                                    '🤝 Deal Alerts',
                                    '📣 Campaigns',
                                ].map((label) => (
                                    <span
                                        key={label}
                                        className="px-3 py-1 rounded-full text-xs font-semibold bg-muted/60 text-muted-foreground border border-border/40"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>

                            {/* Action buttons */}
                            <div className="w-full flex flex-col gap-2.5 pt-1">
                                <Button
                                    onClick={handleEnable}
                                    disabled={isEnabling || isPushLoading}
                                    className="w-full h-12 rounded-2xl font-bold text-sm bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
                                >
                                    {isEnabling ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                            Enabling…
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Bell size={16} />
                                            Enable Notifications
                                        </span>
                                    )}
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={handleDismiss}
                                    disabled={isEnabling}
                                    className="w-full h-10 rounded-xl text-sm text-muted-foreground hover:text-foreground font-medium"
                                >
                                    Not Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
